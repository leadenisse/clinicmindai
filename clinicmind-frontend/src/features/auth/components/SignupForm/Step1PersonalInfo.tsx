import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RPPSInput } from "./RPPSInput"
import type { SignupStep1Data, PractitionerSpecialty } from "../../types/auth.types"

const SPECIALTIES: { value: PractitionerSpecialty; label: string }[] = [
  { value: "dentist", label: "Chirurgien-dentiste" },
  { value: "orthodontist", label: "Orthodontiste" },
  { value: "stomatologist", label: "Stomatologue" },
  { value: "other", label: "Autre spécialité dentaire" },
]

interface Step1PersonalInfoProps {
  data: SignupStep1Data
  onChange: (data: SignupStep1Data) => void
  onNext: () => void
  errors?: Partial<Record<keyof SignupStep1Data, string>>
  isSubmitting?: boolean
}

export function Step1PersonalInfo({
  data,
  onChange,
  onNext,
  errors = {},
  isSubmitting,
}: Step1PersonalInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium">Vous êtes :</p>
        <div className="space-y-2">
          {SPECIALTIES.map((s) => (
            <label
              key={s.value}
              className="flex cursor-pointer items-center gap-2 rounded-md border p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <input
                type="radio"
                name="specialty"
                value={s.value}
                checked={data.specialty === s.value}
                onChange={() => onChange({ ...data, specialty: s.value })}
                className="h-4 w-4"
              />
              <span>{s.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange({ ...data, firstName: e.target.value })}
            placeholder="Jean"
            className={errors.firstName ? "border-destructive" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange({ ...data, lastName: e.target.value })}
            placeholder="Martin"
            className={errors.lastName ? "border-destructive" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email pro *</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          placeholder="dr.martin@email.fr"
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          placeholder="06 12 34 56 78"
        />
      </div>

      <RPPSInput
        value={data.rpps}
        onChange={(rpps) => onChange({ ...data, rpps })}
        error={errors.rpps}
      />

      <Button type="button" onClick={onNext} className="w-full" disabled={isSubmitting}>
        Continuer →
      </Button>
    </div>
  )
}
