import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { aiApi } from "../api/ai.api"
import type {
  GenerationRequest,
  GenerationResponse,
  GenerationStatus,
} from "../types/ai.types"
import { toast } from "sonner"

interface UseAIGenerationOptions {
  onGenerationComplete?: (result: GenerationResponse) => void
}

export const useAIGeneration = (options: UseAIGenerationOptions = {}) => {
  const [status, setStatus] = useState<GenerationStatus>("idle")
  const [result, setResult] = useState<GenerationResponse | null>(null)
  const [editedContent, setEditedContent] = useState("")

  const generateMutation = useMutation({
    mutationFn: aiApi.generate,
    onMutate: () => {
      setStatus("generating")
    },
    onSuccess: (response) => {
      setResult(response)
      setEditedContent(response.content)
      setStatus("completed")
      options.onGenerationComplete?.(response)
    },
    onError: () => {
      setStatus("error")
      toast.error("Erreur lors de la génération")
    },
  })

  const generate = (request: GenerationRequest) => {
    generateMutation.mutate(request)
  }

  const updateContent = (newContent: string) => {
    setEditedContent(newContent)
  }

  const reset = () => {
    setStatus("idle")
    setResult(null)
    setEditedContent("")
  }

  return {
    status,
    result,
    editedContent,
    isGenerating: status === "generating",
    isCompleted: status === "completed",
    hasBeenEdited: result ? editedContent !== result.content : false,
    generate,
    updateContent,
    reset,
  }
}
