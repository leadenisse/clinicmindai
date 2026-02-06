export type PrescriptionStatus = "draft" | "signed" | "sent"

export interface PrescriptionMedication {
  id: string
  name: string
  dosage: string
  form: string
  frequency: string
  duration: string
  quantity: string
  instructions?: string
  isGeneric: boolean
}

export interface Prescription {
  id: string
  patientId: string
  patientName: string
  title: string
  content: string
  medications: PrescriptionMedication[]
  status: PrescriptionStatus
  isAiGenerated: boolean
  aiModelVersion?: string
  requiresValidation: boolean
  isValidated: boolean
  validatedAt?: string
  validatedBy?: string
  isSigned: boolean
  signedAt?: string
  signedBy?: string
  signatureData?: string
  pdfUrl?: string
  createdAt: string
  updatedAt: string
  createdBy: string
}

export type PrescriptionCategory =
  | "antibiotics"
  | "pain"
  | "anti_inflammatory"
  | "antiseptic"
  | "post_surgery"
  | "prevention"
  | "other"

export interface PrescriptionTemplate {
  id: string
  name: string
  description: string
  category: PrescriptionCategory
  medications: Omit<PrescriptionMedication, "id">[]
  instructions?: string
  isDefault: boolean
  createdBy?: string
}

export interface PrescriptionFilters {
  search?: string
  patientId?: string
  status?: PrescriptionStatus
  dateFrom?: string
  dateTo?: string
  isAiGenerated?: boolean
}

export interface GeneratePrescriptionRequest {
  patientId: string
  context: string
  diagnosis?: string
  allergies?: string[]
  currentTreatments?: string[]
  templateId?: string
}
