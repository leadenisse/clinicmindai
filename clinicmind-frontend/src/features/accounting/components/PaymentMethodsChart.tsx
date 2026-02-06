import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useAccountingSummary } from "../hooks/useAccountingSummary"
import { formatCurrency } from "../utils/formatCurrency"
import { PAYMENT_METHODS } from "../constants/accounting.constants"
import type { AccountingFilters, PaymentMethod } from "../types/accounting.types"
import { CreditCard, Banknote, FileText, ArrowRightLeft, MoreHorizontal } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const ICONS = {
  CreditCard,
  Banknote,
  FileText,
  ArrowRightLeft,
  MoreHorizontal,
}

interface PaymentMethodsChartProps {
  filters: AccountingFilters
}

export function PaymentMethodsChart({ filters }: PaymentMethodsChartProps) {
  const { data: summary, isLoading } = useAccountingSummary(filters)

  if (isLoading) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
        <CardContent><Skeleton className="h-32" /></CardContent>
      </Card>
    )
  }

  if (!summary) return null

  const total = summary.totalCollected || 1
  const methods: PaymentMethod[] = ["card", "cash", "check", "transfer", "other"]

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Modes de paiement</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        {methods.map((key) => {
          const amount = summary.collectedByMethod[key] ?? 0
          const config = PAYMENT_METHODS[key]
          const Icon = ICONS[config.icon as keyof typeof ICONS]
          const pct = (amount / total) * 100
          return (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                  {config.label}
                </span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: config.color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
