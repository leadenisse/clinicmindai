import type { Appointment } from "../types/appointment.types"
import { useUpcomingAppointments } from "../hooks/useAppointments"
import { AppointmentTypeBadge } from "./AppointmentTypeBadge"
import { formatAppointmentTime, formatAppointmentDate } from "../utils/calendarUtils"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface UpcomingAppointmentsProps {
  limit?: number
  onAppointmentClick?: (apt: Appointment) => void
}

export function UpcomingAppointments({
  limit = 5,
  onAppointmentClick,
}: UpcomingAppointmentsProps) {
  const { data: appointments, isLoading } = useUpcomingAppointments(limit)

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!appointments?.length) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Prochains rendez-vous
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Aucun rendez-vous à venir.
          </p>
        </CardContent>
      </Card>
    )
  }

  const byDay = appointments.reduce<Record<string, Appointment[]>>((acc, apt) => {
    const day = formatAppointmentDate(apt.startTime)
    if (!acc[day]) acc[day] = []
    acc[day].push(apt)
    return acc
  }, {})

  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Prochains rendez-vous
        </h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(byDay).map(([dayLabel, dayAppointments]) => (
          <div key={dayLabel} className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">{dayLabel}</p>
            <ul className="space-y-1">
              {dayAppointments.map((apt) => (
                <li key={apt.id}>
                  <button
                    type="button"
                    onClick={() => onAppointmentClick?.(apt)}
                    className="flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-left text-sm hover:bg-muted/50 hover:border-border"
                  >
                    <span className="shrink-0 font-mono text-muted-foreground">
                      {formatAppointmentTime(apt.startTime, apt.endTime).split(" - ")[0]}
                    </span>
                    <span className="min-w-0 truncate">
                      {apt.patientLastName} {apt.patientFirstName}
                    </span>
                    <AppointmentTypeBadge type={apt.type} size="sm" showLabel={false} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
