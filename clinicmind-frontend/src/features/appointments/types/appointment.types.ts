export type AppointmentType =
  | "consultation"
  | "followup"
  | "emergency"
  | "surgery"
  | "prosthetics"
  | "cleaning"
  | "orthodontics"
  | "other"

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show"

export interface Appointment {
  id: string

  patientId: string
  patientFirstName: string
  patientLastName: string
  patientPhone?: string

  practitionerId: string
  practitionerName: string

  startTime: string
  endTime: string
  duration: number

  type: AppointmentType
  status: AppointmentStatus
  reason: string
  notes?: string

  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface AppointmentFilters {
  startDate?: string
  endDate?: string
  practitionerId?: string
  patientId?: string
  status?: AppointmentStatus
  type?: AppointmentType
}

export interface CreateAppointmentRequest {
  patientId: string
  practitionerId: string
  startTime: string
  duration: number
  type: AppointmentType
  reason: string
  notes?: string
}

export interface UpdateAppointmentRequest {
  startTime?: string
  endTime?: string
  duration?: number
  type?: AppointmentType
  status?: AppointmentStatus
  reason?: string
  notes?: string
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  backgroundColor: string
  borderColor: string
  textColor: string
  extendedProps: {
    appointment: Appointment
  }
}
