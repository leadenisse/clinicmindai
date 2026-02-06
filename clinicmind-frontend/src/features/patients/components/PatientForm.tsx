import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Patient, Address, Allergy, Treatment } from "../types/patient.types"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"

const step1Schema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  birthDate: z.string().min(1, "Date de naissance requise"),
  gender: z.enum(["M", "F", "OTHER"]),
  ins: z.string().optional(),
})

const step2Schema = z.object({
  phone: z.string().min(1, "Téléphone requis"),
  email: z.string().email().optional().or(z.literal("")),
  street: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  referringDoctor: z.string().optional(),
})

const step3Schema = z.object({
  medicalConditions: z.string().optional(),
  surgicalHistory: z.string().optional(),
  medications: z.string().optional(),
  notes: z.string().optional(),
})

const step4Schema = z.object({
  smokingStatus: z.enum(["never", "former", "current"]),
  alcoholConsumption: z.enum(["none", "occasional", "regular"]),
  brushingFrequency: z.enum(["rarely", "once", "twice", "more"]),
  lastDentalVisit: z.string().optional(),
})

const STEPS = [
  { id: 1, title: "Identité", schema: step1Schema },
  { id: 2, title: "Coordonnées", schema: step2Schema },
  { id: 3, title: "Antécédents", schema: step3Schema },
  { id: 4, title: "Habitudes", schema: step4Schema },
] as const

type Step1Values = z.infer<typeof step1Schema>
type Step2Values = z.infer<typeof step2Schema>
type Step3Values = z.infer<typeof step3Schema>
type Step4Values = z.infer<typeof step4Schema>

export type PatientFormValues = Step1Values & Step2Values & Step3Values & Step4Values & {
  allergies: Array<{ name: string; severity: "low" | "medium" | "high"; notes?: string }>
  treatments: Array<{ name: string; dosage?: string; frequency?: string }>
}

function patientToFormValues(patient: Patient): PatientFormValues {
  return {
    firstName: patient.firstName,
    lastName: patient.lastName,
    birthDate: patient.birthDate,
    gender: patient.gender,
    ins: patient.ins || "",
    phone: patient.phone,
    email: patient.email || "",
    street: patient.address.street,
    zipCode: patient.address.zipCode,
    city: patient.address.city,
    country: patient.address.country,
    referringDoctor: patient.referringDoctor || "",
    medicalConditions: patient.medicalHistory.medicalConditions.join(", "),
    surgicalHistory: patient.medicalHistory.surgicalHistory.join(", "),
    medications: patient.medicalHistory.medications.join(", "),
    notes: patient.medicalHistory.notes || "",
    allergies: patient.allergies.map((a) => ({
      name: a.name,
      severity: a.severity,
      notes: a.notes,
    })),
    treatments: patient.currentTreatments.map((t) => ({
      name: t.name,
      dosage: t.dosage,
      frequency: t.frequency,
    })),
    smokingStatus: patient.dentalHabits.smokingStatus,
    alcoholConsumption: patient.dentalHabits.alcoholConsumption,
    brushingFrequency: patient.dentalHabits.brushingFrequency,
    lastDentalVisit: patient.dentalHabits.lastDentalVisit || "",
  }
}

