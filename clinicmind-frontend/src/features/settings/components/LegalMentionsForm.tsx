import { useState, useEffect } from "react"
import { useLegalMentions, useUpdateLegalMentions } from "../hooks/useLegalMentions"
import { LEGAL_VARIABLES } from "../constants/settingsConfig"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { LegalMentions } from "../types/settings.types"

export function LegalMentionsForm() {
  const { data: legal, isLoading } = useLegalMentions()
  const updateLegal = useUpdateLegalMentions()
  const [form, setForm] = useState<LegalMentions>({})

  useEffect(() => {
    if (legal) {
      setForm({
        prescriptionHeader: legal.prescriptionHeader ?? "",
        prescriptionFooter: legal.prescriptionFooter ?? "",
        invoiceFooter: legal.invoiceFooter ?? "",
        quoteFooter: legal.quoteFooter ?? "",
        consentTemplate: legal.consentTemplate ?? "",
      })
    }
  }, [legal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateLegal.mutate(form)
  }

  if (isLoading || !legal) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Variables disponibles</p>
        <p className="mt-1">
          {LEGAL_VARIABLES.join(", ")} — à utiliser tels quels dans les textes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Ordonnances</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prescriptionHeader">En-tête</Label>
            <Textarea
              id="prescriptionHeader"
              value={form.prescriptionHeader ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, prescriptionHeader: e.target.value }))
              }
              rows={2}
              placeholder="Dr [Nom] - Cabinet [Nom]"
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prescriptionFooter">Pied de page</Label>
            <Textarea
              id="prescriptionFooter"
              value={form.prescriptionFooter ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, prescriptionFooter: e.target.value }))
              }
              rows={2}
              placeholder="Ordonnance valable 3 mois. Pas de substitution."
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Factures</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceFooter">Mentions légales / conditions de paiement</Label>
            <Textarea
              id="invoiceFooter"
              value={form.invoiceFooter ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, invoiceFooter: e.target.value }))
              }
              rows={3}
              placeholder="TVA non applicable, art. 293 B du CGI. En cas de retard..."
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Devis</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quoteFooter">Mentions légales</Label>
            <Textarea
              id="quoteFooter"
              value={form.quoteFooter ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, quoteFooter: e.target.value }))
              }
              rows={2}
              placeholder="Devis valable 30 jours. Acompte 30% à la commande."
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Consentement</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="consentTemplate">Modèle de consentement</Label>
            <Textarea
              id="consentTemplate"
              value={form.consentTemplate ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, consentTemplate: e.target.value }))
              }
              rows={3}
              placeholder="J'atteste avoir été informé des actes et risques."
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={updateLegal.isPending}>
        {updateLegal.isPending ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  )
}
