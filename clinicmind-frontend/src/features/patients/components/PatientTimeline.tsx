import type { Patient } from "../types/patient.types"
import { Card, CardContent } from "@/components/ui/card"
import { Stethoscope, Syringe, Scissors, Package } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

/** Événements mock pour la timeline (à remplacer par l'API RDV/Documents plus tard) */
const MOCK_EVENTS: Array<{
  id: string
  date: string
  type: "consultation" | "soin" | "chirurgie" | "prothese"
  summary: string
  practitioner: string
}> = [
  {
    id: "1",
    date: "2024-02-01T14:20:00Z",
    type: "consultation",
    summary: "Contrôle annuel",
    practitioner: "Dr. Martin",
  },
  {
    id: "2",
    date: "2023-09-15T10:00:00Z",
    type: "soin",
    summary: "Détartrage",
    practitioner: "Dr. Martin",
  },
]

const TYPE_CONFIG = {
  consultation: { icon: Stethoscope, label: "Consultation", color: "text-primary" },
  soin: { icon: Syringe, label: "Soin", color: "text-info" },
  chirurgie: { icon: Scissors, label: "Chirurgie", color: "text-warning" },
  prothese: { icon: Package, label: "Prothèse", color: "text-muted-foreground" },
} as const

interface PatientTimelineProps {
  patientId: string
  patient?: Patient
}

export function PatientTimeline({ patientId: _patientId, patient: _patient }: PatientTimelineProps) {
  const events = MOCK_EVENTS

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Aucun événement pour le moment. L'historique des consultations sera affiché ici.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event, i) => {
        const config = TYPE_CONFIG[event.type]
        const Icon = config.icon
        return (
          <div key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted ${config.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              {i < events.length - 1 && (
                <div className="my-1 h-full w-px flex-1 bg-border" />
              )}
            </div>
            <div className="flex-1 pb-6">
              <p className="text-sm font-medium">
                {format(new Date(event.date), "dd MMMM yyyy à HH:mm", { locale: fr })}
              </p>
              <p className="text-sm text-muted-foreground">{config.label}</p>
              <p className="mt-1">{event.summary}</p>
              <p className="mt-1 text-xs text-muted-foreground">{event.practitioner}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
