import { useNavigate } from "react-router-dom"
import { QuoteForm } from "../components/QuoteForm"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function QuoteCreatePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 p-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/quotes")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Button>
      <h1 className="text-2xl font-semibold">Nouveau devis</h1>
      <QuoteForm
        onSuccess={(quoteId) => navigate(`/quotes/${quoteId}`)}
        onCancel={() => navigate("/quotes")}
      />
    </div>
  )
}
