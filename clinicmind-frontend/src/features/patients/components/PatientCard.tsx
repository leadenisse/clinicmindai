import type { Patient } from "../types/patient.types"
import { getAge, formatLastActivity, getMedicalRisks } from "../utils/patient.utils"
import { MedicalAlerts } from "./MedicalAlerts"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { User } from "lucide-react"

interface PatientCardProps {
  patient: Patient
  onClick: () => void
  className?: string
}

export function PatientCard({ patient, onClick, className }: PatientCardProps) {
  const age = getAge(patient.birthDate)
  const risks = getMedicalRisks(patient)

  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors hover:border-primary/50 hover:bg-muted/30",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-start gap-4 p-4">
        <Avatar className="h-12 w-12 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary">
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-medium">
            {patient.lastName} {patient.firstName}
          </p>
          <p className="text-sm text-muted-foreground">
            {age} ans · {patient.phone}
          </p>
          <p className="text-xs text-muted-foreground">
            Dernière activité : {formatLastActivity(patient.updatedAt)}
          </p>
          {risks.length > 0 && (
            <div className="mt-2">
              <MedicalAlerts risks={risks} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
