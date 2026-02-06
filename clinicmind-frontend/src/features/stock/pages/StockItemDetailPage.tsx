import { useParams, useNavigate } from "react-router-dom"
import { useStockItem, useUpdateStockItem, useRecordMovement } from "../hooks/useStock"
import { StockLevelBadge } from "../components/StockLevelBadge"
import { StockItemForm } from "../components/StockItemForm"
import { StockMovementForm } from "../components/StockMovementForm"
import { StockMovementHistory } from "../components/StockMovementHistory"
import { STOCK_CATEGORIES } from "../constants/stockConfig"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Pencil, ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useState } from "react"
import type { CreateStockItemRequest } from "../types/stock.types"
import { cn } from "@/lib/utils"

export function StockItemDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: item, isLoading, isError } = useStockItem(id ?? "")
  const updateItem = useUpdateStockItem(id ?? "")
  const recordMovement = useRecordMovement()
  const [editOpen, setEditOpen] = useState(false)
  const [movementType, setMovementType] = useState<"in" | "out" | null>(null)

  if (!id) {
    navigate("/stock", { replace: true })
    return null
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate("/stock")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <p className="text-destructive">Produit non trouvé.</p>
      </div>
    )
  }

  if (isLoading || !item) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  const categoryConfig = STOCK_CATEGORIES[item.category]
  const max = item.maxQuantity ?? item.minQuantity * 2
  const progressPercent = Math.min(100, (item.currentQuantity / max) * 100)

  const handleUpdate = (data: CreateStockItemRequest) => {
    updateItem.mutate(data, { onSuccess: () => setEditOpen(false) })
  }

  const handleMovement = (quantity: number, reason?: string) => {
    if (!movementType) return
    recordMovement.mutate(
      { itemId: id, type: movementType, quantity, reason },
      { onSuccess: () => setMovementType(null) }
    )
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/stock")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{item.name}</h1>
            {item.reference && (
              <p className="mt-0.5 font-mono text-sm text-muted-foreground">
                {item.reference}
              </p>
            )}
            <div className="mt-2 flex items-center gap-2">
              <StockLevelBadge level={item.stockLevel} />
              <span className="text-sm text-muted-foreground">
                {categoryConfig?.label ?? item.category}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMovementType("in")}
            >
              <ArrowDownToLine className="mr-1 h-4 w-4" />
              Entrée
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMovementType("out")}
              disabled={item.currentQuantity === 0}
            >
              <ArrowUpFromLine className="mr-1 h-4 w-4" />
              Sortie
            </Button>
            <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
              <Pencil className="mr-1 h-4 w-4" />
              Modifier
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>
                Quantité actuelle : {item.currentQuantity} {item.unit}
              </span>
              <span className="text-muted-foreground">
                Seuil min. {item.minQuantity} {item.unit}
              </span>
            </div>
            <Progress
              value={progressPercent}
              className={cn(
                "mt-2 h-3",
                item.stockLevel === "out" && "[&>div]:bg-red-500",
                item.stockLevel === "critical" && "[&>div]:bg-red-400",
                item.stockLevel === "low" && "[&>div]:bg-orange-500"
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {item.supplier && (
              <div>
                <p className="text-sm text-muted-foreground">Fournisseur</p>
                <p className="font-medium">{item.supplier}</p>
                {item.supplierRef && (
                  <p className="text-sm text-muted-foreground font-mono">
                    Réf. {item.supplierRef}
                  </p>
                )}
              </div>
            )}
            {item.unitPrice != null && (
              <div>
                <p className="text-sm text-muted-foreground">Prix unitaire</p>
                <p className="font-medium">{item.unitPrice.toFixed(2)} €</p>
              </div>
            )}
            {item.expirationDate && (
              <div>
                <p className="text-sm text-muted-foreground">Date d&apos;expiration</p>
                <p className="font-medium">
                  {format(new Date(item.expirationDate), "dd MMMM yyyy", {
                    locale: fr,
                  })}
                </p>
              </div>
            )}
            {item.lastRestocked && (
              <div>
                <p className="text-sm text-muted-foreground">Dernier réapprovisionnement</p>
                <p className="font-medium">
                  {format(new Date(item.lastRestocked), "dd MMM yyyy", {
                    locale: fr,
                  })}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Historique des mouvements</h2>
        </CardHeader>
        <CardContent>
          <StockMovementHistory itemId={id} />
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
          </DialogHeader>
          <StockItemForm
            item={item}
            onSubmit={handleUpdate}
            onCancel={() => setEditOpen(false)}
            isPending={updateItem.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!movementType} onOpenChange={() => setMovementType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {movementType === "in"
                ? "Entrée de stock"
                : "Sortie de stock"}
            </DialogTitle>
          </DialogHeader>
          {movementType && (
            <StockMovementForm
              item={item}
              type={movementType}
              onSubmit={handleMovement}
              onCancel={() => setMovementType(null)}
              isPending={recordMovement.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
