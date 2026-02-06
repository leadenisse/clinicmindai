import { useQuery } from "@tanstack/react-query"
import { accountingApi } from "../api/accounting.api"
import type { AccountingFilters } from "../types/accounting.types"

export const accountingKeys = {
  all: ["accounting"] as const,
  summary: (f: AccountingFilters) => [...accountingKeys.all, "summary", f] as const,
  revenue: (f: AccountingFilters) => [...accountingKeys.all, "revenue", f] as const,
  revenueByMonth: (year: number) => [...accountingKeys.all, "revenueByMonth", year] as const,
  revenueByCategory: (f: AccountingFilters) => [...accountingKeys.all, "revenueByCategory", f] as const,
  expenses: (f: AccountingFilters) => [...accountingKeys.all, "expenses", f] as const,
  expensesByCategory: (f: AccountingFilters) => [...accountingKeys.all, "expensesByCategory", f] as const,
}

export function useAccountingSummary(filters: AccountingFilters) {
  return useQuery({
    queryKey: accountingKeys.summary(filters),
    queryFn: () => accountingApi.getSummary(filters),
  })
}
