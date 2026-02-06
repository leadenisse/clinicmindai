import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { LegalMentionsData } from "../../types/onboarding.types"

interface LegalMentionsStepProps {
  data: LegalMentionsData
  onChange: (data: LegalMentionsData) => void
}

export function LegalMentionsStep({ data, onChange }: LegalMentionsStepProps) {
  return (
    <div className="space-y-8">
      <Label>Personnalisez vos mentions légales</Label>
      <div className="space-y-2">
        <Label className="text-muted-foreground">Pied de page ordonnances</Label>
        <Textarea
          placeholder="Ne pas renouveler sauf mention contraire"
          value={data.prescriptionFooter ?? ""}
          onChange={(e) => onChange({ ...data, prescriptionFooter: e.target.value })}
          rows={2}
          className="resize-none"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-muted-foreground">Conditions de paiement factures</Label>
        <Textarea
          placeholder="Règlement à réception. Pénalités de retard : 3x taux légal."
          value={data.invoiceFooter ?? ""}
          onChange={(e) => onChange({ ...data, invoiceFooter: e.target.value })}
          rows={3}
          className="resize-none"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-muted-foreground">Coordonnées bancaires (virements)</Label>
        <Textarea
          placeholder="IBAN : FR76 XXXX ...\nBIC : XXXXXXXX"
          value={data.bankDetails ?? ""}
          onChange={(e) => onChange({ ...data, bankDetails: e.target.value })}
          rows={3}
          className="resize-none font-mono text-sm"
        />
      </div>
    </div>
  )
}
