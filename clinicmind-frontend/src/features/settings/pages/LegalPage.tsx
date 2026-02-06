import { LegalMentionsForm } from "../components/LegalMentionsForm"

export function LegalPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Mentions légales</h1>
      <p className="text-sm text-muted-foreground">
        Personnalisation des mentions légales pour ordonnances, factures et devis.
      </p>
      <LegalMentionsForm />
    </div>
  )
}
