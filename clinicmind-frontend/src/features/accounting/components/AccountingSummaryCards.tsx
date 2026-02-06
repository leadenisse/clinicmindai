import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAccountingSummary } from "../hooks/useAccountingSummary"
import { formatCurrency } from "../utils/formatCurrency"
import type { AccountingFilters } from "../types/accounting.types"
import { TrendingUp, TrendingDown } from "lucide-react"

interface AccountingSummaryCardsProps {
  filters: AccountingFilters
}

export function AccountingSummaryCards({ filters }: AccountingSummaryCardsProps) {
  const { data: summary, isLoading } = useAccountingSummary(filters)

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader><Skeleton className="h-5 w-24" /></CardHeader>
            <CardContent><Skeleton className="h-8 w-28" /></CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!summary) return null

  const changeEl = (change: number) =>
    change >= 0 ? (
      <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-0.5">
        <TrendingUp className="h-3.5 w-3.5" /> +{change}%
      </span>
    ) : (
      <span className="text-xs text-red-600 dark:text-red-400 flex items-center gap-0.5">
        <TrendingDown className="h-3.5 w-3.5" /> {change}%
      </span>
    )

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-muted-foreground">
            RECETTES
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(summary.totalRevenue)}</p>
          {changeEl(summary.revenueChange)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-muted-foreground">
            DÉPENSES
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(summary.totalExpenses)}</p>
          {changeEl(summary.expensesChange)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-muted-foreground">
            BÉNÉFICE
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(summary.netIncome)}
          </p>
          {changeEl(summary.netIncomeChange)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-muted-foreground">
            ENCAISSÉ
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(summary.totalCollected)}</p>
          <p className="text-xs text-muted-foreground">
            {summary.invoicesPaid} factures payées
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
