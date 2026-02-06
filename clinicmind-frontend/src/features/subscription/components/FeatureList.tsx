import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PlanFeature } from "../types/subscription.types"

interface FeatureListProps {
  features: PlanFeature[]
  showExcluded?: boolean
  excluded?: string[]
  className?: string
}

export function FeatureList({
  features,
  showExcluded = false,
  excluded = [],
  className,
}: FeatureListProps) {
  const included = features.filter((f) => f.included)

  return (
    <ul className={cn("space-y-2 text-sm", className)}>
      {included.map((f) => (
        <li key={f.id} className="flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0 text-green-600" />
          <span>
            {f.label}
            {f.value != null && f.value !== "" && (
              <span className="text-muted-foreground"> — {f.value}</span>
            )}
          </span>
        </li>
      ))}
      {showExcluded && excluded.length > 0 &&
        excluded.map((line, i) => (
          <li key={`excl-${i}`} className="flex items-center gap-2 text-muted-foreground">
            <X className="h-4 w-4 shrink-0" />
            <span>{line}</span>
          </li>
        ))}
    </ul>
  )
}
