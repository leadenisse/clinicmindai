import type { Invoice } from "../types/invoicing.types"
import { InvoiceStatusBadge } from "./InvoiceStatusBadge"
import { LineItemsTable } from "./LineItemsTable"
import { TotalsDisplay } from "./TotalsDisplay"
import { PaymentModal } from "./PaymentModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState } from "react"
import { useValidateInvoice, useCancelInvoice } from "../hooks/useInvoices"
import { FileCheck, Banknote, XCircle } from "lucide-react"

interface InvoiceDetailProps {
  invoice: Invoice
  onBack?: () => void
}

export function InvoiceDetail({ invoice, onBack }: InvoiceDetailProps) {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const validateInvoice = useValidateInvoice()
  const cancelInvoice = useCancelInvoice()

  const canPay =
    invoice.status !== "cancelled" &&
    invoice.status !== "paid" &&
    invoice.remainingBalance > 0
  const canValidate = invoice.status === "draft"
  const canCancel = invoice.status !== "cancelled" && invoice.status !== "paid"

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{invoice.invoiceNumber}</h1>
          <p className="text-muted-foreground">
            {invoice.patient?.lastName} {invoice.patient?.firstName}
          </p>
        </div>
        <InvoiceStatusBadge status={invoice.status} />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-sm font-medium">Lignes</h2>
        </CardHeader>
        <CardContent>
          <LineItemsTable items={invoice.items} onChange={() => {}} readOnly />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-sm font-medium">Totaux et paiements</h2>
          </CardHeader>
          <CardContent>
            <TotalsDisplay
              subtotal={invoice.subtotal}
              totalDiscount={invoice.totalDiscount}
              total={invoice.total}
              payments={invoice.payments}
              totalPaid={invoice.totalPaid}
              remainingBalance={invoice.remainingBalance}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-sm font-medium">Informations</h2>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Émission : </span>
              {invoice.issueDate}
            </p>
            <p>
              <span className="text-muted-foreground">Échéance : </span>
              {invoice.dueDate}
            </p>
            {invoice.notes && (
              <p>
                <span className="text-muted-foreground">Notes : </span>
                {invoice.notes}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Retour
          </Button>
        )}
        {canValidate && (
          <Button
            variant="default"
            className="gap-2"
            onClick={() => validateInvoice.mutate(invoice.id)}
            disabled={validateInvoice.isPending}
          >
            <FileCheck className="h-4 w-4" />
            Valider la facture
          </Button>
        )}
        {canPay && (
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setPaymentModalOpen(true)}
          >
            <Banknote className="h-4 w-4" />
            Enregistrer un paiement
          </Button>
        )}
        {canCancel && (
          <Button
            variant="outline"
            className="gap-2 text-destructive hover:text-destructive"
            onClick={() => cancelInvoice.mutate(invoice.id)}
            disabled={cancelInvoice.isPending}
          >
            <XCircle className="h-4 w-4" />
            Annuler la facture
          </Button>
        )}
      </div>

      <PaymentModal
        invoice={invoice}
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={() => setPaymentModalOpen(false)}
      />
    </div>
  )
}
