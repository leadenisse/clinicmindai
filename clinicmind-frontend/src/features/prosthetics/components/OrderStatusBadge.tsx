import type { OrderStatus } from "../types/prosthetics.types"
import { ORDER_STATUSES } from "../constants/prostheticsConfig"
import { Badge } from "@/components/ui/badge"
import {
  FileEdit,
  Send,
  Cog,
  Check,
  Package,
  CheckCircle,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_MAP: Record<string, LucideIcon> = {
  FileEdit,
  Send,
  Cog,
  Check,
  Package,
  CheckCircle,
  AlertTriangle,
}

const COLOR_CLASSES: Record<string, string> = {
  gray: "bg-gray-100 text-gray-700",
  blue: "bg-blue-100 text-blue-700",
  orange: "bg-orange-100 text-orange-700",
  green: "bg-green-100 text-green-700",
  teal: "bg-teal-100 text-teal-700",
  emerald: "bg-emerald-100 text-emerald-700",
  red: "bg-red-100 text-red-700",
}

interface OrderStatusBadgeProps {
  status: OrderStatus
  size?: "sm" | "md"
  className?: string
}

export function OrderStatusBadge({
  status,
  size = "md",
  className,
}: OrderStatusBadgeProps) {
  const config = ORDER_STATUSES[status]
  const Icon = ICON_MAP[config.icon] ?? FileEdit
  const colorClass = COLOR_CLASSES[config.color] ?? COLOR_CLASSES.gray

  return (
    <Badge
      variant="secondary"
      className={cn(
        "border-0 font-medium",
        size === "sm"
          ? "gap-1 px-1.5 py-0 text-[10px] [&_svg]:h-3 [&_svg]:w-3"
          : "gap-1.5 px-2 py-0.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
        colorClass,
        className
      )}
    >
      <Icon className="shrink-0" aria-hidden />
      <span>{config.label}</span>
    </Badge>
  )
}
