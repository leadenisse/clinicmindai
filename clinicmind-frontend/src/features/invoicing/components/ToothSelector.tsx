import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ToothSelectorProps {
  value?: string
  onChange: (tooth: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

const TOOTH_NUMBERS = [
  "11", "12", "13", "14", "15", "16", "17", "18",
  "21", "22", "23", "24", "25", "26", "27", "28",
  "31", "32", "33", "34", "35", "36", "37", "38",
  "41", "42", "43", "44", "45", "46", "47", "48",
]

export function ToothSelector({
  value,
  onChange,
  disabled = false,
  placeholder = "Ex: 46",
  className,
}: ToothSelectorProps) {
  return (
    <div className={className}>
      <Label className="sr-only">Dent</Label>
      <Input
        type="text"
        inputMode="numeric"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 2))}
        placeholder={placeholder}
        disabled={disabled}
        className="w-16 font-mono"
        list="tooth-list"
      />
      <datalist id="tooth-list">
        {TOOTH_NUMBERS.map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>
    </div>
  )
}
