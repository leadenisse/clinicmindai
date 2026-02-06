import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface PriceEditorProps {
  label: string
  value: number
  onChange: (value: number) => void
  className?: string
}

export function PriceEditor({ label, value, onChange, className }: PriceEditorProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Label className="min-w-[200px] shrink-0">{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={0}
          step={0.01}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-28 text-right"
        />
        <span className="text-muted-foreground">€</span>
      </div>
    </div>
  )
}
