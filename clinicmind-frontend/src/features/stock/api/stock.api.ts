import type {
  StockItem,
  StockMovement,
  StockAlert,
  StockFilters,
  CreateStockItemRequest,
  RecordMovementRequest,
} from "../types/stock.types"
import { calculateStockLevel } from "../constants/stockConfig"
import { addDays, format, isBefore, parseISO } from "date-fns"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function applyStockLevel(item: StockItem): StockItem {
  return {
    ...item,
    stockLevel: calculateStockLevel(item.currentQuantity, item.minQuantity),
  }
}

const mockItems: StockItem[] = [
  applyStockLevel({
    id: "st-1",
    name: "Carpules anesthésie Lidocaïne",
    reference: "LIDO-50",
    category: "anesthesia",
    currentQuantity: 120,
    minQuantity: 30,
    maxQuantity: 200,
    unit: "unité",
    stockLevel: "ok",
    supplier: "Septodont",
    unitPrice: 0.85,
    lastRestocked: "2024-01-15",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  }),
  applyStockLevel({
    id: "st-2",
    name: "Gants nitrile Taille M",
    reference: "GNT-M",
    category: "sterilization",
    currentQuantity: 8,
    minQuantity: 20,
    unit: "boîte",
    stockLevel: "low",
    supplier: "Hartmann",
    lastRestocked: "2024-01-10",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  }),
  applyStockLevel({
    id: "st-3",
    name: "Composite A2",
    reference: "COMP-A2",
    category: "restorative",
    currentQuantity: 0,
    minQuantity: 5,
    unit: "tube",
    stockLevel: "out",
    supplier: "3M",
    unitPrice: 45,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  }),
  applyStockLevel({
    id: "st-4",
    name: "Limes endodontiques 25mm",
    reference: "LIME-25",
    category: "endodontics",
    currentQuantity: 15,
    minQuantity: 40,
    unit: "boîte",
    stockLevel: "critical",
    supplier: "Dentsply",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  }),
  applyStockLevel({
    id: "st-5",
    name: "Brosses à dent prévention",
    reference: "BDP-KID",
    category: "prevention",
    currentQuantity: 80,
    minQuantity: 25,
    unit: "unité",
    stockLevel: "ok",
    expirationDate: "2025-06-01",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  }),
]

const mockMovements: StockMovement[] = [
  {
    id: "mv-1",
    itemId: "st-1",
    type: "in",
    quantity: 50,
    reason: "Réapprovisionnement",
    performedBy: "Marie Martin",
    performedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "mv-2",
    itemId: "st-2",
    type: "out",
    quantity: -2,
    reason: "Usage quotidien",
    performedBy: "Sophie Bernard",
    performedAt: "2024-01-20T14:00:00Z",
  },
]

