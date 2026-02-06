import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { prostheticsApi } from "../api/prosthetics.api"
import type { OrderFilters, OrderStatus } from "../types/prosthetics.types"

export const prostheticKeys = {
  all: ["prosthetics"] as const,
  lists: () => [...prostheticKeys.all, "list"] as const,
  list: (filters: OrderFilters) =>
    [...prostheticKeys.lists(), filters] as const,
  byPatient: (patientId: string) =>
    [...prostheticKeys.all, "patient", patientId] as const,
  details: () => [...prostheticKeys.all, "detail"] as const,
  detail: (id: string) => [...prostheticKeys.details(), id] as const,
  laboratories: () => [...prostheticKeys.all, "laboratories"] as const,
}

export const useProstheticOrders = (filters?: OrderFilters) => {
  return useQuery({
    queryKey: prostheticKeys.list(filters ?? {}),
    queryFn: () => prostheticsApi.getAll(filters),
  })
}

export const usePatientProstheticOrders = (patientId: string) => {
  return useQuery({
    queryKey: prostheticKeys.byPatient(patientId),
    queryFn: () => prostheticsApi.getByPatient(patientId),
    enabled: !!patientId,
  })
}

export const useProstheticOrder = (id: string) => {
  return useQuery({
    queryKey: prostheticKeys.detail(id),
    queryFn: () => prostheticsApi.getById(id),
    enabled: !!id,
  })
}

export const useLaboratories = () => {
  return useQuery({
    queryKey: prostheticKeys.laboratories(),
    queryFn: () => prostheticsApi.getLaboratories(),
  })
}

export const useCreateProstheticOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: prostheticsApi.create,
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: prostheticKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: prostheticKeys.byPatient(order.patientId),
      })
      toast.success("Commande créée")
    },
    onError: () => {
      toast.error("Erreur lors de la création")
    },
  })
}

export const useUpdateProstheticOrderStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      prostheticsApi.updateStatus(id, status),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: prostheticKeys.detail(order.id) })
      queryClient.invalidateQueries({ queryKey: prostheticKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: prostheticKeys.byPatient(order.patientId),
      })
      toast.success("Statut mis à jour")
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour")
    },
  })
}
