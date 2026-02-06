import type { AppointmentStatus } from "../types/appointment.types"
import { APPOINTMENT_STATUSES } from "../constants/appointmentConfig"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  CheckCircle,
  Play,
  CheckCircle2,
  XCircle,
  UserX,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_MAP: Record<string, LucideIcon> = {
  Clock,
  CheckCircle,
  Play,
  CheckCircle2,
  XCircle,
  UserX,
}

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus
  size?: "sm" | "md"
  className?: string
}

export function AppointmentStatusBadge({
  status,
  size = "md",
  className,
}: AppointmentStatusBadgeProps) {
  const config = APPOINTMENT_STATUSES[status]
  const Icon = ICON_MAP[config.icon] ?? Clock

  return (
    <Badge
      variant="secondary"
      className={cn(
        "border-0 font-medium",
        size === "sm" ? "gap-1 px-1.5 py-0 text-[10px] [&_svg]:h-3 [&_svg]:w-3" : "gap-1.5 px-2 py-0.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
        config.bgColor,
        config.color,
        className
      )}
    >
      <Icon className="shrink-0" aria-hidden />
      <span>{config.label}</span>
    </Badge>
  )
}
