import type {
  UserProfile,
  CabinetSettings,
  DentalActConfig,
  LegalMentions,
  CreateUserRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UserListItem,
} from "../types/settings.types"
import { useAuthStore } from "@/stores/authStore"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock profile (utilisateur connecté)
const mockProfile: UserProfile = {
  id: "mock-1",
  email: "praticien@clinicmind.fr",
  firstName: "Jean",
  lastName: "Dupont",
  role: "PRACTITIONER",
  phone: "06 12 34 56 78",
  avatarUrl: undefined,
  mfaEnabled: false,
  createdAt: "2024-01-01T00:00:00Z",
  lastLoginAt: "2024-02-01T09:00:00Z",
}

// Mock cabinet
let mockCabinet: CabinetSettings = {
  id: "cab-1",
  name: "Cabinet Dentaire Dupont",
  address: "15 Avenue de la République",
  zipCode: "06000",
  city: "Nice",
  phone: "04 93 12 34 56",
  email: "contact@cabinet-dupont.fr",
  website: "https://cabinet-dupont.fr",
  logoUrl: undefined,
  siret: "123 456 789 00012",
  rpps: "10001234567",
  defaultAppointmentDuration: 30,
  openingTime: "09:00",
  closingTime: "18:00",
  workingDays: [1, 2, 3, 4, 5],
  primaryColor: "#14B8A6",
}

// Mock users (admin only)
const mockUsers: UserListItem[] = [
  {
    id: "mock-1",
    email: "praticien@clinicmind.fr",
    firstName: "Jean",
    lastName: "Dupont",
    role: "PRACTITIONER",
    isActive: true,
    lastLoginAt: "2024-02-01T09:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    email: "admin@clinicmind.fr",
    firstName: "Marie",
    lastName: "Martin",
    role: "ADMIN",
    isActive: true,
    lastLoginAt: "2024-02-03T14:00:00Z",
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "user-3",
    email: "secretary@clinicmind.fr",
    firstName: "Sophie",
    lastName: "Bernard",
    role: "SECRETARY",
    isActive: true,
    lastLoginAt: "2024-02-02T11:30:00Z",
    createdAt: "2024-01-10T00:00:00Z",
  },
]

// Mock actes config (basé sur nomenclature + personnalisés)
const defaultActs: DentalActConfig[] = [
  { id: "act-1", code: "HBMD050", description: "Détartrage et polissage", category: "Prévention", defaultPrice: 28.92, isActive: true },
  { id: "act-2", code: "HBMD042", description: "Restauration 1 face", category: "Conservateur", defaultPrice: 26.97, isActive: true },
  { id: "act-3", code: "HBFD021", description: "Extraction dent permanente", category: "Chirurgie", defaultPrice: 33.44, isActive: true },
  { id: "act-4", code: "HBLD036", description: "Couronne céramo-céramique", category: "Prothèses", defaultPrice: 450, isActive: true },
  { id: "act-5", code: "HN001", description: "Acte personnalisé HN", category: "Divers", defaultPrice: 80, isActive: true },
]
let mockActsConfig = [...defaultActs]

// Mock mentions légales
let mockLegalMentions: LegalMentions = {
  prescriptionHeader: "Dr Jean Dupont - Cabinet Dentaire Dupont",
  prescriptionFooter: "Ordonnance valable 3 mois. Pas de substitution.",
  invoiceFooter: "TVA non applicable, art. 293 B du CGI. En cas de retard de paiement, indemnités forfaitaires.",
  quoteFooter: "Devis valable 30 jours. Acompte 30% à la commande.",
  consentTemplate: "J'atteste avoir été informé des actes et risques.",
}

