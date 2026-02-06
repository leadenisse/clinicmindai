import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { signupApi } from "../api/signup.api"
import type { InviteUserPayload, AcceptInvitePayload } from "../types/auth.types"

export const invitationKeys = {
  byToken: (token: string) => ["invitation", token] as const,
}

export function useInvitation(token: string) {
  return useQuery({
    queryKey: invitationKeys.byToken(token),
    queryFn: () => signupApi.getInvitation(token),
    enabled: !!token,
  })
}

export function useSendInvitation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: InviteUserPayload) => signupApi.sendInvitation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitation"] })
      toast.success("Invitation envoyée")
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi")
    },
  })
}

export function useAcceptInvite() {
  return useMutation({
    mutationFn: (data: AcceptInvitePayload) => signupApi.acceptInvite(data),
    onSuccess: () => {
      toast.success("Compte activé. Connectez-vous.")
    },
    onError: () => {
      toast.error("Erreur lors de l'activation")
    },
  })
}
