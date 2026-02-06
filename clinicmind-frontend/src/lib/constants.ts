import type { UserRole } from "@/features/auth/types/auth.types"

export const PUBLIC_ROUTES = ["/login"] as const

export const ROLES: Record<UserRole, string> = {
  PRACTITIONER: "Praticien",
  SECRETARY: "Secrétaire",
  ADMIN: "Administrateur",
}

/** Routes accessibles par rôle (path ou prefix). Admin/Praticien = tout. Secrétaire = pas comptabilité détaillée selon le prompt. */
export const ROUTES_BY_ROLE: Record<UserRole, string[]> = {
  PRACTITIONER: ["/", "/patients", "/appointments", "/documents", "/invoices", "/prescriptions", "/prosthetics", "/stock", "/accounting", "/settings", "/help"],
  SECRETARY: ["/", "/patients", "/appointments", "/invoices", "/prosthetics", "/stock", "/settings", "/help"],
  ADMIN: ["/", "/patients", "/appointments", "/documents", "/invoices", "/prescriptions", "/prosthetics", "/stock", "/accounting", "/settings", "/help"],
}
