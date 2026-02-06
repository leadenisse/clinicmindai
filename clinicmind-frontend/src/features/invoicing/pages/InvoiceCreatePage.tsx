import { useNavigate } from "react-router-dom"
import { InvoiceForm } from "../components/InvoiceForm"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function InvoiceCreatePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 p-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/invoices")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Button>
      <h1 className="text-2xl font-semibold">Nouvelle facture</h1>
      <InvoiceForm
        onSuccess={(invoiceId) => navigate(`/invoices/${invoiceId}`)}
        onCancel={() => navigate("/invoices")}
      />
    </div>
  )
}
