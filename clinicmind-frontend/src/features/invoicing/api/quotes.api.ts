import type {
  Quote,
  QuoteFilters,
  CreateQuoteRequest,
  QuoteStatus,
} from "../types/invoicing.types"
import { calculateTotals, calculateLineTotal } from "../utils/invoiceCalculations"
import { generateQuoteNumber } from "../utils/invoiceNumbering"
import { DEFAULT_QUOTE_VALIDITY_DAYS } from "../constants/invoicingConfig"
import { addDays, format } from "date-fns"

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

let quoteSequence = 1

const mockQuotes: Quote[] = [
  {
    id: "quote-1",
    quoteNumber: "DEV-202401-0001",
    patientId: "1",
    patient: {
      id: "1",
      firstName: "Sophia",
      lastName: "Mitchel",
      address: "225 Rue d'Antibes, 06400 Cannes",
    },
    items: [
      {
        id: "qline-1",
        code: "HBLD036",
        description: "Couronne céramo-céramique",
        tooth: "15",
        quantity: 1,
        unitPrice: 480.0,
        total: 480.0,
      },
      {
        id: "qline-2",
        code: "IC",
        description: "Inlay-core",
        tooth: "15",
        quantity: 1,
        unitPrice: 200.0,
        total: 200.0,
      },
    ],
    subtotal: 680.0,
    totalDiscount: 0,
    total: 680.0,
    estimatedReimbursement: 107.5,
    estimatedMutual: 200.0,
    estimatedRAC: 372.5,
    status: "sent",
    validUntil: "2024-04-20",
    sentAt: "2024-01-20T10:00:00Z",
    notes: "Traitement suite à fracture coronaire",
    patientNotes:
      "Devis valable 3 mois. Prise en charge mutuelle à confirmer.",
    createdBy: "user-1",
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "quote-2",
    quoteNumber: "DEV-202401-0002",
    patientId: "2",
    patient: {
      id: "2",
      firstName: "Jean",
      lastName: "Dupont",
      address: "10 Avenue de la Gare, 06000 Nice",
    },
    items: [
      {
        id: "qline-3",
        code: "HBFA006",
        description: "Extraction dent de sagesse incluse",
        tooth: "38",
        quantity: 1,
        unitPrice: 200.0,
        total: 200.0,
      },
      {
        id: "qline-4",
        code: "HBFA006",
        description: "Extraction dent de sagesse incluse",
        tooth: "48",
        quantity: 1,
        unitPrice: 200.0,
        total: 200.0,
      },
    ],
    subtotal: 400.0,
    totalDiscount: 0,
    total: 400.0,
    status: "accepted",
    validUntil: "2024-04-15",
    sentAt: "2024-01-15T14:00:00Z",
    acceptedAt: "2024-01-18T09:00:00Z",
    createdBy: "user-1",
    createdAt: "2024-01-15T11:00:00Z",
    updatedAt: "2024-01-18T09:00:00Z",
  },
]

export const quotesApi = {
  async getAll(filters?: QuoteFilters): Promise<Quote[]> {
    await delay(400)
    let filtered = [...mockQuotes]
    if (filters?.patientId) {
      filtered = filtered.filter((q) => q.patientId === filters.patientId)
    }
    if (filters?.status) {
      filtered = filtered.filter((q) => q.status === filters.status)
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(
        (q) =>
          q.quoteNumber.toLowerCase().includes(search) ||
          q.patient?.lastName?.toLowerCase().includes(search) ||
          q.patient?.firstName?.toLowerCase().includes(search)
      )
    }
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return filtered
  },

  async getByPatient(patientId: string): Promise<Quote[]> {
    await delay(300)
    return mockQuotes
      .filter((q) => q.patientId === patientId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  },

  async getById(id: string): Promise<Quote> {
    await delay(200)
    const quote = mockQuotes.find((q) => q.id === id)
    if (!quote) throw new Error("Devis non trouvé")
    return quote
  },

  async create(data: CreateQuoteRequest): Promise<Quote> {
    await delay(500)
    quoteSequence++
    const items = data.items.map((item, index) => {
      const total = calculateLineTotal(
        item.unitPrice,
        item.quantity,
        item.discount ?? 0
      )
      return {
        ...item,
        id: `qline-${Date.now()}-${index}`,
        total,
      }
    })
    const totals = calculateTotals(items)
    const newQuote: Quote = {
      id: `quote-${Date.now()}`,
      quoteNumber: generateQuoteNumber(quoteSequence),
      patientId: data.patientId,
      patient: {
        id: data.patientId,
        firstName: "Patient",
        lastName: "Nouveau",
        address: "Adresse",
      },
      items,
      ...totals,
      status: "draft",
      validUntil:
        data.validUntil ||
        format(addDays(new Date(), DEFAULT_QUOTE_VALIDITY_DAYS), "yyyy-MM-dd"),
      notes: data.notes,
      patientNotes: data.patientNotes,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockQuotes.push(newQuote)
    return newQuote
  },

  async updateStatus(id: string, status: QuoteStatus): Promise<Quote> {
    await delay(300)
    const index = mockQuotes.findIndex((q) => q.id === id)
    if (index === -1) throw new Error("Devis non trouvé")
    const updates: Partial<Quote> = { status }
    if (status === "sent") {
      updates.sentAt = new Date().toISOString()
    } else if (status === "accepted") {
      updates.acceptedAt = new Date().toISOString()
    } else if (status === "rejected") {
      updates.rejectedAt = new Date().toISOString()
    }
    mockQuotes[index] = {
      ...mockQuotes[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return mockQuotes[index]
  },

  async convertToInvoice(
    id: string
  ): Promise<{ quote: Quote; invoiceId: string }> {
    await delay(500)
    const index = mockQuotes.findIndex((q) => q.id === id)
    if (index === -1) throw new Error("Devis non trouvé")
    const invoiceId = `inv-${Date.now()}`
    mockQuotes[index] = {
      ...mockQuotes[index],
      status: "converted",
      convertedToInvoiceId: invoiceId,
      updatedAt: new Date().toISOString(),
    }
    return { quote: mockQuotes[index], invoiceId }
  },
}
