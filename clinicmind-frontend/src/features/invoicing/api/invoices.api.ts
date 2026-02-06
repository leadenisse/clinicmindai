import type {
  Invoice,
  InvoiceFilters,
  CreateInvoiceRequest,
  RecordPaymentRequest,
  InvoiceStatus,
  Payment,
} from "../types/invoicing.types"
import {
  calculateTotals,
  calculateLineTotal,
} from "../utils/invoiceCalculations"
import { generateInvoiceNumber } from "../utils/invoiceNumbering"
import { INVOICE_STATUSES } from "../constants/invoicingConfig"
import { format } from "date-fns"

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

let invoiceSequence = 1

const mockInvoices: Invoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "FACT-202401-0001",
    patientId: "1",
    patient: {
      id: "1",
      firstName: "Sophia",
      lastName: "Mitchel",
      address: "225 Rue d'Antibes, 06400 Cannes",
    },
    items: [
      {
        id: "line-1",
        code: "HBFD021",
        description: "Extraction dent permanente",
        tooth: "46",
        quantity: 1,
        unitPrice: 33.44,
        total: 33.44,
      },
      {
        id: "line-2",
        code: "HBQK001",
        description: "Radiographie rétro-alvéolaire",
        quantity: 1,
        unitPrice: 4.64,
        total: 4.64,
      },
    ],
    subtotal: 38.08,
    totalDiscount: 0,
    total: 38.08,
    payments: [
      {
        id: "pay-1",
        amount: 38.08,
        method: "card",
        date: "2024-01-15",
        createdBy: "user-1",
        createdAt: "2024-01-15T11:00:00Z",
      },
    ],
    totalPaid: 38.08,
    remainingBalance: 0,
    status: "paid",
    issueDate: "2024-01-15",
    dueDate: "2024-02-15",
    paidAt: "2024-01-15T11:00:00Z",
    createdBy: "user-1",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
  },
  {
    id: "inv-2",
    invoiceNumber: "FACT-202401-0002",
    patientId: "2",
    patient: {
      id: "2",
      firstName: "Jean",
      lastName: "Dupont",
      address: "10 Avenue de la Gare, 06000 Nice",
    },
    items: [
      {
        id: "line-3",
        code: "HBLD036",
        description: "Couronne céramo-céramique",
        tooth: "36",
        quantity: 1,
        unitPrice: 450.0,
        total: 450.0,
      },
      {
        id: "line-4",
        code: "IC",
        description: "Inlay-core",
        tooth: "36",
        quantity: 1,
        unitPrice: 180.0,
        total: 180.0,
      },
    ],
    subtotal: 630.0,
    totalDiscount: 0,
    total: 630.0,
    payments: [
      {
        id: "pay-2",
        amount: 300.0,
        method: "card",
        date: "2024-01-20",
        createdBy: "user-1",
        createdAt: "2024-01-20T15:00:00Z",
      },
    ],
    totalPaid: 300.0,
    remainingBalance: 330.0,
    status: "partial",
    issueDate: "2024-01-20",
    dueDate: "2024-02-20",
    createdBy: "user-1",
    createdAt: "2024-01-20T14:00:00Z",
    updatedAt: "2024-01-20T15:00:00Z",
  },
  {
    id: "inv-3",
    invoiceNumber: "FACT-202401-0003",
    patientId: "3",
    patient: {
      id: "3",
      firstName: "Marie",
      lastName: "Durand",
      address: "5 Rue du Port, 06600 Antibes",
    },
    items: [
      {
        id: "line-5",
        code: "HBMD050",
        description: "Détartrage et polissage des dents",
        quantity: 1,
        unitPrice: 28.92,
        total: 28.92,
      },
    ],
    subtotal: 28.92,
    totalDiscount: 0,
    total: 28.92,
    payments: [],
    totalPaid: 0,
    remainingBalance: 28.92,
    status: "validated",
    issueDate: "2024-01-22",
    dueDate: "2024-02-22",
    createdBy: "user-1",
    createdAt: "2024-01-22T09:00:00Z",
    updatedAt: "2024-01-22T09:00:00Z",
  },
]

