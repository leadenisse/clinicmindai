import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import type { OnboardingAppointmentType } from "../types/onboarding.types"
import { DURATION_OPTIONS } from "../constants/defaultAppointmentTypes"

const COLOR_OPTIONS = [
  { hex: "#3B82F6", name: "Bleu" },
  { hex: "#10B981", name: "Vert" },
  { hex: "#8B5CF6", name: "Violet" },
  { hex: "#06B6D4", name: "Cyan" },
  { hex: "#F59E0B", name: "Orange" },
  { hex: "#EF4444", name: "Rouge" },
  { hex: "#6B7280", name: "Gris" },
  { hex: "#92400E", name: "Marron" },
]

interface AppointmentTypeEditorProps {
  type: OnboardingAppointmentType
  open: boolean
  onClose: () => void
  onSave: (t: OnboardingAppointmentType) => void
}

export function AppointmentTypeEditor({ type, open, onClose, onSave }: AppointmentTypeEditorProps) {
  const [label, setLabel] = useState(type.label)
  const [duration, setDuration] = useState(type.duration)
  const [color, setColor] = useState(type.color)

  const handleSave = () => {
    onSave({ ...type, label, duration, color })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le type de RDV</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Libellé</Label>
            <Input value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Durée (min)</Label>
            <Select value={String(duration)} onValueChange={(v) => setDuration(Number(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DURATION_OPTIONS.map((d) => (
                  <SelectItem key={d} value={String(d)}>
                    {d} min
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Couleur</Label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  className={`h-8 w-8 rounded-full border-2 ${
                    color === c.hex ? "border-foreground" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
