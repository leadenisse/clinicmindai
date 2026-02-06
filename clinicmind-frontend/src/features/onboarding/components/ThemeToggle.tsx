import { cn } from "@/lib/utils"
import type { ThemeMode } from "../types/onboarding.types"
import { Sun, Moon, Monitor } from "lucide-react"

const OPTIONS: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Clair", icon: Sun },
  { value: "dark", label: "Sombre", icon: Moon },
  { value: "system", label: "Automatique (système)", icon: Monitor },
]

interface ThemeToggleProps {
  value: ThemeMode
  onChange: (mode: ThemeMode) => void
  className?: string
}

export function ThemeToggle({ value, onChange, className }: ThemeToggleProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {OPTIONS.map((opt) => {
        const Icon = opt.icon
        const isSelected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors",
              isSelected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:bg-muted"
            )}
          >
            <Icon className="h-4 w-4" />
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
