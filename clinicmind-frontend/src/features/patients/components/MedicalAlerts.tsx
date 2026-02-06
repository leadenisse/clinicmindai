import type { MedicalRisk } from "../types/patient.types"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface MedicalAlertsProps {
  risks: MedicalRisk[]
  className?: string
}

export function MedicalAlerts({ risks, className }: MedicalAlertsProps) {
  if (risks.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {risks.map((risk, i) => (
        <Badge
          key={i}
          variant="secondary"
          className={cn(
            "gap-1 font-medium",
            risk.level === "danger"
              ? "border-error/50 bg-error/10 text-error"
              : "border-warning/50 bg-warning/10 text-warning"
          )}
        >
          {risk.level === "danger" ? (
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <Zap className="h-3.5 w-3.5" aria-hidden />
          )}
          {risk.description}
        </Badge>
      ))}
    </div>
  )
}
