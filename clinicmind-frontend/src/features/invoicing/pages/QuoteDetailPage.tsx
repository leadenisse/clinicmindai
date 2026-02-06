import { useParams, useNavigate } from "react-router-dom"
import { useQuote } from "../hooks/useQuotes"
import { QuoteDetail } from "../components/QuoteDetail"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

export function QuoteDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: quote, isLoading, isError } = useQuote(id ?? "")

  if (!id) {
    navigate("/quotes", { replace: true })
    return null
  }

  if (isError) {
    return (
      <div className="space-y-4 p-6">
        <Button variant="ghost" onClick={() => navigate("/quotes")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <p className="text-destructive">Devis non trouvé.</p>
      </div>
    )
  }

  if (isLoading || !quote) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <QuoteDetail
        quote={quote}
        onBack={() => navigate("/quotes")}
        onConvertedToInvoice={(invoiceId) => navigate(`/invoices/${invoiceId}`)}
      />
    </div>
  )
}
