import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import { LOGO_PATHS } from "@/config/app.config"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function Header() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div className="lg:hidden">
        <img
          src={LOGO_PATHS.icon}
          alt="ClinicMind AI"
          className="h-8 w-8 object-contain"
        />
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
        Déconnexion
      </Button>
    </header>
  )
}
