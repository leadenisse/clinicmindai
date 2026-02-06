import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PRESCRIPTION_STATUS } from "../constants/prescription.constants"
import type { PrescriptionStatus } from "../types/prescription.types"
import { FileEdit, CheckCircle, Send } from "lucide-react"

const ICONS = { FileEdit, CheckCircle, Send }

interface PrescriptionStatusBadgeProps {
  status: PrescriptionStatus
  size?: "sm" | "default"
  className?: string
}

export function PrescriptionStatusBadge({
  status,
  size = "default",
  className,
}: PrescriptionStatusBadgeProps) {
  const config = PRESCRIPTION_STATUS[status]
  const Icon = ICONS[config.icon as keyof typeof ICONS]
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1",
        config.color === "gray" && "bg-muted text-muted-foreground",
        config.color === "green" && "bg-green-500/15 text-green-700 dark:text-green-400",
        config.color === "blue" && "bg-blue-500/15 text-blue-700 dark:text-blue-400",
        size === "sm" && "text-xs",
        className
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  )
}
