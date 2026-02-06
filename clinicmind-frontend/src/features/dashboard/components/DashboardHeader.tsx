import { useAuthStore } from "@/stores/authStore"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface DashboardHeaderProps {
  rdvCount: number
  pendingConfirmationCount?: number
}

export function DashboardHeader({ rdvCount, pendingConfirmationCount = 0 }: DashboardHeaderProps) {
  const user = useAuthStore((s) => s.user)
  const displayName = user ? `Dr ${user.lastName}` : "Praticien"
  const shortDate = format(new Date(), "EEE d MMMM yyyy", { locale: fr })
  const capitalizedShortDate = shortDate.charAt(0).toUpperCase() + shortDate.slice(1)

  return (
    <header className="space-y-1">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Bonjour {displayName} 👋
        </h1>
        <p className="text-muted-foreground text-sm shrink-0">
          {capitalizedShortDate}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Vous avez{" "}
        <span className="font-medium text-foreground">{rdvCount}</span>{" "}
        rendez-vous aujourd&apos;hui
        {pendingConfirmationCount > 0 && (
          <>
            {" "}
            • <span className="font-medium text-foreground">{pendingConfirmationCount}</span> en
            attente de confirmation
          </>
        )}
      </p>
    </header>
  )
}
