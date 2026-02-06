import type { DentalAct } from "../types/invoicing.types"

export const DENTAL_ACTS: DentalAct[] = [
  {
    id: "act-1",
    code: "C",
    description: "Consultation",
    category: "consultation",
    basePrice: 23.0,
    isHN: false,
  },
  {
    id: "act-2",
    code: "CS",
    description: "Consultation spécialisée",
    category: "consultation",
    basePrice: 23.0,
    isHN: false,
  },
  {
    id: "act-3",
    code: "HBMD050",
    description: "Détartrage et polissage des dents",
    category: "prevention",
    basePrice: 28.92,
    isHN: false,
  },
  {
    id: "act-4",
    code: "HBBD007",
    description: "Application de vernis fluoré",
    category: "prevention",
    basePrice: 25.0,
    isHN: false,
  },
  {
    id: "act-5",
    code: "HBMD042",
    description: "Restauration 1 face",
    category: "conservative",
    basePrice: 26.97,
    isHN: false,
  },
  {
    id: "act-6",
    code: "HBMD054",
    description: "Restauration 2 faces",
    category: "conservative",
    basePrice: 45.38,
    isHN: false,
  },
  {
    id: "act-7",
    code: "HBMD079",
    description: "Restauration 3 faces ou plus",
    category: "conservative",
    basePrice: 60.95,
    isHN: false,
  },
  {
    id: "act-8",
    code: "HBMD043",
    description: "Dévitalisation incisive/canine",
    category: "endodontics",
    basePrice: 33.74,
    isHN: false,
  },
  {
    id: "act-9",
    code: "HBMD044",
    description: "Dévitalisation prémolaire",
    category: "endodontics",
    basePrice: 48.2,
    isHN: false,
  },
  {
    id: "act-10",
    code: "HBMD045",
    description: "Dévitalisation molaire",
    category: "endodontics",
    basePrice: 81.94,
    isHN: false,
  },
  {
    id: "act-11",
    code: "HBFD021",
    description: "Extraction dent permanente",
    category: "surgery",
    basePrice: 33.44,
    isHN: false,
  },
  {
    id: "act-12",
    code: "HBFA006",
    description: "Extraction dent de sagesse incluse",
    category: "surgery",
    basePrice: 83.6,
    isHN: false,
  },
  {
    id: "act-13",
    code: "HBGD031",
    description: "Surfaçage radiculaire (par sextant)",
    category: "surgery",
    basePrice: 37.87,
    isHN: false,
  },
  {
    id: "act-14",
    code: "HBLD036",
    description: "Couronne céramo-céramique",
    category: "prosthetics",
    basePrice: 120.0,
    isHN: true,
    maxPrice: 500.0,
  },
  {
    id: "act-15",
    code: "HBLD038",
    description: "Couronne céramo-métallique",
    category: "prosthetics",
    basePrice: 107.5,
    isHN: true,
    maxPrice: 500.0,
  },
  {
    id: "act-16",
    code: "IC",
    description: "Inlay-core",
    category: "prosthetics",
    basePrice: 122.55,
    isHN: true,
  },
  {
    id: "act-17",
    code: "HBLD017",
    description: "Bridge 3 éléments",
    category: "prosthetics",
    basePrice: 279.5,
    isHN: true,
  },
  {
    id: "act-18",
    code: "HBLD432",
    description: "Prothèse amovible complète",
    category: "prosthetics",
    basePrice: 182.5,
    isHN: true,
  },
  {
    id: "act-19",
    code: "HBQK001",
    description: "Radiographie rétro-alvéolaire",
    category: "radiology",
    basePrice: 4.64,
    isHN: false,
  },
  {
    id: "act-20",
    code: "HBQK002",
    description: "Radiographie panoramique",
    category: "radiology",
    basePrice: 21.28,
    isHN: false,
  },
  {
    id: "act-21",
    code: "YYYY001",
    description: "Consultation orthodontique",
    category: "orthodontics",
    basePrice: 50.0,
    isHN: true,
  },
  {
    id: "act-22",
    code: "YYYY002",
    description: "Semestre de traitement orthodontique",
    category: "orthodontics",
    basePrice: 600.0,
    isHN: true,
  },
]

export function searchDentalActs(query: string): DentalAct[] {
  const lowerQuery = query.toLowerCase()
  return DENTAL_ACTS.filter(
    (act) =>
      act.code.toLowerCase().includes(lowerQuery) ||
      act.description.toLowerCase().includes(lowerQuery)
  )
}

export function getDentalActByCode(code: string): DentalAct | undefined {
  return DENTAL_ACTS.find((act) => act.code === code)
}
