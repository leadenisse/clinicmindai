export type DocumentType =
  | "REPORT"
  | "PRESCRIPTION"
  | "ADVICE"
  | "LETTER"
  | "CONSENT"
  | "EXTERNAL"
  | "XRAY"

export interface Document {
  id: string
  patientId: string
  type: DocumentType
  title: string
  description?: string

  content?: string
  filePath?: string
  fileType?: string
  fileName?: string
  fileSize?: number

  isAIGenerated: boolean
  aiModelVersion?: string
  aiPromptUsed?: string
  aiValidated: boolean
  aiValidatedAt?: string
  aiValidatedBy?: string

  isSigned: boolean
  signedAt?: string
  signedBy?: string

  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface DocumentFilters {
  patientId?: string
  type?: DocumentType
  isAIGenerated?: boolean
  search?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}

export interface DocumentUploadRequest {
  patientId: string
  type: DocumentType
  title: string
  description?: string
  file: File
}

export interface DocumentCreateRequest {
  patientId: string
  type: DocumentType
  title: string
  content: string
  isAIGenerated?: boolean
  aiModelVersion?: string
}

export interface DocumentTypeConfig {
  value: DocumentType
  label: string
  labelPlural: string
  icon: string
  color: string
  bgColor: string
  description: string
}
