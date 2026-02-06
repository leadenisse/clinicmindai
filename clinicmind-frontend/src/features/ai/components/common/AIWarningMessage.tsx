import { AI_WARNING_MESSAGE } from "../../constants/aiConfig"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIWarningMessageProps {
  className?: string
}

export function AIWarningMessage({ className }: AIWarningMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900",
        className
      )}
      role="alert"
    >
      <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
      <p className="font-medium">{AI_WARNING_MESSAGE}</p>
    </div>
  )
}
