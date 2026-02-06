import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { STOCK_CATEGORIES, UNIT_OPTIONS } from "../constants/stockConfig"
import type { StockItem, CreateStockItemRequest, StockCategory } from "../types/stock.types"

interface StockItemFormProps {
  item?: StockItem | null
  onSubmit: (data: CreateStockItemRequest) => void
  onCancel?: () => void
  isPending?: boolean
}

const categories = Object.entries(STOCK_CATEGORIES) as [string, { label: string }][]

export function StockItemForm({
  item,
  onSubmit,
  onCancel,
  isPending = false,
}: StockItemFormProps) {
  const [form, setForm] = useState<CreateStockItemRequest>({
    name: "",
    reference: "",
    category: "consumables",
    currentQuantity: 0,
    minQuantity: 0,
    unit: "unité",
    supplier: "",
    unitPrice: undefined,
    expirationDate: "",
  })

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        reference: item.reference ?? "",
        category: item.category,
        currentQuantity: item.currentQuantity,
        minQuantity: item.minQuantity,
        unit: item.unit,
        supplier: item.supplier ?? "",
        unitPrice: item.unitPrice,
        expirationDate: item.expirationDate ?? "",
      })
    }
  }, [item])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...form,
      reference: form.reference || undefined,
      supplier: form.supplier || undefined,
      unitPrice: form.unitPrice ? Number(form.unitPrice) : undefined,
      expirationDate: form.expirationDate || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nom *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
            placeholder="Ex: Carpules anesthésie"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reference">Référence fournisseur</Label>
          <Input
            id="reference"
            value={form.reference}
            onChange={(e) => setForm((p) => ({ ...p, reference: e.target.value }))}
            placeholder="Ex: LIDO-50"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select
            value={form.category}
            onValueChange={(v) => setForm((p) => ({ ...p, category: v as StockCategory }))}
          >
            <SelectTrigger id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(([value, config]) => (
                <SelectItem key={value} value={value}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unité</Label>
          <Select
            value={form.unit}
            onValueChange={(v) => setForm((p) => ({ ...p, unit: v }))}
          >
            <SelectTrigger id="unit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {UNIT_OPTIONS.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="currentQuantity">Quantité actuelle</Label>
          <Input
            id="currentQuantity"
            type="number"
            min={0}
            value={form.currentQuantity}
            onChange={(e) =>
              setForm((p) => ({ ...p, currentQuantity: Number(e.target.value) || 0 }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minQuantity">Seuil minimum (alerte)</Label>
          <Input
            id="minQuantity"
            type="number"
            min={0}
            value={form.minQuantity}
            onChange={(e) =>
              setForm((p) => ({ ...p, minQuantity: Number(e.target.value) || 0 }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unitPrice">Prix unitaire (€)</Label>
          <Input
            id="unitPrice"
            type="number"
            min={0}
            step={0.01}
            value={form.unitPrice ?? ""}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                unitPrice: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="supplier">Fournisseur</Label>
          <Input
            id="supplier"
            value={form.supplier ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, supplier: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expirationDate">Date d&apos;expiration</Label>
          <Input
            id="expirationDate"
            type="date"
            value={form.expirationDate ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, expirationDate: e.target.value }))}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enregistrement..." : item ? "Enregistrer" : "Créer"}
        </Button>
      </div>
    </form>
  )
}
