import type { UserRole } from "@/features/auth/types/auth.types"

export const USER_ROLES: Record<
  UserRole,
  { label: string; description: string; color: string; icon: string }
> = {
  ADMIN: {
    label: "Administrateur",
    description: "Accès complet à toutes les fonctionnalités",
    color: "purple",
    icon: "Shield",
  },
  PRACTITIONER: {
    label: "Praticien",
    description: "Accès aux dossiers patients et fonctionnalités cliniques",
    color: "blue",
    icon: "Stethoscope",
  },
  SECRETARY: {
    label: "Secrétaire",
    description: "Accès limité (RDV, facturation, données administratives)",
    color: "green",
    icon: "User",
  },
}

export const SETTINGS_MENU: {
  label: string
  path: string
  icon: string
  roles: UserRole[]
}[] = [
  {
    label: "Mon profil",
    path: "/settings/profile",
    icon: "User",
    roles: ["ADMIN", "PRACTITIONER", "SECRETARY"],
  },
  {
    label: "Sécurité",
    path: "/settings/security",
    icon: "Lock",
    roles: ["ADMIN", "PRACTITIONER", "SECRETARY"],
  },
  {
    label: "Cabinet",
    path: "/settings/cabinet",
    icon: "Building",
    roles: ["ADMIN"],
  },
  {
    label: "Utilisateurs",
    path: "/settings/users",
    icon: "Users",
    roles: ["ADMIN"],
  },
  {
    label: "Actes et tarifs",
    path: "/settings/acts",
    icon: "FileText",
    roles: ["ADMIN"],
  },
  {
    label: "Mentions légales",
    path: "/settings/legal",
    icon: "Scale",
    roles: ["ADMIN"],
  },
  {
    label: "Facturation",
    path: "/settings/billing",
    icon: "CreditCard",
    roles: ["ADMIN"],
  },
]

export const LEGAL_VARIABLES = [
  "{cabinet_name}",
  "{cabinet_address}",
  "{cabinet_phone}",
  "{rpps}",
  "{siret}",
]

export const WORKING_DAYS_LABELS: Record<number, string> = {
  0: "Dim",
  1: "Lun",
  2: "Mar",
  3: "Mer",
  4: "Jeu",
  5: "Ven",
  6: "Sam",
}
