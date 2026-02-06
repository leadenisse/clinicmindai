import { useParams, useNavigate } from "react-router-dom"
import { useInvoice } from "../hooks/useInvoices"
import { InvoiceDetail } from "../components/InvoiceDetail"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

export function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: invoice, isLoading, isError } = useInvoice(id ?? "")

  if (!id) {
    navigate("/invoices", { replace: true })
    return null
  }

  if (isError) {
    return (
      <div className="space-y-4 p-6">
        <Button variant="ghost" onClick={() => navigate("/invoices")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <p className="text-destructive">Facture non trouvée.</p>
      </div>
    )
  }

  if (isLoading || !invoice) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <InvoiceDetail
        invoice={invoice}
        onBack={() => navigate("/invoices")}
      />
    </div>
  )
}
