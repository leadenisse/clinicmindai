import { Link } from "react-router-dom"
import { PlanBadge } from "./PlanBadge"
import { FeatureList } from "./FeatureList"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Plan } from "../types/subscription.types"
import type { BillingCycle } from "../types/subscription.types"

interface PlanCardProps {
  plan: Plan
  billingCycle: BillingCycle
  onSelect?: (planId: Plan["id"]) => void
  isCurrentPlan?: boolean
  isSelected?: boolean
  showCta?: boolean
}

export function PlanCard({
  plan,
  billingCycle,
  onSelect,
  isCurrentPlan = false,
  isSelected = false,
  showCta = true,
}: PlanCardProps) {
  const price =
    billingCycle === "annual"
      ? plan.priceAnnual / 12
      : plan.priceMonthly
  const displayPrice = plan.customQuote
    ? "Sur devis"
    : `${Math.round(price).toLocaleString("fr-FR")} €`
  const periodLabel = plan.customQuote
    ? ""
    : billingCycle === "annual"
      ? "/mois (facturé annuellement)"
      : "/mois"

  return (
    <Card
      className={`relative flex flex-col ${
        plan.recommended ? "border-primary shadow-md" : ""
      } ${isCurrentPlan || isSelected ? "ring-2 ring-primary" : ""}`}
    >
      {plan.recommended && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <PlanBadge />
        </div>
      )}
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
        <div className="pt-2">
          <span className="text-3xl font-bold">{displayPrice}</span>
          {periodLabel && (
            <span className="text-muted-foreground text-sm"> {periodLabel}</span>
          )}
        </div>
        {billingCycle === "annual" && !plan.customQuote && (
          <p className="text-xs text-muted-foreground">
            Soit {plan.priceAnnual.toLocaleString("fr-FR")} €/an
          </p>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <FeatureList
          features={plan.features}
          showExcluded={!!plan.excluded?.length}
          excluded={plan.excluded ?? []}
        />
        {showCta && (
          <div className="mt-auto pt-4">
            {isCurrentPlan ? (
              <Button variant="outline" className="w-full" disabled>
                Plan actuel
              </Button>
            ) : isSelected && onSelect ? (
              <Button className="w-full" disabled>
                ✓ Sélectionné
              </Button>
            ) : plan.customQuote ? (
              <Button variant="default" className="w-full" asChild>
                <a href="mailto:contact@clinicmind.fr?subject=Devis%20Plan%20Groupe">
                  Nous contacter
                </a>
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() => onSelect?.(plan.id)}
                asChild={typeof onSelect === "undefined"}
              >
                {onSelect ? (
                  <span>Choisir ce plan</span>
                ) : (
                  <Link to="/pricing">Choisir ce plan</Link>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
