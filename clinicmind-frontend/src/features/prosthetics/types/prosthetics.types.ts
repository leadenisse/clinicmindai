export type ProstheticType =
  | "crown"
  | "bridge"
  | "inlay_onlay"
  | "veneer"
  | "removable_partial"
  | "removable_complete"
  | "implant_crown"
  | "other"

export type OrderStatus =
  | "draft"
  | "sent"
  | "in_production"
  | "ready"
  | "delivered"
  | "fitted"
  | "issue"

export interface Laboratory {
  id: string
  name: string
  address?: string
  phone?: string
  email?: string
  isDefault?: boolean
}

export interface ProstheticOrder {
  id: string
  orderNumber: string
  patientId: string
  patient?: {
    id: string
    firstName: string
    lastName: string
  }
  type: ProstheticType
  description: string
  teeth: string[]
  shade?: string
  material?: string
  laboratoryId: string
  laboratory?: Laboratory
  quoteId?: string
  invoiceId?: string
  status: OrderStatus
  orderDate: string
  expectedDate?: string
  deliveredDate?: string
  fittedDate?: string
  instructions?: string
  labNotes?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface CreateOrderRequest {
  patientId: string
  type: ProstheticType
  description: string
  teeth: string[]
  shade?: string
  material?: string
  laboratoryId: string
  expectedDate?: string
  instructions?: string
  quoteId?: string
}

export interface OrderFilters {
  status?: OrderStatus
  laboratoryId?: string
  patientId?: string
  startDate?: string
  endDate?: string
}
