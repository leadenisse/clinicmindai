import { AI_BADGE_TEXT } from "../../constants/aiConfig"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { formatAIDate } from "../../utils/aiHelpers"

interface AIBadgeProps {
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
  modelVersion?: string
  generatedAt?: string
  className?: string
}

export function AIBadge({
  size = "md",
  showTooltip = true,
  modelVersion,
  generatedAt,
  className,
}: AIBadgeProps) {
  const label = "🤖 " + AI_BADGE_TEXT
  const tooltipText =
    modelVersion && generatedAt
      ? `Généré par ${modelVersion} le ${formatAIDate(generatedAt)}`
      : "Contenu généré par intelligence artificielle"

  const badge = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border-0 font-medium text-teal-700 bg-teal-100 border-teal-200",
        size === "sm" && "px-1.5 py-0 text-[10px]",
        size === "md" && "px-2 py-0.5 text-xs",
        size === "lg" && "px-2.5 py-1 text-sm",
        className
      )}
    >
      <span>{label}</span>
    </span>
  )

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{badge}</TooltipTrigger>
          <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  return badge
}
