import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { settingsApi } from "../api/settings.api"
import type { UpdateProfileRequest } from "../types/settings.types"

export const profileKeys = {
  all: ["settings", "profile"] as const,
}

export function useProfile() {
  return useQuery({
    queryKey: profileKeys.all,
    queryFn: () => settingsApi.getProfile(),
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => settingsApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all })
      toast.success("Profil mis à jour")
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du profil")
    },
  })
}
