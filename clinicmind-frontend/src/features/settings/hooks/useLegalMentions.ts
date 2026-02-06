import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { settingsApi } from "../api/settings.api"
import type { LegalMentions } from "../types/settings.types"

export const legalMentionsKeys = {
  all: ["settings", "legal"] as const,
}

export function useLegalMentions() {
  return useQuery({
    queryKey: legalMentionsKeys.all,
    queryFn: () => settingsApi.getLegalMentions(),
  })
}

export function useUpdateLegalMentions() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: LegalMentions) => settingsApi.updateLegalMentions(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: legalMentionsKeys.all })
      toast.success("Mentions légales enregistrées")
    },
    onError: () => {
      toast.error("Erreur lors de l'enregistrement")
    },
  })
}
