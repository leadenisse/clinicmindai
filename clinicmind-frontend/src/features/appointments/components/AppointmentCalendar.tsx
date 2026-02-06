import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import frLocale from "@fullcalendar/core/locales/fr"
import type { Appointment } from "../types/appointment.types"
import type { CalendarEvent } from "../types/appointment.types"
import { BUSINESS_HOURS } from "../constants/appointmentConfig"

interface AppointmentCalendarProps {
  events: CalendarEvent[]
  initialView?: string
  onDateSelect: (start: Date, end: Date) => void
  onEventClick: (appointment: Appointment) => void
  onEventDrop: (id: string, start: Date, end: Date) => void
  isLoading?: boolean
  onDatesSet?: (start: Date, end: Date) => void
}

export function AppointmentCalendar({
  events,
  initialView = "timeGridWeek",
  onDateSelect,
  onEventClick,
  onEventDrop,
  isLoading = false,
  onDatesSet,
}: AppointmentCalendarProps) {
  const eventInputs = events.map((e) => ({
    id: e.id,
    title: e.title,
    start: e.start,
    end: e.end,
    backgroundColor: e.backgroundColor,
    borderColor: e.borderColor,
    textColor: e.textColor,
    extendedProps: e.extendedProps,
  }))

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
          <span className="text-sm text-muted-foreground">Chargement...</span>
        </div>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={initialView}
        locale={frLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        slotMinTime={BUSINESS_HOURS.startTime}
        slotMaxTime={BUSINESS_HOURS.endTime}
        slotDuration="00:15:00"
        allDaySlot={false}
        weekends={false}
        selectable
        editable
        events={eventInputs}
        select={(info) => {
          onDateSelect(info.start, info.end)
        }}
        eventClick={(info) => {
          const apt = (info.event as unknown as { extendedProps: { appointment: Appointment } })
            .extendedProps?.appointment
          if (apt) onEventClick(apt)
        }}
        eventDrop={(info) => {
          if (info.event.id)
            onEventDrop(info.event.id, info.event.start!, info.event.end!)
        }}
        datesSet={(info) => {
          onDatesSet?.(info.start, info.end)
        }}
        height="auto"
        contentHeight={600}
      />
    </div>
  )
}
