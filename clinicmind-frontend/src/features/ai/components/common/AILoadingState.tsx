import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AILoadingStateProps {
  message?: string
  className?: string
}

export function AILoadingState({
  message = "Génération en cours...",
  className,
}: AILoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-8 text-muted-foreground",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
