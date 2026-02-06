import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { settingsApi } from "../api/settings.api"
import type { DentalActConfig } from "../types/settings.types"

export const actsConfigKeys = {
  all: ["settings", "acts"] as const,
}

export function useActsConfig() {
  return useQuery({
    queryKey: actsConfigKeys.all,
    queryFn: () => settingsApi.getActsConfig(),
  })
}

export function useCreateAct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<DentalActConfig, "id">) => settingsApi.createAct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: actsConfigKeys.all })
      toast.success("Acte ajouté")
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout")
    },
  })
}

export function useUpdateAct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<Omit<DentalActConfig, "id">>
    }) => settingsApi.updateAct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: actsConfigKeys.all })
      toast.success("Acte mis à jour")
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour")
    },
  })
}

export function useToggleActActive() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => settingsApi.toggleActActive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: actsConfigKeys.all })
    },
    onError: () => {
      toast.error("Erreur lors du changement de statut")
    },
  })
}
