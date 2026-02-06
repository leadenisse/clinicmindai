import { MedicationItem } from "./MedicationItem"
import type { PrescriptionMedication } from "../types/prescription.types"

interface MedicationListProps {
  medications: PrescriptionMedication[]
  onEdit: (index: number) => void
  onRemove: (index: number) => void
}

export function MedicationList({
  medications,
  onEdit,
  onRemove,
}: MedicationListProps) {
  return (
    <div className="space-y-3">
      {medications.map((med, index) => (
        <MedicationItem
          key={med.id}
          medication={med}
          onEdit={() => onEdit(index)}
          onRemove={() => onRemove(index)}
        />
      ))}
    </div>
  )
}
