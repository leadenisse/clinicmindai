import type { Document } from "../types/document.types"
import { DocumentCard } from "./DocumentCard"
import { Skeleton } from "@/components/ui/skeleton"

interface DocumentListProps {
  documents: Document[]
  isLoading?: boolean
  onDocumentClick: (doc: Document) => void
}

export function DocumentList({
  documents,
  isLoading,
  onDocumentClick,
}: DocumentListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    )
  }

  if (documents.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Aucun document trouvé.
      </p>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onClick={() => onDocumentClick(doc)}
        />
      ))}
    </div>
  )
}
