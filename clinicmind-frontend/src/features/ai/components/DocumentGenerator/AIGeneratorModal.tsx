import { useState, useEffect } from "react"
import type { AIGenerationType } from "../../types/ai.types"
import { GENERATION_TYPES } from "../../constants/aiConfig"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAIGeneration } from "../../hooks/useAIGeneration"
import { GeneratorTypeSelect } from "./GeneratorTypeSelect"
import { GeneratorPromptInput } from "./GeneratorPromptInput"
import { GeneratedContentPreview } from "./GeneratedContentPreview"
import { AILoadingState } from "../common/AILoadingState"
import { AIErrorState } from "../common/AIErrorState"
import { Wand2 } from "lucide-react"

interface AIGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
  patientId: string
  onGenerate: (content: string, type: AIGenerationType) => void
  defaultType?: AIGenerationType
}

export function AIGeneratorModal({
  isOpen,
  onClose,
  patientId,
  onGenerate,
  defaultType = "report",
}: AIGeneratorModalProps) {
  const [type, setType] = useState<AIGenerationType>(defaultType)
  const [instructions, setInstructions] = useState("")

  const {
    status,
    result,
    editedContent,
    isGenerating,
    isCompleted,
    generate,
    updateContent,
    reset,
  } = useAIGeneration()

  useEffect(() => {
    if (isOpen) {
      setType(defaultType)
      setInstructions("")
      reset()
    }
  }, [isOpen, defaultType, reset])

  useEffect(() => {
    const config = GENERATION_TYPES[type]
    setInstructions(config.defaultInstructions ?? "")
  }, [type])

  const handleGenerate = () => {
    generate({
      type,
      patientId,
      instructions,
    })
  }

  const handleValidate = () => {
    onGenerate(editedContent, type)
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Générer avec l'IA</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Type de document
            </label>
            <GeneratorTypeSelect
              value={type}
              onValueChange={setType}
              disabled={isGenerating}
            />
          </div>

          <GeneratorPromptInput
            type={type}
            value={instructions}
            onChange={setInstructions}
            disabled={isGenerating}
          />

          {!isCompleted && !result && (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !instructions.trim()}
              className="gap-2"
            >
              <Wand2 className="h-4 w-4" />
              {isGenerating ? "Génération..." : "Générer"}
            </Button>
          )}

          {isGenerating && <AILoadingState message="Génération en cours..." />}
          {status === "error" && (
            <AIErrorState onRetry={handleGenerate} />
          )}

          {isCompleted && result && (
            <>
              <GeneratedContentPreview
                content={editedContent}
                modelVersion={result.modelVersion}
                generatedAt={result.generatedAt}
                editable
                onContentChange={updateContent}
              />
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => reset()}>
                  Régénérer
                </Button>
                <Button variant="outline" onClick={() => updateContent(result.content)}>
                  Réinitialiser
                </Button>
                <Button onClick={handleValidate}>
                  Valider et utiliser
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
