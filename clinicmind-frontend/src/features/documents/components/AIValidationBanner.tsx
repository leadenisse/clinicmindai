import type { Document } from "../types/document.types"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Check } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface AIValidationBannerProps {
  document: Document
  onValidate: () => void
  onEdit: () => void
  isValidating?: boolean
  className?: string
}

export function AIValidationBanner({
  document,
  onValidate,
  onEdit,
  isValidating = false,
  className,
}: AIValidationBannerProps) {
  if (!document.isAIGenerated) return null

  if (document.aiValidated) {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-4 rounded-lg border border-success/50 bg-success/10 px-4 py-3 text-sm text-success",
          className
        )}
      >
        <span className="flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0" />
          {document.aiValidatedBy && document.aiValidatedAt
            ? `Validé par ${document.aiValidatedBy} le ${format(new Date(document.aiValidatedAt), "dd/MM/yyyy à HH:mm", { locale: fr })}`
            : "Contenu IA validé"}
        </span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-warning/50 bg-warning/10 px-4 py-3 text-sm text-warning sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <span className="flex items-center gap-2 font-medium">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        Ce contenu a été généré par IA. Veuillez vérifier avant validation.
      </span>
      <div className="flex shrink-0 gap-2">
        <Button variant="outline" size="sm" onClick={onEdit} className="border-warning/50">
          Modifier
        </Button>
        <Button size="sm" onClick={onValidate} disabled={isValidating}>
          {isValidating ? "Validation..." : "Valider"}
        </Button>
      </div>
    </div>
  )
}
