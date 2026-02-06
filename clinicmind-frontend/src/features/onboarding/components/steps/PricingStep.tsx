import { Button } from "@/components/ui/button"
import { PriceEditor } from "../PriceEditor"
import type { PricingData } from "../../types/onboarding.types"

const SAMPLE_ACTS = [
  { id: "consultation", label: "Consultation (C)", defaultPrice: 23 },
  { id: "consultation_spec", label: "Consultation spécialiste (CS)", defaultPrice: 25 },
  { id: "couronne_ceramique", label: "Couronne céramique", defaultPrice: 550 },
  { id: "couronne_ceramo", label: "Couronne céramo-métallique", defaultPrice: 450 },
  { id: "inlay_core", label: "Inlay-core", defaultPrice: 250 },
]

interface PricingStepProps {
  data: PricingData
  onChange: (data: PricingData) => void
}

export function PricingStep({ data, onChange }: PricingStepProps) {
  const prices = data.actPrices ?? {}
  const useConventional = data.useConventionalRates ?? true

  const setPrice = (id: string, value: number) => {
    onChange({
      ...data,
      actPrices: { ...data.actPrices, [id]: value },
    })
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Ajustez vos tarifs (vous pourrez les modifier plus tard) :
      </p>
      <div className="space-y-4">
        <p className="font-medium">CONSULTATIONS</p>
        {SAMPLE_ACTS.filter((a) => a.id.startsWith("consultation")).map((act) => (
          <PriceEditor
            key={act.id}
            label={act.label}
            value={prices[act.id] ?? act.defaultPrice}
            onChange={(v) => setPrice(act.id, v)}
          />
        ))}
      </div>
      <div className="space-y-4">
        <p className="font-medium">PROTHÈSES (Hors nomenclature)</p>
        {SAMPLE_ACTS.filter((a) => !a.id.startsWith("consultation")).map((act) => (
          <PriceEditor
            key={act.id}
            label={act.label}
            value={prices[act.id] ?? act.defaultPrice}
            onChange={(v) => setPrice(act.id, v)}
          />
        ))}
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={useConventional}
          onChange={(e) =>
            onChange({ ...data, useConventionalRates: e.target.checked })
          }
        />
        <span className="text-sm">
          Utiliser les tarifs conventionnels pour les actes CCAM
        </span>
      </label>
      <Button type="button" variant="outline" size="sm">
        Voir tous les actes (18)
      </Button>
    </div>
  )
}
