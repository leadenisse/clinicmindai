import type { MedicalRisk, Patient } from "../types/patient.types"

export function getAge(birthDate: string): number {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

export function formatLastActivity(updatedAt: string): string {
  const date = new Date(updatedAt)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return "Hier"
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
}

/** Dérive les risques médicaux affichables à partir des données patient */
export function getMedicalRisks(patient: Patient): MedicalRisk[] {
  const risks: MedicalRisk[] = []

  const highAllergies = patient.allergies.filter((a) => a.severity === "high")
  if (highAllergies.length > 0) {
    risks.push({
      type: "allergic",
      level: "danger",
      description: `Allergie(s) sévère(s) : ${highAllergies.map((a) => a.name).join(", ")}`,
    })
  }

  const notes = (patient.medicalHistory.notes ?? "").toLowerCase()
  if (notes.includes("anticoagulant") || notes.includes("anticoagulants")) {
    risks.push({
      type: "hemorrhagic",
      level: "danger",
      description: "Sous anticoagulants",
    })
  }

  const medAllergies = patient.allergies.filter((a) => a.severity === "medium")
  if (medAllergies.length > 0 && risks.every((r) => r.type !== "allergic")) {
    risks.push({
      type: "allergic",
      level: "warning",
      description: `Allergie(s) : ${medAllergies.map((a) => a.name).join(", ")}`,
    })
  }

  if (patient.medicalHistory.medicalConditions.some((c) => /cardiaque|coeur|cardiac/i.test(c))) {
    risks.push({
      type: "cardiac",
      level: "warning",
      description: "Antécédent cardiaque",
    })
  }

  return risks
}

export function hasMedicalAlerts(patient: Patient): boolean {
  return getMedicalRisks(patient).length > 0
}
