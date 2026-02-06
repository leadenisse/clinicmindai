export interface AccountingSummary {
  period: {
    start: string
    end: string
    label: string
  }
  totalRevenue: number
  totalExpenses: number
  netIncome: number
  revenueChange: number
  expensesChange: number
  netIncomeChange: number
  invoicesPaid: number
  invoicesPending: number
  invoicesOverdue: number
  totalCollected: number
  collectedByMethod: Record<PaymentMethod, number>
}

export interface RevenueData {
  date: string
  amount: number
  invoiceId?: string
  patientName?: string
  description: string
  category: RevenueCategory
  paymentMethod?: PaymentMethod
}

export type RevenueCategory =
  | "consultation"
  | "soins_conservateurs"
  | "endodontie"
  | "chirurgie"
  | "prothese"
  | "orthodontie"
  | "parodontie"
  | "implantologie"
  | "prevention"
  | "radiologie"
  | "other"

export type PaymentMethod = "card" | "cash" | "check" | "transfer" | "other"

export interface ExpenseData {
  id: string
  date: string
  amount: number
  category: ExpenseCategory
  description: string
  supplier?: string
  invoiceRef?: string
  receiptUrl?: string
  createdBy: string
}

export type ExpenseCategory =
  | "supplies"
  | "equipment"
  | "rent"
  | "utilities"
  | "insurance"
  | "salaries"
  | "training"
  | "marketing"
  | "maintenance"
  | "laboratory"
  | "software"
  | "taxes"
  | "other"

export interface MonthlyData {
  month: string
  label: string
  revenue: number
  expenses: number
  netIncome: number
}

export interface CategoryData {
  category: string
  label: string
  amount: number
  percentage: number
  color: string
}

export interface AccountingFilters {
  period: "week" | "month" | "quarter" | "year" | "custom"
  startDate?: string
  endDate?: string
  category?: string
}

export interface ExportOptions {
  format: "csv" | "excel" | "pdf"
  period: AccountingFilters["period"]
  startDate?: string
  endDate?: string
  includeDetails: boolean
}
