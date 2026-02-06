export interface Patient {
  id: string
  ins: string
  firstName: string
  lastName: string
  birthDate: string
  gender: "M" | "F" | "OTHER"
  phone: string
  email?: string
  address: Address
  referringDoctor?: string
  medicalHistory: MedicalHistory
  allergies: Allergy[]
  currentTreatments: Treatment[]
  dentalHabits: DentalHabits
  createdAt: string
  updatedAt: string
  archivedAt?: string
  createdBy: string
}

export interface Address {
  street: string
  zipCode: string
  city: string
  country: string
}

export interface MedicalHistory {
  medicalConditions: string[]
  surgicalHistory: string[]
  medications: string[]
  notes?: string
}

export interface Allergy {
  id: string
  name: string
  severity: "low" | "medium" | "high"
  notes?: string
}

export interface Treatment {
  id: string
  name: string
  dosage?: string
  frequency?: string
  startDate?: string
  endDate?: string
}

export interface DentalHabits {
  smokingStatus: "never" | "former" | "current"
  smokingDetails?: string
  alcoholConsumption: "none" | "occasional" | "regular"
  brushingFrequency: "rarely" | "once" | "twice" | "more"
  lastDentalVisit?: string
}

export interface MedicalRisk {
  type: "hemorrhagic" | "infectious" | "allergic" | "cardiac" | "other"
  level: "warning" | "danger"
  description: string
}

export interface PatientFilters {
  search?: string
  sortBy?: "name" | "lastActivity" | "createdAt"
  sortOrder?: "asc" | "desc"
  archived?: boolean
  page?: number
  limit?: number
}

export interface PatientListResponse {
  data: Patient[]
  total: number
  page: number
  limit: number
  totalPages: number
}
