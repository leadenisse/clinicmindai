import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CategoryBadge } from "./CategoryBadge"
import { EXPENSE_CATEGORIES } from "../constants/accounting.constants"
import { formatCurrency } from "../utils/formatCurrency"
import type { ExpenseData } from "../types/accounting.types"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Pencil, Trash2 } from "lucide-react"

interface ExpenseRowProps {
  expense: ExpenseData
  onEdit: (e: ExpenseData) => void
  onDelete: (id: string) => void
}

export function ExpenseRow({ expense, onEdit, onDelete }: ExpenseRowProps) {
  const config = EXPENSE_CATEGORIES[expense.category as keyof typeof EXPENSE_CATEGORIES]
  const label = config?.label ?? expense.category
  const dateStr = format(new Date(expense.date), "dd/MM/yyyy", { locale: fr })

  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{dateStr}</TableCell>
      <TableCell>
        <CategoryBadge label={label} color={config?.color} />
      </TableCell>
      <TableCell className="max-w-[200px] truncate">{expense.description}</TableCell>
      <TableCell className="text-right font-medium">
        {formatCurrency(expense.amount)}
      </TableCell>
      <TableCell className="w-24">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(expense)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => onDelete(expense.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
