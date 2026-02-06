import { useMemo } from "react"
import type { Appointment, CalendarEvent } from "../types/appointment.types"
import { APPOINTMENT_TYPES } from "../constants/appointmentConfig"

export function useCalendarEvents(
  appointments: Appointment[] | undefined
): CalendarEvent[] {
  return useMemo(() => {
    if (!appointments) return []

    return appointments.map((apt) => {
      const typeConfig = APPOINTMENT_TYPES[apt.type]
      const isCancelled = apt.status === "cancelled"

      return {
        id: apt.id,
        title: `${apt.patientLastName} ${apt.patientFirstName.charAt(0)}. - ${typeConfig.label}`,
        start: new Date(apt.startTime),
        end: new Date(apt.endTime),
        backgroundColor: isCancelled ? "#E5E7EB" : typeConfig.bgColor,
        borderColor: isCancelled ? "#9CA3AF" : typeConfig.borderColor,
        textColor: isCancelled ? "#6B7280" : typeConfig.color,
        extendedProps: {
          appointment: apt,
        },
      }
    })
  }, [appointments])
}
