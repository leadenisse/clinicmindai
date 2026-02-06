import { Card, CardContent } from "@/components/ui/card"
import { APPOINTMENT_TYPES } from "@/features/appointments/constants/appointmentConfig"
import { AppointmentBadges } from "./AppointmentBadges"
import type { Appointment } from "@/features/appointments/types/appointment.types"
import type { AppointmentType } from "@/features/appointments/types/appointment.types"
import type { TimelineAppointmentExtra } from "../types/dashboard.types"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineAppointmentProps {
  appointment: Appointment
  extra?: TimelineAppointmentExtra | null
  onClick?: (id: string) => void
  className?: string
  style?: React.CSSProperties
}

export function TimelineAppointment({
  appointment,
  extra,
  onClick,
  className,
  style,
}: TimelineAppointmentProps) {
  const typeConfig = APPOINTMENT_TYPES[appointment.type as AppointmentType]
  const patientLabel = `M${appointment.patientLastName?.charAt(0) === "e" ? "me" : "."} ${appointment.patientLastName} ${appointment.patientFirstName}`
  const timeRange = `${format(new Date(appointment.startTime), "HH:mm", { locale: fr })} - ${format(new Date(appointment.endTime), "HH:mm", { locale: fr })}`

  return (
    <Card
      className={cn(
        "cursor-pointer transition-shadow hover:shadow-md border-l-4 overflow-hidden",
        className
      )}
      style={{
        ...style,
        borderLeftColor: typeConfig?.borderColor ?? "#6B7280",
      }}
      onClick={() => onClick?.(appointment.id)}
    >
      <CardContent className="p-3 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: typeConfig?.color ?? "#6B7280" }}
            />
            <span className="font-medium text-sm truncate">{patientLabel}</span>
          </div>
          <AppointmentBadges status={appointment.status} extra={extra} />
        </div>
        <p className="text-xs text-muted-foreground">
          {appointment.reason} • {appointment.duration} min
        </p>
        {appointment.patientPhone && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {appointment.patientPhone}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
