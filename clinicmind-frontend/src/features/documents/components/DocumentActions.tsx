import type { Document } from "../types/document.types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, Printer, PenLine, Trash2, MoreHorizontal } from "lucide-react"

interface DocumentActionsProps {
  document: Document
  onDownload?: (doc: Document) => void
  onPrint?: (doc: Document) => void
  onSign?: (doc: Document) => void
  onDelete?: (doc: Document) => void
  onEdit?: (doc: Document) => void
  className?: string
}

export function DocumentActions({
  document,
  onDownload,
  onPrint,
  onSign,
  onDelete,
  onEdit,
  className,
}: DocumentActionsProps) {
  const canSign = !document.isSigned && (!document.isAIGenerated || document.aiValidated)
  const canDelete = !document.isSigned

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={className} aria-label="Actions document">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onDownload && (
          <DropdownMenuItem onClick={() => onDownload(document)}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </DropdownMenuItem>
        )}
        {onPrint && (
          <DropdownMenuItem onClick={() => onPrint(document)}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </DropdownMenuItem>
        )}
        {onEdit && !document.isSigned && (
          <DropdownMenuItem onClick={() => onEdit(document)}>
            <PenLine className="mr-2 h-4 w-4" />
            Modifier
          </DropdownMenuItem>
        )}
        {onSign && canSign && (
          <DropdownMenuItem onClick={() => onSign(document)}>
            <PenLine className="mr-2 h-4 w-4" />
            Signer
          </DropdownMenuItem>
        )}
        {onDelete && canDelete && (
          <DropdownMenuItem
            onClick={() => onDelete(document)}
            className="text-error focus:text-error"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
