import { Link } from "react-router-dom"
import { useTodayAppointments } from "../hooks/useTodayAppointments"
import { APPOINTMENT_TYPES } from "@/features/appointments/constants/appointmentConfig"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle, UserPlus } from "lucide-react"
import { format } from "date-fns"
import type { AppointmentType } from "@/features/appointments/types/appointment.types"

const LIMIT = 3

export function UpcomingPatientsWidget() {
  const { data: appointments, isLoading } = useTodayAppointments()

  const upcoming =
    appointments
      ?.filter(
        (a) =>
          a.status !== "cancelled" &&
          new Date(a.startTime) >= new Date()
      )
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
      .slice(0, LIMIT) ?? []

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-44" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Prochains patients</h2>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">
            Aucun rendez-vous à venir aujourd&apos;hui.
          </p>
        ) : (
          <ul className="space-y-3">
            {upcoming.map((apt) => {
              const typeConfig = APPOINTMENT_TYPES[apt.type as AppointmentType]
              const isNew = false
              const hasAlert = false
              return (
                <li key={apt.id}>
                  <Link
                    to={`/patients/${apt.patientId}`}
                    className="block rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">
                          {format(new Date(apt.startTime), "HH:mm")} — M. / Mme{" "}
                          {apt.patientLastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {apt.reason} — {apt.duration} min
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {hasAlert && (
                            <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-1.5 py-0.5 text-xs text-amber-700 dark:text-amber-400">
                              <AlertTriangle className="h-3 w-3" />
                              Allergie pénicilline
                            </span>
                          )}
                          {isNew && (
                            <span className="inline-flex items-center gap-1 rounded bg-blue-500/15 px-1.5 py-0.5 text-xs text-blue-700 dark:text-blue-400">
                              <UserPlus className="h-3 w-3" />
                              Nouveau patient
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className="shrink-0 rounded px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: typeConfig?.bgColor ?? "#F3F4F6",
                          color: typeConfig?.color ?? "#6B7280",
                        }}
                      >
                        {typeConfig?.label ?? apt.type}
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
