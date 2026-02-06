import {
  INVOICE_NUMBER_PREFIX,
  QUOTE_NUMBER_PREFIX,
} from "../constants/invoicingConfig"

export const generateInvoiceNumber = (sequence: number): string => {
  const now = new Date()
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`
  const seq = String(sequence).padStart(4, "0")
  return `${INVOICE_NUMBER_PREFIX}-${yearMonth}-${seq}`
}

export const generateQuoteNumber = (sequence: number): string => {
  const now = new Date()
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`
  const seq = String(sequence).padStart(4, "0")
  return `${QUOTE_NUMBER_PREFIX}-${yearMonth}-${seq}`
}

export const parseInvoiceNumber = (
  invoiceNumber: string
): {
  prefix: string
  yearMonth: string
  sequence: number
} | null => {
  const match = invoiceNumber.match(/^([A-Z]+)-(\d{6})-(\d{4})$/)
  if (!match) return null
  return {
    prefix: match[1],
    yearMonth: match[2],
    sequence: parseInt(match[3], 10),
  }
}