function formValuesToPatientPayload(
  values: PatientFormValues
): Omit<Patient, "id" | "createdAt" | "updatedAt" | "createdBy"> {
  const address: Address = {
    street: values.street ?? "",
    zipCode: values.zipCode ?? "",
    city: values.city ?? "",
    country: values.country ?? "France",
  }
  const medicalConditions = values.medicalConditions
    ? values.medicalConditions.split(",").map((s) => s.trim()).filter(Boolean)
    : []
  const surgicalHistory = values.surgicalHistory
    ? values.surgicalHistory.split(",").map((s) => s.trim()).filter(Boolean)
    : []
  const medications = values.medications
    ? values.medications.split(",").map((s) => s.trim()).filter(Boolean)
    : []
  const allergies: Allergy[] = values.allergies.map((a, i) => ({
    id: String(i + 1),
    name: a.name,
    severity: a.severity,
    notes: a.notes,
  }))
  const currentTreatments: Treatment[] = values.treatments.map((t, i) => ({
    id: String(i + 1),
    name: t.name,
    dosage: t.dosage,
    frequency: t.frequency,
  }))
  return {
    ins: values.ins || "0000000000000000000000",
    firstName: values.firstName,
    lastName: values.lastName,
    birthDate: values.birthDate,
    gender: values.gender,
    phone: values.phone,
    email: values.email || undefined,
    address,
    referringDoctor: values.referringDoctor || undefined,
    medicalHistory: {
      medicalConditions,
      surgicalHistory,
      medications,
      notes: values.notes || undefined,
    },
    allergies,
    currentTreatments,
    dentalHabits: {
      smokingStatus: values.smokingStatus,
      alcoholConsumption: values.alcoholConsumption,
      brushingFrequency: values.brushingFrequency,
      lastDentalVisit: values.lastDentalVisit || undefined,
    },
    }
}

const defaultValues: PatientFormValues = {
  firstName: "",
  lastName: "",
  birthDate: "",
  gender: "M",
  ins: "",
  phone: "",
  email: "",
  street: "",
  zipCode: "",
  city: "",
  country: "France",
  referringDoctor: "",
  medicalConditions: "",
  surgicalHistory: "",
  medications: "",
  notes: "",
  allergies: [],
  treatments: [],
  smokingStatus: "never",
  alcoholConsumption: "none",
  brushingFrequency: "twice",
  lastDentalVisit: "",
}

