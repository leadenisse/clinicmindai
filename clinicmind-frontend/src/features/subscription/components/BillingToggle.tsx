import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { BillingCycle } from "../types/subscription.types"

interface BillingToggleProps {
  value: BillingCycle
  onChange: (cycle: BillingCycle) => void
  className?: string
}

export function BillingToggle({ value, onChange, className }: BillingToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded-lg border bg-muted/50 p-1",
        className
      )}
    >
      <Button
        variant={value === "monthly" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onChange("monthly")}
        className="rounded-md"
      >
        Mensuel
      </Button>
      <Button
        variant={value === "annual" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onChange("annual")}
        className="rounded-md"
      >
        Annuel <span className="ml-1 text-xs text-green-600">(-20%)</span>
      </Button>
    </div>
  )
}
