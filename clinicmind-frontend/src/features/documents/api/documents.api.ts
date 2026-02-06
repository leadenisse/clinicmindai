import type {
  Document,
  DocumentFilters,
  DocumentUploadRequest,
  DocumentCreateRequest,
} from "../types/document.types"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockDocuments: Document[] = [
  {
    id: "doc-1",
    patientId: "1",
    type: "PRESCRIPTION",
    title: "Ordonnance post-extraction",
    content: `ORDONNANCE

Date : 15/01/2024

- Paracétamol 1000mg : 1 comprimé si douleur, maximum 3 par jour pendant 5 jours
- Bain de bouche antiseptique (Eludril) : 2 fois par jour pendant 7 jours
- Ibuprofène 400mg : 1 comprimé matin et soir pendant 3 jours si inflammation`,
    isAIGenerated: true,
    aiModelVersion: "gpt-4-turbo",
    aiValidated: true,
    aiValidatedAt: "2024-01-15T10:30:00Z",
    aiValidatedBy: "Dr. Martin",
    isSigned: true,
    signedAt: "2024-01-15T10:35:00Z",
    signedBy: "Dr. Martin",
    createdBy: "user-1",
    createdAt: "2024-01-15T10:25:00Z",
    updatedAt: "2024-01-15T10:35:00Z",
  },
  {
    id: "doc-2",
    patientId: "1",
    type: "REPORT",
    title: "Compte rendu consultation du 15/01/2024",
    content: `COMPTE RENDU DE CONSULTATION

Date : 15/01/2024
Praticien : Dr. Martin

Motif de consultation :
Douleur molaire inférieure droite depuis 3 jours.

Examen clinique :
- Dent 46 : carie profonde avec atteinte pulpaire probable
- Test au froid positif prolongé
- Percussion axiale sensible
- Parodonte sain

Diagnostic :
Pulpite irréversible sur 46.

Traitement réalisé :
Extraction de la dent 46 sous anesthésie locale (Articaïne 1/200 000).
Hémostase obtenue par compression.

Consignes post-opératoires données.
Ordonnance remise.

Prochain RDV : Contrôle à 7 jours.`,
    isAIGenerated: true,
    aiModelVersion: "gpt-4-turbo",
    aiValidated: true,
    aiValidatedAt: "2024-01-15T11:00:00Z",
    aiValidatedBy: "Dr. Martin",
    isSigned: true,
    signedAt: "2024-01-15T11:05:00Z",
    signedBy: "Dr. Martin",
    createdBy: "user-1",
    createdAt: "2024-01-15T10:45:00Z",
    updatedAt: "2024-01-15T11:05:00Z",
  },
  {
    id: "doc-3",
    patientId: "1",
    type: "CONSENT",
    title: "Consentement extraction dentaire",
    fileName: "consentement_extraction_46.pdf",
    filePath: "/uploads/doc-3.pdf",
    fileType: "application/pdf",
    fileSize: 245000,
    isAIGenerated: false,
    aiValidated: false,
    isSigned: true,
    signedAt: "2024-01-15T10:20:00Z",
    signedBy: "Patient",
    createdBy: "user-1",
    createdAt: "2024-01-15T10:15:00Z",
    updatedAt: "2024-01-15T10:20:00Z",
  },
  {
    id: "doc-4",
    patientId: "1",
    type: "PRESCRIPTION",
    title: "Ordonnance détartrage",
    content: `ORDONNANCE

Date : 20/12/2023

- Brossette interdentaire taille S : utilisation quotidienne
- Dentifrice fluoré 1450ppm : 2 brossages par jour minimum`,
    isAIGenerated: false,
    aiValidated: false,
    isSigned: true,
    signedAt: "2023-12-20T15:00:00Z",
    signedBy: "Dr. Martin",
    createdBy: "user-1",
    createdAt: "2023-12-20T14:50:00Z",
    updatedAt: "2023-12-20T15:00:00Z",
  },
  {
    id: "doc-5",
    patientId: "1",
    type: "LETTER",
    title: "Courrier Dr. Dupont (cardiologue)",
    content: `Cher Confrère,

Je vous adresse Mme Sophia Mitchel, 82 ans, pour avis concernant la prise en charge dentaire.

La patiente présente une hypertension traitée et est sous anticoagulants (AVK).
Je souhaiterais connaître les précautions à prendre avant extraction dentaire.

Cordialement,
Dr. Martin`,
    isAIGenerated: true,
    aiModelVersion: "gpt-4-turbo",
    aiValidated: true,
    aiValidatedAt: "2024-01-10T09:00:00Z",
    aiValidatedBy: "Dr. Martin",
    isSigned: true,
    signedAt: "2024-01-10T09:05:00Z",
    signedBy: "Dr. Martin",
    createdBy: "user-1",
    createdAt: "2024-01-10T08:45:00Z",
    updatedAt: "2024-01-10T09:05:00Z",
  },
  {
    id: "doc-6",
    patientId: "1",
    type: "EXTERNAL",
    title: "Bilan sanguin - INR",
    fileName: "bilan_inr_20240112.pdf",
    filePath: "/uploads/doc-6.pdf",
    fileType: "application/pdf",
    fileSize: 156000,
    description: "INR à 2.8 - Dans la cible thérapeutique",
    isAIGenerated: false,
    aiValidated: false,
    isSigned: false,
    createdBy: "user-1",
    createdAt: "2024-01-12T11:00:00Z",
    updatedAt: "2024-01-12T11:00:00Z",
  },
  {
    id: "doc-7",
    patientId: "1",
    type: "ADVICE",
    title: "Conseils post-extraction",
    content: `CONSEILS POST-EXTRACTION

Pendant les 24 premières heures :
• Ne pas cracher, ne pas rincer
• Appliquer une compresse froide sur la joue si gonflement
• Éviter les aliments chauds et durs
• Ne pas fumer

Les jours suivants :
• Reprendre une alimentation normale progressivement
• Brossage doux en évitant la zone
• Bains de bouche à partir de J+1

Consultez en urgence si :
• Saignement abondant persistant
• Douleur intense non calmée par les antalgiques
• Fièvre > 38°C
• Gonflement important`,
    isAIGenerated: true,
    aiModelVersion: "gpt-4-turbo",
    aiValidated: true,
    aiValidatedAt: "2024-01-15T10:32:00Z",
    aiValidatedBy: "Dr. Martin",
    isSigned: false,
    createdBy: "user-1",
    createdAt: "2024-01-15T10:28:00Z",
    updatedAt: "2024-01-15T10:32:00Z",
  },
]

