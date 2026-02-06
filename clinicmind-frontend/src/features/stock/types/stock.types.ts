export type StockCategory =
  | "anesthesia"
  | "sterilization"
  | "restorative"
  | "endodontics"
  | "surgery"
  | "prosthetics"
  | "prevention"
  | "consumables"
  | "other"

export type StockLevel = "ok" | "low" | "critical" | "out"

export type MovementType = "in" | "out" | "adjustment"

export interface StockItem {
  id: string
  name: string
  reference?: string
  category: StockCategory
  currentQuantity: number
  minQuantity: number
  maxQuantity?: number
  unit: string
  stockLevel: StockLevel
  supplier?: string
  supplierRef?: string
  unitPrice?: number
  expirationDate?: string
  lastRestocked?: string
  createdAt: string
  updatedAt: string
}

export interface StockMovement {
  id: string
  itemId: string
  type: MovementType
  quantity: number
  reason?: string
  performedBy: string
  performedAt: string
}

export interface StockAlert {
  id: string
  itemId: string
  item: StockItem
  type: "low_stock" | "out_of_stock" | "expiring_soon" | "expired"
  message: string
  createdAt: string
  acknowledgedAt?: string
}

export interface CreateStockItemRequest {
  name: string
  reference?: string
  category: StockCategory
  currentQuantity: number
  minQuantity: number
  unit: string
  supplier?: string
  unitPrice?: number
  expirationDate?: string
}

export interface StockFilters {
  search?: string
  category?: StockCategory
  stockLevel?: StockLevel
}

export interface RecordMovementRequest {
  itemId: string
  type: MovementType
  quantity: number
  reason?: string
}
