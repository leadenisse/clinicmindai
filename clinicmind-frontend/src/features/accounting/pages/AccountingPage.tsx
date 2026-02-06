import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { AccountingSummaryCards } from "../components/AccountingSummaryCards"
import { PeriodSelector } from "../components/PeriodSelector"
import { RevenueChart } from "../components/RevenueChart"
import { RevenuePieChart } from "../components/RevenuePieChart"
import { ExpensesPieChart } from "../components/ExpensesPieChart"
import { PaymentMethodsChart } from "../components/PaymentMethodsChart"
import { ExpensesList } from "../components/ExpensesList"
import { ExpenseForm } from "../components/ExpenseForm"
import { ExportModal } from "../components/ExportModal"
import { useAccountingSummary } from "../hooks/useAccountingSummary"
import { useCreateExpense, useUpdateExpense, useDeleteExpense } from "../hooks/useExpenses"
import type { AccountingFilters, ExpenseData } from "../types/accounting.types"
import { Download } from "lucide-react"

const defaultFilters: AccountingFilters = {
  period: "month",
}

export function AccountingPage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<AccountingFilters>(defaultFilters)
  const [exportOpen, setExportOpen] = useState(false)
  const [expenseFormOpen, setExpenseFormOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<ExpenseData | null>(null)

  const { data: summary } = useAccountingSummary(filters)
  const createExpense = useCreateExpense()
  const updateExpense = useUpdateExpense()
  const deleteExpense = useDeleteExpense()

  const periodLabel =
    summary?.period.start && summary?.period.end
      ? `${summary.period.start.slice(8, 10)}/${summary.period.start.slice(5, 7)} - ${summary.period.end.slice(8, 10)}/${summary.period.end.slice(5, 7)}`
      : ""

  const handleSaveExpense = (data: Partial<ExpenseData>) => {
    if (data.id) {
      updateExpense.mutate({ id: data.id, data }, { onSuccess: () => setEditingExpense(null) })
    } else {
      createExpense.mutate(
        { ...data, createdBy: "Dr Martin" },
        { onSuccess: () => setExpenseFormOpen(false) }
      )
    }
  }

  const handleDeleteExpense = (id: string) => {
    if (window.confirm("Supprimer cette dépense ?")) {
      deleteExpense.mutate(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Comptabilité</h1>
        <div className="flex flex-wrap items-center gap-2">
          <PeriodSelector filters={filters} onChange={setFilters} />
          {periodLabel && (
            <span className="text-sm text-muted-foreground">{periodLabel}</span>
          )}
          <Button variant="outline" size="sm" onClick={() => setExportOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <AccountingSummaryCards filters={filters} />

      <RevenueChart />

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenuePieChart filters={filters} />
        <ExpensesPieChart filters={filters} />
      </div>

      <PaymentMethodsChart filters={filters} />

      <ExpensesList
        filters={filters}
        onAddExpense={() => {
          setEditingExpense(null)
          setExpenseFormOpen(true)
        }}
        onEditExpense={(e) => {
          setEditingExpense(e)
          setExpenseFormOpen(true)
        }}
        onDeleteExpense={handleDeleteExpense}
      />

      <div className="flex justify-end">
        <Button variant="link" onClick={() => navigate("/accounting/expenses")}>
          Voir toutes les dépenses →
        </Button>
      </div>

      <ExpenseForm
        open={expenseFormOpen}
        onClose={() => {
          setExpenseFormOpen(false)
          setEditingExpense(null)
        }}
        expense={editingExpense}
        onSave={handleSaveExpense}
      />

      <ExportModal
        open={exportOpen}
        onOpenChange={setExportOpen}
        filters={filters}
      />
    </div>
  )
}
