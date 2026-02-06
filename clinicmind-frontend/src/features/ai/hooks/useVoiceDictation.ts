import { useState, useRef, useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { aiApi } from "../api/ai.api"
import type { DictationStatus, TranscriptionResponse } from "../types/ai.types"
import { MAX_RECORDING_DURATION } from "../constants/aiConfig"
import { toast } from "sonner"

interface UseVoiceDictationOptions {
  onTranscriptionComplete?: (result: TranscriptionResponse) => void
  patientId?: string
}

export const useVoiceDictation = (options: UseVoiceDictationOptions = {}) => {
  const [status, setStatus] = useState<DictationStatus>("idle")
  const [transcription, setTranscription] =
    useState<TranscriptionResponse | null>(null)
  const [recordingDuration, setRecordingDuration] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const transcribeMutation = useMutation({
    mutationFn: aiApi.transcribe,
    onSuccess: (result) => {
      setTranscription(result)
      setStatus("completed")
      options.onTranscriptionComplete?.(result)
    },
    onError: () => {
      setStatus("error")
      toast.error("Erreur lors de la transcription")
    },
  })

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop()
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        })
        setStatus("processing")
        transcribeMutation.mutate({
          audioBlob,
          language: "fr",
          patientId: options.patientId,
        })
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setStatus("recording")
      setTranscription(null)
      setRecordingDuration(0)

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= MAX_RECORDING_DURATION) {
            stopRecording()
            return prev
          }
          return prev + 1
        })
      }, 1000)
    } catch {
      toast.error("Impossible d'accéder au microphone")
      setStatus("error")
    }
  }, [options.patientId, transcribeMutation.mutate, stopRecording])

  const stopRecordingAndSubmit = useCallback(() => {
    stopRecording()
  }, [stopRecording])

  const reset = useCallback(() => {
    setStatus("idle")
    setTranscription(null)
    setRecordingDuration(0)
  }, [])

  return {
    status,
    transcription,
    recordingDuration,
    isRecording: status === "recording",
    isProcessing: status === "processing",
    startRecording,
    stopRecording: stopRecordingAndSubmit,
    reset,
  }
}
