import { useState, useMemo } from "react"
import type { Patient } from "@/features/patients/types/patient.types"
import { usePatientAppointments, useCreateAppointment, useUpdateAppointment } from "../hooks/useAppointments"
import { AppointmentModal } from "../components/AppointmentModal"
import { AppointmentDetails } from "../components/AppointmentDetails"
import { AppointmentTypeBadge } from "../components/AppointmentTypeBadge"
import { AppointmentStatusBadge } from "../components/AppointmentStatusBadge"
import { formatAppointmentTime, formatAppointmentDate } from "../utils/calendarUtils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarPlus } from "lucide-react"
import type { Appointment } from "../types/appointment.types"
import type { CreateAppointmentRequest, UpdateAppointmentRequest } from "../types/appointment.types"

interface PatientAppointmentsTabProps {
  patientId: string
  patient?: Patient
}

export function PatientAppointmentsTab({ patientId, patient }: PatientAppointmentsTabProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | undefined>()
  const [detailsAppointment, setDetailsAppointment] = useState<Appointment | null>(null)

  const { data: appointments, isLoading } = usePatientAppointments(patientId)
  const createMutation = useCreateAppointment()
  const updateMutation = useUpdateAppointment()

  const now = useMemo(() => new Date(), [])
  const { upcoming, history } = useMemo(() => {
    if (!appointments) return { upcoming: [], history: [] }
    const up: Appointment[] = []
    const hist: Appointment[] = []
    for (const apt of appointments) {
      const start = new Date(apt.startTime)
      const isPastOrCancelled =
        start < now ||
        apt.status === "cancelled" ||
        apt.status === "completed" ||
        apt.status === "no_show"
      if (isPastOrCancelled) hist.push(apt)
      else up.push(apt)
    }
    return { upcoming: up, history: hist }
  }, [appointments, now])

  const handleNewAppointment = () => {
    setEditingAppointment(undefined)
    setModalOpen(true)
  }

  const handleEdit = (apt: Appointment) => {
    setDetailsAppointment(null)
    setEditingAppointment(apt)
    setModalOpen(true)
  }

  const handleSubmitCreate = (data: CreateAppointmentRequest) => {
    createMutation.mutate(data)
    setModalOpen(false)
  }

  const handleSubmitUpdate = (id: string, data: UpdateAppointmentRequest) => {
    updateMutation.mutate({ id, data })
    setModalOpen(false)
    setEditingAppointment(undefined)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleNewAppointment} className="gap-2">
          <CalendarPlus className="h-4 w-4" />
          Nouveau RDV
        </Button>
      </div>

      <section>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">À venir</h3>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun rendez-vous à venir.</p>
        ) : (
          <ul className="space-y-2">
            {upcoming.map((apt) => (
              <li key={apt.id}>
                <Card>
                  <CardContent className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">
                        {formatAppointmentDate(apt.startTime)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatAppointmentTime(apt.startTime, apt.endTime)}
                      </span>
                      <AppointmentTypeBadge type={apt.type} size="sm" />
                      <AppointmentStatusBadge status={apt.status} size="sm" />
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDetailsAppointment(apt)}
                      >
                        Détails
                      </Button>
                      {apt.status !== "cancelled" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(apt)}
                        >
                          Modifier
                        </Button>
                      )}
                    </div>
                  </CardContent>
                  <CardContent className="border-t py-2 pt-0">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Motif : </span>
                      {apt.reason}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Historique</h3>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun rendez-vous dans l’historique.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((apt) => (
              <li key={apt.id}>
                <Card>
                  <CardContent className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">
                        {formatAppointmentDate(apt.startTime)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatAppointmentTime(apt.startTime, apt.endTime)}
                      </span>
                      <AppointmentTypeBadge type={apt.type} size="sm" />
                      <AppointmentStatusBadge status={apt.status} size="sm" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDetailsAppointment(apt)}
                    >
                      Détails
                    </Button>
                  </CardContent>
                  <CardContent className="border-t py-2 pt-0">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Motif : </span>
                      {apt.reason}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingAppointment(undefined)
        }}
        appointment={editingAppointment}
        initialPatientId={patientId}
        initialPatient={patient}
        onSubmitCreate={handleSubmitCreate}
        onSubmitUpdate={handleSubmitUpdate}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <Dialog
        open={!!detailsAppointment}
        onOpenChange={(open) => !open && setDetailsAppointment(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Détail du rendez-vous</DialogTitle>
          </DialogHeader>
          {detailsAppointment && (
            <AppointmentDetails
              appointment={detailsAppointment}
              onEdit={handleEdit}
              onClose={() => setDetailsAppointment(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
