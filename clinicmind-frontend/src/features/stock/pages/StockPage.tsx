import { useState } from "react"
import { Link } from "react-router-dom"
import { useStockItems, useAlertsCount } from "../hooks/useStock"
import { useCreateStockItem, useUpdateStockItem, useDeleteStockItem, useRecordMovement } from "../hooks/useStock"
import { StockList } from "../components/StockList"
import { StockItemForm } from "../components/StockItemForm"
import { StockMovementForm } from "../components/StockMovementForm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, AlertTriangle } from "lucide-react"
import type { StockItem, StockFilters, CreateStockItemRequest } from "../types/stock.types"

export function StockPage() {
  const [filters, setFilters] = useState<StockFilters>({})
  const [createOpen, setCreateOpen] = useState(false)
  const [editItem, setEditItem] = useState<StockItem | null>(null)
  const [movementItem, setMovementItem] = useState<{
    item: StockItem
    type: "in" | "out"
  } | null>(null)
  const [deleteItem, setDeleteItem] = useState<StockItem | null>(null)

  const { data: items } = useStockItems(filters)
  const { data: alertsCount } = useAlertsCount()
  const createItem = useCreateStockItem()
  const updateItem = useUpdateStockItem(editItem?.id ?? "")
  const deleteStockItem = useDeleteStockItem()
  const recordMovement = useRecordMovement()

  const totalProducts = items?.length ?? 0
  const lowCount = items?.filter((i) => i.stockLevel === "low").length ?? 0
  const outCount = items?.filter((i) => i.stockLevel === "out").length ?? 0
  const expiringSoonCount = 0

  const handleCreate = (data: CreateStockItemRequest) => {
    createItem.mutate(data, { onSuccess: () => setCreateOpen(false) })
  }

  const handleUpdate = (data: CreateStockItemRequest) => {
    if (!editItem) return
    updateItem.mutate(data, { onSuccess: () => setEditItem(null) })
  }

  const handleMovement = (quantity: number, reason?: string) => {
    if (!movementItem) return
    recordMovement.mutate(
      {
        itemId: movementItem.item.id,
        type: movementItem.type,
        quantity,
        reason,
      },
      { onSuccess: () => setMovementItem(null) }
    )
  }

  const handleDelete = () => {
    if (!deleteItem) return
    deleteStockItem.mutate(deleteItem.id, { onSuccess: () => setDeleteItem(null) })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Gestion du stock</h1>
        <div className="flex items-center gap-2">
          {alertsCount !== undefined && alertsCount > 0 && (
            <Link to="/stock/alerts">
              <Button variant="outline" size="sm" className="gap-1">
                <AlertTriangle className="h-4 w-4" />
                {alertsCount} alerte{alertsCount > 1 ? "s" : ""}
              </Button>
            </Link>
          )}
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau produit
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total produits</p>
          <p className="text-2xl font-semibold">{totalProducts}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Stock bas</p>
          <p className="text-2xl font-semibold text-orange-600">{lowCount}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Ruptures</p>
          <p className="text-2xl font-semibold text-red-600">{outCount}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Expirations proches</p>
          <p className="text-2xl font-semibold">{expiringSoonCount}</p>
        </div>
      </div>

      <StockList
        filters={filters}
        onFiltersChange={setFilters}
        onNewItem={() => setCreateOpen(true)}
        onEdit={setEditItem}
        onMovementIn={(item) => setMovementItem({ item, type: "in" })}
        onMovementOut={(item) => setMovementItem({ item, type: "out" })}
        onDelete={setDeleteItem}
      />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau produit</DialogTitle>
          </DialogHeader>
          <StockItemForm
            onSubmit={handleCreate}
            onCancel={() => setCreateOpen(false)}
            isPending={createItem.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
          </DialogHeader>
          {editItem && (
            <StockItemForm
              item={editItem}
              onSubmit={handleUpdate}
              onCancel={() => setEditItem(null)}
              isPending={updateItem.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!movementItem} onOpenChange={() => setMovementItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {movementItem?.type === "in"
                ? "Entrée de stock"
                : "Sortie de stock"}
            </DialogTitle>
          </DialogHeader>
          {movementItem && (
            <StockMovementForm
              item={movementItem.item}
              type={movementItem.type}
              onSubmit={handleMovement}
              onCancel={() => setMovementItem(null)}
              isPending={recordMovement.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le produit ?</DialogTitle>
          </DialogHeader>
          {deleteItem && (
            <>
              <p className="text-sm text-muted-foreground">
                &laquo; {deleteItem.name} &raquo; sera définitivement supprimé.
                Cette action est irréversible.
              </p>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setDeleteItem(null)}>
                  Annuler
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteStockItem.isPending}
                >
                  {deleteStockItem.isPending ? "Suppression..." : "Supprimer"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
