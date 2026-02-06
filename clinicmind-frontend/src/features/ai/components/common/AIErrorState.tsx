import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIErrorStateProps {
  message?: string
  onRetry?: () => void
  className?: string
}

export function AIErrorState({
  message = "Une erreur s'est produite.",
  onRetry,
  className,
}: AIErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 py-8 px-4 text-destructive",
        className
      )}
    >
      <AlertCircle className="h-8 w-8 shrink-0" />
      <p className="text-center text-sm font-medium">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </div>
  )
}
