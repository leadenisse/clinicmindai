import { useNavigate } from "react-router-dom"
import { useAlerts } from "../hooks/useStock"
import { StockLevelBadge } from "./StockLevelBadge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle, Package, Calendar } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { StockAlert } from "../types/stock.types"

function AlertIcon({ type }: { type: StockAlert["type"] }) {
  if (type === "expired" || type === "expiring_soon")
    return <Calendar className="h-4 w-4 text-amber-600" />
  return <AlertTriangle className="h-4 w-4 text-orange-600" />
}

export function StockAlertsList() {
  const { data: alerts, isLoading } = useAlerts()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    )
  }

  if (!alerts?.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-2 font-medium">Aucune alerte</p>
          <p className="text-sm text-muted-foreground">
            Tous les niveaux de stock sont corrects.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className="cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => navigate(`/stock/${alert.itemId}`)}
        >
          <CardContent className="flex items-start gap-4 p-4">
            <div className="rounded-full bg-muted p-2">
              <AlertIcon type={alert.type} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{alert.message}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <StockLevelBadge level={alert.item.stockLevel} />
                <span className="text-xs text-muted-foreground">
                  {format(new Date(alert.createdAt), "dd MMM yyyy HH:mm", {
                    locale: fr,
                  })}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/stock/${alert.itemId}`)
              }}
            >
              Voir le produit
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
