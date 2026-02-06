import { useQuery } from "@tanstack/react-query"
import { dashboardApi } from "../api/dashboard.api"

export const weekActivityKeys = {
  all: ["dashboard", "weekActivity"] as const,
}

export function useWeekActivity() {
  return useQuery({
    queryKey: weekActivityKeys.all,
    queryFn: () => dashboardApi.getWeekActivity(),
  })
}
