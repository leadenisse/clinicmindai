import { useNavigate } from "react-router-dom"
import { usePatientProstheticOrders } from "../hooks/useProsthetics"
import { ProstheticOrderCard } from "../components/ProstheticOrderCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Package } from "lucide-react"

interface PatientProstheticsTabProps {
  patientId: string
}

export function PatientProstheticsTab({ patientId }: PatientProstheticsTabProps) {
  const navigate = useNavigate()
  const { data: orders = [], isLoading } = usePatientProstheticOrders(patientId)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => navigate("/prosthetics/new")}
        >
          <Package className="h-4 w-4" />
          Nouvelle commande
        </Button>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucune commande de prothèse pour ce patient.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <ProstheticOrderCard
              key={order.id}
              order={order}
              onView={(o) => navigate(`/prosthetics/${o.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
