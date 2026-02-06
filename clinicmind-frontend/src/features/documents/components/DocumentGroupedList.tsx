import type { Document } from "../types/document.types"
import { DOCUMENT_TYPE_LIST } from "../constants/documentTypes"
import { ICON_MAP } from "./DocumentTypeBadge"
import { AIGeneratedBadge } from "./AIGeneratedBadge"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { usePatientDocumentsGrouped } from "../hooks/useDocuments"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocumentGroupedListProps {
  patientId: string
  onDocumentClick: (doc: Document) => void
}

export function DocumentGroupedList({ patientId, onDocumentClick }: DocumentGroupedListProps) {
  const { data: grouped, isLoading, isError } = usePatientDocumentsGrouped(patientId)

  if (isError) {
    return (
      <p className="text-error">Erreur lors du chargement des documents.</p>
    )
  }

  if (isLoading || !grouped) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    )
  }

  const typesWithDocs = DOCUMENT_TYPE_LIST.filter((config) => {
    const docs = grouped[config.value]
    return docs && docs.length > 0
  })

  if (typesWithDocs.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Aucun document pour ce patient. Ajoutez un document ou uploadez un fichier.
      </p>
    )
  }

  return (
    <Accordion type="multiple" defaultValue={typesWithDocs.map((t) => t.value)} className="w-full">
      {typesWithDocs.map((config) => {
        const docs = grouped[config.value] ?? []
        const Icon = ICON_MAP[config.icon]
        return (
          <AccordionItem key={config.value} value={config.value}>
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
                <span className="font-medium">{config.labelPlural}</span>
                <span className="text-muted-foreground">({docs.length} document{docs.length > 1 ? "s" : ""})</span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1">
                {docs.map((doc) => (
                  <li key={doc.id}>
                    <button
                      type="button"
                      onClick={() => onDocumentClick(doc)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm",
                        "hover:bg-muted/50 transition-colors"
                      )}
                    >
                      <span className="min-w-0 flex-1 truncate font-medium">
                        {doc.title}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {format(new Date(doc.createdAt), "dd/MM/yyyy", { locale: fr })}
                      </span>
                      <span className="flex shrink-0 items-center gap-1">
                        {doc.isAIGenerated && (
                          <AIGeneratedBadge
                            modelVersion={doc.aiModelVersion}
                            generatedAt={doc.createdAt}
                            className="text-[10px] px-1.5 py-0"
                          />
                        )}
                        {doc.isSigned && (
                          <Badge
                            variant="outline"
                            className="gap-0.5 border-success/50 bg-success/10 text-success text-[10px] px-1.5 py-0"
                          >
                            <Check className="h-2.5 w-2.5" />
                            Signé
                          </Badge>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
