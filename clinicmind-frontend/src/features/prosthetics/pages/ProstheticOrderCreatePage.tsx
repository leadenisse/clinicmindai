import { useNavigate } from "react-router-dom"
import { ProstheticOrderForm } from "../components/ProstheticOrderForm"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function ProstheticOrderCreatePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 p-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/prosthetics")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Button>
      <h1 className="text-2xl font-semibold">Nouvelle commande prothèse</h1>
      <ProstheticOrderForm
        onSuccess={(orderId) => navigate(`/prosthetics/${orderId}`)}
        onCancel={() => navigate("/prosthetics")}
      />
    </div>
  )
}
