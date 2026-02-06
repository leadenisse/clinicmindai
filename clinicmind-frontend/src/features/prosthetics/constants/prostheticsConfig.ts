import type { Laboratory } from "../types/prosthetics.types"
import type { ProstheticType, OrderStatus } from "../types/prosthetics.types"

export const PROSTHETIC_TYPES: Record<
  ProstheticType,
  { label: string; icon: string }
> = {
  crown: { label: "Couronne", icon: "Crown" },
  bridge: { label: "Bridge", icon: "Link" },
  inlay_onlay: { label: "Inlay/Onlay", icon: "Square" },
  veneer: { label: "Facette", icon: "Layers" },
  removable_partial: { label: "Prothèse partielle", icon: "Component" },
  removable_complete: { label: "Prothèse complète", icon: "Circle" },
  implant_crown: { label: "Couronne implant", icon: "Pin" },
  other: { label: "Autre", icon: "MoreHorizontal" },
}

export const ORDER_STATUSES: Record<
  OrderStatus,
  { label: string; color: string; icon: string }
> = {
  draft: { label: "Brouillon", color: "gray", icon: "FileEdit" },
  sent: { label: "Envoyée", color: "blue", icon: "Send" },
  in_production: { label: "En fabrication", color: "orange", icon: "Cog" },
  ready: { label: "Prête", color: "green", icon: "Check" },
  delivered: { label: "Livrée", color: "teal", icon: "Package" },
  fitted: { label: "Posée", color: "emerald", icon: "CheckCircle" },
  issue: { label: "Problème", color: "red", icon: "AlertTriangle" },
}

export const SHADE_OPTIONS = [
  "A1",
  "A2",
  "A3",
  "A3.5",
  "A4",
  "B1",
  "B2",
  "B3",
  "B4",
  "C1",
  "C2",
  "C3",
  "C4",
  "D2",
  "D3",
  "D4",
]

export const MATERIAL_OPTIONS = [
  "Zircone",
  "Céramique",
  "Céramo-métallique",
  "Métal",
  "Résine",
  "PMMA",
  "Composite",
]

export const DEFAULT_LABORATORIES: Laboratory[] = [
  {
    id: "lab-1",
    name: "Laboratoire Dentaire du Sud",
    phone: "04 93 00 00 00",
    isDefault: true,
  },
  { id: "lab-2", name: "Prothésia", phone: "04 93 11 11 11" },
  { id: "lab-3", name: "Dental Art Lab", phone: "04 93 22 22 22" },
]
