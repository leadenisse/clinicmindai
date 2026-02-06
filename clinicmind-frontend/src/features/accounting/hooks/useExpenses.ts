import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { accountingApi } from "../api/accounting.api"
import type { AccountingFilters, ExpenseData } from "../types/accounting.types"
import { accountingKeys } from "./useAccountingSummary"

export function useExpenses(filters: AccountingFilters) {
  return useQuery({
    queryKey: accountingKeys.expenses(filters),
    queryFn: () => accountingApi.getExpenses(filters),
  })
}

export function useExpensesByCategory(filters: AccountingFilters) {
  return useQuery({
    queryKey: accountingKeys.expensesByCategory(filters),
    queryFn: () => accountingApi.getExpensesByCategory(filters),
  })
}

export function useCreateExpense() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<ExpenseData>) => accountingApi.createExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountingKeys.all })
      toast.success("Dépense enregistrée")
    },
    onError: () => toast.error("Erreur lors de l'enregistrement"),
  })
}

export function useUpdateExpense() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ExpenseData> }) =>
      accountingApi.updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountingKeys.all })
      toast.success("Dépense mise à jour")
    },
    onError: () => toast.error("Erreur lors de la mise à jour"),
  })
}

export function useDeleteExpense() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => accountingApi.deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountingKeys.all })
      toast.success("Dépense supprimée")
    },
    onError: () => toast.error("Erreur lors de la suppression"),
  })
}
