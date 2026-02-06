export type UserRole = "PRACTITIONER" | "SECRETARY" | "ADMIN"

export interface Permission {
  resource: string
  actions: ("create" | "read" | "update" | "delete")[]
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  mfaEnabled: boolean
  lastLogin: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token?: string
}

export type PractitionerSpecialty =
  | "dentist"
  | "orthodontist"
  | "stomatologist"
  | "other"

export type CabinetSize = "solo" | "small" | "large"

export interface SignupStep1Data {
  specialty: PractitionerSpecialty
  firstName: string
  lastName: string
  email: string
  phone: string
  rpps: string
}

export interface SignupStep2Data {
  mode: "new" | "join"
  inviteCode?: string
  cabinetName?: string
  address?: string
  zipCode?: string
  city?: string
  cabinetPhone?: string
  cabinetSize?: CabinetSize
}

export interface SignupStep3Data {
  planId: "essentiel" | "professionnel" | "premium"
  billingCycle: "monthly" | "annual"
}

export interface SignupStep4Data {
  password: string
  confirmPassword: string
  acceptCgu: boolean
  acceptNewsletter: boolean
}

export interface SignupPayload
  extends SignupStep1Data,
    SignupStep2Data,
    SignupStep3Data,
    SignupStep4Data {}

export interface SignupResponse {
  success: boolean
  requiresEmailVerification: boolean
  email: string
}

export interface InviteUserPayload {
  email: string
  firstName: string
  lastName: string
  role: UserRole
  allowPersonalization?: boolean
}

export interface Invitation {
  id: string
  email: string
  role: UserRole
  expiresAt: string
  cabinetName: string
}

export interface AcceptInvitePayload {
  token: string
  password: string
  confirmPassword: string
}
