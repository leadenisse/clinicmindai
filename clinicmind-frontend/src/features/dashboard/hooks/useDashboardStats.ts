import { useQuery } from "@tanstack/react-query"
import { dashboardApi } from "../api/dashboard.api"
import { useTodayAppointments } from "@/features/appointments/hooks/useAppointments"
import { useAlertsCount } from "@/features/stock/hooks/useStock"

export const dashboardKeys = {
  stats: (rdvCount: number, alertsCount?: number) =>
    ["dashboard", "stats", rdvCount, alertsCount ?? 0] as const,
}

export function useDashboardStats() {
  const { data: todayAppointments } = useTodayAppointments()
  const { data: alertsCount } = useAlertsCount()
  const rdvToday = todayAppointments?.length ?? 0

  return useQuery({
    queryKey: dashboardKeys.stats(rdvToday, alertsCount),
    queryFn: () =>
      dashboardApi.getStats({
        rdvToday,
        alertsCount: alertsCount ?? 0,
      }),
    enabled: true,
  })
}
