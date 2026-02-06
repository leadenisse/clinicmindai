import { Badge } from "@/components/ui/badge"
import { AlertTriangle, UserPlus, Clock } from "lucide-react"
import type { AppointmentStatus } from "@/features/appointments/types/appointment.types"
import type { TimelineAppointmentExtra } from "../types/dashboard.types"
import { cn } from "@/lib/utils"

interface AppointmentBadgesProps {
  status: AppointmentStatus
  extra?: TimelineAppointmentExtra | null
  className?: string
}

export function AppointmentBadges({ status, extra, className }: AppointmentBadgesProps) {
  const isPending = status === "scheduled"
  const isInProgress = status === "in_progress"
  const hasAllergy = !!extra?.allergy
  const isNew = !!extra?.isNewPatient

  if (!isPending && !isInProgress && !hasAllergy && !isNew) return null

  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {hasAllergy && (
        <Badge variant="secondary" className="gap-1 text-amber-700 bg-amber-500/15 border-amber-500/30 text-xs">
          <AlertTriangle className="h-3 w-3" />
          Allergie {extra.allergy}
        </Badge>
      )}
      {isNew && (
        <Badge variant="secondary" className="gap-1 text-blue-700 bg-blue-500/15 border-blue-500/30 text-xs">
          <UserPlus className="h-3 w-3" />
          Nouveau
        </Badge>
      )}
      {isPending && (
        <Badge variant="secondary" className="gap-1 text-muted-foreground text-xs">
          <Clock className="h-3 w-3" />
          En attente
        </Badge>
      )}
      {isInProgress && (
        <Badge className="gap-1 text-xs bg-primary">
          En cours
        </Badge>
      )}
    </div>
  )
}
