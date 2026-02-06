import { Link } from "react-router-dom"
import { StockAlertsList } from "../components/StockAlertsList"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function StockAlertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/stock">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Alertes de stock</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Produits en stock bas, rupture ou proches de l&apos;expiration.
      </p>
      <StockAlertsList />
    </div>
  )
}
