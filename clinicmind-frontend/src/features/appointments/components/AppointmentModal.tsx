import type { Appointment } from "../types/appointment.types"
import type { Patient } from "@/features/patients/types/patient.types"
import { AppointmentForm } from "./AppointmentForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type {
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
} from "../types/appointment.types"

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  appointment?: Appointment
  initialDate?: Date
  initialPatientId?: string
  initialPatient?: Patient
  onSubmitCreate: (data: CreateAppointmentRequest) => void
  onSubmitUpdate: (id: string, data: UpdateAppointmentRequest) => void
  isSubmitting?: boolean
}

export function AppointmentModal({
  isOpen,
  onClose,
  appointment,
  initialDate,
  initialPatientId,
  initialPatient,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting = false,
}: AppointmentModalProps) {
  const isEdit = !!appointment

  const handleSubmit = (
    data: CreateAppointmentRequest | UpdateAppointmentRequest
  ) => {
    if (isEdit && appointment) {
      onSubmitUpdate(appointment.id, data as UpdateAppointmentRequest)
    } else {
      onSubmitCreate(data as CreateAppointmentRequest)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Modifier le rendez-vous" : "Nouveau rendez-vous"}
          </DialogTitle>
        </DialogHeader>
        <AppointmentForm
          appointment={appointment}
          initialDate={initialDate}
          initialPatientId={initialPatientId}
          initialPatient={initialPatient}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  )
}
