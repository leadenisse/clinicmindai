import type { AppointmentType, AppointmentStatus } from "../types/appointment.types"

export interface AppointmentTypeConfig {
  value: AppointmentType
  label: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
  duration: number
}

export const APPOINTMENT_TYPES: Record<AppointmentType, AppointmentTypeConfig> = {
  consultation: {
    value: "consultation",
    label: "Consultation",
    icon: "Stethoscope",
    color: "#3B82F6",
    bgColor: "#DBEAFE",
    borderColor: "#3B82F6",
    duration: 30,
  },
  followup: {
    value: "followup",
    label: "Contrôle",
    icon: "ClipboardCheck",
    color: "#10B981",
    bgColor: "#D1FAE5",
    borderColor: "#10B981",
    duration: 15,
  },
  emergency: {
    value: "emergency",
    label: "Urgence",
    icon: "AlertTriangle",
    color: "#EF4444",
    bgColor: "#FEE2E2",
    borderColor: "#EF4444",
    duration: 30,
  },
  surgery: {
    value: "surgery",
    label: "Chirurgie",
    icon: "Scissors",
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
    borderColor: "#8B5CF6",
    duration: 60,
  },
  prosthetics: {
    value: "prosthetics",
    label: "Prothèse",
    icon: "Component",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
    borderColor: "#F59E0B",
    duration: 45,
  },
  cleaning: {
    value: "cleaning",
    label: "Détartrage",
    icon: "Sparkles",
    color: "#06B6D4",
    bgColor: "#CFFAFE",
    borderColor: "#06B6D4",
    duration: 30,
  },
  orthodontics: {
    value: "orthodontics",
    label: "Orthodontie",
    icon: "Smile",
    color: "#EC4899",
    bgColor: "#FCE7F3",
    borderColor: "#EC4899",
    duration: 30,
  },
  other: {
    value: "other",
    label: "Autre",
    icon: "Calendar",
    color: "#6B7280",
    bgColor: "#F3F4F6",
    borderColor: "#6B7280",
    duration: 30,
  },
}

export interface AppointmentStatusConfig {
  value: AppointmentStatus
  label: string
  icon: string
  color: string
  bgColor: string
}

export const APPOINTMENT_STATUSES: Record<AppointmentStatus, AppointmentStatusConfig> = {
  scheduled: {
    value: "scheduled",
    label: "Planifié",
    icon: "Clock",
    color: "#6B7280",
    bgColor: "#F3F4F6",
  },
  confirmed: {
    value: "confirmed",
    label: "Confirmé",
    icon: "CheckCircle",
    color: "#3B82F6",
    bgColor: "#DBEAFE",
  },
  in_progress: {
    value: "in_progress",
    label: "En cours",
    icon: "Play",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
  },
  completed: {
    value: "completed",
    label: "Terminé",
    icon: "CheckCircle2",
    color: "#10B981",
    bgColor: "#D1FAE5",
  },
  cancelled: {
    value: "cancelled",
    label: "Annulé",
    icon: "XCircle",
    color: "#EF4444",
    bgColor: "#FEE2E2",
  },
  no_show: {
    value: "no_show",
    label: "Absent",
    icon: "UserX",
    color: "#F97316",
    bgColor: "#FFEDD5",
  },
}

export const APPOINTMENT_TYPE_LIST = Object.values(APPOINTMENT_TYPES)
export const APPOINTMENT_STATUS_LIST = Object.values(APPOINTMENT_STATUSES)

export const DURATION_OPTIONS = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "1h" },
  { value: 90, label: "1h30" },
  { value: 120, label: "2h" },
]

export const BUSINESS_HOURS = {
  startTime: "08:00",
  endTime: "19:00",
  daysOfWeek: [1, 2, 3, 4, 5],
}

export const DEFAULT_SLOT_DURATION = "00:15:00"
