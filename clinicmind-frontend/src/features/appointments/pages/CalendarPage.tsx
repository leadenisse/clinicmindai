import { useState, useCallback } from "react"
import { getWeekRange } from "../utils/calendarUtils"
import { useAppointments, useCreateAppointment, useUpdateAppointment, useMoveAppointment } from "../hooks/useAppointments"
import { useCalendarEvents } from "../hooks/useCalendarEvents"
import { AppointmentCalendar } from "../components/AppointmentCalendar"
import { AppointmentModal } from "../components/AppointmentModal"
import { AppointmentDetails } from "../components/AppointmentDetails"
import { CalendarToolbar } from "../components/CalendarToolbar"
import { UpcomingAppointments } from "../components/UpcomingAppointments"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Appointment } from "../types/appointment.types"
import type { CreateAppointmentRequest, UpdateAppointmentRequest } from "../types/appointment.types"

const defaultRange = getWeekRange(new Date())

export function CalendarPage() {
  const [dateRange, setDateRange] = useState({
    startDate: defaultRange.start.toISOString(),
    endDate: defaultRange.end.toISOString(),
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [modalAppointment, setModalAppointment] = useState<Appointment | undefined>()
  const [modalInitialDate, setModalInitialDate] = useState<Date | undefined>()
  const [detailsAppointment, setDetailsAppointment] = useState<Appointment | null>(null)

  const { data: appointments, isLoading } = useAppointments(dateRange)
  const events = useCalendarEvents(appointments)
  const createMutation = useCreateAppointment()
  const updateMutation = useUpdateAppointment()
  const moveMutation = useMoveAppointment()

  const handleDatesSet = useCallback((start: Date, end: Date) => {
    setDateRange({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    })
  }, [])

  const handleNewAppointment = useCallback(() => {
    setModalAppointment(undefined)
    setModalInitialDate(undefined)
    setModalOpen(true)
  }, [])

  const handleDateSelect = useCallback((start: Date, _end: Date) => {
    setModalAppointment(undefined)
    setModalInitialDate(start)
    setModalOpen(true)
  }, [])

  const handleEventClick = useCallback((appointment: Appointment) => {
    setDetailsAppointment(appointment)
  }, [])

  const handleEventDrop = useCallback(
    (id: string, start: Date, end: Date) => {
      moveMutation.mutate({
        id,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      })
    },
    [moveMutation]
  )

  const handleEditFromDetails = useCallback((apt: Appointment) => {
    setDetailsAppointment(null)
    setModalAppointment(apt)
    setModalInitialDate(undefined)
    setModalOpen(true)
  }, [])

  const handleSubmitCreate = useCallback(
    (data: CreateAppointmentRequest) => {
      createMutation.mutate(data)
      setModalOpen(false)
    },
    [createMutation]
  )

  const handleSubmitUpdate = useCallback(
    (id: string, data: UpdateAppointmentRequest) => {
      updateMutation.mutate({ id, data })
      setModalOpen(false)
      setModalAppointment(undefined)
    },
    [updateMutation]
  )

  return (
    <div className="space-y-6 p-6">
      <CalendarToolbar onNewAppointment={handleNewAppointment} />

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <AppointmentCalendar
            events={events}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            onDatesSet={handleDatesSet}
            isLoading={isLoading}
          />
        </div>
        <div className="space-y-4">
          <UpcomingAppointments onAppointmentClick={handleEventClick} limit={8} />
        </div>
      </div>

      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setModalAppointment(undefined)
          setModalInitialDate(undefined)
        }}
        appointment={modalAppointment}
        initialDate={modalInitialDate}
        onSubmitCreate={handleSubmitCreate}
        onSubmitUpdate={handleSubmitUpdate}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <Sheet
        open={!!detailsAppointment}
        onOpenChange={(open) => !open && setDetailsAppointment(null)}
      >
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Détail du rendez-vous</SheetTitle>
          </SheetHeader>
          {detailsAppointment && (
            <div className="mt-6">
              <AppointmentDetails
                appointment={detailsAppointment}
                onEdit={handleEditFromDetails}
                onCancel={(apt) => {
                  updateMutation.mutate({
                    id: apt.id,
                    data: { status: "cancelled" },
                  })
                  setDetailsAppointment(null)
                }}
                onClose={() => setDetailsAppointment(null)}
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
