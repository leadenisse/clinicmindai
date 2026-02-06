import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PatientSearchSelect } from "@/features/appointments/components/PatientSearchSelect"
import { MedicationList } from "./MedicationList"
import { MedicationForm } from "./MedicationForm"
import { PrescriptionPreview } from "./PrescriptionPreview"
import type {
  Prescription,
  PrescriptionMedication,
} from "../types/prescription.types"
import { Plus } from "lucide-react"

interface PrescriptionFormProps {
  value: Partial<Prescription> & {
    patientId?: string
    patientName?: string
    title?: string
    content?: string
    medications: PrescriptionMedication[]
  }
  onChange: (
    data: Partial<Prescription> & {
      patientId?: string
      patientName?: string
      title?: string
      content?: string
      medications: PrescriptionMedication[]
    }
  ) => void
  headerText?: string
}

export function PrescriptionForm({
  value,
  onChange,
  headerText,
}: PrescriptionFormProps) {
  const [medFormOpen, setMedFormOpen] = useState(false)
  const [editingMedIndex, setEditingMedIndex] = useState<number | null>(null)
  const medications = value.medications ?? []

  const update = (patch: Partial<Prescription> & { medications?: PrescriptionMedication[] }) => {
    onChange({ ...value, ...patch })
  }

  const handlePatientSelect = (patientId: string, patient: { firstName: string; lastName: string }) => {
    update({
      patientId,
      patientName: `${patient.lastName} ${patient.firstName}`,
    })
  }

  const handleAddMedication = (med: Omit<PrescriptionMedication, "id">) => {
    const newMed: PrescriptionMedication = {
      ...med,
      id: `med-${Date.now()}-${medications.length}`,
    }
    update({ medications: [...medications, newMed] })
    setMedFormOpen(false)
  }

  const handleEditMedication = (index: number) => {
    setEditingMedIndex(index)
  }

  const handleSaveMedication = (med: Omit<PrescriptionMedication, "id">) => {
    if (editingMedIndex !== null) {
      const next = [...medications]
      next[editingMedIndex] = { ...med, id: next[editingMedIndex].id }
      update({ medications: next })
      setEditingMedIndex(null)
    } else {
      handleAddMedication(med)
    }
  }

  const handleRemoveMedication = (index: number) => {
    update({
      medications: medications.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label>Patient *</Label>
        <PatientSearchSelect
          value={value.patientId}
          onChange={handlePatientSelect}
          placeholder="Sélectionner un patient..."
        />
        {value.patientName && (
          <p className="text-sm text-muted-foreground">{value.patientName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Titre</Label>
        <Input
          value={value.title ?? ""}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="Ordonnance du 20/01/2024"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>MÉDICAMENTS</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setEditingMedIndex(null)
              setMedFormOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        </div>
        {medications.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucun médicament. Cliquez sur Ajouter.
          </p>
        ) : (
          <MedicationList
            medications={medications}
            onEdit={handleEditMedication}
            onRemove={handleRemoveMedication}
          />
        )}
      </div>

      <div className="space-y-2">
        <Label>Instructions générales</Label>
        <Textarea
          value={value.content ?? ""}
          onChange={(e) => update({ content: e.target.value })}
          placeholder="Instructions particulières..."
          rows={4}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label>APERÇU</Label>
        <PrescriptionPreview
          prescription={{
            ...value,
            medications,
          }}
          headerText={headerText}
          showSignature={true}
        />
      </div>

      <MedicationForm
        open={medFormOpen || editingMedIndex !== null}
        onClose={() => {
          setMedFormOpen(false)
          setEditingMedIndex(null)
        }}
        medication={editingMedIndex !== null ? medications[editingMedIndex] ?? null : null}
        onSave={handleSaveMedication}
      />
    </div>
  )
}
