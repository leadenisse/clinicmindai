import type { Patient } from "../types/patient.types"
import { getMedicalRisks } from "../utils/patient.utils"
import { MedicalAlerts } from "./MedicalAlerts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Cigarette, Wine, Brush, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const HABITS_LABELS = {
  smokingStatus: { never: "Jamais", former: "Ancien fumeur", current: "Fumeur" },
  alcoholConsumption: { none: "Aucun", occasional: "Occasionnel", regular: "Régulier" },
  brushingFrequency: { rarely: "Rarement", once: "1x/jour", twice: "2x/jour", more: "Plus" },
} as const

interface PatientSidebarProps {
  patient: Patient
  className?: string
}

export function PatientSidebar({ patient, className }: PatientSidebarProps) {
  const risks = getMedicalRisks(patient)
  const habits = patient.dentalHabits

  return (
    <aside className={cn("w-72 shrink-0 space-y-4", className)}>
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-sm font-semibold">Risques médicaux</h3>
        </CardHeader>
        <CardContent>
          {risks.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun risque identifié.</p>
          ) : (
            <MedicalAlerts risks={risks} />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-sm font-semibold">Habitudes bucco-dentaire</h3>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Cigarette className="h-4 w-4 text-muted-foreground" />
            <span>Tabac : {HABITS_LABELS.smokingStatus[habits.smokingStatus]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wine className="h-4 w-4 text-muted-foreground" />
            <span>Alcool : {HABITS_LABELS.alcoholConsumption[habits.alcoholConsumption]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Brush className="h-4 w-4 text-muted-foreground" />
            <span>Brossage : {HABITS_LABELS.brushingFrequency[habits.brushingFrequency]}</span>
          </div>
          {habits.lastDentalVisit && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Dernière visite : {habits.lastDentalVisit}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-sm font-semibold">Plan traitement</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">À définir avec le praticien.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-sm font-semibold">Examen initial bucco-dentaire</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Résumé à compléter.</p>
        </CardContent>
      </Card>
    </aside>
  )
}
