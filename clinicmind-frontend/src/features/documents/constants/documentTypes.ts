import type { DocumentTypeConfig, DocumentType } from "../types/document.types"

export const DOCUMENT_TYPES: Record<DocumentType, DocumentTypeConfig> = {
  REPORT: {
    value: "REPORT",
    label: "Compte rendu",
    labelPlural: "Comptes rendus",
    icon: "FileText",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Compte rendu de consultation ou d'intervention",
  },
  PRESCRIPTION: {
    value: "PRESCRIPTION",
    label: "Ordonnance",
    labelPlural: "Ordonnances",
    icon: "Pill",
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Prescription médicamenteuse",
  },
  ADVICE: {
    value: "ADVICE",
    label: "Fiche conseil",
    labelPlural: "Fiches conseil",
    icon: "Lightbulb",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Conseils post-opératoires ou hygiène",
  },
  LETTER: {
    value: "LETTER",
    label: "Courrier",
    labelPlural: "Courriers",
    icon: "Mail",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    description: "Courrier médical ou administratif",
  },
  CONSENT: {
    value: "CONSENT",
    label: "Consentement",
    labelPlural: "Consentements",
    icon: "CheckSquare",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Formulaire de consentement signé",
  },
  EXTERNAL: {
    value: "EXTERNAL",
    label: "Document externe",
    labelPlural: "Documents externes",
    icon: "Paperclip",
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    description: "Document reçu (bilan, courrier confrère...)",
  },
  XRAY: {
    value: "XRAY",
    label: "Radiographie",
    labelPlural: "Radiographies",
    icon: "ScanLine",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    description: "Image radiologique",
  },
}

export const DOCUMENT_TYPE_LIST = Object.values(DOCUMENT_TYPES)

export function getDocumentTypeConfig(type: DocumentType): DocumentTypeConfig {
  return DOCUMENT_TYPES[type] ?? DOCUMENT_TYPES.EXTERNAL
}
