import { Card, CardContent } from "@/components/ui/card"
import { getFrequencyLabel, getDurationLabel, getFormLabel } from "../utils/formatPrescription"
import type { Prescription, PrescriptionMedication } from "../types/prescription.types"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

const DEFAULT_HEADER = `Dr Jean Martin
Chirurgien-Dentiste
N° RPPS : 12345678901

Cabinet Dentaire du Soleil
15 avenue des Fleurs - 06000 Nice
Tél : 04 93 00 00 00`

interface PrescriptionPreviewProps {
  prescription: Partial<Prescription> & {
    title?: string
    patientName?: string
    medications: PrescriptionMedication[]
    content?: string
  }
  headerText?: string
  showSignature?: boolean
}

export function PrescriptionPreview({
  prescription,
  headerText = DEFAULT_HEADER,
  showSignature = true,
}: PrescriptionPreviewProps) {
  const date = prescription.updatedAt
    ? format(new Date(prescription.updatedAt), "dd/MM/yyyy", { locale: fr })
    : format(new Date(), "dd/MM/yyyy", { locale: fr })

  return (
    <Card className="bg-white text-black print:shadow-none">
      <CardContent className="p-6 space-y-6">
        <pre className="whitespace-pre-wrap text-sm font-sans">{headerText}</pre>
        <hr />
        <div className="flex justify-between text-sm">
          <span>Patient : {prescription.patientName ?? "—"}</span>
          <span>Date : {date}</span>
        </div>
        {prescription.title && (
          <p className="font-semibold">{prescription.title}</p>
        )}
        {prescription.medications?.length > 0 ? (
          <ul className="space-y-2">
            {prescription.medications.map((m) => (
              <li key={m.id} className="text-sm">
                <strong>{m.name} {m.dosage}</strong>
                <br />
                {m.quantity} - {getFormLabel(m.form)} - {getFrequencyLabel(m.frequency)} pendant{" "}
                {getDurationLabel(m.duration)}
                {m.instructions && ` - ${m.instructions}`}
              </li>
            ))}
          </ul>
        ) : (
          prescription.content && (
            <pre className="whitespace-pre-wrap text-sm">{prescription.content}</pre>
          )
        )}
        {showSignature && (
          <div className="mt-8 pt-4 border-t">
            <p className="text-sm text-muted-foreground">Signature :</p>
            <div className="h-12 border-b border-black mt-2 w-64" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
