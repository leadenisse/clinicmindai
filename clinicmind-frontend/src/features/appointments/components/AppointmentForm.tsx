import { useEffect, useState } from "react"
import type { Appointment } from "../types/appointment.types"
import type {
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
} from "../types/appointment.types"
import { APPOINTMENT_TYPES, DURATION_OPTIONS } from "../constants/appointmentConfig"
import { PatientSearchSelect } from "./PatientSearchSelect"
import { TimeSlotPicker } from "./TimeSlotPicker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Patient } from "@/features/patients/types/patient.types"
import { format } from "date-fns"

interface AppointmentFormProps {
  appointment?: Appointment
  initialDate?: Date
  initialPatientId?: string
  initialPatient?: Patient
  onSubmit: (
    data: CreateAppointmentRequest | UpdateAppointmentRequest
  ) => void
  onCancel: () => void
  isLoading?: boolean
}

export function AppointmentForm({
  appointment,
  initialDate,
  initialPatientId,
  initialPatient,
  onSubmit,
  onCancel,
  isLoading = false,
}: AppointmentFormProps) {
  const isEdit = !!appointment

  const [patientId, setPatientId] = useState<string>(initialPatientId ?? appointment?.patientId ?? "")
  const [patientDisplay, setPatientDisplay] = useState("")
  const [date, setDate] = useState(
    initialDate
      ? format(initialDate, "yyyy-MM-dd")
      : appointment
        ? format(new Date(appointment.startTime), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd")
  )
  const [time, setTime] = useState(
    appointment
      ? format(new Date(appointment.startTime), "HH:mm")
      : "09:00"
  )
  const [duration, setDuration] = useState(
    appointment?.duration ?? 30
  )
  const [type, setType] = useState<Appointment["type"]>(
    appointment?.type ?? "consultation"
  )
  const [reason, setReason] = useState(appointment?.reason ?? "")
  const [notes, setNotes] = useState(appointment?.notes ?? "")
  const [status, setStatus] = useState<Appointment["status"]>(
    appointment?.status ?? "scheduled"
  )

  useEffect(() => {
    const defaultDuration = APPOINTMENT_TYPES[type].duration
    if (!appointment) setDuration(defaultDuration)
  }, [type, appointment])

  useEffect(() => {
    if (initialPatient) {
      setPatientId(initialPatient.id)
      setPatientDisplay(`${initialPatient.lastName} ${initialPatient.firstName}`)
    }
  }, [initialPatient])

  const handlePatientChange = (id: string, p: Patient) => {
    setPatientId(id)
    setPatientDisplay(`${p.lastName} ${p.firstName}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const startTime = new Date(`${date}T${time}:00`)
    if (isEdit && appointment) {
      onSubmit({
        startTime: startTime.toISOString(),
        duration,
        type,
        reason,
        notes: notes || undefined,
        status,
      } as UpdateAppointmentRequest)
    } else {
      if (!patientId) return
      onSubmit({
        patientId,
        practitionerId: "prat-1",
        startTime: startTime.toISOString(),
        duration,
        type,
        reason,
        notes: notes || undefined,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isEdit && (
        <div className="space-y-2">
          <Label>Patient *</Label>
          <PatientSearchSelect
            value={patientId}
            onChange={handlePatientChange}
            placeholder="Nom ou prénom du patient"
          />
          {patientDisplay && (
            <p className="text-sm text-muted-foreground">
              Sélectionné : {patientDisplay}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="apt-date">Date *</Label>
          <Input
            id="apt-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Heure *</Label>
          <TimeSlotPicker value={time} onValueChange={setTime} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Durée</Label>
          <Select
            value={String(duration)}
            onValueChange={(v) => setDuration(Number(v))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DURATION_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={String(opt.value)}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Type *</Label>
          <Select
            value={type}
            onValueChange={(v) => setType(v as Appointment["type"])}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(APPOINTMENT_TYPES).map((config) => (
                <SelectItem key={config.value} value={config.value}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="apt-reason">Motif *</Label>
        <Input
          id="apt-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Motif de la consultation"
          required
        />
      </div>

      {isEdit && (
        <div className="space-y-2">
          <Label>Statut</Label>
          <Select
            value={status}
            onValueChange={(v) => setStatus(v as Appointment["status"])}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Planifié</SelectItem>
              <SelectItem value="confirmed">Confirmé</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
              <SelectItem value="cancelled">Annulé</SelectItem>
              <SelectItem value="no_show">Absent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="apt-notes">Notes (optionnel)</Label>
        <Textarea
          id="apt-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes internes"
          rows={2}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Enregistrement..." : isEdit ? "Enregistrer" : "Créer le RDV"}
        </Button>
      </div>
    </form>
  )
}
