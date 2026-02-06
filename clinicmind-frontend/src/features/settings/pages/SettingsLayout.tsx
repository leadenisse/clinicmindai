import { Outlet, Navigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import { SettingsSidebar } from "../components/SettingsSidebar"
import { cn } from "@/lib/utils"

export function SettingsLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className={cn("flex min-h-0 flex-1 gap-6 p-6")}>
      <SettingsSidebar />
      <main className="min-w-0 flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
