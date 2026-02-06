import { useParams, useNavigate } from "react-router-dom"
import { useProstheticOrder, useUpdateProstheticOrderStatus } from "../hooks/useProsthetics"
import { OrderTimeline } from "../components/OrderTimeline"
import { OrderStatusBadge } from "../components/OrderStatusBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ORDER_STATUSES, PROSTHETIC_TYPES } from "../constants/prostheticsConfig"
import type { OrderStatus } from "../types/prosthetics.types"

export function ProstheticOrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: order, isLoading, isError } = useProstheticOrder(id ?? "")
  const updateStatus = useUpdateProstheticOrderStatus()

  if (!id) {
    navigate("/prosthetics", { replace: true })
    return null
  }

  if (isError) {
    return (
      <div className="space-y-4 p-6">
        <Button variant="ghost" onClick={() => navigate("/prosthetics")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <p className="text-destructive">Commande non trouvée.</p>
      </div>
    )
  }

  if (isLoading || !order) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/prosthetics")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Button>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{order.orderNumber}</h1>
          <p className="text-muted-foreground">
            {order.patient?.lastName} {order.patient?.firstName}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-sm font-medium">Détails de la commande</h2>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Type : </span>
              {PROSTHETIC_TYPES[order.type].label}
            </p>
            <p>
              <span className="text-muted-foreground">Description : </span>
              {order.description}
            </p>
            <p>
              <span className="text-muted-foreground">Dents : </span>
              {order.teeth.join(", ")}
            </p>
            {order.shade && (
              <p>
                <span className="text-muted-foreground">Teinte : </span>
                {order.shade}
              </p>
            )}
            {order.material && (
              <p>
                <span className="text-muted-foreground">Matériau : </span>
                {order.material}
              </p>
            )}
            <p>
              <span className="text-muted-foreground">Laboratoire : </span>
              {order.laboratory?.name ?? "—"}
              {order.laboratory?.phone && ` • ${order.laboratory.phone}`}
            </p>
            <p>
              <span className="text-muted-foreground">Date commande : </span>
              {order.orderDate}
            </p>
            {order.expectedDate && (
              <p>
                <span className="text-muted-foreground">Date prévue : </span>
                {order.expectedDate}
              </p>
            )}
            {order.instructions && (
              <p>
                <span className="text-muted-foreground">Instructions : </span>
                {order.instructions}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-sm font-medium">Suivi</h2>
          </CardHeader>
          <CardContent>
            <OrderTimeline order={order} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-sm font-medium">Changer le statut</h2>
        </CardHeader>
        <CardContent>
          <Select
            value={order.status}
            onValueChange={(v) =>
              updateStatus.mutate({ id: order.id, status: v as OrderStatus })
            }
            disabled={updateStatus.isPending}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(ORDER_STATUSES) as [OrderStatus, { label: string }][]).map(
                ([value, config]) => (
                  <SelectItem key={value} value={value}>
                    {config.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}
