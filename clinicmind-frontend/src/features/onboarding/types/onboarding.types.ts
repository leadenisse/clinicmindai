/** Niveau d'onboarding choisi par l'utilisateur */
export type OnboardingLevel = "quick" | "intermediate" | "complete"

/** Identifiants des étapes (ordre logique) */
export type OnboardingStepId =
  | "appearance"
  | "schedule"
  | "cabinetIdentity"
  | "appointmentTypes"
  | "documentTemplates"
  | "pricing"
  | "legalMentions"
  | "importData"
  | "inviteTeam"

/** Thème d'affichage */
export type ThemeMode = "light" | "dark" | "system"

/** Couleurs d'interface disponibles */
export type InterfaceColor =
  | "blue"
  | "green"
  | "violet"
  | "cyan"
  | "orange"
  | "red"
  | "gray"

/** Données de l'étape Apparence */
export interface AppearanceData {
  primaryColor: InterfaceColor
  themeMode: ThemeMode
}

/** Données de l'étape Horaires */
export interface ScheduleData {
  openingTime: string
  closingTime: string
  workingDays: number[]
  defaultAppointmentDuration: number
}

/** Données de l'étape Identité cabinet */
export interface CabinetIdentityData {
  logoUrl?: string
  email?: string
  website?: string
  siret?: string
}

/** Type de RDV pour onboarding (actif, label, durée, couleur) */
export interface OnboardingAppointmentType {
  id: string
  value: string
  label: string
  duration: number
  color: string
  isActive: boolean
}

/** Données de l'étape Types de RDV */
export interface AppointmentTypesData {
  types: OnboardingAppointmentType[]
}

/** Données de l'étape Modèles de documents */
export interface DocumentTemplatesData {
  prescriptionHeader?: string
  invoicePreviewViewed?: boolean
  quotePreviewViewed?: boolean
}

/** Données de l'étape Tarifs */
export interface PricingData {
  actPrices: Record<string, number>
  useConventionalRates: boolean
}

/** Données de l'étape Mentions légales */
export interface LegalMentionsData {
  prescriptionFooter?: string
  invoiceFooter?: string
  bankDetails?: string
}

/** Source d'import */
export type ImportSource = "julie" | "logos" | "visiodent" | "other" | "none"

/** Données de l'étape Import */
export interface ImportDataStepData {
  source: ImportSource
  file?: File
}

/** Invitation en cours (étape Inviter équipe) */
export interface PendingInvite {
  email: string
  firstName: string
  lastName: string
  role: "PRACTITIONER" | "SECRETARY"
}

/** Données de l'étape Inviter équipe */
export interface InviteTeamData {
  invites: PendingInvite[]
  allowPersonalization: boolean
}

/** Agrégat de toutes les données d'onboarding */
export interface OnboardingFormData {
  appearance?: AppearanceData
  schedule?: ScheduleData
  cabinetIdentity?: CabinetIdentityData
  appointmentTypes?: AppointmentTypesData
  documentTemplates?: DocumentTemplatesData
  pricing?: PricingData
  legalMentions?: LegalMentionsData
  importData?: ImportDataStepData
  inviteTeam?: InviteTeamData
}

export interface OnboardingStatus {
  completed: boolean
  level: OnboardingLevel | null
  completedAt?: string
}

export interface OnboardingSaveRequest {
  stepId: OnboardingStepId
  data: OnboardingFormData
}
