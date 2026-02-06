import { useNavigate } from "react-router-dom"
import type { Patient } from "@/features/patients/types/patient.types"
import { usePatientInvoices } from "../hooks/useInvoices"
import { usePatientQuotes } from "../hooks/useQuotes"
import { InvoiceStatusBadge } from "../components/InvoiceStatusBadge"
import { QuoteStatusBadge } from "../components/QuoteStatusBadge"
import { formatCurrency } from "../utils/invoiceCalculations"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FilePlus, FileText } from "lucide-react"

interface PatientInvoicesTabProps {
  patientId: string
  patient?: Patient
}

export function PatientInvoicesTab({ patientId }: PatientInvoicesTabProps) {
  const navigate = useNavigate()
  const { data: invoices = [], isLoading: invoicesLoading } =
    usePatientInvoices(patientId)
  const { data: quotes = [], isLoading: quotesLoading } =
    usePatientQuotes(patientId)

  const isLoading = invoicesLoading || quotesLoading

  const openQuotes = quotes.filter(
    (q) =>
      q.status !== "converted" &&
      q.status !== "rejected" &&
      q.status !== "expired"
  )
  const convertedOrClosed = quotes.filter(
    (q) =>
      q.status === "converted" || q.status === "rejected" || q.status === "expired"
  )

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => navigate("/quotes/new")}
        >
          <FileText className="h-4 w-4" />
          Nouveau devis
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => navigate("/invoices/new")}
        >
          <FilePlus className="h-4 w-4" />
          Nouvelle facture
        </Button>
      </div>

      <section>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Devis en cours
        </h3>
        {openQuotes.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun devis en cours.</p>
        ) : (
          <ul className="space-y-2">
            {openQuotes.map((q) => (
              <li key={q.id}>
                <Card>
                  <CardContent className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm">
                        {q.quoteNumber}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {q.validUntil}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(q.total)}
                      </span>
                      <QuoteStatusBadge status={q.status} size="sm" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/quotes/${q.id}`)}
                    >
                      Voir
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Factures
        </h3>
        {invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune facture.</p>
        ) : (
          <ul className="space-y-2">
            {invoices.map((inv) => (
              <li key={inv.id}>
                <Card>
                  <CardContent className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm">
                        {inv.invoiceNumber}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {inv.issueDate}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(inv.total)}
                      </span>
                      {inv.remainingBalance > 0 && (
                        <span className="text-sm text-muted-foreground">
                          Reste {formatCurrency(inv.remainingBalance)}
                        </span>
                      )}
                      <InvoiceStatusBadge status={inv.status} size="sm" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/invoices/${inv.id}`)}
                    >
                      Voir
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      {convertedOrClosed.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Devis clôturés
          </h3>
          <ul className="space-y-2">
            {convertedOrClosed.map((q) => (
              <li key={q.id}>
                <Card>
                  <CardContent className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm">
                        {q.quoteNumber}
                      </span>
                      <QuoteStatusBadge status={q.status} size="sm" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/quotes/${q.id}`)}
                    >
                      Voir
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
