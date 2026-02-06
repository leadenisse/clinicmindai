import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { InvoiceList } from "../components/InvoiceList"
import { ExportButton } from "../components/ExportButton"
import { Button } from "@/components/ui/button"
import { FilePlus } from "lucide-react"
import type { InvoiceFilters } from "../types/invoicing.types"
import type { Invoice } from "../types/invoicing.types"

export function InvoicesPage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<InvoiceFilters>({})

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Facturation</h1>
        <div className="flex gap-2">
          <ExportButton filters={filters} />
          <Button
            className="gap-2"
            onClick={() => navigate("/invoices/new")}
          >
            <FilePlus className="h-4 w-4" />
            Nouvelle facture
          </Button>
        </div>
      </div>

      <InvoiceList
        filters={filters}
        onFiltersChange={setFilters}
        onView={(inv: Invoice) => navigate(`/invoices/${inv.id}`)}
      />
    </div>
  )
}
