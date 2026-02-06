import { useState } from "react"
import { usePlans, useCurrentSubscription, useChangePlan } from "../hooks/useSubscription"
import { CurrentPlanCard } from "../components/CurrentPlanCard"
import { PlanCard } from "../components/PlanCard"
import { BillingToggle } from "../components/BillingToggle"
import { PLANS } from "../constants/plans"
import type { BillingCycle, PlanId } from "../types/subscription.types"

export function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")
  const { data: subscription } = useCurrentSubscription()
  const { data: plans } = usePlans()
  const changePlan = useChangePlan()

  const list = plans ?? PLANS
  const currentPlanId = subscription?.planId

  const handleSelectPlan = (planId: PlanId) => {
    changePlan.mutate({ planId, billingCycle })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Facturation et abonnement</h1>
        <p className="text-muted-foreground mt-1">
          Gérez votre plan et consultez votre prochaine échéance.
        </p>
      </div>

      <CurrentPlanCard />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Changer de plan</h2>
          <BillingToggle value={billingCycle} onChange={setBillingCycle} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {list.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              isCurrentPlan={plan.id === currentPlanId}
              onSelect={handleSelectPlan}
              showCta={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
