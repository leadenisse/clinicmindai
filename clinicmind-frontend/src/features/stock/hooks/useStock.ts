import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { stockApi } from "../api/stock.api"
import type {
  StockFilters,
  CreateStockItemRequest,
  RecordMovementRequest,
} from "../types/stock.types"

export const stockKeys = {
  all: ["stock"] as const,
  list: (filters?: StockFilters) => [...stockKeys.all, "list", filters ?? {}] as const,
  detail: (id: string) => [...stockKeys.all, "detail", id] as const,
  movements: (itemId: string) => [...stockKeys.all, "movements", itemId] as const,
  alerts: () => [...stockKeys.all, "alerts"] as const,
  alertsCount: () => [...stockKeys.all, "alertsCount"] as const,
}

export function useStockItems(filters?: StockFilters) {
  return useQuery({
    queryKey: stockKeys.list(filters),
    queryFn: () => stockApi.getItems(filters),
  })
}

export function useStockItem(id: string) {
  return useQuery({
    queryKey: stockKeys.detail(id),
    queryFn: () => stockApi.getItemById(id),
    enabled: !!id,
  })
}

export function useAlerts() {
  return useQuery({
    queryKey: stockKeys.alerts(),
    queryFn: () => stockApi.getAlerts(),
  })
}

export function useAlertsCount() {
  return useQuery({
    queryKey: stockKeys.alertsCount(),
    queryFn: () => stockApi.getAlertsCount(),
  })
}

export function useStockMovements(itemId: string) {
  return useQuery({
    queryKey: stockKeys.movements(itemId),
    queryFn: () => stockApi.getMovements(itemId),
    enabled: !!itemId,
  })
}

export function useCreateStockItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateStockItemRequest) => stockApi.createItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stockKeys.all })
      toast.success("Produit créé")
    },
    onError: () => {
      toast.error("Erreur lors de la création")
    },
  })
}

export function useUpdateStockItem(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (
      data: Partial<CreateStockItemRequest> & {
        minQuantity?: number
        maxQuantity?: number
      }
    ) => stockApi.updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stockKeys.all })
      queryClient.invalidateQueries({ queryKey: stockKeys.detail(id) })
      toast.success("Produit mis à jour")
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour")
    },
  })
}

export function useDeleteStockItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => stockApi.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stockKeys.all })
      toast.success("Produit supprimé")
    },
    onError: () => {
      toast.error("Erreur lors de la suppression")
    },
  })
}

export function useRecordMovement() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: RecordMovementRequest) => stockApi.recordMovement(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: stockKeys.all })
      queryClient.invalidateQueries({
        queryKey: stockKeys.movements(variables.itemId),
      })
      toast.success("Mouvement enregistré")
    },
    onError: () => {
      toast.error("Erreur lors de l'enregistrement")
    },
  })
}
