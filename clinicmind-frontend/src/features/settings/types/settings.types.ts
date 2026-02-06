import type { UserRole } from "@/features/auth/types/auth.types"

export type { UserRole }

export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  phone?: string
  avatarUrl?: string
  mfaEnabled: boolean
  createdAt: string
  lastLoginAt?: string
}

export interface CabinetSettings {
  id: string
  name: string
  address: string
  zipCode: string
  city: string
  phone: string
  email?: string
  website?: string
  logoUrl?: string
  siret?: string
  rpps?: string
  defaultAppointmentDuration: number
  openingTime: string
  closingTime: string
  workingDays: number[]
  primaryColor?: string
}

export interface DentalActConfig {
  id: string
  code: string
  description: string
  category: string
  defaultPrice: number
  isActive: boolean
}

export interface LegalMentions {
  prescriptionHeader?: string
  prescriptionFooter?: string
  invoiceFooter?: string
  quoteFooter?: string
  consentTemplate?: string
}

export interface CreateUserRequest {
  email: string
  firstName: string
  lastName: string
  role: UserRole
  password: string
}

export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  phone?: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UserListItem {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isActive: boolean
  lastLoginAt?: string
  createdAt: string
}
