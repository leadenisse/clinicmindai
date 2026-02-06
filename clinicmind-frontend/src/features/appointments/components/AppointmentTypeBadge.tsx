import type { AppointmentType } from "../types/appointment.types"
import { APPOINTMENT_TYPES } from "../constants/appointmentConfig"
import { Badge } from "@/components/ui/badge"
import {
  Stethoscope,
  ClipboardCheck,
  AlertTriangle,
  Scissors,
  Component,
  Sparkles,
  Smile,
  Calendar,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_MAP: Record<string, LucideIcon> = {
  Stethoscope,
  ClipboardCheck,
  AlertTriangle,
  Scissors,
  Component,
  Sparkles,
  Smile,
  Calendar,
}

interface AppointmentTypeBadgeProps {
  type: AppointmentType
  size?: "sm" | "md"
  showLabel?: boolean
  className?: string
}

export function AppointmentTypeBadge({
  type,
  size = "md",
  showLabel = true,
  className,
}: AppointmentTypeBadgeProps) {
  const config = APPOINTMENT_TYPES[type]
  const Icon = ICON_MAP[config.icon] ?? Calendar

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
      {showLabel && <span>{config.label}</span>}
    </Badge>
  )
}
