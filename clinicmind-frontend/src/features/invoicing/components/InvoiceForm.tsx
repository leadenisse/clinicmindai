import { useState } from "react"
import type { LineItem } from "../types/invoicing.types"
import { useCreateInvoice } from "../hooks/useInvoices"
import { calculateTotals } from "../utils/invoiceCalculations"
import { PatientSearchSelect } from "@/features/appointments/components/PatientSearchSelect"
import type { Patient } from "@/features/patients/types/patient.types"
import { LineItemsTable } from "./LineItemsTable"
import { TotalsDisplay } from "./TotalsDisplay"
import { VoiceDictationButton } from "@/features/ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DEFAULT_PAYMENT_DELAY_DAYS } from "../constants/invoicingConfig"
import { addDays, format } from "date-fns"

interface InvoiceFormProps {
  initialPatientId?: string
  initialPatient?: Patient
  onSuccess?: (invoiceId: string) => void
  onCancel?: () => void
}

export function InvoiceForm({
  initialPatientId,
  initialPatient,
  onSuccess,
  onCancel,
}: InvoiceFormProps) {
  const [patientId, setPatientId] = useState(initialPatientId ?? "")
  const [patientDisplay, setPatientDisplay] = useState(
    initialPatient
      ? `${initialPatient.lastName} ${initialPatient.firstName}`
      : ""
  )
  const [items, setItems] = useState<LineItem[]>([])
  const [dueDate, setDueDate] = useState(
    format(addDays(new Date(), DEFAULT_PAYMENT_DELAY_DAYS), "yyyy-MM-dd")
  )
  const [notes, setNotes] = useState("")

  const createInvoice = useCreateInvoice()
  const totals = calculateTotals(items)

  const handlePatientChange = (id: string, patient: Patient) => {
    setPatientId(id)
    setPatientDisplay(`${patient.lastName} ${patient.firstName}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientId || items.length === 0) return
    createInvoice.mutate(
      {
        patientId,
        items: items.map(({ id, total, ...rest }) => rest),
        dueDate,
        notes: notes || undefined,
      },
      {
        onSuccess: (invoice) => {
          onSuccess?.(invoice.id)
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
          <Label htmlFor="dueDate">Date d'échéance *</Label>
          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
        <div className="flex items-center gap-2">
          <Label htmlFor="notes">Notes internes</Label>
          <VoiceDictationButton
            onTranscriptionComplete={(text) =>
              setNotes((prev) => (prev ? prev + "\n" + text : text))
            }
            patientId={patientId || undefined}
            size="sm"
            variant="ghost"
          />
        </div>
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
            createInvoice.isPending || !patientId || items.length === 0
          }
        >
          {createInvoice.isPending ? "Création..." : "Créer la facture"}
        </Button>
      </div>
    </form>
  )
}
