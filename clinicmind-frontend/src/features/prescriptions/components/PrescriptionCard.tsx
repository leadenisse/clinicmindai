import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PrescriptionStatusBadge } from "./PrescriptionStatusBadge"
import { PrescriptionActions } from "./PrescriptionActions"
import type { Prescription } from "../types/prescription.types"
import { FileText, Bot } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface PrescriptionCardProps {
  prescription: Prescription
  onView: (p: Prescription) => void
}

export function PrescriptionCard({ prescription, onView }: PrescriptionCardProps) {
  const medSummary = prescription.medications
    .map((m) => m.name)
    .slice(0, 3)
    .join(", ")
  const date = prescription.updatedAt
    ? format(new Date(prescription.updatedAt), "dd/MM/yyyy", { locale: fr })
    : ""

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <h3 className="font-semibold truncate">{prescription.title}</h3>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </div>
        <PrescriptionStatusBadge status={prescription.status} size="sm" />
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">{prescription.patientName}</p>
        {prescription.isAiGenerated && (
          <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-1.5 py-0.5 text-xs text-amber-700 dark:text-amber-400">
            <Bot className="h-3 w-3" />
            Généré par IA
          </span>
        )}
        <p className="text-sm text-muted-foreground line-clamp-2">{medSummary}</p>
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {prescription.requiresValidation && !prescription.isValidated && (
            <span className="text-xs text-amber-600 dark:text-amber-400">
              À valider
            </span>
          )}
          <Button variant="ghost" size="sm" onClick={() => onView(prescription)}>
            Voir
          </Button>
          <PrescriptionActions prescription={prescription} onView={onView} />
        </div>
      </CardContent>
    </Card>
  )
}
