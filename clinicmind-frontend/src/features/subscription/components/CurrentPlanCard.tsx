import { Link } from "react-router-dom"
import { useCurrentSubscription } from "../hooks/useSubscription"
import { getPlanById } from "../constants/plans"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CreditCard } from "lucide-react"

export function CurrentPlanCard() {
  const { data: subscription, isLoading } = useCurrentSubscription()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    )
  }

  const plan = subscription ? getPlanById(subscription.planId) : null
  const isAnnual = subscription?.billingCycle === "annual"
  const price = plan
    ? isAnnual
      ? plan.priceAnnual / 12
      : plan.priceMonthly
    : 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold">Votre abonnement</h3>
        <Badge
          variant={
            subscription?.status === "active" ? "default" : "secondary"
          }
        >
          {subscription?.status === "active" ? "Actif" : subscription?.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {plan && (
          <>
            <div>
              <p className="font-medium">{plan.name}</p>
              <p className="text-2xl font-bold">
                {Math.round(price).toLocaleString("fr-FR")} €
                <span className="text-sm font-normal text-muted-foreground">
                  /mois {isAnnual && "(facturé annuellement)"}
                </span>
              </p>
            </div>
            {subscription?.currentPeriodEnd && (
              <p className="text-sm text-muted-foreground">
                Prochaine échéance :{" "}
                {format(new Date(subscription.currentPeriodEnd), "dd MMMM yyyy", {
                  locale: fr,
                })}
              </p>
            )}
            <Button variant="outline" className="w-full gap-2" asChild>
              <Link to="/pricing">
                <CreditCard className="h-4 w-4" />
                Changer de plan
              </Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
