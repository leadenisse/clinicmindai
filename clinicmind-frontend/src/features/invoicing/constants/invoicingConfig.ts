import type {
  QuoteStatus,
  InvoiceStatus,
  PaymentMethod,
  DentalActCategory,
} from "../types/invoicing.types"

export interface StatusConfig {
  value: string
  label: string
  icon: string
  color: string
  bgColor: string
}

export const QUOTE_STATUSES: Record<QuoteStatus, StatusConfig> = {
  draft: {
    value: "draft",
    label: "Brouillon",
    icon: "FileEdit",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
  sent: {
    value: "sent",
    label: "Envoyé",
    icon: "Send",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  accepted: {
    value: "accepted",
    label: "Accepté",
    icon: "CheckCircle",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  rejected: {
    value: "rejected",
    label: "Refusé",
    icon: "XCircle",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  expired: {
    value: "expired",
    label: "Expiré",
    icon: "Clock",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  converted: {
    value: "converted",
    label: "Converti",
    icon: "ArrowRight",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
}

export const INVOICE_STATUSES: Record<InvoiceStatus, StatusConfig> = {
  draft: {
    value: "draft",
    label: "Brouillon",
    icon: "FileEdit",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
  validated: {
    value: "validated",
    label: "Validée",
    icon: "FileCheck",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  sent: {
    value: "sent",
    label: "Envoyée",
    icon: "Send",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  partial: {
    value: "partial",
    label: "Paiement partiel",
    icon: "CircleDot",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  paid: {
    value: "paid",
    label: "Payée",
    icon: "CheckCircle2",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  cancelled: {
    value: "cancelled",
    label: "Annulée",
    icon: "XCircle",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
}

export const PAYMENT_METHODS: Record<
  PaymentMethod,
  { label: string; icon: string }
> = {
  cash: { label: "Espèces", icon: "Banknote" },
  card: { label: "Carte bancaire", icon: "CreditCard" },
  check: { label: "Chèque", icon: "FileText" },
  transfer: { label: "Virement", icon: "ArrowRightLeft" },
  other: { label: "Autre", icon: "MoreHorizontal" },
}

export const ACT_CATEGORIES: Record<
  DentalActCategory,
  { label: string; icon: string }
> = {
  consultation: { label: "Consultation", icon: "Stethoscope" },
  prevention: { label: "Prévention", icon: "Shield" },
  conservative: { label: "Soins conservateurs", icon: "Wrench" },
  endodontics: { label: "Endodontie", icon: "Zap" },
  surgery: { label: "Chirurgie", icon: "Scissors" },
  prosthetics: { label: "Prothèses", icon: "Component" },
  orthodontics: { label: "Orthodontie", icon: "Smile" },
  radiology: { label: "Radiologie", icon: "ScanLine" },
  other: { label: "Autres", icon: "MoreHorizontal" },
}

export const DEFAULT_QUOTE_VALIDITY_DAYS = 90
export const DEFAULT_PAYMENT_DELAY_DAYS = 30
export const INVOICE_NUMBER_PREFIX = "FACT"
export const QUOTE_NUMBER_PREFIX = "DEV"
