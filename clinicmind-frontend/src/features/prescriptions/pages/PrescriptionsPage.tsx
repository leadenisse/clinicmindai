import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PrescriptionsList } from "../components/PrescriptionsList"
import type { Prescription, PrescriptionFilters } from "../types/prescription.types"
import { FilePlus } from "lucide-react"

export function PrescriptionsPage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<PrescriptionFilters>({})

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Ordonnances</h1>
        <Button
          className="gap-2"
          onClick={() => navigate("/prescriptions/new")}
        >
          <FilePlus className="h-4 w-4" />
          Nouvelle ordonnance
        </Button>
      </div>

      <PrescriptionsList
        filters={filters}
        onFiltersChange={setFilters}
        onView={(p: Prescription) => navigate(`/prescriptions/${p.id}`)}
      />
    </div>
  )
}
