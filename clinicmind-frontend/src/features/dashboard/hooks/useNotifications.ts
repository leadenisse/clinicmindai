import { useQuery } from "@tanstack/react-query"
import { dashboardApi } from "../api/dashboard.api"

export const notificationKeys = {
  all: ["dashboard", "notifications"] as const,
}

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: () => dashboardApi.getNotifications(),
  })
}
