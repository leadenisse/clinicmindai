import { Button } from "@/components/ui/button"
import { AlertTriangle, Check } from "lucide-react"
import { formatAIDate } from "../../utils/aiHelpers"
import { cn } from "@/lib/utils"

interface AIValidationBannerProps {
  isValidated: boolean
  validatedBy?: string
  validatedAt?: string
  onValidate: () => void
  onEdit: () => void
  isValidating?: boolean
  className?: string
}

export function AIValidationBanner({
  isValidated,
  validatedBy,
  validatedAt,
  onValidate,
  onEdit,
  isValidating = false,
  className,
}: AIValidationBannerProps) {
  if (isValidated) {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800",
          className
        )}
      >
        <span className="flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0" />
          {validatedBy && validatedAt
            ? `Validé par ${validatedBy} le ${formatAIDate(validatedAt)}`
            : "Contenu IA validé"}
        </span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <span className="flex items-center gap-2 font-medium">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        Ce contenu a été généré par IA. Veuillez vérifier avant validation.
      </span>
      <div className="flex shrink-0 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="border-amber-300"
        >
          Modifier
        </Button>
        <Button size="sm" onClick={onValidate} disabled={isValidating}>
          {isValidating ? "Validation..." : "Valider"}
        </Button>
      </div>
    </div>
  )
}
