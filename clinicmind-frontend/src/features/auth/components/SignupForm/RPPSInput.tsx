import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface RPPSInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
  className?: string
}

const RPPS_LENGTH = 11

export function RPPSInput({
  value,
  onChange,
  error,
  disabled,
  className,
}: RPPSInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, RPPS_LENGTH)
    onChange(v)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="rpps">
        N° RPPS <span className="text-destructive">*</span>
      </Label>
      <Input
        id="rpps"
        inputMode="numeric"
        maxLength={RPPS_LENGTH}
        placeholder="12345678901"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={error ? "border-destructive" : ""}
        aria-invalid={!!error}
      />
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        11 chiffres, vérifiable sur annuaire-sante.fr
      </p>
    </div>
  )
}
