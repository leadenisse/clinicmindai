import { Link, useNavigate } from "react-router-dom"
import { useTodayAppointments } from "../hooks/useTodayAppointments"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, ChevronRight } from "lucide-react"
import { DayTimeline } from "./DayTimeline"
import type { Appointment } from "@/features/appointments/types/appointment.types"
import type { TimelineAppointmentExtra } from "../types/dashboard.types"

/** Retourne des extras pour les badges (démo : dérivés des notes ou index pour varier l'affichage) */
function getAppointmentExtra(apt: Appointment, index: number): TimelineAppointmentExtra | null {
  const notes = (apt.notes ?? "").toLowerCase()
  const hasAllergy = notes.includes("allergie") || notes.includes("penicillin") || notes.includes("pénicilline")
  const isNew = index === 2 || apt.status === "scheduled"
  if (!hasAllergy && !isNew) return null
  return {
    allergy: hasAllergy ? (notes.includes("pénicilline") ? "Pénicilline" : "Allergie") : undefined,
    isNewPatient: isNew,
  }
}

export function DayPlanningWidget() {
  const navigate = useNavigate()
  const { data: appointments, isLoading } = useTodayAppointments()

  const displayAppointments =
    appointments?.filter((a) => a.status !== "cancelled") ?? []

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-lg font-semibold">Planning du jour</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/appointments" className="gap-1">
            Voir agenda
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {displayAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Calendar className="h-10 w-10 mb-2 opacity-50" />
            <p>Aucun rendez-vous aujourd&apos;hui</p>
            <Button variant="outline" size="sm" className="mt-2" asChild>
              <Link to="/appointments">Voir le calendrier</Link>
            </Button>
          </div>
        ) : (
          <DayTimeline
            appointments={displayAppointments}
            startHour={8}
            endHour={19}
            pauses={[{ startHour: 12, endHour: 14, label: "Pause déjeuner" }]}
            getExtra={(apt) => getAppointmentExtra(apt, displayAppointments.indexOf(apt))}
            onAppointmentClick={(id) => navigate(`/appointments?highlight=${id}`)}
          />
        )}
      </CardContent>
    </Card>
  )
}
