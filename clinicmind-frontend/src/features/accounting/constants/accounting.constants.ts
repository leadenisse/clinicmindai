export const REVENUE_CATEGORIES = {
  consultation: { label: "Consultations", color: "#3B82F6", icon: "Stethoscope" },
  soins_conservateurs: { label: "Soins conservateurs", color: "#10B981", icon: "Sparkles" },
  endodontie: { label: "Endodontie", color: "#8B5CF6", icon: "Zap" },
  chirurgie: { label: "Chirurgie", color: "#EF4444", icon: "Scissors" },
  prothese: { label: "Prothèse", color: "#F59E0B", icon: "Crown" },
  orthodontie: { label: "Orthodontie", color: "#EC4899", icon: "Smile" },
  parodontie: { label: "Parodontie", color: "#14B8A6", icon: "Activity" },
  implantologie: { label: "Implantologie", color: "#6366F1", icon: "Target" },
  prevention: { label: "Prévention", color: "#22C55E", icon: "Shield" },
  radiologie: { label: "Radiologie", color: "#64748B", icon: "Image" },
  other: { label: "Autre", color: "#94A3B8", icon: "MoreHorizontal" },
} as const

export const EXPENSE_CATEGORIES = {
  supplies: { label: "Fournitures", color: "#3B82F6", icon: "Package" },
  equipment: { label: "Équipement", color: "#8B5CF6", icon: "Monitor" },
  rent: { label: "Loyer", color: "#F59E0B", icon: "Home" },
  utilities: { label: "Charges", color: "#EF4444", icon: "Zap" },
  insurance: { label: "Assurances", color: "#10B981", icon: "Shield" },
  salaries: { label: "Salaires", color: "#EC4899", icon: "Users" },
  training: { label: "Formation", color: "#14B8A6", icon: "GraduationCap" },
  marketing: { label: "Marketing", color: "#6366F1", icon: "Megaphone" },
  maintenance: { label: "Maintenance", color: "#64748B", icon: "Wrench" },
  laboratory: { label: "Laboratoire", color: "#F97316", icon: "Flask" },
  software: { label: "Logiciels", color: "#14B8A6", icon: "Laptop" },
  taxes: { label: "Impôts & Taxes", color: "#DC2626", icon: "Receipt" },
  other: { label: "Autre", color: "#94A3B8", icon: "MoreHorizontal" },
} as const

export const PAYMENT_METHODS = {
  card: { label: "Carte bancaire", icon: "CreditCard", color: "#3B82F6" },
  cash: { label: "Espèces", icon: "Banknote", color: "#10B981" },
  check: { label: "Chèque", icon: "FileText", color: "#F59E0B" },
  transfer: { label: "Virement", icon: "ArrowRightLeft", color: "#8B5CF6" },
  other: { label: "Autre", icon: "MoreHorizontal", color: "#64748B" },
} as const

export const PERIOD_OPTIONS = [
  { value: "week", label: "Cette semaine" },
  { value: "month", label: "Ce mois" },
  { value: "quarter", label: "Ce trimestre" },
  { value: "year", label: "Cette année" },
  { value: "custom", label: "Personnalisé" },
] as const
