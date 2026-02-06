import type {
  Prescription,
  PrescriptionFilters,
  PrescriptionTemplate,
  GeneratePrescriptionRequest,
} from "../types/prescription.types"
import { DEFAULT_TEMPLATES } from "../constants/prescription.constants"

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: "presc-001",
    patientId: "pat-001",
    patientName: "Jean Dupont",
    title: "Ordonnance post-extraction",
    content: `Paracétamol 1g : 1 comprimé 3 fois par jour pendant 3 jours si douleur.
Chlorhexidine bain de bouche : 2 fois par jour pendant 7 jours après brossage.

Ne pas cracher, ne pas fumer pendant 48h.`,
    medications: [
      {
        id: "med-1",
        name: "Paracétamol",
        dosage: "1g",
        form: "comprime",
        frequency: "3x/jour",
        duration: "3_jours",
        quantity: "1 boîte",
        isGeneric: true,
      },
      {
        id: "med-2",
        name: "Chlorhexidine",
        dosage: "0.12%",
        form: "bain_bouche",
        frequency: "2x/jour",
        duration: "7_jours",
        quantity: "1 flacon",
        isGeneric: true,
      },
    ],
    status: "signed",
    isAiGenerated: false,
    requiresValidation: false,
    isValidated: true,
    isSigned: true,
    signedAt: "2024-01-15T10:30:00Z",
    signedBy: "Dr Martin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    createdBy: "Dr Martin",
  },
  {
    id: "presc-002",
    patientId: "pat-002",
    patientName: "Marie Martin",
    title: "Antibiothérapie - Infection",
    content: `Amoxicilline 1g : 1 comprimé matin et soir pendant 7 jours.
À prendre pendant les repas.`,
    medications: [
      {
        id: "med-3",
        name: "Amoxicilline",
        dosage: "1g",
        form: "comprime",
        frequency: "2x/jour",
        duration: "7_jours",
        quantity: "1 boîte de 14",
        isGeneric: true,
      },
    ],
    status: "draft",
    isAiGenerated: true,
    requiresValidation: true,
    isValidated: false,
    isSigned: false,
    createdAt: "2024-01-20T14:00:00Z",
    updatedAt: "2024-01-20T14:00:00Z",
    createdBy: "Dr Martin",
  },
]

