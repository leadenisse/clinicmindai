import type { OnboardingAppointmentType } from "../types/onboarding.types"

export const DEFAULT_ONBOARDING_APPOINTMENT_TYPES: OnboardingAppointmentType[] = [
  { id: "consultation", value: "consultation", label: "Consultation", duration: 30, color: "#3B82F6", isActive: true },
  { id: "cleaning", value: "cleaning", label: "Détartrage", duration: 30, color: "#10B981", isActive: true },
  { id: "soins", value: "soins", label: "Soins", duration: 45, color: "#F59E0B", isActive: true },
  { id: "surgery", value: "surgery", label: "Chirurgie", duration: 60, color: "#EF4444", isActive: true },
  { id: "prosthetics", value: "prosthetics", label: "Prothèse", duration: 60, color: "#8B5CF6", isActive: true },
  { id: "emergency", value: "emergency", label: "Urgence", duration: 30, color: "#6B7280", isActive: true },
  { id: "orthodontics", value: "orthodontics", label: "Orthodontie", duration: 45, color: "#06B6D4", isActive: false },
  { id: "implant", value: "implant", label: "Implant", duration: 90, color: "#92400E", isActive: false },
]

export const DURATION_OPTIONS = [15, 30, 45, 60, 90, 120]