export const documentsApi = {
  async getAll(filters?: DocumentFilters): Promise<Document[]> {
    await delay(400)

    let filtered = [...mockDocuments]

    if (filters?.patientId) {
      filtered = filtered.filter((d) => d.patientId === filters.patientId)
    }

    if (filters?.type) {
      filtered = filtered.filter((d) => d.type === filters.type)
    }

    if (filters?.isAIGenerated !== undefined) {
      filtered = filtered.filter((d) => d.isAIGenerated === filters.isAIGenerated)
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(search) ||
          d.content?.toLowerCase().includes(search) ||
          d.description?.toLowerCase().includes(search)
      )
    }

    filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return filtered
  },

  async getByPatientGrouped(patientId: string): Promise<Record<string, Document[]>> {
    await delay(400)

    const documents = mockDocuments.filter((d) => d.patientId === patientId)
    const grouped: Record<string, Document[]> = {}

    documents.forEach((doc) => {
      if (!grouped[doc.type]) grouped[doc.type] = []
      grouped[doc.type].push(doc)
    })

    Object.keys(grouped).forEach((type) => {
      grouped[type].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    })

    return grouped
  },

  async getById(id: string): Promise<Document> {
    await delay(300)
    const doc = mockDocuments.find((d) => d.id === id)
    if (!doc) throw new Error("Document non trouvé")
    return doc
  },

  async create(data: DocumentCreateRequest): Promise<Document> {
    await delay(500)

    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      patientId: data.patientId,
      type: data.type,
      title: data.title,
      content: data.content,
      isAIGenerated: data.isAIGenerated ?? false,
      aiModelVersion: data.aiModelVersion,
      aiValidated: false,
      isSigned: false,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockDocuments.push(newDoc)
    return newDoc
  },

  async upload(data: DocumentUploadRequest): Promise<Document> {
    await delay(1000)

    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      patientId: data.patientId,
      type: data.type,
      title: data.title,
      description: data.description,
      fileName: data.file.name,
      filePath: `/uploads/doc-${Date.now()}.${data.file.name.split(".").pop()}`,
      fileType: data.file.type,
      fileSize: data.file.size,
      isAIGenerated: false,
      aiValidated: false,
      isSigned: false,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockDocuments.push(newDoc)
    return newDoc
  },

  async validateAI(id: string): Promise<Document> {
    await delay(300)

    const index = mockDocuments.findIndex((d) => d.id === id)
    if (index === -1) throw new Error("Document non trouvé")

    mockDocuments[index] = {
      ...mockDocuments[index],
      aiValidated: true,
      aiValidatedAt: new Date().toISOString(),
      aiValidatedBy: "Dr. Martin",
      updatedAt: new Date().toISOString(),
    }

    return mockDocuments[index]
  },

  async sign(id: string): Promise<Document> {
    await delay(300)

    const index = mockDocuments.findIndex((d) => d.id === id)
    if (index === -1) throw new Error("Document non trouvé")

    if (mockDocuments[index].isAIGenerated && !mockDocuments[index].aiValidated) {
      throw new Error("Le document IA doit être validé avant signature")
    }

    mockDocuments[index] = {
      ...mockDocuments[index],
      isSigned: true,
      signedAt: new Date().toISOString(),
      signedBy: "Dr. Martin",
      updatedAt: new Date().toISOString(),
    }

    return mockDocuments[index]
  },

  async delete(id: string): Promise<void> {
    await delay(300)

    const index = mockDocuments.findIndex((d) => d.id === id)
    if (index === -1) throw new Error("Document non trouvé")

    if (mockDocuments[index].isSigned) {
      throw new Error("Impossible de supprimer un document signé")
    }

    mockDocuments.splice(index, 1)
  },
}
