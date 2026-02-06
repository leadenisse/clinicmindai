import { useState, useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { aiApi } from "../api/ai.api"
import type { ChatMessage } from "../types/ai.types"
import { toast } from "sonner"

interface UseAIChatOptions {
  patientId: string
}

export const useAIChat = ({ patientId }: UseAIChatOptions) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const chatMutation = useMutation({
    mutationFn: aiApi.chat,
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess: (response) => {
      const assistantMessage: ChatMessage = {
        id: response.id,
        role: "assistant",
        content: response.answer,
        timestamp: response.timestamp,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    },
    onError: () => {
      setIsLoading(false)
      toast.error("Erreur lors de la communication avec l'IA")
    },
  })

  const sendMessage = useCallback(
    (question: string) => {
      if (!question.trim()) return

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: question,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, userMessage])

      chatMutation.mutate({
        patientId,
        question,
        conversationHistory: messages,
      })
    },
    [patientId, messages, chatMutation]
  )

  const clearChat = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
  }
}
