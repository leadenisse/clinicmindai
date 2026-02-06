import { cn } from "@/lib/utils"
import { WORKING_DAYS_LABELS } from "@/features/settings/constants/settingsConfig"

const DAYS_ORDER = [1, 2, 3, 4, 5, 6, 0] as const

interface WorkingDaysSelectorProps {
  value: number[]
  onChange: (days: number[]) => void
  className?: string
}

export function WorkingDaysSelector({ value, onChange, className }: WorkingDaysSelectorProps) {
  const toggle = (day: number) => {
    const next = value.includes(day)
      ? value.filter((d) => d !== day)
      : [...value, day].sort((a, b) => a - b)
    onChange(next)
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {DAYS_ORDER.map((day) => {
        const label = WORKING_DAYS_LABELS[day] ?? `J${day}`
        const checked = value.includes(day)
        return (
          <label
            key={day}
            className={cn(
              "flex cursor-pointer items-center rounded-lg border px-4 py-2 text-sm transition-colors",
              checked ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
            )}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(day)}
              className="sr-only"
            />
            {label}
          </label>
        )
      })}
    </div>
  )
}
