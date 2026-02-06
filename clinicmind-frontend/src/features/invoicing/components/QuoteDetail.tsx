import type { Quote } from "../types/invoicing.types"
import { QuoteStatusBadge } from "./QuoteStatusBadge"
import { LineItemsTable } from "./LineItemsTable"
import { TotalsDisplay } from "./TotalsDisplay"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useUpdateQuoteStatus, useConvertQuoteToInvoice } from "../hooks/useQuotes"
import { ArrowRight, CheckCircle, Send } from "lucide-react"

interface QuoteDetailProps {
  quote: Quote
  onBack?: () => void
  onConvertedToInvoice?: (invoiceId: string) => void
}

export function QuoteDetail({
  quote,
  onBack,
  onConvertedToInvoice,
}: QuoteDetailProps) {
  const updateStatus = useUpdateQuoteStatus()
  const convertToInvoice = useConvertQuoteToInvoice()

  const canSend = quote.status === "draft"
  const canAccept = quote.status === "sent"
  const canConvert =
    quote.status === "accepted" && !quote.convertedToInvoiceId

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{quote.quoteNumber}</h1>
          <p className="text-muted-foreground">
            {quote.patient?.lastName} {quote.patient?.firstName}
          </p>
        </div>
        <QuoteStatusBadge status={quote.status} />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-sm font-medium">Lignes</h2>
        </CardHeader>
        <CardContent>
          <LineItemsTable items={quote.items} onChange={() => {}} readOnly />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-sm font-medium">Totaux</h2>
          </CardHeader>
          <CardContent>
            <TotalsDisplay
              subtotal={quote.subtotal}
              totalDiscount={quote.totalDiscount}
              total={quote.total}
            />
            {quote.estimatedRAC != null && (
              <p className="mt-2 text-sm text-muted-foreground">
                RAC estimé : {quote.estimatedRAC.toFixed(2)} €
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-sm font-medium">Informations</h2>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Valide jusqu'au : </span>
              {quote.validUntil}
            </p>
            {quote.patientNotes && (
              <p>
                <span className="text-muted-foreground">Notes patient : </span>
                {quote.patientNotes}
              </p>
            )}
            {quote.notes && (
              <p>
                <span className="text-muted-foreground">Notes : </span>
                {quote.notes}
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
        {canSend && (
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => updateStatus.mutate({ id: quote.id, status: "sent" })}
            disabled={updateStatus.isPending}
          >
            <Send className="h-4 w-4" />
            Marquer envoyé
          </Button>
        )}
        {canAccept && (
          <Button
            variant="outline"
            className="gap-2"
            onClick={() =>
              updateStatus.mutate({ id: quote.id, status: "accepted" })
            }
            disabled={updateStatus.isPending}
          >
            <CheckCircle className="h-4 w-4" />
            Accepter
          </Button>
        )}
        {canConvert && (
          <Button
            variant="default"
            className="gap-2"
            onClick={() =>
              convertToInvoice.mutate(quote.id, {
                onSuccess: ({ invoiceId }) => {
                  onConvertedToInvoice?.(invoiceId)
                },
              })
            }
            disabled={convertToInvoice.isPending}
          >
            <ArrowRight className="h-4 w-4" />
            Convertir en facture
          </Button>
        )}
      </div>
    </div>
  )
}
