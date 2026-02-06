import type { AIGenerationType } from "../../types/ai.types"
import { GENERATION_TYPE_LIST } from "../../constants/aiConfig"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FileText,
  Pill,
  Lightbulb,
  Mail,
  ClipboardList,
  Wand2,
  type LucideIcon,
} from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Pill,
  Lightbulb,
  Mail,
  ClipboardList,
  Wand2,
}

interface GeneratorTypeSelectProps {
  value: AIGenerationType
  onValueChange: (value: AIGenerationType) => void
  disabled?: boolean
  className?: string
}

export function GeneratorTypeSelect({
  value,
  onValueChange,
  disabled,
  className,
}: GeneratorTypeSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onValueChange(v as AIGenerationType)}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Type de document" />
      </SelectTrigger>
      <SelectContent>
        {GENERATION_TYPE_LIST.map((config) => {
          const Icon = ICON_MAP[config.icon] ?? Wand2
          return (
            <SelectItem key={config.value} value={config.value}>
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {config.label}
              </span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
