import { Badge } from "@/components/ui/badge"
import { Bot } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface AIGeneratedBadgeProps {
  modelVersion?: string
  generatedAt?: string
  className?: string
}

export function AIGeneratedBadge({
  modelVersion,
  generatedAt,
  className,
}: AIGeneratedBadgeProps) {
  const tooltip =
    generatedAt && modelVersion
      ? `Généré par ${modelVersion} le ${format(new Date(generatedAt), "dd/MM/yyyy", { locale: fr })}`
      : "Généré par IA"

  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1 border-0 bg-primary/10 text-primary font-medium",
        className
      )}
      title={tooltip}
    >
      <Bot className="h-3.5 w-3.5 shrink-0" aria-hidden />
      Généré par IA
    </Badge>
  )
}
