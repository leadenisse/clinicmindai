import { useState } from "react"
import type { AIGenerationType } from "../../types/ai.types"
import { GENERATION_TYPES } from "../../constants/aiConfig"
import { Button } from "@/components/ui/button"
import { FileText, Pill, Lightbulb, Mail, ClipboardList, Wand2 } from "lucide-react"
import { AIGeneratorModal } from "./AIGeneratorModal"
import { cn } from "@/lib/utils"

const QUICK_TYPES: AIGenerationType[] = [
  "report",
  "prescription",
  "advice",
  "letter",
]

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Pill,
  Lightbulb,
  Mail,
  ClipboardList,
  Wand2,
}

interface QuickGenerateButtonsProps {
  patientId: string
  onSelect?: (type: AIGenerationType) => void
  onGenerate?: (content: string, type: AIGenerationType) => void
  className?: string
}

export function QuickGenerateButtons({
  patientId,
  onSelect,
  onGenerate,
  className,
}: QuickGenerateButtonsProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<AIGenerationType>("report")

  const handleOpen = (type: AIGenerationType) => {
    setSelectedType(type)
    setModalOpen(true)
    onSelect?.(type)
  }

  const handleGenerate = (content: string, type: AIGenerationType) => {
    onGenerate?.(content, type)
    setModalOpen(false)
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {QUICK_TYPES.map((t) => {
        const config = GENERATION_TYPES[t]
        const Icon = ICON_MAP[config.icon] ?? Wand2
        return (
          <Button
            key={t}
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => handleOpen(t)}
          >
            <Icon className="h-4 w-4" />
            {config.label}
          </Button>
        )
      })}
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5"
        onClick={() => handleOpen("custom")}
      >
        <Wand2 className="h-4 w-4" />
        Autre
      </Button>

      <AIGeneratorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        patientId={patientId}
        onGenerate={handleGenerate}
        defaultType={selectedType}
      />
    </div>
  )
}
