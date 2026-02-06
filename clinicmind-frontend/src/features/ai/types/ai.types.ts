// ===== TYPES DE GÉNÉRATION =====

export type AIGenerationType =
  | "report"
  | "prescription"
  | "advice"
  | "letter"
  | "summary"
  | "custom"

// ===== DICTÉE VOCALE =====

export type DictationStatus =
  | "idle"
  | "recording"
  | "processing"
  | "completed"
  | "error"

export interface TranscriptionRequest {
  audioBlob: Blob
  language?: string
  patientId?: string
}

export interface TranscriptionResponse {
  id: string
  text: string
  duration: number
  language: string
  confidence?: number
  timestamp: string
}

// ===== GÉNÉRATION DE DOCUMENTS =====

export type GenerationStatus = "idle" | "generating" | "completed" | "error"

export interface GenerationRequest {
  type: AIGenerationType
  patientId: string
  instructions: string
  context?: {
    appointmentId?: string
    previousDocuments?: string[]
    customData?: Record<string, unknown>
  }
}

export interface GenerationResponse {
  id: string
  content: string
  type: AIGenerationType
  modelVersion: string
  generatedAt: string
  tokensUsed?: number
  requiresValidation: true
  warningMessage: string
}

// ===== CHAT / Q&R =====

export type ChatMessageRole = "user" | "assistant"

export interface ChatMessage {
  id: string
  role: ChatMessageRole
  content: string
  timestamp: string
  isLoading?: boolean
}

export interface ChatRequest {
  patientId: string
  question: string
  conversationHistory?: ChatMessage[]
}

export interface ChatResponse {
  id: string
  answer: string
  sources?: string[]
  timestamp: string
}

// ===== LOGS IA =====

export interface AILog {
  id: string
  type: "transcription" | "generation" | "chat"
  patientId?: string
  userId: string
  modelVersion: string
  inputSummary: string
  outputLength: number
  tokensUsed?: number
  durationMs: number
  status: "success" | "error"
  errorMessage?: string
  createdAt: string
}

// ===== VALIDATION =====

export interface AIContentValidation {
  contentId: string
  isValidated: boolean
  validatedBy?: string
  validatedAt?: string
  wasEdited: boolean
  editedContent?: string
}
