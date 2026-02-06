import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mic, Square } from "lucide-react"
import { useVoiceDictation } from "../../hooks/useVoiceDictation"
import { AudioVisualizer } from "./AudioVisualizer"
import { TranscriptionPreview } from "./TranscriptionPreview"
import { AILoadingState } from "../common/AILoadingState"
import { formatRecordingDuration } from "../../utils/aiHelpers"
import { MAX_RECORDING_DURATION } from "../../constants/aiConfig"

interface VoiceDictationModalProps {
  isOpen: boolean
  onClose: () => void
  onInsert: (text: string) => void
  patientId?: string
}

export function VoiceDictationModal({
  isOpen,
  onClose,
  onInsert,
  patientId,
}: VoiceDictationModalProps) {
  const {
    status,
    transcription,
    recordingDuration,
    isRecording,
    isProcessing,
    startRecording,
    stopRecording,
    reset,
  } = useVoiceDictation({
    patientId,
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleInsert = () => {
    if (transcription?.text) {
      onInsert(transcription.text)
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Dictée vocale</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          {status === "idle" && (
            <>
              <p className="text-center text-sm text-muted-foreground">
                Cliquez pour commencer l'enregistrement
              </p>
              <Button
                size="lg"
                variant="outline"
                className="h-24 w-24 rounded-full"
                onClick={startRecording}
                aria-label="Démarrer l'enregistrement"
              >
                <Mic className="h-12 w-12 text-muted-foreground" />
              </Button>
              <p className="text-xs text-muted-foreground">
                Durée max : {formatRecordingDuration(MAX_RECORDING_DURATION)}
              </p>
            </>
          )}

          {isRecording && (
            <>
              <Button
                size="lg"
                variant="destructive"
                className="h-24 w-24 rounded-full animate-pulse"
                onClick={stopRecording}
                aria-label="Arrêter l'enregistrement"
              >
                <Square className="h-10 w-10" />
              </Button>
              <p className="font-mono text-lg">
                {formatRecordingDuration(recordingDuration)} /{" "}
                {formatRecordingDuration(MAX_RECORDING_DURATION)}
              </p>
              <AudioVisualizer isActive className="w-full max-w-xs" />
            </>
          )}

          {isProcessing && (
            <AILoadingState message="Transcription en cours..." />
          )}

          {status === "completed" && transcription && (
            <>
              <div className="w-full">
                <p className="mb-2 text-sm font-medium">Transcription</p>
                <TranscriptionPreview transcription={transcription} />
              </div>
              <div className="flex w-full justify-end gap-2">
                <Button variant="outline" onClick={handleClose}>
                  Annuler
                </Button>
                <Button onClick={handleInsert}>Insérer</Button>
              </div>
            </>
          )}

          {status === "error" && (
            <p className="text-sm text-destructive">
              Erreur lors de l'enregistrement ou de la transcription.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
