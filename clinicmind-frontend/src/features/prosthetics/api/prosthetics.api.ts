import type {
  ProstheticOrder,
  CreateOrderRequest,
  OrderFilters,
  OrderStatus,
  Laboratory,
} from "../types/prosthetics.types"
import { DEFAULT_LABORATORIES } from "../constants/prostheticsConfig"
import { format } from "date-fns"

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

let orderSequence = 1

function generateOrderNumber(): string {
  const now = new Date()
  const ym = format(now, "yyyyMM")
  const seq = String(orderSequence++).padStart(4, "0")
  return `PRO-${ym}-${seq}`
}

const mockOrders: ProstheticOrder[] = [
  {
    id: "ord-1",
    orderNumber: "PRO-202401-0001",
    patientId: "1",
    patient: { id: "1", firstName: "Sophia", lastName: "Mitchel" },
    type: "crown",
    description: "Couronne céramo-céramique 15",
    teeth: ["15"],
    shade: "A2",
    material: "Zircone",
    laboratoryId: "lab-1",
    laboratory: DEFAULT_LABORATORIES[0],
    status: "in_production",
    orderDate: "2024-01-15",
    expectedDate: "2024-02-01",
    instructions: "Teinte A2, pas de métal visible.",
    createdBy: "user-1",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "ord-2",
    orderNumber: "PRO-202401-0002",
    patientId: "2",
    patient: { id: "2", firstName: "Jean", lastName: "Dupont" },
    type: "bridge",
    description: "Bridge 3 éléments 14-16",
    teeth: ["14", "15", "16"],
    shade: "A3",
    material: "Céramo-métallique",
    laboratoryId: "lab-2",
    laboratory: DEFAULT_LABORATORIES[1],
    status: "sent",
    orderDate: "2024-01-20",
    expectedDate: "2024-02-15",
    createdBy: "user-1",
    createdAt: "2024-01-20T14:00:00Z",
    updatedAt: "2024-01-20T14:00:00Z",
  },
  {
    id: "ord-3",
    orderNumber: "PRO-202312-0003",
    patientId: "1",
    patient: { id: "1", firstName: "Sophia", lastName: "Mitchel" },
    type: "inlay_onlay",
    description: "Onlay 46",
    teeth: ["46"],
    material: "Composite",
    laboratoryId: "lab-1",
    laboratory: DEFAULT_LABORATORIES[0],
    status: "fitted",
    orderDate: "2023-12-01",
    expectedDate: "2023-12-15",
    deliveredDate: "2023-12-14",
    fittedDate: "2023-12-18",
    createdBy: "user-1",
    createdAt: "2023-12-01T09:00:00Z",
    updatedAt: "2023-12-18T11:00:00Z",
  },
]

export const prostheticsApi = {
  async getAll(filters?: OrderFilters): Promise<ProstheticOrder[]> {
    await delay(400)
    let list = [...mockOrders]
    if (filters?.patientId) {
      list = list.filter((o) => o.patientId === filters.patientId)
    }
    if (filters?.status) {
      list = list.filter((o) => o.status === filters.status)
    }
    if (filters?.laboratoryId) {
      list = list.filter((o) => o.laboratoryId === filters.laboratoryId)
    }
    if (filters?.startDate) {
      list = list.filter(
        (o) => new Date(o.orderDate) >= new Date(filters!.startDate!)
      )
    }
    if (filters?.endDate) {
      list = list.filter(
        (o) => new Date(o.orderDate) <= new Date(filters!.endDate!)
      )
    }
    list.sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    )
    return list
  },

  async getByPatient(patientId: string): Promise<ProstheticOrder[]> {
    await delay(300)
    return mockOrders
      .filter((o) => o.patientId === patientId)
      .sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      )
  },

  async getById(id: string): Promise<ProstheticOrder> {
    await delay(200)
    const order = mockOrders.find((o) => o.id === id)
    if (!order) throw new Error("Commande non trouvée")
    return order
  },

  async create(data: CreateOrderRequest): Promise<ProstheticOrder> {
    await delay(500)
    const lab = DEFAULT_LABORATORIES.find((l) => l.id === data.laboratoryId)
    const newOrder: ProstheticOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      patientId: data.patientId,
      patient: { id: data.patientId, firstName: "Patient", lastName: "Nouveau" },
      type: data.type,
      description: data.description,
      teeth: data.teeth,
      shade: data.shade,
      material: data.material,
      laboratoryId: data.laboratoryId,
      laboratory: lab,
      quoteId: data.quoteId,
      status: "draft",
      orderDate: format(new Date(), "yyyy-MM-dd"),
      expectedDate: data.expectedDate,
      instructions: data.instructions,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockOrders.push(newOrder)
    return newOrder
  },

  async updateStatus(id: string, status: OrderStatus): Promise<ProstheticOrder> {
    await delay(300)
    const index = mockOrders.findIndex((o) => o.id === id)
    if (index === -1) throw new Error("Commande non trouvée")
    const order = mockOrders[index]
    const updates: Partial<ProstheticOrder> = { status, updatedAt: new Date().toISOString() }
    if (status === "delivered") updates.deliveredDate = format(new Date(), "yyyy-MM-dd")
    if (status === "fitted") updates.fittedDate = format(new Date(), "yyyy-MM-dd")
    mockOrders[index] = { ...order, ...updates }
    return mockOrders[index]
  },

  async getLaboratories(): Promise<Laboratory[]> {
    await delay(200)
    return DEFAULT_LABORATORIES
  },
}
