import type { LineItem } from "../types/invoicing.types"
import type { DentalAct } from "../types/invoicing.types"
import { ActSearchSelect } from "./ActSearchSelect"
import { LineItemRow } from "./LineItemRow"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface LineItemsTableProps {
  items: LineItem[]
  onChange: (items: LineItem[]) => void
  readOnly?: boolean
}

function createEmptyLine(act?: DentalAct): LineItem {
  const id = `line-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  if (act) {
    return {
      id,
      actId: act.id,
      code: act.code,
      description: act.description,
      quantity: 1,
      unitPrice: act.basePrice,
      total: act.basePrice,
    }
  }
  return {
    id,
    code: "",
    description: "",
    quantity: 1,
    unitPrice: 0,
    total: 0,
  }
}

export function LineItemsTable({
  items,
  onChange,
  readOnly = false,
}: LineItemsTableProps) {
  const handleAddFromAct = (act: DentalAct) => {
    const newLine = createEmptyLine(act)
    onChange([...items, newLine])
  }

  const handleUpdate = (index: number, updated: LineItem) => {
    const next = [...items]
    next[index] = updated
    onChange(next)
  }

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {!readOnly && (
        <div className="flex flex-wrap items-center gap-2">
          <ActSearchSelect
            onSelect={handleAddFromAct}
            placeholder="Ajouter un acte (recherche par code ou libellé)"
            className="min-w-[280px]"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => onChange([...items, createEmptyLine()])}
          >
            <Plus className="h-4 w-4" />
            Ligne libre
          </Button>
        </div>
      )}

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-2 font-medium">Code</th>
              <th className="p-2 font-medium">Description</th>
              <th className="p-2 font-medium">Dent</th>
              <th className="p-2 font-medium">Qté</th>
              <th className="p-2 font-medium">Prix unit.</th>
              <th className="p-2 font-medium">Remise %</th>
              <th className="p-2 text-right font-medium">Total</th>
              {!readOnly && <th className="w-10 p-2" aria-label="Actions" />}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={readOnly ? 7 : 8}
                  className="p-6 text-center text-muted-foreground"
                >
                  Aucune ligne. Ajoutez un acte ou une ligne libre.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <LineItemRow
                  key={item.id}
                  item={item}
                  onUpdate={(updated) => handleUpdate(index, updated)}
                  onRemove={() => handleRemove(index)}
                  readOnly={readOnly}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
