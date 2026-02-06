import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { WorkingDaysSelector } from "../WorkingDaysSelector"
import type { ScheduleData } from "../../types/onboarding.types"

const DURATION_OPTIONS = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "1h" },
  { value: 90, label: "1h30" },
]

const TIME_OPTIONS = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00",
]

interface ScheduleStepProps {
  data: ScheduleData
  onChange: (data: ScheduleData) => void
}

export function ScheduleStep({ data, onChange }: ScheduleStepProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Ouverture</Label>
          <Select
            value={data.openingTime}
            onValueChange={(v) => onChange({ ...data, openingTime: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_OPTIONS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Fermeture</Label>
          <Select
            value={data.closingTime}
            onValueChange={(v) => onChange({ ...data, closingTime: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_OPTIONS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Jours travaillés</Label>
        <WorkingDaysSelector
          value={data.workingDays}
          onChange={(days) => onChange({ ...data, workingDays: days })}
        />
      </div>
      <div className="space-y-2">
        <Label>Durée de RDV par défaut</Label>
        <Select
          value={String(data.defaultAppointmentDuration)}
          onValueChange={(v) =>
            onChange({ ...data, defaultAppointmentDuration: Number(v) })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DURATION_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={String(o.value)}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