interface PatientFormProps {
  patient?: Patient
  onSubmit: (payload: Omit<Patient, "id" | "createdAt" | "updatedAt" | "createdBy">) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function PatientForm({
  patient,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: PatientFormProps) {
  const [step, setStep] = useState(1)
  const isEdit = !!patient

  const form = useForm<PatientFormValues>({
    defaultValues: patient ? patientToFormValues(patient) : defaultValues,
    mode: "onBlur",
  })

  const handleStepSubmit = async () => {
    const fields =
      step === 1
        ? (["firstName", "lastName", "birthDate", "gender", "ins"] as const)
        : step === 2
          ? (["phone", "email", "street", "zipCode", "city", "country", "referringDoctor"] as const)
          : step === 3
            ? (["medicalConditions", "surgicalHistory", "medications", "notes"] as const)
            : (["smokingStatus", "alcoholConsumption", "brushingFrequency", "lastDentalVisit"] as const)
    const ok = await form.trigger(fields as unknown as (keyof PatientFormValues)[])
    if (!ok) return
    if (step < 4) setStep(step + 1)
    else onSubmit(formValuesToPatientPayload(form.getValues()))
  }

  const allergies = form.watch("allergies")
  const treatments = form.watch("treatments")

  return (
    <form onSubmit={form.handleSubmit(handleStepSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <p className="text-sm text-muted-foreground">
            Étape {step} sur 4 — {STEPS[step - 1]?.title}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input id="lastName" {...form.register("lastName")} />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-error">{form.formState.errors.lastName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input id="firstName" {...form.register("firstName")} />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-error">{form.formState.errors.firstName.message}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date de naissance *</Label>
                  <Input id="birthDate" type="date" {...form.register("birthDate")} />
                  {form.formState.errors.birthDate && (
                    <p className="text-sm text-error">{form.formState.errors.birthDate.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Genre *</Label>
                  <Select
                    value={form.watch("gender")}
                    onValueChange={(v) => form.setValue("gender", v as "M" | "F" | "OTHER")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Homme</SelectItem>
                      <SelectItem value="F">Femme</SelectItem>
                      <SelectItem value="OTHER">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ins">INS (optionnel)</Label>
                <Input id="ins" placeholder="22 caractères" maxLength={22} {...form.register("ins")} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input id="phone" {...form.register("phone")} />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-error">{form.formState.errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...form.register("email")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Adresse</Label>
                <Input id="street" {...form.register("street")} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Code postal</Label>
                  <Input id="zipCode" {...form.register("zipCode")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" {...form.register("city")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="referringDoctor">Médecin traitant</Label>
                <Input id="referringDoctor" {...form.register("referringDoctor")} />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Pathologies (séparées par des virgules)</Label>
                <Input id="medicalConditions" {...form.register("medicalConditions")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surgicalHistory">Antécédents chirurgicaux</Label>
                <Textarea id="surgicalHistory" {...form.register("surgicalHistory")} rows={2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications">Médicaments actuels</Label>
                <Input id="medications" {...form.register("medications")} />
              </div>
              <div className="space-y-2">
                <Label>Allergies</Label>
                {allergies.map((_, i) => (
                  <div key={i} className="flex gap-2 rounded border p-2">
                    <Input
                      placeholder="Nom"
                      {...form.register(`allergies.${i}.name`)}
                      className="flex-1"
                    />
                    <Select
                      value={form.watch(`allergies.${i}.severity`)}
                      onValueChange={(v) =>
                        form.setValue(`allergies.${i}.severity`, v as "low" | "medium" | "high")
                      }
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Faible</SelectItem>
                        <SelectItem value="medium">Moyen</SelectItem>
                        <SelectItem value="high">Élevé</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        form.setValue(
                          "allergies",
                          allergies.filter((_, j) => j !== i)
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    form.setValue("allergies", [...allergies, { name: "", severity: "medium" }])
                  }
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter une allergie
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Traitements en cours</Label>
                {treatments.map((_, i) => (
                  <div key={i} className="flex gap-2 rounded border p-2">
                    <Input
                      placeholder="Nom"
                      {...form.register(`treatments.${i}.name`)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Dosage"
                      {...form.register(`treatments.${i}.dosage`)}
                      className="w-24"
                    />
                    <Input
                      placeholder="Fréquence"
                      {...form.register(`treatments.${i}.frequency`)}
                      className="w-28"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        form.setValue(
                          "treatments",
                          treatments.filter((_, j) => j !== i)
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    form.setValue("treatments", [...treatments, { name: "", dosage: "", frequency: "" }])
                  }
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter un traitement
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" {...form.register("notes")} rows={3} />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="space-y-2">
                <Label>Tabac</Label>
                <Select
                  value={form.watch("smokingStatus")}
                  onValueChange={(v) => form.setValue("smokingStatus", v as "never" | "former" | "current")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Jamais</SelectItem>
                    <SelectItem value="former">Ancien fumeur</SelectItem>
                    <SelectItem value="current">Fumeur actuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Alcool</Label>
                <Select
                  value={form.watch("alcoholConsumption")}
                  onValueChange={(v) =>
                    form.setValue("alcoholConsumption", v as "none" | "occasional" | "regular")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucun</SelectItem>
                    <SelectItem value="occasional">Occasionnel</SelectItem>
                    <SelectItem value="regular">Régulier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fréquence de brossage</Label>
                <Select
                  value={form.watch("brushingFrequency")}
                  onValueChange={(v) =>
                    form.setValue("brushingFrequency", v as "rarely" | "once" | "twice" | "more")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rarely">Rarement</SelectItem>
                    <SelectItem value="once">1x/jour</SelectItem>
                    <SelectItem value="twice">2x/jour</SelectItem>
                    <SelectItem value="more">Plus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastDentalVisit">Dernière visite dentaire</Label>
                <Input id="lastDentalVisit" type="date" {...form.register("lastDentalVisit")} />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 1 ? (
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
              Précédent
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {step < 4 ? "Suivant" : isEdit ? "Enregistrer" : "Créer le patient"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
