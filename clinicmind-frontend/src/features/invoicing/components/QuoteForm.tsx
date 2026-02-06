import { useState } from "react"
import type { LineItem } from "../types/invoicing.types"
import { useCreateQuote } from "../hooks/useQuotes"
import { calculateTotals } from "../utils/invoiceCalculations"
import { PatientSearchSelect } from "@/features/appointments/components/PatientSearchSelect"
import type { Patient } from "@/features/patients/types/patient.types"
import { LineItemsTable } from "./LineItemsTable"
import { TotalsDisplay } from "./TotalsDisplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DEFAULT_QUOTE_VALIDITY_DAYS } from "../constants/invoicingConfig"
import { addDays, format } from "date-fns"

interface QuoteFormProps {
  initialPatientId?: string
  initialPatient?: Patient
  onSuccess?: (quoteId: string) => void
  onCancel?: () => void
}

export function QuoteForm({
  initialPatientId,
  initialPatient,
  onSuccess,
  onCancel,
}: QuoteFormProps) {
  const [patientId, setPatientId] = useState(initialPatientId ?? "")
  const [patientDisplay, setPatientDisplay] = useState(
    initialPatient
      ? `${initialPatient.lastName} ${initialPatient.firstName}`
      : ""
  )
  const [items, setItems] = useState<LineItem[]>([])
  const [validUntil, setValidUntil] = useState(
    format(addDays(new Date(), DEFAULT_QUOTE_VALIDITY_DAYS), "yyyy-MM-dd")
  )
  const [notes, setNotes] = useState("")
  const [patientNotes, setPatientNotes] = useState("")

  const createQuote = useCreateQuote()
  const totals = calculateTotals(items)

  const handlePatientChange = (id: string, patient: Patient) => {
    setPatientId(id)
    setPatientDisplay(`${patient.lastName} ${patient.firstName}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientId || items.length === 0) return
    createQuote.mutate(
      {
        patientId,
        items: items.map(({ id, total, ...rest }) => rest),
        validUntil,
        notes: notes || undefined,
        patientNotes: patientNotes || undefined,
      },
      {
        onSuccess: (quote) => {
          onSuccess?.(quote.id)
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Patient *</Label>
          <PatientSearchSelect
            onChange={handlePatientChange}
            placeholder="Rechercher un patient"
          />
          {patientDisplay && (
            <p className="text-sm text-muted-foreground">
              Sélectionné : {patientDisplay}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="validUntil">Valide jusqu'au *</Label>
          <Input
            id="validUntil"
            type="date"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label>Lignes d'actes *</Label>
        <LineItemsTable items={items} onChange={setItems} />
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="min-w-[200px]">
          <TotalsDisplay
            subtotal={totals.subtotal}
            totalDiscount={totals.totalDiscount}
            total={totals.total}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="patientNotes">Notes patient (visibles sur le devis)</Label>
        <Textarea
          id="patientNotes"
          value={patientNotes}
          onChange={(e) => setPatientNotes(e.target.value)}
          rows={2}
          placeholder="Ex: Devis valable 3 mois. Prise en charge mutuelle à confirmer."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes internes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
        />
      </div>

      <div className="flex gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        )}
        <Button
          type="submit"
          disabled={
            createQuote.isPending || !patientId || items.length === 0
          }
        >
          {createQuote.isPending ? "Création..." : "Créer le devis"}
        </Button>
      </div>
    </form>
  )
}
