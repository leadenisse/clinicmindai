import type { Patient } from "../types/patient.types"
import { getAge, getMedicalRisks } from "../utils/patient.utils"
import { MedicalAlerts } from "./MedicalAlerts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, MapPin, Phone } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface PatientHeaderProps {
  patient: Patient
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  const age = getAge(patient.birthDate)
  const risks = getMedicalRisks(patient)
  const birthDateFormatted = format(new Date(patient.birthDate), "dd MMMM yyyy", { locale: fr })
  const addressLine = [patient.address.street, patient.address.zipCode, patient.address.city]
    .filter(Boolean)
    .join(", ")

  return (
    <div className="flex flex-col gap-4 border-b border-border bg-card p-6 sm:flex-row sm:items-start sm:gap-6">
      <Avatar className="h-16 w-16 shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary text-xl">
          <User className="h-8 w-8" />
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-semibold">
          {patient.lastName} {patient.firstName}
        </h1>
        <p className="text-muted-foreground">
          {age} ans · Né(e) le {birthDateFormatted}
        </p>
        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <Phone className="h-4 w-4 text-muted-foreground" />
            {patient.phone}
          </span>
          {patient.email && (
            <span className="text-muted-foreground">{patient.email}</span>
          )}
          {addressLine && (
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {addressLine}
            </span>
          )}
        </div>
        {risks.length > 0 && (
          <div className="mt-4">
            <MedicalAlerts risks={risks} />
          </div>
        )}
      </div>
    </div>
  )
}