export const prescriptionsApi = {
  getAll: async (filters?: PrescriptionFilters): Promise<Prescription[]> => {
    await delay(300)
    let result = [...MOCK_PRESCRIPTIONS]
    if (filters?.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.patientName.toLowerCase().includes(search) ||
          p.title.toLowerCase().includes(search)
      )
    }
    if (filters?.patientId) result = result.filter((p) => p.patientId === filters.patientId)
    if (filters?.status) result = result.filter((p) => p.status === filters.status)
    if (filters?.isAiGenerated !== undefined)
      result = result.filter((p) => p.isAiGenerated === filters.isAiGenerated)
    return result
  },

  getById: async (id: string): Promise<Prescription | null> => {
    await delay(200)
    return MOCK_PRESCRIPTIONS.find((p) => p.id === id) ?? null
  },

  getByPatient: async (patientId: string): Promise<Prescription[]> => {
    await delay(200)
    return MOCK_PRESCRIPTIONS.filter((p) => p.patientId === patientId)
  },

  create: async (data: Partial<Prescription>): Promise<Prescription> => {
    await delay(400)
    const newPrescription: Prescription = {
      id: `presc-${Date.now()}`,
      status: "draft",
      isAiGenerated: false,
      requiresValidation: false,
      isValidated: false,
      isSigned: false,
      medications: [],
      content: "",
      title: "",
      patientId: "",
      patientName: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "Dr Martin",
      ...data,
    } as Prescription
    MOCK_PRESCRIPTIONS.push(newPrescription)
    return newPrescription
  },

  update: async (id: string, data: Partial<Prescription>): Promise<Prescription> => {
    await delay(300)
    const index = MOCK_PRESCRIPTIONS.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Ordonnance non trouvée")
    MOCK_PRESCRIPTIONS[index] = {
      ...MOCK_PRESCRIPTIONS[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    return MOCK_PRESCRIPTIONS[index]
  },

  delete: async (id: string): Promise<void> => {
    await delay(300)
    const index = MOCK_PRESCRIPTIONS.findIndex((p) => p.id === id)
    if (index !== -1) MOCK_PRESCRIPTIONS.splice(index, 1)
  },

  sign: async (id: string, signatureData: string): Promise<Prescription> => {
    await delay(400)
    const index = MOCK_PRESCRIPTIONS.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Ordonnance non trouvée")
    MOCK_PRESCRIPTIONS[index] = {
      ...MOCK_PRESCRIPTIONS[index],
      isSigned: true,
      signedAt: new Date().toISOString(),
      signedBy: "Dr Martin",
      signatureData,
      status: "signed",
      updatedAt: new Date().toISOString(),
    }
    return MOCK_PRESCRIPTIONS[index]
  },

  validate: async (id: string): Promise<Prescription> => {
    await delay(300)
    const index = MOCK_PRESCRIPTIONS.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Ordonnance non trouvée")
    MOCK_PRESCRIPTIONS[index] = {
      ...MOCK_PRESCRIPTIONS[index],
      isValidated: true,
      validatedAt: new Date().toISOString(),
      validatedBy: "Dr Martin",
      updatedAt: new Date().toISOString(),
    }
    return MOCK_PRESCRIPTIONS[index]
  },

  generatePdf: async (id: string): Promise<string> => {
    await delay(500)
    return `/api/prescriptions/${id}/pdf`
  },

  send: async (id: string, _method: "email" | "print"): Promise<void> => {
    await delay(400)
    const index = MOCK_PRESCRIPTIONS.findIndex((p) => p.id === id)
    if (index !== -1) MOCK_PRESCRIPTIONS[index].status = "sent"
  },

  generateWithAI: async (
    request: GeneratePrescriptionRequest
  ): Promise<Prescription> => {
    await delay(1500)
    const prescription: Prescription = {
      id: `presc-ai-${Date.now()}`,
      patientId: request.patientId,
      patientName: "Patient",
      title: `Ordonnance - ${request.diagnosis ?? "Prescription"}`,
      content: `[Généré par IA - À valider]\n\nParacétamol 1g : 1 comprimé 3 fois par jour pendant 5 jours en cas de douleur.\n\nContexte : ${request.context}`,
      medications: [
        {
          id: "ai-med-1",
          name: "Paracétamol",
          dosage: "1g",
          form: "comprime",
          frequency: "3x/jour",
          duration: "5_jours",
          quantity: "1 boîte",
          isGeneric: true,
        },
      ],
      status: "draft",
      isAiGenerated: true,
      aiModelVersion: "claude-3-opus",
      requiresValidation: true,
      isValidated: false,
      isSigned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "Dr Martin",
    }
    MOCK_PRESCRIPTIONS.push(prescription)
    return prescription
  },

  getTemplates: async (): Promise<PrescriptionTemplate[]> => {
    await delay(200)
    return [...DEFAULT_TEMPLATES]
  },

  createFromTemplate: async (
    templateId: string,
    patientId: string,
    patientName: string
  ): Promise<Prescription> => {
    await delay(400)
    const template = DEFAULT_TEMPLATES.find((t) => t.id === templateId)
    if (!template) throw new Error("Modèle non trouvé")
    const medications = template.medications.map((m, i) => ({
      ...m,
      id: `med-${Date.now()}-${i}`,
    }))
    const content = medications
      .map(
        (m) =>
          `${m.name} ${m.dosage} : ${m.quantity} - ${m.frequency} pendant ${m.duration}${m.instructions ? `. ${m.instructions}` : ""}`
      )
      .join("\n")
    return prescriptionsApi.create({
      patientId,
      patientName,
      title: template.name,
      content: template.instructions ? `${content}\n\n${template.instructions}` : content,
      medications,
    })
  },
}
