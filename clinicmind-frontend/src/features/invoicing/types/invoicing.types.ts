// ===== ACTES DENTAIRES =====

export interface DentalAct {
  id: string
  code: string
  description: string
  category: DentalActCategory
  basePrice: number
  isHN: boolean
  maxPrice?: number
}

export type DentalActCategory =
  | "consultation"
  | "prevention"
  | "conservative"
  | "endodontics"
  | "surgery"
  | "prosthetics"
  | "orthodontics"
  | "radiology"
  | "other"

// ===== LIGNES D'ACTES =====

export interface LineItem {
  id: string
  actId?: string
  code: string
  description: string
  tooth?: string
  quantity: number
  unitPrice: number
  discount?: number
  total: number
}

// ===== DEVIS =====

export type QuoteStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired"
  | "converted"

export interface Quote {
  id: string
  quoteNumber: string
  patientId: string
  patient?: {
    id: string
    firstName: string
    lastName: string
    address?: string
  }
  items: LineItem[]
  subtotal: number
  totalDiscount: number
  total: number
  estimatedReimbursement?: number
  estimatedMutual?: number
  estimatedRAC?: number
  status: QuoteStatus
  validUntil: string
  sentAt?: string
  acceptedAt?: string
  rejectedAt?: string
  convertedToInvoiceId?: string
  notes?: string
  patientNotes?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

// ===== FACTURES =====

export type InvoiceStatus =
  | "draft"
  | "validated"
  | "sent"
  | "paid"
  | "partial"
  | "cancelled"

export type PaymentMethod =
  | "cash"
  | "card"
  | "check"
  | "transfer"
  | "other"

export interface Payment {
  id: string
  amount: number
  method: PaymentMethod
  date: string
  reference?: string
  notes?: string
  createdBy: string
  createdAt: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  patientId: string
  patient?: {
    id: string
    firstName: string
    lastName: string
    address?: string
  }
  quoteId?: string
  quoteNumber?: string
  items: LineItem[]
  subtotal: number
  totalDiscount: number
  total: number
  payments: Payment[]
  totalPaid: number
  remainingBalance: number
  status: InvoiceStatus
  issueDate: string
  dueDate: string
  paidAt?: string
  cancelledAt?: string
  notes?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

// ===== FILTRES =====

export interface InvoiceFilters {
  patientId?: string
  status?: InvoiceStatus
  startDate?: string
  endDate?: string
  search?: string
  page?: number
  limit?: number
}

export interface QuoteFilters {
  patientId?: string
  status?: QuoteStatus
  startDate?: string
  endDate?: string
  search?: string
  page?: number
  limit?: number
}

// ===== REQUESTS =====

export interface CreateQuoteRequest {
  patientId: string
  items: Omit<LineItem, "id" | "total">[]
  validUntil: string
  notes?: string
  patientNotes?: string
}

export interface CreateInvoiceRequest {
  patientId: string
  items: Omit<LineItem, "id" | "total">[]
  dueDate: string
  notes?: string
  quoteId?: string
}

export interface RecordPaymentRequest {
  invoiceId: string
  amount: number
  method: PaymentMethod
  date: string
  reference?: string
  notes?: string
}
