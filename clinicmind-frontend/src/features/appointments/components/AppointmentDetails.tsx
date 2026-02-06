import type { Appointment } from "../types/appointment.types"
import { AppointmentTypeBadge } from "./AppointmentTypeBadge"
import { AppointmentStatusBadge } from "./AppointmentStatusBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatAppointmentTime, formatAppointmentDate } from "../utils/calendarUtils"
import { Phone, User, Calendar } from "lucide-react"

interface AppointmentDetailsProps {
  appointment: Appointment
  onEdit?: (apt: Appointment) => void
  onCancel?: (apt: Appointment) => void
  onClose?: () => void
  className?: string
}

export function AppointmentDetails({
  appointment,
  onEdit,
  onCancel,
  onClose,
  className,
}: AppointmentDetailsProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <AppointmentTypeBadge type={appointment.type} />
        <AppointmentStatusBadge status={appointment.status} />
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Fermer
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-lg font-semibold">
            {appointment.patientLastName} {appointment.patientFirstName}
          </p>
          {appointment.patientPhone && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              {appointment.patientPhone}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formatAppointmentDate(appointment.startTime)}
        </div>
        <p className="text-sm font-medium">
          {formatAppointmentTime(appointment.startTime, appointment.endTime)}
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">Motif : </span>
          {appointment.reason}
        </p>
        {appointment.notes && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Notes : </span>
            {appointment.notes}
          </p>
        )}
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          {appointment.practitionerName}
        </p>
        <div className="flex gap-2 pt-2">
          {onEdit && appointment.status !== "cancelled" && (
            <Button variant="outline" size="sm" onClick={() => onEdit(appointment)}>
              Modifier
            </Button>
          )}
          {onCancel && appointment.status !== "cancelled" && (
            <Button
              variant="outline"
              size="sm"
              className="text-error"
              onClick={() => onCancel(appointment)}
            >
              Annuler le RDV
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
