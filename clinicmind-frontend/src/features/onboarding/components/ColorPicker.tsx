import { cn } from "@/lib/utils"
import type { InterfaceColor } from "../types/onboarding.types"
import { INTERFACE_COLORS } from "../constants/themeColors"
import { Check } from "lucide-react"

const COLOR_ORDER: InterfaceColor[] = [
  "blue",
  "green",
  "violet",
  "cyan",
  "orange",
  "red",
  "gray",
]

interface ColorPickerProps {
  value: InterfaceColor
  onChange: (color: InterfaceColor) => void
  className?: string
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {COLOR_ORDER.map((color) => {
        const config = INTERFACE_COLORS[color]
        const isSelected = value === color
        return (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className="flex flex-col items-center gap-1.5"
            aria-pressed={isSelected}
            aria-label={config.label}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-full border-2 transition-all",
                isSelected ? "border-foreground scale-110" : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: config.hex }}
            >
              {isSelected && (
                <span className="flex h-full w-full items-center justify-center text-white">
                  <Check className="h-5 w-5" strokeWidth={3} />
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{config.label}</span>
          </button>
        )
      })}
    </div>
  )
}
