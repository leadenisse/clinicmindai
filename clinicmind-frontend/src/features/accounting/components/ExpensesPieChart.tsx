import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useExpensesByCategory } from "../hooks/useExpenses"
import { formatCurrency } from "../utils/formatCurrency"
import type { AccountingFilters } from "../types/accounting.types"

interface ExpensesPieChartProps {
  filters: AccountingFilters
}

export function ExpensesPieChart({ filters }: ExpensesPieChartProps) {
  const { data: categories = [], isLoading } = useExpensesByCategory(filters)

  if (isLoading) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
        <CardContent><Skeleton className="h-48" /></CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Dépenses par catégorie</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <div
            className="h-32 w-32 rounded-full border-4 border-background shadow"
            style={{
              background: `conic-gradient(${categories
                .map(
                  (c, i) =>
                    `${c.color} ${categories
                      .slice(0, i)
                      .reduce((s, x) => s + x.percentage, 0)}% ${categories
                      .slice(0, i + 1)
                      .reduce((s, x) => s + x.percentage, 0)}%`
                )
                .join(", ")})`,
            }}
          />
        </div>
        <ul className="space-y-2">
          {categories.slice(0, 6).map((c) => (
            <li
              key={c.category}
              className="flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ backgroundColor: c.color }}
                />
                {c.label}
              </span>
              <span>
                {formatCurrency(c.amount)} ({c.percentage.toFixed(0)}%)
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
