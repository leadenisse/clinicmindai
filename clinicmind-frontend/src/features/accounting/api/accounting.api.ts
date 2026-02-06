import type {
  AccountingSummary,
  AccountingFilters,
  RevenueData,
  ExpenseData,
  MonthlyData,
  CategoryData,
  ExportOptions,
} from "../types/accounting.types"

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

const MOCK_MONTHLY_DATA: MonthlyData[] = [
  { month: "2024-01", label: "Jan", revenue: 45780, expenses: 12450, netIncome: 33330 },
  { month: "2024-02", label: "Fév", revenue: 42100, expenses: 11800, netIncome: 30300 },
  { month: "2024-03", label: "Mar", revenue: 51200, expenses: 13200, netIncome: 38000 },
  { month: "2024-04", label: "Avr", revenue: 48500, expenses: 12900, netIncome: 35600 },
  { month: "2024-05", label: "Mai", revenue: 39800, expenses: 11500, netIncome: 28300 },
  { month: "2024-06", label: "Jun", revenue: 35200, expenses: 10800, netIncome: 24400 },
  { month: "2024-07", label: "Jul", revenue: 28500, expenses: 9500, netIncome: 19000 },
  { month: "2024-08", label: "Aoû", revenue: 22000, expenses: 8200, netIncome: 13800 },
  { month: "2024-09", label: "Sep", revenue: 47800, expenses: 12100, netIncome: 35700 },
  { month: "2024-10", label: "Oct", revenue: 52400, expenses: 13800, netIncome: 38600 },
  { month: "2024-11", label: "Nov", revenue: 49200, expenses: 12600, netIncome: 36600 },
  { month: "2024-12", label: "Déc", revenue: 38500, expenses: 11200, netIncome: 27300 },
]

const MOCK_REVENUE: RevenueData[] = [
  { date: "2024-01-28", amount: 1250, invoiceId: "inv-1", patientName: "Jean Dupont", description: "Prothèse", category: "prothese", paymentMethod: "card" },
  { date: "2024-01-27", amount: 85, invoiceId: "inv-2", patientName: "Marie Martin", description: "Consultation", category: "consultation", paymentMethod: "cash" },
  { date: "2024-01-26", amount: 420, patientName: "Paul Durand", description: "Soins", category: "soins_conservateurs", paymentMethod: "transfer" },
]

const MOCK_REVENUE_BY_CATEGORY: CategoryData[] = [
  { category: "prothese", label: "Prothèse", amount: 18500, percentage: 40.4, color: "#F59E0B" },
  { category: "soins_conservateurs", label: "Soins conservateurs", amount: 12300, percentage: 26.9, color: "#10B981" },
  { category: "chirurgie", label: "Chirurgie", amount: 6800, percentage: 14.9, color: "#EF4444" },
  { category: "consultation", label: "Consultations", amount: 4200, percentage: 9.2, color: "#3B82F6" },
  { category: "prevention", label: "Prévention", amount: 2480, percentage: 5.4, color: "#22C55E" },
  { category: "other", label: "Autre", amount: 1500, percentage: 3.2, color: "#94A3B8" },
]

const MOCK_EXPENSES_BY_CATEGORY: CategoryData[] = [
  { category: "laboratory", label: "Laboratoire", amount: 4500, percentage: 36.1, color: "#F97316" },
  { category: "supplies", label: "Fournitures", amount: 3200, percentage: 25.7, color: "#3B82F6" },
  { category: "salaries", label: "Salaires", amount: 2500, percentage: 20.1, color: "#EC4899" },
  { category: "utilities", label: "Charges", amount: 1250, percentage: 10.0, color: "#EF4444" },
  { category: "other", label: "Autre", amount: 1000, percentage: 8.1, color: "#94A3B8" },
]

let mockExpenses: ExpenseData[] = [
  { id: "exp-1", date: "2024-01-28", amount: 1250, category: "laboratory", description: "Facture Labo Dentec", supplier: "Labo Dentec", createdBy: "Dr Martin" },
  { id: "exp-2", date: "2024-01-25", amount: 485, category: "supplies", description: "Commande matériel", createdBy: "Dr Martin" },
  { id: "exp-3", date: "2024-01-20", amount: 180, category: "utilities", description: "EDF janvier", createdBy: "Dr Martin" },
  { id: "exp-4", date: "2024-01-15", amount: 320, category: "supplies", description: "Consommables", createdBy: "Dr Martin" },
  { id: "exp-5", date: "2024-01-10", amount: 450, category: "maintenance", description: "Entretien fauteuil", createdBy: "Dr Martin" },
]

export const accountingApi = {
  getSummary: async (_filters: AccountingFilters): Promise<AccountingSummary> => {
    await delay(400)
    return {
      period: {
        start: "2024-01-01",
        end: "2024-01-31",
        label: "Janvier 2024",
      },
      totalRevenue: 45780,
      totalExpenses: 12450,
      netIncome: 33330,
      revenueChange: 12.5,
      expensesChange: -3.2,
      netIncomeChange: 18.7,
      invoicesPaid: 42,
      invoicesPending: 8,
      invoicesOverdue: 3,
      totalCollected: 43250,
      collectedByMethod: {
        card: 28500,
        cash: 8750,
        check: 4500,
        transfer: 1500,
        other: 0,
      },
    }
  },

  getRevenue: async (_filters: AccountingFilters): Promise<RevenueData[]> => {
    await delay(300)
    return [...MOCK_REVENUE]
  },

  getRevenueByMonth: async (_year: number): Promise<MonthlyData[]> => {
    await delay(300)
    return [...MOCK_MONTHLY_DATA]
  },

  getRevenueByCategory: async (_filters: AccountingFilters): Promise<CategoryData[]> => {
    await delay(300)
    return [...MOCK_REVENUE_BY_CATEGORY]
  },

  getExpenses: async (_filters: AccountingFilters): Promise<ExpenseData[]> => {
    await delay(300)
    return [...mockExpenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  },

  getExpensesByCategory: async (_filters: AccountingFilters): Promise<CategoryData[]> => {
    await delay(300)
    return [...MOCK_EXPENSES_BY_CATEGORY]
  },

  createExpense: async (data: Partial<ExpenseData>): Promise<ExpenseData> => {
    await delay(400)
    const newExpense: ExpenseData = {
      id: `exp-${Date.now()}`,
      date: data.date ?? new Date().toISOString().slice(0, 10),
      amount: data.amount ?? 0,
      category: data.category ?? "other",
      description: data.description ?? "",
      createdBy: data.createdBy ?? "Dr Martin",
      ...data,
    } as ExpenseData
    mockExpenses.unshift(newExpense)
    return newExpense
  },

  updateExpense: async (id: string, data: Partial<ExpenseData>): Promise<ExpenseData> => {
    await delay(300)
    const index = mockExpenses.findIndex((e) => e.id === id)
    if (index === -1) throw new Error("Dépense non trouvée")
    mockExpenses[index] = { ...mockExpenses[index], ...data }
    return mockExpenses[index]
  },

  deleteExpense: async (id: string): Promise<void> => {
    await delay(300)
    mockExpenses = mockExpenses.filter((e) => e.id !== id)
  },

  exportData: async (options: ExportOptions): Promise<string> => {
    await delay(500)
    return `/api/accounting/export?format=${options.format}`
  },
}
