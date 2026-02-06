import type { Appointment } from "@/features/appointments/types/appointment.types"

export interface DashboardStats {
  rdvToday: number
  rdvTodayDiff: number
  pendingCount: number
  caMonth: number
  caMonthEvolutionPercent: number
  alertsCount: number
}

export interface DashboardTask {
  id: string
  title: string
  status: "todo" | "done"
  source: string
  patientId?: string
  patientName?: string
  dueAt?: string
  createdAt: string
}

export interface DashboardNotification {
  id: string
  type: string
  title: string
  message?: string
  link?: string
  read: boolean
  createdAt: string
}

export interface WeekActivity {
  days: { date: string; rdvCount: number; ca: number }[]
  totalRdv: number
  totalCa: number
}

/** Données optionnelles pour afficher les badges sur un RDV (allergie, nouveau patient) */
export interface TimelineAppointmentExtra {
  allergy?: string
  isNewPatient?: boolean
}
