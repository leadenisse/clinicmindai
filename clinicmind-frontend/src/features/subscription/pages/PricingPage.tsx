import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePlans } from "../hooks/useSubscription"
import { PLANS, SPECIAL_OFFERS } from "../constants/plans"
import { PlanCard } from "../components/PlanCard"
import { PricingTable } from "../components/PricingTable"
import { BillingToggle } from "../components/BillingToggle"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { BillingCycle, PlanId } from "../types/subscription.types"
import { ArrowRight } from "lucide-react"

const GROUPE_PLAN = PLANS.find((p) => p.id === "groupe")

export function PricingPage() {
  const navigate = useNavigate()
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("professionnel")
  const { data: plans } = usePlans()
  const list = plans ?? PLANS
  const mainPlans = list.filter((p) => !p.customQuote)

  const handleContinue = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("selectedPlan", selectedPlanId)
      window.localStorage.setItem("billingCycle", billingCycle)
    }
    navigate("/onboarding")
  }

  const selectedPlan = mainPlans.find((p) => p.id === selectedPlanId) ?? mainPlans[1]

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12">
        <header className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Choisissez votre plan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Commencez avec 30 jours d&apos;essai gratuit. Aucune carte bancaire requise.
          </p>
          <div className="flex justify-center pt-4">
            <BillingToggle value={billingCycle} onChange={setBillingCycle} />
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {mainPlans.map((plan) => (
            <div
              key={plan.id}
              role="button"
              tabIndex={0}
              onClick={() => !plan.customQuote && setSelectedPlanId(plan.id)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                !plan.customQuote &&
                setSelectedPlanId(plan.id)
              }
              className={`cursor-pointer transition-all duration-200 ${
                plan.recommended ? "md:scale-[1.02]" : ""
              }`}
            >
              <PlanCard
                plan={plan}
                billingCycle={billingCycle}
                showCta={true}
                onSelect={setSelectedPlanId}
                isCurrentPlan={false}
                isSelected={selectedPlanId === plan.id}
              />
            </div>
          ))}
        </section>

        <div className="text-center space-y-4">
          <Button
            size="lg"
            className="gap-2 shadow-lg"
            onClick={handleContinue}
          >
            Continuer avec {selectedPlan?.name ?? "Professionnel"}
            <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="text-sm text-muted-foreground">
            30 jours d&apos;essai gratuit • Sans engagement • Annulable à tout moment
          </p>
        </div>

        {GROUPE_PLAN && (
          <section className="rounded-2xl bg-navy-900 p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">
              Besoin d&apos;une solution sur mesure ?
            </h3>
            <p className="text-navy-200 mb-6 max-w-xl mx-auto">
              Pour les groupes de cabinets, les centres de santé ou les besoins spécifiques,
              contactez-nous pour un devis personnalisé.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <a href="mailto:contact@clinicmind.fr?subject=Devis%20Plan%20Groupe">
                Contacter l&apos;équipe commerciale
              </a>
            </Button>
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold mb-4">Tableau comparatif</h2>
          <PricingTable billingCycle={billingCycle} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Offres spéciales</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIAL_OFFERS.map((offer) => (
              <Card key={offer.id}>
                <CardContent className="pt-4">
                  <p className="font-medium">{offer.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {offer.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-center mb-6">
            Questions fréquentes
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="font-medium mb-1">Puis-je changer de plan ?</h4>
              <p className="text-sm text-muted-foreground">
                Oui, vous pouvez upgrader ou downgrader à tout moment depuis les paramètres.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Mes données sont-elles sécurisées ?</h4>
              <p className="text-sm text-muted-foreground">
                Hébergement HDS certifié, chiffrement AES-256, conformité RGPD.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Comment fonctionne l&apos;essai gratuit ?</h4>
              <p className="text-sm text-muted-foreground">
                30 jours complets sur le plan Professionnel, aucune carte requise.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
