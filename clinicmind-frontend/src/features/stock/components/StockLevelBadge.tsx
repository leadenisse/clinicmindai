import { Badge } from "@/components/ui/badge"
import { STOCK_LEVELS } from "../constants/stockConfig"
import { CheckCircle, AlertTriangle, AlertCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StockLevel } from "../types/stock.types"

const ICONS = {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  XCircle,
} as const

export function StockLevelBadge({ level }: { level: StockLevel }) {
  const config = STOCK_LEVELS[level]
  if (!config) return null
  const Icon = ICONS[config.icon as keyof typeof ICONS] ?? AlertCircle

  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1 font-normal",
        config.color === "green" && "bg-green-600/15 text-green-700 dark:text-green-400",
        config.color === "orange" && "bg-orange-500/15 text-orange-700 dark:text-orange-400",
        config.color === "red" && "bg-red-500/15 text-red-700 dark:text-red-400"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  )
}
