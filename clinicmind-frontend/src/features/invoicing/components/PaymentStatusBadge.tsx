import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type PaymentStatus = "paid" | "partial" | "unpaid"

interface PaymentStatusBadgeProps {
  total: number
  totalPaid: number
  size?: "sm" | "md"
  className?: string
}

export function PaymentStatusBadge({
  total,
  totalPaid,
  size = "md",
  className,
}: PaymentStatusBadgeProps) {
  const status: PaymentStatus =
    totalPaid <= 0 ? "unpaid" : totalPaid >= total ? "paid" : "partial"

  const config = {
    paid: {
      label: "Payé",
      icon: CheckCircle2,
      bgColor: "bg-green-100",
      color: "text-green-600",
    },
    partial: {
      label: "Partiel",
      icon: AlertCircle,
      bgColor: "bg-orange-100",
      color: "text-orange-600",
    },
    unpaid: {
      label: "Impayé",
      icon: Clock,
      bgColor: "bg-gray-100",
      color: "text-gray-600",
    },
  }[status]

  const Icon = config.icon

  return (
    <Badge
      variant="secondary"
      className={cn(
        "border-0 font-medium",
        size === "sm"
          ? "gap-1 px-1.5 py-0 text-[10px] [&_svg]:h-3 [&_svg]:w-3"
          : "gap-1.5 px-2 py-0.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
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
