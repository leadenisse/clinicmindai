import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useRevenueByMonth } from "../hooks/useRevenue"
import { formatCurrency } from "../utils/formatCurrency"

const currentYear = new Date().getFullYear()

export function RevenueChart() {
  const { data: monthly = [], isLoading } = useRevenueByMonth(currentYear)

  if (isLoading) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
        <CardContent><Skeleton className="h-48 w-full" /></CardContent>
      </Card>
    )
  }

  const maxVal = Math.max(
    ...monthly.map((m) => Math.max(m.revenue, m.expenses)),
    1
  )

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Évolution annuelle</h2>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-1 h-40">
          {monthly.map((m) => (
            <div
              key={m.month}
              className="flex flex-1 flex-col items-center gap-1"
              title={`${m.label}: Recettes ${formatCurrency(m.revenue)}, Dépenses ${formatCurrency(m.expenses)}`}
            >
              <div className="w-full flex gap-0.5 justify-center items-end" style={{ height: "100%" }}>
                <div
                  className="flex-1 max-w-3 rounded-t bg-primary/80 min-w-1"
                  style={{
                    height: `${(m.revenue / maxVal) * 100}%`,
                    minHeight: m.revenue > 0 ? 4 : 0,
                  }}
                />
                <div
                  className="flex-1 max-w-3 rounded-t bg-destructive/60 min-w-1"
                  style={{
                    height: `${(m.expenses / maxVal) * 100}%`,
                    minHeight: m.expenses > 0 ? 4 : 0,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground truncate w-full text-center">
                {m.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 pt-4 border-t text-sm">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-primary/80" /> Recettes
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-destructive/60" /> Dépenses
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
