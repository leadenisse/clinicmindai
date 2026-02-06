import type { ProstheticOrder } from "../types/prosthetics.types"
import { ORDER_STATUSES } from "../constants/prostheticsConfig"
import { cn } from "@/lib/utils"
import { Check, Circle } from "lucide-react"

const STATUS_FLOW: ProstheticOrder["status"][] = [
  "draft",
  "sent",
  "in_production",
  "ready",
  "delivered",
  "fitted",
]

interface OrderTimelineProps {
  order: ProstheticOrder
  className?: string
}

export function OrderTimeline({ order, className }: OrderTimelineProps) {
  const currentIndex = STATUS_FLOW.indexOf(order.status)
  const isIssue = order.status === "issue"

  return (
    <div className={cn("relative border-l-2 border-border pl-4", className)}>
      {STATUS_FLOW.map((status, index) => {
        const config = ORDER_STATUSES[status]
        const isDone = index < currentIndex
        const isCurrent = index === currentIndex && !isIssue
        const isPast = index <= currentIndex

        return (
          <div
            key={status}
            className={cn(
              "flex items-start gap-3",
              index < STATUS_FLOW.length - 1 && "pb-4"
            )}
          >
            <div
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                isDone && "border-green-500 bg-green-500",
                isCurrent && "border-primary bg-primary",
                !isPast && "border-muted bg-muted"
              )}
            >
              {isDone ? (
                <Check className="h-3 w-3 text-white" />
              ) : (
                <Circle
                  className={cn(
                    "h-2 w-2",
                    isCurrent ? "fill-primary text-primary" : "text-muted-foreground"
                  )}
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-sm font-medium",
                  isPast ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {config.label}
              </p>
              {status === "sent" && order.orderDate && (
                <p className="text-xs text-muted-foreground">
                  Envoyée le {order.orderDate}
                </p>
              )}
              {status === "delivered" && order.deliveredDate && (
                <p className="text-xs text-muted-foreground">
                  Livrée le {order.deliveredDate}
                </p>
              )}
              {status === "fitted" && order.fittedDate && (
                <p className="text-xs text-muted-foreground">
                  Posée le {order.fittedDate}
                </p>
              )}
            </div>
          </div>
        )
      })}
      {isIssue && (
        <div className="mt-2 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          <span className="font-medium">{ORDER_STATUSES.issue.label}</span>
          {order.labNotes && (
            <span className="text-muted-foreground">— {order.labNotes}</span>
          )}
        </div>
      )}
    </div>
  )
}