export const settingsApi = {
  // Profil
  async getProfile(): Promise<UserProfile> {
    await delay(300)
    const user = useAuthStore.getState().user
    if (!user) throw new Error("Non authentifié")
    return {
      ...mockProfile,
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      mfaEnabled: user.mfaEnabled,
      lastLoginAt: user.lastLogin ? new Date(user.lastLogin).toISOString() : undefined,
    }
  },

  async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    await delay(400)
    Object.assign(mockProfile, data)
    return mockProfile
  },

  // Mot de passe
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await delay(400)
    if (data.newPassword !== data.confirmPassword) {
      throw new Error("Les mots de passe ne correspondent pas")
    }
    // Mock: pas de vérification réelle
  },

  // MFA
  async getMfaStatus(): Promise<{ enabled: boolean }> {
    await delay(200)
    return { enabled: mockProfile.mfaEnabled }
  },

  async enableMfa(): Promise<{ secret: string; qrCodeUrl: string }> {
    await delay(500)
    mockProfile.mfaEnabled = true
    return {
      secret: "MOCK-SECRET-KEY-32CHARS",
      qrCodeUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TVVDSCBRUiBDb2RlPC90ZXh0Pjwvc3ZnPg==",
    }
  },

  async disableMfa(): Promise<void> {
    await delay(300)
    mockProfile.mfaEnabled = false
  },

  // Cabinet
  async getCabinet(): Promise<CabinetSettings> {
    await delay(300)
    return { ...mockCabinet }
  },

  async updateCabinet(data: Partial<CabinetSettings>): Promise<CabinetSettings> {
    await delay(400)
    mockCabinet = { ...mockCabinet, ...data }
    return mockCabinet
  },

  async uploadCabinetLogo(file: File): Promise<{ logoUrl: string }> {
    await delay(600)
    const url = URL.createObjectURL(file)
    mockCabinet.logoUrl = url
    return { logoUrl: url }
  },

  // Utilisateurs
  async getUsers(): Promise<UserListItem[]> {
    await delay(400)
    return [...mockUsers].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  },

  async getUserById(id: string): Promise<UserProfile & { isActive: boolean }> {
    await delay(300)
    const u = mockUsers.find((x) => x.id === id)
    if (!u) throw new Error("Utilisateur non trouvé")
    return {
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
      isActive: u.isActive,
      mfaEnabled: false,
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt,
    }
  },

  async createUser(data: CreateUserRequest): Promise<UserListItem> {
    await delay(500)
    const newUser: UserListItem = {
      id: `user-${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      isActive: true,
      createdAt: new Date().toISOString(),
    }
    mockUsers.push(newUser)
    return newUser
  },

  async updateUser(
    id: string,
    data: Partial<CreateUserRequest> & { isActive?: boolean }
  ): Promise<UserListItem> {
    await delay(400)
    const index = mockUsers.findIndex((u) => u.id === id)
    if (index === -1) throw new Error("Utilisateur non trouvé")
    mockUsers[index] = { ...mockUsers[index], ...data }
    return mockUsers[index]
  },

  async resetUserPassword(_id: string, _newPassword: string): Promise<void> {
    await delay(400)
    // Mock: pas d'effet côté API
  },

  // Actes config
  async getActsConfig(): Promise<DentalActConfig[]> {
    await delay(300)
    return [...mockActsConfig]
  },

  async createAct(data: Omit<DentalActConfig, "id">): Promise<DentalActConfig> {
    await delay(400)
    const newAct: DentalActConfig = {
      id: `act-${Date.now()}`,
      code: data.code,
      description: data.description,
      category: data.category,
      defaultPrice: data.defaultPrice,
      isActive: data.isActive ?? true,
    }
    mockActsConfig.push(newAct)
    return newAct
  },

  async updateAct(
    id: string,
    data: Partial<Omit<DentalActConfig, "id">>
  ): Promise<DentalActConfig> {
    await delay(400)
    const index = mockActsConfig.findIndex((a) => a.id === id)
    if (index === -1) throw new Error("Acte non trouvé")
    mockActsConfig[index] = { ...mockActsConfig[index], ...data }
    return mockActsConfig[index]
  },

  async toggleActActive(id: string): Promise<DentalActConfig> {
    await delay(300)
    const index = mockActsConfig.findIndex((a) => a.id === id)
    if (index === -1) throw new Error("Acte non trouvé")
    mockActsConfig[index].isActive = !mockActsConfig[index].isActive
    return mockActsConfig[index]
  },

  // Mentions légales
  async getLegalMentions(): Promise<LegalMentions> {
    await delay(300)
    return { ...mockLegalMentions }
  },

  async updateLegalMentions(data: LegalMentions): Promise<LegalMentions> {
    await delay(400)
    mockLegalMentions = { ...mockLegalMentions, ...data }
    return mockLegalMentions
  },
}
