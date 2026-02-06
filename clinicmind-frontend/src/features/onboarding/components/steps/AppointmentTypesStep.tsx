import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
import type { AppointmentTypesData, OnboardingAppointmentType } from "../../types/onboarding.types"
import { DEFAULT_ONBOARDING_APPOINTMENT_TYPES } from "../../constants/defaultAppointmentTypes"
import { AppointmentTypeEditor } from "../AppointmentTypeEditor"

interface AppointmentTypesStepProps {
  data: AppointmentTypesData
  onChange: (data: AppointmentTypesData) => void
}

export function AppointmentTypesStep({ data, onChange }: AppointmentTypesStepProps) {
  const types = data.types.length > 0 ? data.types : DEFAULT_ONBOARDING_APPOINTMENT_TYPES
  const [editing, setEditing] = useState<OnboardingAppointmentType | null>(null)

  const toggleActive = (id: string) => {
    const next = types.map((t) =>
      t.id === id ? { ...t, isActive: !t.isActive } : t
    )
    onChange({ types: next })
  }

  const updateType = (updated: OnboardingAppointmentType) => {
    const next = types.map((t) => (t.id === updated.id ? updated : t))
    onChange({ types: next })
    setEditing(null)
  }

  const addCustom = () => {
    const newId = `custom-${Date.now()}`
    const next: OnboardingAppointmentType[] = [
      ...types,
      {
        id: newId,
        value: newId,
        label: "Nouveau type",
        duration: 30,
        color: "#6B7280",
        isActive: true,
      },
    ]
    onChange({ types: next })
    setEditing(next.find((t) => t.id === newId) ?? null)
  }

  return (
    <div className="space-y-6">
      <Label>Personnalisez vos types de rendez-vous</Label>
      <ul className="space-y-2 rounded-lg border divide-y">
        {types.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between gap-4 py-3 px-4 first:pt-0"
          >
            <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
              <input
                type="checkbox"
                checked={t.isActive}
                onChange={() => toggleActive(t.id)}
                className="rounded border-gray-300"
              />
              <span className="font-medium">{t.label}</span>
              <span className="text-muted-foreground text-sm">{t.duration} min</span>
              <span
                className="h-4 w-4 rounded-full shrink-0"
                style={{ backgroundColor: t.color }}
              />
            </label>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setEditing(t)}
              aria-label="Modifier"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
      <Button type="button" variant="outline" onClick={addCustom}>
        + Ajouter un type de RDV personnalisé
      </Button>
      {editing && (
        <AppointmentTypeEditor
          type={editing}
          open={!!editing}
          onClose={() => setEditing(null)}
          onSave={updateType}
        />
      )}
    </div>
  )
}
