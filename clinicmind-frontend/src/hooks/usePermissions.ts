import { useAuthStore } from "@/stores/authStore"
import { ROUTES_BY_ROLE } from "@/lib/constants"

export function usePermissions() {
  const user = useAuthStore((s) => s.user)

  const can = (_action: string, _resource: string): boolean => {
    if (!user) return false
    // Stub: en Phase 1 on autorise tout pour le rôle connecté
    return true
  }

  const canAccessRoute = (path: string): boolean => {
    if (!user) return false
    const allowed = ROUTES_BY_ROLE[user.role]
    if (!allowed) return false
    return allowed.some((route) => path === route || path.startsWith(route + "/"))
  }

  return { can, canAccessRoute }
}
