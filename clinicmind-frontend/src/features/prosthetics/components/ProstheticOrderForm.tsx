import { useState } from "react"
import type { ProstheticType } from "../types/prosthetics.types"
import { useCreateProstheticOrder } from "../hooks/useProsthetics"
import { PatientSearchSelect } from "@/features/appointments/components/PatientSearchSelect"
import type { Patient } from "@/features/patients/types/patient.types"
import { LaboratorySelect } from "./LaboratorySelect"
import {
  PROSTHETIC_TYPES,
  SHADE_OPTIONS,
  MATERIAL_OPTIONS,
} from "../constants/prostheticsConfig"
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
import { Crown, Link, Square, Layers, Component, Circle, Pin, MoreHorizontal } from "lucide-react"
import { addDays, format } from "date-fns"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown,
  Link,
  Square,
  Layers,
  Component,
  Circle,
  Pin,
  MoreHorizontal,
}

interface ProstheticOrderFormProps {
  initialPatientId?: string
  initialPatient?: Patient
  onSuccess?: (orderId: string) => void
  onCancel?: () => void
}

export function ProstheticOrderForm({
  initialPatientId,
  initialPatient,
  onSuccess,
  onCancel,
}: ProstheticOrderFormProps) {
  const [patientId, setPatientId] = useState(initialPatientId ?? "")
  const [patientDisplay, setPatientDisplay] = useState(
    initialPatient ? `${initialPatient.lastName} ${initialPatient.firstName}` : ""
  )
  const [type, setType] = useState<ProstheticType>("crown")
  const [description, setDescription] = useState("")
  const [teethInput, setTeethInput] = useState("")
  const [shade, setShade] = useState("")
  const [material, setMaterial] = useState("")
  const [laboratoryId, setLaboratoryId] = useState("")
  const [expectedDate, setExpectedDate] = useState(
    format(addDays(new Date(), 14), "yyyy-MM-dd")
  )
  const [instructions, setInstructions] = useState("")

  const createOrder = useCreateProstheticOrder()

  const handlePatientChange = (id: string, patient: Patient) => {
    setPatientId(id)
    setPatientDisplay(`${patient.lastName} ${patient.firstName}`)
  }

  const teeth = teethInput
    .split(/[\s,;]+/)
    .map((t) => t.replace(/\D/g, ""))
    .filter(Boolean)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientId || !description.trim() || !laboratoryId) return
    createOrder.mutate(
      {
        patientId,
        type,
        description: description.trim(),
        teeth: teeth.length > 0 ? teeth : ["—"],
        shade: shade || undefined,
        material: material || undefined,
        laboratoryId,
        expectedDate: expectedDate || undefined,
        instructions: instructions.trim() || undefined,
      },
      {
        onSuccess: (order) => {
          onSuccess?.(order.id)
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Patient *</Label>
          <PatientSearchSelect onChange={handlePatientChange} placeholder="Rechercher un patient" />
          {patientDisplay && (
            <p className="text-sm text-muted-foreground">Sélectionné : {patientDisplay}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Laboratoire *</Label>
          <LaboratorySelect
            value={laboratoryId}
            onValueChange={setLaboratoryId}
            placeholder="Choisir un laboratoire"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Type de prothèse *</Label>
        <Select value={type} onValueChange={(v) => setType(v as ProstheticType)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.entries(PROSTHETIC_TYPES) as [ProstheticType, { label: string; icon: string }][]).map(
              ([value, config]) => {
                const Icon = ICON_MAP[config.icon] ?? MoreHorizontal
                return (
                  <SelectItem key={value} value={value}>
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {config.label}
                    </span>
                  </SelectItem>
                )
              }
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Couronne céramo-céramique 15"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="teeth">Dents (séparées par virgule ou espace)</Label>
          <Input
            id="teeth"
            value={teethInput}
            onChange={(e) => setTeethInput(e.target.value)}
            placeholder="Ex: 14, 15, 16"
          />
        </div>
        <div className="space-y-2">
          <Label>Teinte</Label>
          <Select value={shade} onValueChange={setShade}>
            <SelectTrigger>
              <SelectValue placeholder="Optionnel" />
            </SelectTrigger>
            <SelectContent>
              {SHADE_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Matériau</Label>
          <Select value={material} onValueChange={setMaterial}>
            <SelectTrigger>
              <SelectValue placeholder="Optionnel" />
            </SelectTrigger>
            <SelectContent>
              {MATERIAL_OPTIONS.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="expectedDate">Date prévue de livraison</Label>
          <Input
            id="expectedDate"
            type="date"
            value={expectedDate}
            onChange={(e) => setExpectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions pour le laboratoire</Label>
        <Textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={3}
          placeholder="Instructions spécifiques..."
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
            createOrder.isPending || !patientId || !description.trim() || !laboratoryId
          }
        >
          {createOrder.isPending ? "Création..." : "Créer la commande"}
        </Button>
      </div>
    </form>
  )
}
