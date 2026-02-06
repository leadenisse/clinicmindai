import type { QuoteStatus } from "../types/invoicing.types"
import { QUOTE_STATUSES } from "../constants/invoicingConfig"
import { Badge } from "@/components/ui/badge"
import {
  FileEdit,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_MAP: Record<string, LucideIcon> = {
  FileEdit,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
}

interface QuoteStatusBadgeProps {
  status: QuoteStatus
  size?: "sm" | "md"
  className?: string
}

export function QuoteStatusBadge({
  status,
  size = "md",
  className,
}: QuoteStatusBadgeProps) {
  const config = QUOTE_STATUSES[status]
  const Icon = ICON_MAP[config.icon] ?? FileEdit

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
