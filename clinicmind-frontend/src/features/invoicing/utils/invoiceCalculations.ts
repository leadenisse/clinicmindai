import type { LineItem } from "../types/invoicing.types"

export const calculateLineTotal = (
  unitPrice: number,
  quantity: number,
  discount: number = 0
): number => {
  const subtotal = unitPrice * quantity
  const discountAmount = subtotal * (discount / 100)
  return Math.round((subtotal - discountAmount) * 100) / 100
}

export const calculateTotals = (
  items: LineItem[]
): {
  subtotal: number
  totalDiscount: number
  total: number
} => {
  let subtotal = 0
  let totalDiscount = 0

  items.forEach((item) => {
    const lineSubtotal = item.unitPrice * item.quantity
    subtotal += lineSubtotal
    if (item.discount) {
      totalDiscount += lineSubtotal * (item.discount / 100)
    }
  })

  const total = subtotal - totalDiscount

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    totalDiscount: Math.round(totalDiscount * 100) / 100,
    total: Math.round(total * 100) / 100,
  }
}

export const calculateRemainingBalance = (
  total: number,
  payments: { amount: number }[]
): number => {
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)
  return Math.round((total - totalPaid) * 100) / 100
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}
