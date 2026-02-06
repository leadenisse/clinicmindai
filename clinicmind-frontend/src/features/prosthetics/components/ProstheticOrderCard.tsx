import type { ProstheticOrder } from "../types/prosthetics.types"
import { PROSTHETIC_TYPES } from "../constants/prostheticsConfig"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Link, Square, Layers, Component, Circle, Pin, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown,
  Link,
  Square,
  Layers,
  Component,
  Circle,
  Pin,
  MoreHorizontal,
}

interface ProstheticOrderCardProps {
  order: ProstheticOrder
  onView?: (order: ProstheticOrder) => void
  className?: string
}

export function ProstheticOrderCard({
  order,
  onView,
  className,
}: ProstheticOrderCardProps) {
  const typeConfig = PROSTHETIC_TYPES[order.type]
  const Icon = ICON_MAP[typeConfig.icon] ?? MoreHorizontal

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <span className="flex items-center gap-2 font-mono text-sm">
          {order.orderNumber}
        </span>
        <OrderStatusBadge status={order.status} size="sm" />
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="font-medium">
          {order.patient?.lastName} {order.patient?.firstName}
        </p>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Icon className="h-4 w-4" />
          {typeConfig.label} — {order.description}
        </p>
        <p className="text-xs text-muted-foreground">
          Dents : {order.teeth.join(", ")}
          {order.laboratory?.name && ` • ${order.laboratory.name}`}
        </p>
        <p className="text-xs text-muted-foreground">
          Commande : {order.orderDate}
          {order.expectedDate && ` • Prévu : ${order.expectedDate}`}
        </p>
        {onView && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full"
            onClick={() => onView(order)}
          >
            Voir
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
