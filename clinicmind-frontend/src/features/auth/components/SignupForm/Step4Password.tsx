import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import type { SignupStep4Data } from "../../types/auth.types"

function passwordStrength(value: string): number {
  if (!value) return 0
  let s = 0
  if (value.length >= 8) s++
  if (value.length >= 12) s++
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) s++
  if (/\d/.test(value)) s++
  if (/[^a-zA-Z0-9]/.test(value)) s++
  return s
}

interface Step4PasswordProps {
  data: SignupStep4Data
  onChange: (data: SignupStep4Data) => void
  onBack: () => void
  onSubmit: () => void
  errors?: Partial<Record<keyof SignupStep4Data, string>>
  isSubmitting?: boolean
}

export function Step4Password({
  data,
  onChange,
  onBack,
  onSubmit,
  errors = {},
  isSubmitting,
}: Step4PasswordProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const strength = passwordStrength(data.password)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={(e) => onChange({ ...data, password: e.target.value })}
            placeholder="Min. 8 caractères, maj, min, chiffre"
            className={`pr-9 ${errors.password ? "border-destructive" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {data.password && (
          <div className="flex items-center gap-2">
            <div className="flex flex-1 gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded ${
                    i <= strength ? "bg-green-500" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {strength <= 2 ? "Faible" : strength <= 4 ? "Bon" : "Excellent"}
            </span>
          </div>
        )}
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmer *</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            value={data.confirmPassword}
            onChange={(e) => onChange({ ...data, confirmPassword: e.target.value })}
            placeholder="Confirmer le mot de passe"
            className={`pr-9 ${errors.confirmPassword ? "border-destructive" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={data.acceptCgu}
            onChange={(e) => onChange({ ...data, acceptCgu: e.target.checked })}
            className="rounded border-border"
          />
          <span className="text-sm">
            J&apos;accepte les{" "}
            <a href="/cgu" className="text-primary underline" target="_blank" rel="noopener noreferrer">
              CGU
            </a>{" "}
            et la politique de confidentialité *
          </span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={data.acceptNewsletter}
            onChange={(e) => onChange({ ...data, acceptNewsletter: e.target.checked })}
            className="rounded border-border"
          />
          <span className="text-sm">
            J&apos;accepte de recevoir des informations sur ClinicMind
          </span>
        </label>
        {errors.acceptCgu && (
          <p className="text-sm text-destructive">{errors.acceptCgu}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          ← Retour
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Création..." : "Créer mon compte"}
        </Button>
      </div>
    </div>
  )
}
