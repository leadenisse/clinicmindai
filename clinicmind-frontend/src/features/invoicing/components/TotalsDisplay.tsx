import type { Payment } from "../types/invoicing.types"
import { formatCurrency } from "../utils/invoiceCalculations"
import { PAYMENT_METHODS } from "../constants/invoicingConfig"
import {
  Banknote,
  CreditCard,
  FileText,
  ArrowRightLeft,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"

const PAYMENT_ICONS: Record<string, LucideIcon> = {
  Banknote: Banknote,
  CreditCard: CreditCard,
  FileText: FileText,
  ArrowRightLeft: ArrowRightLeft,
  MoreHorizontal: MoreHorizontal,
}

interface TotalsDisplayProps {
  subtotal: number
  totalDiscount: number
  total: number
  payments?: Payment[]
  totalPaid?: number
  remainingBalance?: number
  className?: string
}

export function TotalsDisplay({
  subtotal,
  totalDiscount,
  total,
  payments,
  totalPaid = 0,
  remainingBalance,
  className,
}: TotalsDisplayProps) {
  const showPayments =
    payments &&
    payments.length > 0 &&
    totalPaid !== undefined &&
    remainingBalance !== undefined

  return (
    <div className={className}>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Sous-total HT</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {totalDiscount > 0 && (
          <div className="flex justify-between text-muted-foreground">
            <span>Remises</span>
            <span>- {formatCurrency(totalDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t pt-2 font-medium">
          <span>Total TTC</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {showPayments && (
        <div className="mt-4 space-y-1 border-t pt-4 text-sm">
          <div className="mb-2 font-medium">Paiements</div>
          {payments.map((p) => {
            const methodConfig = PAYMENT_METHODS[p.method]
            const Icon =
              PAYMENT_ICONS[methodConfig.icon as keyof typeof PAYMENT_ICONS] ??
              MoreHorizontal
            return (
              <div
                key={p.id}
                className="flex items-center justify-between gap-2"
              >
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                  {methodConfig.label}
                  {p.reference && (
                    <span className="text-xs">({p.reference})</span>
                  )}
                </span>
                <span>{formatCurrency(p.amount)}</span>
              </div>
            )
          })}
          <div className="flex justify-between border-t pt-2 font-medium">
            <span>Déjà payé</span>
            <span>{formatCurrency(totalPaid)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Reste à payer</span>
            <span>{formatCurrency(remainingBalance ?? 0)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
