import { NavLink } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import { SETTINGS_MENU } from "../constants/settingsConfig"
import { cn } from "@/lib/utils"
import {
  User,
  Lock,
  Building2,
  Users,
  FileText,
  Scale,
  CreditCard,
} from "lucide-react"
import type { UserRole } from "@/features/auth/types/auth.types"

const ICON_MAP = {
  User,
  Lock,
  Building: Building2,
  Users,
  FileText,
  Scale,
  CreditCard,
} as const

export function SettingsSidebar() {
  const user = useAuthStore((s) => s.user)
  const role = user?.role as UserRole | undefined

  const visibleItems = SETTINGS_MENU.filter(
    (item) => role && item.roles.includes(role)
  )

  return (
    <nav className="flex w-56 flex-col gap-1 border-r border-border pr-4">
      <h2 className="mb-2 text-sm font-medium text-muted-foreground">
        Paramètres
      </h2>
      {visibleItems.map((item) => {
        const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? User
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        )
      })}
    </nav>
  )
}
