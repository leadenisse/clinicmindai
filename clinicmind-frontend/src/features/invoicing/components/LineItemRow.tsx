import type { LineItem } from "../types/invoicing.types"
import { calculateLineTotal } from "../utils/invoiceCalculations"
import { formatCurrency } from "../utils/invoiceCalculations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface LineItemRowProps {
  item: LineItem
  onUpdate: (item: LineItem) => void
  onRemove: () => void
  readOnly?: boolean
}

export function LineItemRow({
  item,
  onUpdate,
  onRemove,
  readOnly = false,
}: LineItemRowProps) {
  const handleQuantityChange = (qty: number) => {
    const quantity = Math.max(0, Math.round(qty))
    const total = calculateLineTotal(
      item.unitPrice,
      quantity,
      item.discount ?? 0
    )
    onUpdate({ ...item, quantity, total })
  }

  const handleUnitPriceChange = (price: number) => {
    const unitPrice = Math.max(0, Math.round(price * 100) / 100)
    const total = calculateLineTotal(
      unitPrice,
      item.quantity,
      item.discount ?? 0
    )
    onUpdate({ ...item, unitPrice, total })
  }

  const handleDiscountChange = (discount: number) => {
    const d = Math.max(0, Math.min(100, discount))
    const total = calculateLineTotal(item.unitPrice, item.quantity, d)
    onUpdate({ ...item, discount: d, total })
  }

  const handleToothChange = (tooth: string) => {
    onUpdate({ ...item, tooth: tooth || undefined })
  }

  return (
    <tr className="border-b last:border-0">
      <td className="p-2 font-mono text-sm text-muted-foreground">
        {item.code}
      </td>
      <td className="min-w-[140px] p-2 text-sm">{item.description}</td>
      <td className="p-2">
        {readOnly ? (
          <span className="text-sm">{item.tooth ?? "—"}</span>
        ) : (
          <Input
            type="text"
            inputMode="numeric"
            value={item.tooth ?? ""}
            onChange={(e) =>
              handleToothChange(e.target.value.replace(/\D/g, "").slice(0, 2))
            }
            placeholder="—"
            className="h-8 w-14 font-mono text-sm"
          />
        )}
      </td>
      <td className="p-2">
        {readOnly ? (
          <span className="text-sm">{item.quantity}</span>
        ) : (
          <Input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(parseInt(e.target.value, 10) || 1)
            }
            className="h-8 w-16 text-sm"
          />
        )}
      </td>
      <td className="p-2">
        {readOnly ? (
          <span className="text-sm">{formatCurrency(item.unitPrice)}</span>
        ) : (
          <Input
            type="number"
            min={0}
            step={0.01}
            value={item.unitPrice}
            onChange={(e) =>
              handleUnitPriceChange(parseFloat(e.target.value) || 0)
            }
            className="h-8 w-24 text-sm"
          />
        )}
      </td>
      <td className="p-2">
        {readOnly ? (
          <span className="text-sm">
            {item.discount ? `${item.discount} %` : "—"}
          </span>
        ) : (
          <Input
            type="number"
            min={0}
            max={100}
            value={item.discount ?? ""}
            onChange={(e) =>
              handleDiscountChange(parseFloat(e.target.value) || 0)
            }
            placeholder="0"
            className="h-8 w-14 text-sm"
          />
        )}
      </td>
      <td className="p-2 text-right font-medium text-sm">
        {formatCurrency(item.total)}
      </td>
      {!readOnly && (
        <td className="p-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={onRemove}
            aria-label="Supprimer la ligne"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </td>
      )}
    </tr>
  )
}