function buildAlerts(items: StockItem[]): StockAlert[] {
  const alerts: StockAlert[] = []
  const now = new Date()
  const soon = addDays(now, 30)

  for (const item of items) {
    if (item.currentQuantity === 0) {
      alerts.push({
        id: `alert-${item.id}-out`,
        itemId: item.id,
        item,
        type: "out_of_stock",
        message: `Rupture de stock : ${item.name}`,
        createdAt: new Date().toISOString(),
      })
    } else if (item.stockLevel === "critical" || item.stockLevel === "low") {
      alerts.push({
        id: `alert-${item.id}-low`,
        itemId: item.id,
        item,
        type: "low_stock",
        message: `Stock bas pour ${item.name} (${item.currentQuantity} ${item.unit})`,
        createdAt: new Date().toISOString(),
      })
    }
    if (item.expirationDate) {
      const exp = parseISO(item.expirationDate)
      if (isBefore(exp, now)) {
        alerts.push({
          id: `alert-${item.id}-expired`,
          itemId: item.id,
          item,
          type: "expired",
          message: `Produit expiré : ${item.name} (${format(exp, "dd/MM/yyyy")})`,
          createdAt: new Date().toISOString(),
        })
      } else if (isBefore(exp, soon)) {
        alerts.push({
          id: `alert-${item.id}-expiring`,
          itemId: item.id,
          item,
          type: "expiring_soon",
          message: `Expiration proche : ${item.name} (${format(exp, "dd/MM/yyyy")})`,
          createdAt: new Date().toISOString(),
        })
      }
    }
  }

  return alerts.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export const stockApi = {
  async getItems(filters?: StockFilters): Promise<StockItem[]> {
    await delay(350)
    let list = mockItems.map(applyStockLevel)
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          (i.reference?.toLowerCase().includes(q) ?? false)
      )
    }
    if (filters?.category) {
      list = list.filter((i) => i.category === filters.category)
    }
    if (filters?.stockLevel) {
      list = list.filter((i) => i.stockLevel === filters.stockLevel)
    }
    return list.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  },

  async getItemById(id: string): Promise<StockItem> {
    await delay(250)
    const item = mockItems.find((i) => i.id === id)
    if (!item) throw new Error("Produit non trouvé")
    return applyStockLevel(item)
  },

  async createItem(data: CreateStockItemRequest): Promise<StockItem> {
    await delay(400)
    const now = new Date().toISOString()
    const newItem = applyStockLevel({
      id: `st-${Date.now()}`,
      name: data.name,
      reference: data.reference,
      category: data.category,
      currentQuantity: data.currentQuantity,
      minQuantity: data.minQuantity,
      unit: data.unit,
      stockLevel: "ok",
      supplier: data.supplier,
      unitPrice: data.unitPrice,
      expirationDate: data.expirationDate,
      lastRestocked: data.currentQuantity > 0 ? format(new Date(), "yyyy-MM-dd") : undefined,
      createdAt: now,
      updatedAt: now,
    })
    mockItems.push(newItem)
    return newItem
  },

  async updateItem(
    id: string,
    data: Partial<CreateStockItemRequest> & { minQuantity?: number; maxQuantity?: number }
  ): Promise<StockItem> {
    await delay(400)
    const index = mockItems.findIndex((i) => i.id === id)
    if (index === -1) throw new Error("Produit non trouvé")
    const next = {
      ...mockItems[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    mockItems[index] = applyStockLevel(next)
    return mockItems[index]
  },

  async deleteItem(id: string): Promise<void> {
    await delay(300)
    const index = mockItems.findIndex((i) => i.id === id)
    if (index === -1) throw new Error("Produit non trouvé")
    mockItems.splice(index, 1)
  },

  async recordMovement(data: RecordMovementRequest): Promise<StockMovement> {
    await delay(400)
    const item = mockItems.find((i) => i.id === data.itemId)
    if (!item) throw new Error("Produit non trouvé")
    const qty =
      data.type === "out" ? -Math.abs(data.quantity) : Math.abs(data.quantity)
    const newQty = Math.max(0, item.currentQuantity + qty)
    const index = mockItems.findIndex((i) => i.id === data.itemId)
    mockItems[index] = applyStockLevel({
      ...mockItems[index],
      currentQuantity: newQty,
      lastRestocked: data.type === "in" ? format(new Date(), "yyyy-MM-dd") : item.lastRestocked,
      updatedAt: new Date().toISOString(),
    })
    const movement: StockMovement = {
      id: `mv-${Date.now()}`,
      itemId: data.itemId,
      type: data.type,
      quantity: qty,
      reason: data.reason,
      performedBy: "Utilisateur courant",
      performedAt: new Date().toISOString(),
    }
    mockMovements.unshift(movement)
    return movement
  },

  async getMovements(itemId: string): Promise<StockMovement[]> {
    await delay(300)
    return mockMovements
      .filter((m) => m.itemId === itemId)
      .sort(
        (a, b) =>
          new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime()
      )
  },

  async getAlerts(): Promise<StockAlert[]> {
    await delay(350)
    const items = mockItems.map(applyStockLevel)
    return buildAlerts(items)
  },

  async getAlertsCount(): Promise<number> {
    await delay(200)
    const items = mockItems.map(applyStockLevel)
    return buildAlerts(items).length
  },
}
