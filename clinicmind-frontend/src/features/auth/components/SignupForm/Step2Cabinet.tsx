import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SignupStep2Data, CabinetSize } from "../../types/auth.types"

const CABINET_SIZES: { value: CabinetSize; label: string }[] = [
  { value: "solo", label: "1 (exercice individuel)" },
  { value: "small", label: "2-3 praticiens" },
  { value: "large", label: "4+ praticiens" },
]

interface Step2CabinetProps {
  data: SignupStep2Data
  onChange: (data: SignupStep2Data) => void
  onBack: () => void
  onNext: () => void
  errors?: Partial<Record<string, string>>
  isSubmitting?: boolean
}

export function Step2Cabinet({
  data,
  onChange,
  onBack,
  onNext,
  errors = {},
  isSubmitting,
}: Step2CabinetProps) {
  const isNew = data.mode === "new"

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium">Situation :</p>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-md border p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <input
              type="radio"
              name="mode"
              checked={data.mode === "new"}
              onChange={() => onChange({ ...data, mode: "new" })}
              className="h-4 w-4"
            />
            <span>Je crée/rejoins un nouveau cabinet sur ClinicMind</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-md border p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <input
              type="radio"
              name="mode"
              checked={data.mode === "join"}
              onChange={() => onChange({ ...data, mode: "join" })}
              className="h-4 w-4"
            />
            <span>Je rejoins un cabinet existant (j&apos;ai un code invitation)</span>
          </label>
        </div>
      </div>

      {data.mode === "join" && (
        <div className="space-y-2">
          <Label htmlFor="inviteCode">Code d&apos;invitation</Label>
          <Input
            id="inviteCode"
            value={data.inviteCode ?? ""}
            onChange={(e) => onChange({ ...data, inviteCode: e.target.value })}
            placeholder="Code reçu par email"
          />
        </div>
      )}

      {isNew && (
        <>
          <div className="space-y-2">
            <Label htmlFor="cabinetName">Nom du cabinet *</Label>
            <Input
              id="cabinetName"
              value={data.cabinetName ?? ""}
              onChange={(e) => onChange({ ...data, cabinetName: e.target.value })}
              placeholder="Cabinet Dentaire du Soleil"
              className={errors.cabinetName ? "border-destructive" : ""}
            />
            {errors.cabinetName && (
              <p className="text-sm text-destructive">{errors.cabinetName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adresse *</Label>
            <Input
              id="address"
              value={data.address ?? ""}
              onChange={(e) => onChange({ ...data, address: e.target.value })}
              placeholder="15 avenue des Fleurs"
              className={errors.address ? "border-destructive" : ""}
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address}</p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="zipCode">Code postal *</Label>
              <Input
                id="zipCode"
                value={data.zipCode ?? ""}
                onChange={(e) => onChange({ ...data, zipCode: e.target.value })}
                placeholder="06000"
                className={errors.zipCode ? "border-destructive" : ""}
              />
              {errors.zipCode && (
                <p className="text-sm text-destructive">{errors.zipCode}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="city">Ville *</Label>
              <Input
                id="city"
                value={data.city ?? ""}
                onChange={(e) => onChange({ ...data, city: e.target.value })}
                placeholder="Nice"
                className={errors.city ? "border-destructive" : ""}
              />
              {errors.city && (
                <p className="text-sm text-destructive">{errors.city}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cabinetPhone">Téléphone cabinet</Label>
            <Input
              id="cabinetPhone"
              type="tel"
              value={data.cabinetPhone ?? ""}
              onChange={(e) => onChange({ ...data, cabinetPhone: e.target.value })}
              placeholder="04 93 00 00 00"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-medium">
              Combien de praticiens dans votre cabinet ?
            </p>
            <div className="space-y-2">
              {CABINET_SIZES.map((s) => (
                <label
                  key={s.value}
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="cabinetSize"
                    value={s.value}
                    checked={data.cabinetSize === s.value}
                    onChange={() => onChange({ ...data, cabinetSize: s.value })}
                    className="h-4 w-4"
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          ← Retour
        </Button>
        <Button type="button" onClick={onNext} className="flex-1" disabled={isSubmitting}>
          Continuer →
        </Button>
      </div>
    </div>
  )
}
