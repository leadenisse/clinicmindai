import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useGeneratePrescriptionAI } from "../hooks/useGeneratePrescriptionAI"
import type { Prescription } from "../types/prescription.types"
import { Bot, Loader2 } from "lucide-react"

interface AIGenerateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientId: string
  patientName?: string
  allergies?: string[]
  currentTreatments?: string[]
  onGenerated: (prescription: Prescription) => void
}

export function AIGenerateModal({
  open,
  onOpenChange,
  patientId,
  patientName,
  allergies = [],
  currentTreatments = [],
  onGenerated,
}: AIGenerateModalProps) {
  const [context, setContext] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const generateAI = useGeneratePrescriptionAI()

  const handleGenerate = () => {
    generateAI.mutate(
      {
        patientId,
        context,
        diagnosis: diagnosis || undefined,
        allergies: allergies.length > 0 ? allergies : undefined,
        currentTreatments:
          currentTreatments.length > 0 ? currentTreatments : undefined,
      },
      {
        onSuccess: (data) => {
          onGenerated(data)
          onOpenChange(false)
          setContext("")
          setDiagnosis("")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Générer avec l'IA
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          {patientName
            ? `Patient : ${patientName}. Renseignez le contexte clinique pour générer une ordonnance.`
            : "Renseignez le contexte clinique pour générer une ordonnance."}
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Contexte clinique *</Label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Ex : Extraction dentaire 36, douleur modérée, pas d'allergie connue."
              rows={4}
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Diagnostic (optionnel)</Label>
            <Input
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Ex : Infection post-extraction"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!context.trim() || generateAI.isPending}
          >
            {generateAI.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération...
              </>
            ) : (
              "Générer l'ordonnance"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
