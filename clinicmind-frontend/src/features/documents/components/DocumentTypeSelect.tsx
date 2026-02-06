import type { DocumentType } from "../types/document.types"
import { DOCUMENT_TYPE_LIST } from "../constants/documentTypes"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ICON_MAP } from "./DocumentTypeBadge"

interface DocumentTypeSelectProps {
  value: DocumentType
  onValueChange: (value: DocumentType) => void
  placeholder?: string
  className?: string
}

export function DocumentTypeSelect({
  value,
  onValueChange,
  placeholder = "Type de document",
  className,
}: DocumentTypeSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onValueChange(v as DocumentType)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {DOCUMENT_TYPE_LIST.map((config) => {
          const Icon = ICON_MAP[config.icon]
          return (
            <SelectItem key={config.value} value={config.value}>
              <span className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                {config.label}
              </span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
