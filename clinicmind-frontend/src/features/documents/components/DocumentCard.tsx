import type { Document } from "../types/document.types"
import { DocumentTypeBadge } from "./DocumentTypeBadge"
import { AIGeneratedBadge } from "./AIGeneratedBadge"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocumentCardProps {
  document: Document
  onClick: () => void
  className?: string
}

export function DocumentCard({ document, onClick, className }: DocumentCardProps) {
  const contentPreview = document.content
    ? document.content.split("\n").slice(0, 3).join(" ").trim()
    : ""
  const preview = contentPreview
    ? contentPreview.slice(0, 120) + (contentPreview.length > 120 ? "…" : "")
    : document.description ?? document.fileName ?? ""

  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors hover:border-primary/50 hover:bg-muted/30",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <DocumentTypeBadge type={document.type} size="sm" />
          {document.isAIGenerated && (
            <AIGeneratedBadge
              modelVersion={document.aiModelVersion}
              generatedAt={document.createdAt}
            />
          )}
          {document.isSigned && (
            <Badge variant="outline" className="gap-1 border-success/50 bg-success/10 text-success text-xs">
              <Check className="h-3 w-3" />
              Signé
            </Badge>
          )}
        </div>
        <p className="font-medium leading-tight">{document.title}</p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(document.createdAt), "dd MMMM yyyy", { locale: fr })}
        </p>
        {preview && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{preview}</p>
        )}
      </CardContent>
    </Card>
  )
}
