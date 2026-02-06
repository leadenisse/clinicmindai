import { SUGGESTED_QUESTIONS } from "../../constants/aiConfig"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void
  disabled?: boolean
  className?: string
}

export function SuggestedQuestions({
  onSelect,
  disabled,
  className,
}: SuggestedQuestionsProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-medium text-muted-foreground">
        Questions suggérées
      </p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((q) => (
          <Button
            key={q}
            variant="outline"
            size="sm"
            className="h-auto whitespace-normal text-left text-xs"
            onClick={() => onSelect(q)}
            disabled={disabled}
          >
            {q}
          </Button>
        ))}
      </div>
    </div>
  )
}
