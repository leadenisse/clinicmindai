import { usePlans } from "@/features/subscription/hooks/useSubscription"
import { PLANS } from "@/features/subscription/constants/plans"
import { PlanCard } from "@/features/subscription/components/PlanCard"
import { BillingToggle } from "@/features/subscription/components/BillingToggle"
import { Button } from "@/components/ui/button"
import type { SignupStep3Data } from "../../types/auth.types"

type SignupPlanId = SignupStep3Data["planId"]
const SELECTABLE_PLANS: SignupPlanId[] = ["essentiel", "professionnel", "premium"]

interface Step3PlanProps {
  data: SignupStep3Data
  onChange: (data: SignupStep3Data) => void
  onBack: () => void
  onNext: () => void
}

export function Step3Plan({ data, onChange, onBack, onNext }: Step3PlanProps) {
  const { data: plans } = usePlans()
  const list = plans ?? PLANS
  const selectable = list.filter((p) =>
    SELECTABLE_PLANS.includes(p.id as SignupPlanId)
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <BillingToggle
          value={data.billingCycle}
          onChange={(billingCycle) => onChange({ ...data, billingCycle })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {selectable.map((plan) => (
          <div
            key={plan.id}
            className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
              data.planId === plan.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => onChange({ ...data, planId: plan.id as SignupPlanId })}
          >
            <PlanCard
              plan={plan}
              billingCycle={data.billingCycle}
              showCta={false}
            />
            <Button
              type="button"
              variant={data.planId === plan.id ? "default" : "outline"}
              className="mt-4 w-full"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onChange({ ...data, planId: plan.id as SignupPlanId })
              }}
            >
              Choisir
            </Button>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 text-sm">
        <p className="font-medium text-green-800 dark:text-green-400">
          🎁 30 jours d&apos;essai gratuit inclus
        </p>
        <p className="text-muted-foreground mt-0.5">
          Aucun paiement requis maintenant
        </p>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          ← Retour
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="flex-1"
          disabled={!data.planId}
        >
          Continuer →
        </Button>
      </div>
    </div>
  )
}
