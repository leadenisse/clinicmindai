import { Button } from "@/components/ui/button"
import { getFrequencyLabel, getDurationLabel, getFormLabel } from "../utils/formatPrescription"
import type { PrescriptionMedication } from "../types/prescription.types"
import { Pencil, Trash2 } from "lucide-react"

interface MedicationItemProps {
  medication: PrescriptionMedication
  onEdit: () => void
  onRemove: () => void
}

export function MedicationItem({ medication, onEdit, onRemove }: MedicationItemProps) {
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium">{medication.name} {medication.dosage}</p>
        <div className="flex gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {getFormLabel(medication.form)} | {getFrequencyLabel(medication.frequency)} |{" "}
        {getDurationLabel(medication.duration)} | {medication.quantity}
      </p>
      {medication.isGeneric && (
        <span className="text-xs text-muted-foreground">☑ Substituable</span>
      )}
      {medication.instructions && (
        <p className="text-sm">
          Instructions : {medication.instructions}
          <Button variant="link" size="sm" className="h-auto p-0 ml-1" onClick={onEdit}>
            Éditer
          </Button>
        </p>
      )}
    </div>
  )
}
