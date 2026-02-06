import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import type { DocumentTemplatesData } from "../../types/onboarding.types"

const DEFAULT_HEADER = `Dr Jean Martin
Chirurgien-Dentiste
N° RPPS : 12345678901

Cabinet Dentaire du Soleil
15 avenue des Fleurs - 06000 Nice
Tél : 04 93 00 00 00`

interface DocumentTemplatesStepProps {
  data: DocumentTemplatesData
  onChange: (data: DocumentTemplatesData) => void
  prescriptionHeader?: string
}

export function DocumentTemplatesStep({
  data,
  onChange,
  prescriptionHeader = DEFAULT_HEADER,
}: DocumentTemplatesStepProps) {
  const header = data.prescriptionHeader ?? prescriptionHeader

  return (
    <div className="space-y-8">
      <Label>Vérifiez vos modèles de documents</Label>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">En-tête des ordonnances :</p>
        <Card>
          <CardContent className="pt-4">
            <pre className="whitespace-pre-wrap text-sm font-sans">{header}</pre>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {}}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Personnaliser
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange({ ...data, invoicePreviewViewed: true })}
        >
          Aperçu facture : Voir
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange({ ...data, quotePreviewViewed: true })}
        >
          Aperçu devis : Voir
        </Button>
      </div>
    </div>
  )
}
