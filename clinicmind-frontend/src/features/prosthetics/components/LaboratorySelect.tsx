import { useLaboratories } from "../hooks/useProsthetics"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface LaboratorySelectProps {
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  allowAll?: boolean
  className?: string
}

export function LaboratorySelect({
  value,
  onValueChange,
  disabled,
  placeholder = "Choisir un laboratoire",
  allowAll = false,
  className,
}: LaboratorySelectProps) {
  const { data: laboratories = [], isLoading } = useLaboratories()

  return (
    <Select
      value={allowAll && !value ? "all" : value}
      onValueChange={(v) => onValueChange(allowAll && v === "all" ? "" : v)}
      disabled={disabled || isLoading}
    >
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allowAll && (
          <SelectItem value="all">Tous les laboratoires</SelectItem>
        )}
        {laboratories.map((lab) => (
          <SelectItem key={lab.id} value={lab.id}>
            <span className="flex items-center gap-2">
              {lab.name}
              {lab.isDefault && (
                <span className="text-xs text-muted-foreground">(par défaut)</span>
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
