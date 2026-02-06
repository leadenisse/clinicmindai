import { Link, useLocation } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import { useUIStore } from "@/stores/uiStore"
import { usePermissions } from "@/hooks/usePermissions"
import { ROLES } from "@/lib/constants"
import { LOGO_PATHS } from "@/config/app.config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Receipt,
  ClipboardList,
  Package,
  Archive,
  Calculator,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const NAV_ITEMS = [
  { path: "/", label: "Accueil", icon: LayoutDashboard },
  { path: "/patients", label: "Dossier patient", icon: Users },
  { path: "/appointments", label: "Rendez-vous", icon: Calendar },
  { path: "/prescriptions", label: "Ordonnances", icon: FileText },
  { path: "/invoices", label: "Facturation", icon: Receipt },
  { path: "/quotes", label: "Devis", icon: ClipboardList },
  { path: "/prosthetics", label: "Prothésiste", icon: Package },
  { path: "/stock", label: "Stock", icon: Archive },
  { path: "/accounting", label: "Comptabilité", icon: Calculator },
  { path: "/settings", label: "Paramètres", icon: Settings },
  { path: "/help", label: "Aide & Support", icon: HelpCircle },
] as const

export function Sidebar() {
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const { canAccessRoute } = usePermissions()

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (item.path === "/help") return true
    return canAccessRoute(item.path)
  })

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card transition-[width]",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center border-b border-border px-3">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-3",
            sidebarCollapsed && "justify-center w-full"
          )}
        >
          <img
            src={LOGO_PATHS.icon}
            alt="ClinicMind AI"
            className="h-10 w-10 shrink-0 object-contain"
          />
          {!sidebarCollapsed && (
            <div className="flex min-w-0 flex-col">
              <span className="text-lg font-bold text-navy-900">
                Clinic<span className="text-primary-500">Mind</span>
              </span>
              <span className="text-xs font-medium text-primary-500">AI</span>
            </div>
          )}
        </Link>
      </div>

      {!sidebarCollapsed && (
        <div className="border-b border-border p-3">
          <Input
            placeholder="Recherche patient..."
            className="h-9 bg-muted/50"
            disabled
          />
        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {visibleItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex items-center gap-3 rounded-md border-l-4 border-transparent px-3 py-2 text-sm font-medium transition-colors",
              location.pathname === path
                ? "border-primary-500 bg-primary-50 text-primary-700"
                : "text-muted-foreground hover:bg-primary-50 hover:text-foreground",
              sidebarCollapsed && "justify-center px-2"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border p-2">
        {user && (
          <div
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2",
              sidebarCollapsed && "justify-center"
            )}
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {ROLES[user.role]}
                </p>
              </div>
            )}
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="mt-1 w-full"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Ouvrir la barre latérale" : "Réduire la barre latérale"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  )
}
