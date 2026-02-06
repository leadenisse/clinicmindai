import { AIBadge } from "../common/AIBadge"
import { AIWarningMessage } from "../common/AIWarningMessage"
import { cn } from "@/lib/utils"

interface GeneratedContentPreviewProps {
  content: string
  modelVersion?: string
  generatedAt?: string
  editable?: boolean
  onContentChange?: (value: string) => void
  className?: string
}

export function GeneratedContentPreview({
  content,
  modelVersion,
  generatedAt,
  editable = true,
  onContentChange,
  className,
}: GeneratedContentPreviewProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Résultat</span>
        <AIBadge
          size="sm"
          modelVersion={modelVersion}
          generatedAt={generatedAt}
        />
      </div>
      <AIWarningMessage />
      {editable && onContentChange ? (
        <textarea
          className="min-h-[200px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Contenu généré..."
        />
      ) : (
        <div className="rounded-md border bg-muted/30 p-4 text-sm whitespace-pre-wrap">
          {content}
        </div>
      )}
    </div>
  )
}
