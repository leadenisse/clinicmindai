import type { Document } from "../types/document.types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DocumentTypeBadge } from "./DocumentTypeBadge"
import { AIGeneratedBadge } from "./AIGeneratedBadge"
import { AIValidationBanner } from "./AIValidationBanner"
import { DocumentActions } from "./DocumentActions"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Download, FileText } from "lucide-react"

interface DocumentViewerProps {
  document: Document | null
  isOpen: boolean
  onClose: () => void
  onValidate?: (doc: Document) => void
  onSign?: (doc: Document) => void
  onDelete?: (doc: Document) => void
  onDownload?: (doc: Document) => void
  onPrint?: (doc: Document) => void
  isValidating?: boolean
  isSigning?: boolean
}

export function DocumentViewer({
  document,
  isOpen,
  onClose,
  onValidate,
  onSign,
  onDelete,
  onDownload,
  onPrint,
  isValidating = false,
  isSigning = false,
}: DocumentViewerProps) {
  if (!document) return null

  const isFile = !!document.filePath || !!document.fileName
  const isPdf = document.fileType === "application/pdf"

  const handleDownload = (doc: Document) => {
    if (onDownload) onDownload(doc)
    else if (doc.content) {
      const blob = new Blob([doc.content], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const a = window.document.createElement("a")
      a.href = url
      a.download = `${doc.title}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handlePrint = (doc: Document) => {
    if (onPrint) onPrint(doc)
    else if (doc.content) {
      const w = window.open("", "_blank")
      if (w) {
        w.document.write(`<html><body><pre style="font-family: sans-serif; padding: 2rem;">${doc.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre></body></html>`)
        w.document.close()
        w.print()
        w.close()
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <div className="flex items-start justify-between gap-4 pr-8">
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-lg font-semibold leading-tight">
                {document.title}
              </DialogTitle>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <DocumentTypeBadge type={document.type} size="sm" />
                {document.isAIGenerated && (
                  <AIGeneratedBadge
                    modelVersion={document.aiModelVersion}
                    generatedAt={document.createdAt}
                  />
                )}
                <span className="text-xs text-muted-foreground">
                  {format(new Date(document.createdAt), "dd MMMM yyyy", { locale: fr })}
                </span>
              </div>
            </div>
            <DocumentActions
              document={document}
              onDownload={onDownload ?? handleDownload}
              onPrint={onPrint ?? handlePrint}
              onSign={onSign}
              onDelete={onDelete}
            />
          </div>
        </DialogHeader>

        {document.isAIGenerated && (
          <AIValidationBanner
            document={document}
            onValidate={() => onValidate?.(document)}
            onEdit={onClose}
            isValidating={isValidating}
            className="shrink-0"
          />
        )}

        <div className="min-h-0 flex-1 overflow-y-auto">
          {document.content ? (
            <div className="rounded-lg border border-border bg-muted/20 p-4 font-mono text-sm whitespace-pre-wrap">
              {document.content}
            </div>
          ) : isFile ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted/20 py-12">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <p className="text-center text-sm text-muted-foreground">
                {isPdf
                  ? "Aperçu PDF non disponible en mode démo. Utilisez Télécharger pour récupérer le fichier."
                  : "Fichier joint : " + (document.fileName ?? document.filePath)}
              </p>
              <Button variant="outline" size="sm" onClick={() => handleDownload(document)}>
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground">Aucun contenu à afficher.</p>
          )}
        </div>

        {!document.isSigned && onSign && (!document.isAIGenerated || document.aiValidated) && (
          <div className="flex shrink-0 justify-end border-t border-border pt-4">
            <Button onClick={() => onSign(document)} disabled={isSigning}>
              {isSigning ? "Signature..." : "Signer le document"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
