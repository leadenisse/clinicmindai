import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { settingsApi } from "../api/settings.api"
import type { ChangePasswordRequest } from "../types/settings.types"
import { profileKeys } from "./useProfile"

export function useChangePassword() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => settingsApi.changePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all })
      toast.success("Mot de passe modifié")
    },
    onError: (err: Error) => {
      toast.error(err.message || "Erreur lors du changement de mot de passe")
    },
  })
}

export function useEnableMfa() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => settingsApi.enableMfa(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all })
      toast.success("MFA activé")
    },
    onError: () => {
      toast.error("Erreur lors de l'activation MFA")
    },
  })
}

export function useDisableMfa() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => settingsApi.disableMfa(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all })
      toast.success("MFA désactivé")
    },
    onError: () => {
      toast.error("Erreur lors de la désactivation MFA")
    },
  })
}
