import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { MEDICATION_FORMS, FREQUENCY_OPTIONS, DURATION_OPTIONS } from "../constants/prescription.constants"
import type { PrescriptionMedication } from "../types/prescription.types"

interface MedicationFormProps {
  open: boolean
  onClose: () => void
  medication: PrescriptionMedication | null
  onSave: (med: Omit<PrescriptionMedication, "id">) => void
}

const defaultMed: Omit<PrescriptionMedication, "id"> = {
  name: "",
  dosage: "",
  form: "comprime",
  frequency: "3x/jour",
  duration: "5_jours",
  quantity: "1 boîte",
  instructions: "",
  isGeneric: true,
}

export function MedicationForm({
  open,
  onClose,
  medication,
  onSave,
}: MedicationFormProps) {
  const [form, setForm] = useState(defaultMed)

  useEffect(() => {
    if (medication) {
      setForm({
        name: medication.name,
        dosage: medication.dosage,
        form: medication.form,
        frequency: medication.frequency,
        duration: medication.duration,
        quantity: medication.quantity,
        instructions: medication.instructions ?? "",
        isGeneric: medication.isGeneric,
      })
    } else {
      setForm(defaultMed)
    }
  }, [medication, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {medication ? "Modifier le médicament" : "Ajouter un médicament"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nom *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Paracétamol"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Dosage *</Label>
              <Input
                value={form.dosage}
                onChange={(e) => setForm((p) => ({ ...p, dosage: e.target.value }))}
                placeholder="1g"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Forme</Label>
              <Select
                value={form.form}
                onValueChange={(v) => setForm((p) => ({ ...p, form: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MEDICATION_FORMS.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fréquence</Label>
              <Select
                value={form.frequency}
                onValueChange={(v) => setForm((p) => ({ ...p, frequency: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCY_OPTIONS.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Durée</Label>
              <Select
                value={form.duration}
                onValueChange={(v) => setForm((p) => ({ ...p, duration: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DURATION_OPTIONS.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quantité</Label>
              <Input
                value={form.quantity}
                onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))}
                placeholder="1 boîte"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Instructions</Label>
            <Textarea
              value={form.instructions}
              onChange={(e) => setForm((p) => ({ ...p, instructions: e.target.value }))}
              placeholder="Espacer les prises de 6h"
              rows={2}
              className="resize-none"
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isGeneric}
              onChange={(e) => setForm((p) => ({ ...p, isGeneric: e.target.checked }))}
            />
            <span className="text-sm">Substituable</span>
          </label>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
