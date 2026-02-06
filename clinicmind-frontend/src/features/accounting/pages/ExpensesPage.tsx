import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ExpenseRow } from "../components/ExpenseRow"
import { ExpenseForm } from "../components/ExpenseForm"
import { useExpenses, useDeleteExpense, useCreateExpense, useUpdateExpense } from "../hooks/useExpenses"
import type { AccountingFilters, ExpenseData } from "../types/accounting.types"
import { ArrowLeft, Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { TableCell } from "@/components/ui/table"

const defaultFilters: AccountingFilters = { period: "month" }

export function ExpensesPage() {
  const navigate = useNavigate()
  const [filters] = useState<AccountingFilters>(defaultFilters)
  const [formOpen, setFormOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<ExpenseData | null>(null)

  const { data: expenses = [], isLoading } = useExpenses(filters)
  const deleteExpense = useDeleteExpense()
  const createExpense = useCreateExpense()
  const updateExpense = useUpdateExpense()

  const handleSave = (data: Partial<ExpenseData>) => {
    if (data.id) {
      updateExpense.mutate(
        { id: data.id, data },
        { onSuccess: () => { setFormOpen(false); setEditingExpense(null) } }
      )
    } else {
      createExpense.mutate(
        { ...data, createdBy: "Dr Martin" },
        { onSuccess: () => { setFormOpen(false); setEditingExpense(null) } }
      )
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Supprimer cette dépense ?")) {
      deleteExpense.mutate(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/accounting")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Dépenses</h1>
        </div>
        <Button onClick={() => { setEditingExpense(null); setFormOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle dépense
        </Button>
      </div>

      <div className="rounded-md border">
        {isLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
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
              {expenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Aucune dépense.
                  </TableCell>
                </TableRow>
              ) : (
                expenses.map((exp) => (
                  <ExpenseRow
                    key={exp.id}
                    expense={exp}
                    onEdit={(e) => { setEditingExpense(e); setFormOpen(true) }}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <ExpenseForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingExpense(null) }}
        expense={editingExpense}
        onSave={handleSave}
      />
    </div>
  )
}
