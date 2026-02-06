import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ExpenseRow } from "./ExpenseRow"
import { useExpenses } from "../hooks/useExpenses"
import type { AccountingFilters, ExpenseData } from "../types/accounting.types"
import { Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ExpensesListProps {
  filters: AccountingFilters
  onAddExpense: () => void
  onEditExpense: (e: ExpenseData) => void
  onDeleteExpense: (id: string) => void
}

export function ExpensesList({
  filters,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
}: ExpensesListProps) {
  const { data: expenses = [], isLoading } = useExpenses(filters)
  const recent = expenses.slice(0, 5)

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Dépenses récentes</h3>
        <Button variant="outline" size="sm" onClick={onAddExpense}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Aucune dépense.
                </TableCell>
              </TableRow>
            ) : (
              recent.map((exp) => (
                <ExpenseRow
                  key={exp.id}
                  expense={exp}
                  onEdit={onEditExpense}
                  onDelete={onDeleteExpense}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
