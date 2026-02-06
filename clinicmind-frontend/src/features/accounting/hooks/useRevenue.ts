import { useQuery } from "@tanstack/react-query"
import { accountingApi } from "../api/accounting.api"
import type { AccountingFilters } from "../types/accounting.types"
import { accountingKeys } from "./useAccountingSummary"

export function useRevenue(filters: AccountingFilters) {
  return useQuery({
    queryKey: accountingKeys.revenue(filters),
    queryFn: () => accountingApi.getRevenue(filters),
  })
}

export function useRevenueByMonth(year: number) {
  return useQuery({
    queryKey: accountingKeys.revenueByMonth(year),
    queryFn: () => accountingApi.getRevenueByMonth(year),
  })
}

export function useRevenueByCategory(filters: AccountingFilters) {
  return useQuery({
    queryKey: accountingKeys.revenueByCategory(filters),
    queryFn: () => accountingApi.getRevenueByCategory(filters),
  })
}
