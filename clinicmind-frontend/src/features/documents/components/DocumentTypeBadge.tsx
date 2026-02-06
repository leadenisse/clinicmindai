import type { DocumentType } from "../types/document.types"
import { getDocumentTypeConfig } from "../constants/documentTypes"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Pill,
  Lightbulb,
  Mail,
  CheckSquare,
  Paperclip,
  ScanLine,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

export const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Pill,
  Lightbulb,
  Mail,
  CheckSquare,
  Paperclip,
  ScanLine,
}

interface DocumentTypeBadgeProps {
  type: DocumentType
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function DocumentTypeBadge({
  type,
  showLabel = true,
  size = "md",
  className,
}: DocumentTypeBadgeProps) {
  const config = getDocumentTypeConfig(type)
  const Icon = ICON_MAP[config.icon] ?? FileText

  const sizeClasses = {
    sm: "gap-1 px-1.5 py-0 text-[10px] [&_svg]:h-3 [&_svg]:w-3",
    md: "gap-1.5 px-2 py-0.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
    lg: "gap-2 px-2.5 py-1 text-sm [&_svg]:h-4 [&_svg]:w-4",
  }

  return (
    <Badge
      variant="secondary"
      className={cn(
        "border-0 font-medium",
        config.bgColor,
        config.color,
        sizeClasses[size],
        className
      )}
    >
      <Icon className="shrink-0" aria-hidden />
      {showLabel && <span>{config.label}</span>}
    </Badge>
  )
}