export const invoicesApi = {
  async getAll(filters?: InvoiceFilters): Promise<Invoice[]> {
    await delay(400)
    let filtered = [...mockInvoices]
    if (filters?.patientId) {
      filtered = filtered.filter((i) => i.patientId === filters.patientId)
    }
    if (filters?.status) {
      filtered = filtered.filter((i) => i.status === filters.status)
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(
        (i) =>
          i.invoiceNumber.toLowerCase().includes(search) ||
          i.patient?.lastName?.toLowerCase().includes(search) ||
          i.patient?.firstName?.toLowerCase().includes(search)
      )
    }
    filtered.sort(
      (a, b) =>
        new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
    )
    return filtered
  },

  async getByPatient(patientId: string): Promise<Invoice[]> {
    await delay(300)
    return mockInvoices
      .filter((i) => i.patientId === patientId)
      .sort(
        (a, b) =>
          new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
      )
  },

  async getById(id: string): Promise<Invoice> {
    await delay(200)
    const invoice = mockInvoices.find((i) => i.id === id)
    if (!invoice) throw new Error("Facture non trouvée")
    return invoice
  },

  async create(data: CreateInvoiceRequest): Promise<Invoice> {
    await delay(500)
    invoiceSequence++
    const items = data.items.map((item, index) => {
      const total = calculateLineTotal(
        item.unitPrice,
        item.quantity,
        item.discount ?? 0
      )
      return {
        ...item,
        id: `line-${Date.now()}-${index}`,
        total,
      }
    })
    const totals = calculateTotals(items)
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: generateInvoiceNumber(invoiceSequence),
      patientId: data.patientId,
      patient: {
        id: data.patientId,
        firstName: "Patient",
        lastName: "Nouveau",
        address: "Adresse",
      },
      quoteId: data.quoteId,
      items,
      ...totals,
      payments: [],
      totalPaid: 0,
      remainingBalance: totals.total,
      status: "draft",
      issueDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: data.dueDate,
      notes: data.notes,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockInvoices.push(newInvoice)
    return newInvoice
  },

  async validate(id: string): Promise<Invoice> {
    await delay(300)
    const index = mockInvoices.findIndex((i) => i.id === id)
    if (index === -1) throw new Error("Facture non trouvée")
    mockInvoices[index] = {
      ...mockInvoices[index],
      status: "validated",
      updatedAt: new Date().toISOString(),
    }
    return mockInvoices[index]
  },

  async recordPayment(data: RecordPaymentRequest): Promise<Invoice> {
    await delay(400)
    const index = mockInvoices.findIndex((i) => i.id === data.invoiceId)
    if (index === -1) throw new Error("Facture non trouvée")
    const invoice = mockInvoices[index]
    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      amount: data.amount,
      method: data.method,
      date: data.date,
      reference: data.reference,
      notes: data.notes,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
    }
    const payments = [...invoice.payments, newPayment]
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)
    const remainingBalance = invoice.total - totalPaid
    let status: InvoiceStatus = invoice.status
    if (remainingBalance <= 0) {
      status = "paid"
    } else if (totalPaid > 0) {
      status = "partial"
    }
    mockInvoices[index] = {
      ...invoice,
      payments,
      totalPaid,
      remainingBalance: Math.max(0, remainingBalance),
      status,
      paidAt: status === "paid" ? new Date().toISOString() : undefined,
      updatedAt: new Date().toISOString(),
    }
    return mockInvoices[index]
  },

  async cancel(id: string): Promise<Invoice> {
    await delay(300)
    const index = mockInvoices.findIndex((i) => i.id === id)
    if (index === -1) throw new Error("Facture non trouvée")
    mockInvoices[index] = {
      ...mockInvoices[index],
      status: "cancelled",
      cancelledAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    return mockInvoices[index]
  },

  async exportCSV(filters?: InvoiceFilters): Promise<string> {
    await delay(500)
    const invoices = await this.getAll(filters)
    const headers = [
      "Numéro",
      "Date",
      "Patient",
      "Total",
      "Payé",
      "Reste",
      "Statut",
    ]
    const rows = invoices.map((inv) => [
      inv.invoiceNumber,
      inv.issueDate,
      `${inv.patient?.lastName ?? ""} ${inv.patient?.firstName ?? ""}`.trim(),
      inv.total.toFixed(2),
      inv.totalPaid.toFixed(2),
      inv.remainingBalance.toFixed(2),
      INVOICE_STATUSES[inv.status].label,
    ])
    return [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n")
  },
}
