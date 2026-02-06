import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"

interface AdminOnlyProps {
  children: React.ReactNode
}

/**
 * Redirige vers /settings/profile si l'utilisateur n'est pas ADMIN.
 * À utiliser pour les pages Paramètres réservées aux administrateurs.
 */
export function AdminOnly({ children }: AdminOnlyProps) {
  const user = useAuthStore((s) => s.user)
  if (user?.role !== "ADMIN") {
    return <Navigate to="/settings/profile" replace />
  }
  return <>{children}</>
}
