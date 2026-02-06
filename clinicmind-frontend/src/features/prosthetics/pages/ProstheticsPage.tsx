import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProstheticOrderList } from "../components/ProstheticOrderList"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"
import type { ProstheticOrder } from "../types/prosthetics.types"
import type { OrderFilters } from "../types/prosthetics.types"

export function ProstheticsPage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<OrderFilters>({})

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Prothésiste</h1>
        <Button
          className="gap-2"
          onClick={() => navigate("/prosthetics/new")}
        >
          <Package className="h-4 w-4" />
          Nouvelle commande
        </Button>
      </div>

      <ProstheticOrderList
        filters={filters}
        onFiltersChange={setFilters}
        onView={(order: ProstheticOrder) =>
          navigate(`/prosthetics/${order.id}`)
        }
      />
    </div>
  )
}
