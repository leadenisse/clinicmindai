import type { AIGenerationType } from "../../types/ai.types"
import { GENERATION_TYPES } from "../../constants/aiConfig"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface GeneratorPromptInputProps {
  type: AIGenerationType
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

export function GeneratorPromptInput({
  type,
  value,
  onChange,
  disabled,
  className,
}: GeneratorPromptInputProps) {
  const config = GENERATION_TYPES[type]
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="ai-prompt">Instructions</Label>
      <Textarea
        id="ai-prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={config.placeholder}
        rows={4}
        disabled={disabled}
      />
    </div>
  )
}
