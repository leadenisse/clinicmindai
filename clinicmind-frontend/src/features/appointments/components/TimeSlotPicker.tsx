import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SLOT_MINUTES = [0, 15, 30, 45]
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8) // 8h à 19h

const SLOTS: string[] = []
HOURS.forEach((h) => {
  SLOT_MINUTES.forEach((m) => {
    if (h === 19 && m > 0) return
    SLOTS.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
  })
})

interface TimeSlotPickerProps {
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
  className?: string
}

export function TimeSlotPicker({
  value,
  onValueChange,
  disabled,
  className,
}: TimeSlotPickerProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Heure" />
      </SelectTrigger>
      <SelectContent>
        {SLOTS.map((slot) => (
          <SelectItem key={slot} value={slot}>
            {slot}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
