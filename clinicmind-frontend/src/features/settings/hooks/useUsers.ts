import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { settingsApi } from "../api/settings.api"
import type { CreateUserRequest } from "../types/settings.types"

export const usersKeys = {
  all: ["settings", "users"] as const,
  list: () => [...usersKeys.all, "list"] as const,
  detail: (id: string) => [...usersKeys.all, "detail", id] as const,
}

export function useUsers() {
  return useQuery({
    queryKey: usersKeys.list(),
    queryFn: () => settingsApi.getUsers(),
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => settingsApi.getUserById(id),
    enabled: !!id,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateUserRequest) => settingsApi.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.list() })
      toast.success("Utilisateur créé")
    },
    onError: () => {
      toast.error("Erreur lors de la création")
    },
  })
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<CreateUserRequest> & { isActive?: boolean }) =>
      settingsApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.list() })
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(id) })
      toast.success("Utilisateur mis à jour")
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour")
    },
  })
}

export function useResetUserPassword() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, newPassword }: { id: string; newPassword: string }) =>
      settingsApi.resetUserPassword(id, newPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.list() })
      toast.success("Mot de passe réinitialisé")
    },
    onError: () => {
      toast.error("Erreur lors de la réinitialisation")
    },
  })
}
