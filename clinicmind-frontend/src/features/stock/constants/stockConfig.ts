import type { StockLevel } from "../types/stock.types"

export const STOCK_CATEGORIES: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  anesthesia: { label: "Anesthésie", icon: "Syringe", color: "blue" },
  sterilization: { label: "Stérilisation", icon: "Sparkles", color: "cyan" },
  restorative: { label: "Restauration", icon: "Wrench", color: "orange" },
  endodontics: { label: "Endodontie", icon: "Zap", color: "purple" },
  surgery: { label: "Chirurgie", icon: "Scissors", color: "red" },
  prosthetics: { label: "Prothèses", icon: "Component", color: "teal" },
  prevention: { label: "Prévention", icon: "Shield", color: "green" },
  consumables: { label: "Consommables", icon: "Package", color: "gray" },
  other: { label: "Autres", icon: "MoreHorizontal", color: "slate" },
}

export const STOCK_LEVELS: Record<
  StockLevel,
  { label: string; color: string; icon: string }
> = {
  ok: { label: "OK", color: "green", icon: "CheckCircle" },
  low: { label: "Stock bas", color: "orange", icon: "AlertTriangle" },
  critical: { label: "Critique", color: "red", icon: "AlertCircle" },
  out: { label: "Rupture", color: "red", icon: "XCircle" },
}

export const UNIT_OPTIONS = [
  "unité",
  "boîte",
  "paquet",
  "flacon",
  "tube",
  "ml",
  "g",
  "paire",
]

export function calculateStockLevel(
  current: number,
  min: number
): StockLevel {
  if (current === 0) return "out"
  if (current <= min * 0.5) return "critical"
  if (current <= min) return "low"
  return "ok"
}
