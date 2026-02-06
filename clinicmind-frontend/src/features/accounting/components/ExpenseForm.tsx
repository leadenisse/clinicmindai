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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { EXPENSE_CATEGORIES } from "../constants/accounting.constants"
import type { ExpenseData, ExpenseCategory } from "../types/accounting.types"

interface ExpenseFormProps {
  open: boolean
  onClose: () => void
  expense: ExpenseData | null
  onSave: (data: Partial<ExpenseData>) => void
}

const defaultValues: Partial<ExpenseData> = {
  date: new Date().toISOString().slice(0, 10),
  amount: 0,
  category: "other",
  description: "",
  supplier: "",
  invoiceRef: "",
}

export function ExpenseForm({
  open,
  onClose,
  expense,
  onSave,
}: ExpenseFormProps) {
  const [form, setForm] = useState<Partial<ExpenseData>>(defaultValues)

  useEffect(() => {
    if (expense) {
      setForm({
        date: expense.date,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        supplier: expense.supplier ?? "",
        invoiceRef: expense.invoiceRef ?? "",
      })
    } else {
      setForm(defaultValues)
    }
  }, [expense, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(expense ? { ...form, id: expense.id } : form)
    onClose()
  }

  const categories = Object.entries(EXPENSE_CATEGORIES) as [ExpenseCategory, { label: string }][]

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {expense ? "Modifier la dépense" : "Nouvelle dépense"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Input
                type="date"
                value={form.date ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Montant (€) *</Label>
              <Input
                type="number"
                step={0.01}
                min={0}
                value={form.amount ?? 0}
                onChange={(e) =>
                  setForm((p) => ({ ...p, amount: Number(e.target.value) || 0 }))
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Catégorie</Label>
            <Select
              value={form.category ?? "other"}
              onValueChange={(v: ExpenseCategory) =>
                setForm((p) => ({ ...p, category: v }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Description *</Label>
            <Input
              value={form.description ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Ex : Facture Labo Dentec"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Fournisseur</Label>
            <Input
              value={form.supplier ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, supplier: e.target.value }))}
              placeholder="Optionnel"
            />
          </div>
          <div className="space-y-2">
            <Label>Réf. facture</Label>
            <Input
              value={form.invoiceRef ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, invoiceRef: e.target.value }))
              }
              placeholder="Optionnel"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
