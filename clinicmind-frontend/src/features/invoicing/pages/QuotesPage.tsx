import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { QuoteList } from "../components/QuoteList"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import type { QuoteFilters } from "../types/invoicing.types"
import type { Quote } from "../types/invoicing.types"

export function QuotesPage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<QuoteFilters>({})

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Devis</h1>
        <Button
          className="gap-2"
          onClick={() => navigate("/quotes/new")}
        >
          <FileText className="h-4 w-4" />
          Nouveau devis
        </Button>
      </div>

      <QuoteList
        filters={filters}
        onFiltersChange={setFilters}
        onView={(q: Quote) => navigate(`/quotes/${q.id}`)}
      />
    </div>
  )
}
