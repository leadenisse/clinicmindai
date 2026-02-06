import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { StockItem } from "../types/stock.types"
import type { MovementType } from "../types/stock.types"

interface StockMovementFormProps {
  item: StockItem
  type: MovementType
  onSubmit: (quantity: number, reason?: string) => void
  onCancel?: () => void
  isPending?: boolean
}

export function StockMovementForm({
  item,
  type,
  onSubmit,
  onCancel,
  isPending = false,
}: StockMovementFormProps) {
  const [quantity, setQuantity] = useState(type === "in" ? 1 : 1)
  const [reason, setReason] = useState("")

  const isIn = type === "in" || type === "adjustment"
  const maxOut = item.currentQuantity

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const qty = isIn ? Math.abs(quantity) : -Math.abs(Math.min(quantity, maxOut))
    onSubmit(isIn ? qty : Math.abs(qty), reason || undefined)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {item.name}
        {item.reference && (
          <span className="ml-1 font-mono">({item.reference})</span>
        )}
        — Stock actuel : {item.currentQuantity} {item.unit}
      </p>
      <div className="space-y-2">
        <Label htmlFor="quantity">
          {isIn ? "Quantité à ajouter" : "Quantité à sortir"}
        </Label>
        <Input
          id="quantity"
          type="number"
          min={1}
          max={isIn ? undefined : maxOut}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value) || 0)}
          required
        />
        {!isIn && maxOut < quantity && (
          <p className="text-xs text-destructive">
            Stock insuffisant. Maximum : {maxOut} {item.unit}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="reason">Raison (optionnel)</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={2}
          placeholder="Réapprovisionnement, usage quotidien, perte..."
          className="resize-none"
        />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        )}
        <Button type="submit" disabled={isPending || (!isIn && quantity > maxOut)}>
          {isPending ? "En cours..." : isIn ? "Enregistrer l'entrée" : "Enregistrer la sortie"}
        </Button>
      </div>
    </form>
  )
}
