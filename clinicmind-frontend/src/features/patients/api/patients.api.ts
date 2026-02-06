import type {
  Patient,
  PatientFilters,
  PatientListResponse,
} from "../types/patient.types"

const mockPatients: Patient[] = [
  {
    id: "1",
    ins: "1850399123456789012",
    firstName: "Sophia",
    lastName: "Mitchel",
    birthDate: "1942-09-06",
    gender: "F",
    phone: "06 70 80 90 00",
    email: "sophia.mitchel@email.com",
    address: {
      street: "225 Rue d'Antibes",
      zipCode: "06400",
      city: "Cannes",
      country: "France",
    },
    referringDoctor: "Dr. Martin",
    medicalHistory: {
      medicalConditions: ["Hypertension", "Diabète type 2"],
      surgicalHistory: ["Appendicectomie (2010)"],
      medications: ["Metformine 500mg", "Lisinopril 10mg"],
      notes: "Patiente sous anticoagulants",
    },
    allergies: [
      { id: "1", name: "Pénicilline", severity: "high", notes: "Réaction anaphylactique" },
      { id: "2", name: "Latex", severity: "medium" },
    ],
    currentTreatments: [
      { id: "1", name: "Metformine", dosage: "500mg", frequency: "2x/jour" },
      { id: "2", name: "Lisinopril", dosage: "10mg", frequency: "1x/jour" },
    ],
    dentalHabits: {
      smokingStatus: "former",
      alcoholConsumption: "occasional",
      brushingFrequency: "twice",
      lastDentalVisit: "2024-01-15",
    },
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2024-02-01T14:20:00Z",
    createdBy: "user-1",
  },
  {
    id: "2",
    ins: "2850311987654321098",
    firstName: "Lucas",
    lastName: "Bernard",
    birthDate: "1985-03-12",
    gender: "M",
    phone: "06 12 34 56 78",
    email: "lucas.bernard@email.com",
    address: {
      street: "12 Avenue des Champs",
      zipCode: "75008",
      city: "Paris",
      country: "France",
    },
    medicalHistory: {
      medicalConditions: [],
      surgicalHistory: [],
      medications: [],
    },
    allergies: [],
    currentTreatments: [],
    dentalHabits: {
      smokingStatus: "never",
      alcoholConsumption: "occasional",
      brushingFrequency: "twice",
      lastDentalVisit: "2024-06-01",
    },
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-06-01T11:30:00Z",
    createdBy: "user-1",
  },
  {
    id: "3",
    ins: "1850277567890123456",
    firstName: "Marie",
    lastName: "Dubois",
    birthDate: "1972-11-28",
    gender: "F",
    phone: "07 98 76 54 32",
    email: "marie.dubois@email.com",
    address: {
      street: "8 Rue de la Paix",
      zipCode: "69001",
      city: "Lyon",
      country: "France",
    },
    referringDoctor: "Dr. Lefebvre",
    medicalHistory: {
      medicalConditions: ["Asthme"],
      surgicalHistory: ["Pose prothèse hanche (2018)"],
      medications: ["Ventoline", "Cortisone"],
      notes: "Vérifier compatibilité anesthésiques",
    },
    allergies: [
      { id: "1", name: "Aspirine", severity: "medium", notes: "Urticaire" },
    ],
    currentTreatments: [],
    dentalHabits: {
      smokingStatus: "current",
      smokingDetails: "10 cigarettes/jour",
      alcoholConsumption: "none",
      brushingFrequency: "once",
      lastDentalVisit: "2023-09-20",
    },
    createdAt: "2022-05-20T14:00:00Z",
    updatedAt: "2024-01-15T16:45:00Z",
    createdBy: "user-1",
  },
  {
    id: "4",
    ins: "2850488123456789012",
    firstName: "Thomas",
    lastName: "Petit",
    birthDate: "1990-07-05",
    gender: "M",
    phone: "06 45 67 89 01",
    address: {
      street: "45 Boulevard Victor Hugo",
      zipCode: "13001",
      city: "Marseille",
      country: "France",
    },
    medicalHistory: {
      medicalConditions: [],
      surgicalHistory: [],
      medications: [],
    },
    allergies: [],
    currentTreatments: [],
    dentalHabits: {
      smokingStatus: "never",
      alcoholConsumption: "occasional",
      brushingFrequency: "more",
      lastDentalVisit: "2024-05-10",
    },
    createdAt: "2024-03-01T10:15:00Z",
    updatedAt: "2024-05-10T09:00:00Z",
    createdBy: "user-1",
  },
  {
    id: "5",
    ins: "1850366543210987654",
    firstName: "Isabelle",
    lastName: "Moreau",
    birthDate: "1960-01-22",
    gender: "F",
    phone: "06 87 65 43 21",
    email: "isabelle.moreau@email.com",
    address: {
      street: "3 Place de la République",
      zipCode: "31000",
      city: "Toulouse",
      country: "France",
    },
    referringDoctor: "Dr. Garcia",
    medicalHistory: {
      medicalConditions: ["Maladie cœliaque", "Ostéoporose"],
      surgicalHistory: ["Cholecystectomie (2015)"],
      medications: ["Calcium", "Vitamine D", "Sans gluten"],
      notes: "Précautions régime sans gluten",
    },
    allergies: [
      { id: "1", name: "Pénicilline", severity: "high" },
    ],
    currentTreatments: [
      { id: "1", name: "Calcium", dosage: "1000mg", frequency: "1x/jour" },
    ],
    dentalHabits: {
      smokingStatus: "former",
      alcoholConsumption: "none",
      brushingFrequency: "twice",
      lastDentalVisit: "2024-02-28",
    },
    createdAt: "2021-08-12T08:30:00Z",
    updatedAt: "2024-02-28T14:20:00Z",
    createdBy: "user-1",
  },
  {
    id: "6",
    ins: "2850522098765432109",
    firstName: "Antoine",
    lastName: "Leroy",
    birthDate: "1978-12-14",
    gender: "M",
    phone: "07 11 22 33 44",
    address: {
      street: "22 Rue Nationale",
      zipCode: "59000",
      city: "Lille",
      country: "France",
    },
    medicalHistory: {
      medicalConditions: ["Hypertension"],
      surgicalHistory: [],
      medications: ["Amlodipine 5mg"],
      notes: "Contrôle tension avant soins",
    },
    allergies: [],
    currentTreatments: [
      { id: "1", name: "Amlodipine", dosage: "5mg", frequency: "1x/jour" },
    ],
    dentalHabits: {
      smokingStatus: "current",
      alcoholConsumption: "regular",
      brushingFrequency: "once",
      lastDentalVisit: "2023-11-05",
    },
    createdAt: "2023-04-18T11:00:00Z",
    updatedAt: "2023-11-05T10:00:00Z",
    createdBy: "user-1",
  },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const patientsApi = {
  async getAll(filters?: PatientFilters): Promise<PatientListResponse> {
    await delay(500)

    let filtered = [...mockPatients]

    if (filters?.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.firstName.toLowerCase().includes(search) ||
          p.lastName.toLowerCase().includes(search) ||
          p.ins.includes(search) ||
          p.phone.replace(/\s/g, "").includes(search.replace(/\s/g, ""))
      )
    }

    if (!filters?.archived) {
      filtered = filtered.filter((p) => !p.archivedAt)
    }

    if (filters?.sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0
        switch (filters.sortBy) {
          case "name":
            comparison = a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName)
            break
          case "lastActivity":
          case "createdAt":
            comparison =
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            break
        }
        return filters.sortOrder === "desc" ? -comparison : comparison
      })
    }

    const page = filters?.page ?? 1
    const limit = filters?.limit ?? 10
    const start = (page - 1) * limit
    const paginated = filtered.slice(start, start + limit)

    return {
      data: paginated,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    }
  },

  async getById(id: string): Promise<Patient> {
    await delay(300)
    const patient = mockPatients.find((p) => p.id === id)
    if (!patient) throw new Error("Patient non trouvé")
    return patient
  },

  async create(
    data: Omit<Patient, "id" | "createdAt" | "updatedAt" | "createdBy">
  ): Promise<Patient> {
    await delay(500)
    const newPatient: Patient = {
      ...data,
      id: String(mockPatients.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current-user",
    }
    mockPatients.push(newPatient)
    return newPatient
  },

  async update(id: string, data: Partial<Patient>): Promise<Patient> {
    await delay(500)
    const index = mockPatients.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Patient non trouvé")

    mockPatients[index] = {
      ...mockPatients[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    return mockPatients[index]
  },

  async archive(id: string): Promise<Patient> {
    await delay(300)
    return this.update(id, { archivedAt: new Date().toISOString() })
  },
}
