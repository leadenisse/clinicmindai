import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { settingsApi } from "../api/settings.api"
import type { CabinetSettings } from "../types/settings.types"

export const cabinetKeys = {
  all: ["settings", "cabinet"] as const,
}

export function useCabinet() {
  return useQuery({
    queryKey: cabinetKeys.all,
    queryFn: () => settingsApi.getCabinet(),
  })
}

export function useUpdateCabinet() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<CabinetSettings>) => settingsApi.updateCabinet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabinetKeys.all })
      toast.success("Paramètres du cabinet enregistrés")
    },
    onError: () => {
      toast.error("Erreur lors de l'enregistrement")
    },
  })
}

export function useUploadCabinetLogo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => settingsApi.uploadCabinetLogo(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabinetKeys.all })
      toast.success("Logo mis à jour")
    },
    onError: () => {
      toast.error("Erreur lors de l'upload du logo")
    },
  })
}
