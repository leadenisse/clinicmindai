export interface CCamAct {
  code: string
  description: string
  category: ActCategory
  basePrice: number
  defaultPrice: number
  secuRate: number
  isOpposable: boolean
  maxPrice?: number
  notes?: string
  requiresTeeth: boolean
}

export type ActCategory =
  | "consultation"
  | "prevention"
  | "soins_conservateurs"
  | "endodontie"
  | "chirurgie"
  | "parodontie"
  | "prothese_fixe"
  | "prothese_amovible"
  | "orthodontie"
  | "radiologie"
  | "autres"

export const CCAM_ACTS: CCamAct[] = [
  // ═══════════════════════════════════════════════════════════════════
  // CONSULTATIONS
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "C",
    description: "Consultation au cabinet",
    category: "consultation",
    basePrice: 23.0,
    defaultPrice: 23.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: false,
  },
  {
    code: "CS",
    description: "Consultation spécialiste",
    category: "consultation",
    basePrice: 25.0,
    defaultPrice: 25.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: false,
  },
  {
    code: "HBQD001",
    description: "Bilan parodontal",
    category: "consultation",
    basePrice: 50.0,
    defaultPrice: 50.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: false,
    notes: "Patient ALD ou 3-24 ans avec risque carieux élevé",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PRÉVENTION
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "HBLD045",
    description: "Application vernis fluoré (2 arcades)",
    category: "prevention",
    basePrice: 25.0,
    defaultPrice: 25.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: false,
    notes: "Patients 3-24 ans à risque carieux élevé, 2x/an max",
  },
  {
    code: "HBLD043",
    description: "Scellement prophylactique des puits et sillons (1 dent)",
    category: "prevention",
    basePrice: 25.0,
    defaultPrice: 25.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
    notes: "Dents permanentes, patients 3-24 ans",
  },
  {
    code: "HBJD001",
    description: "Détartrage et polissage des dents",
    category: "prevention",
    basePrice: 28.92,
    defaultPrice: 28.92,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SOINS CONSERVATEURS
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "HBMD050",
    description: "Restauration 1 face (secteur incisivo-canin)",
    category: "soins_conservateurs",
    basePrice: 19.28,
    defaultPrice: 25.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBMD047",
    description: "Restauration 2 faces (secteur incisivo-canin)",
    category: "soins_conservateurs",
    basePrice: 33.74,
    defaultPrice: 40.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBMD053",
    description: "Restauration 3 faces ou plus (secteur incisivo-canin)",
    category: "soins_conservateurs",
    basePrice: 40.97,
    defaultPrice: 50.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBMD046",
    description: "Restauration 1 face (secteur prémolo-molaire)",
    category: "soins_conservateurs",
    basePrice: 26.97,
    defaultPrice: 35.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBMD049",
    description: "Restauration 2 faces (secteur prémolo-molaire)",
    category: "soins_conservateurs",
    basePrice: 45.38,
    defaultPrice: 55.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBMD038",
    description: "Restauration 3 faces ou plus (secteur prémolo-molaire)",
    category: "soins_conservateurs",
    basePrice: 60.95,
    defaultPrice: 70.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // ENDODONTIE
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "HBFD006",
    description: "Biopulpotomie (dent temporaire)",
    category: "endodontie",
    basePrice: 36.0,
    defaultPrice: 36.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBMD044",
    description: "Traitement endodontique incisive/canine (1 canal)",
    category: "endodontie",
    basePrice: 33.74,
    defaultPrice: 80.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: true,
  },
  {
    code: "HBMD081",
    description: "Traitement endodontique prémolaire (2 canaux)",
    category: "endodontie",
    basePrice: 48.2,
    defaultPrice: 120.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: true,
  },
  {
    code: "HBMD082",
    description: "Traitement endodontique molaire (3 canaux ou plus)",
    category: "endodontie",
    basePrice: 81.94,
    defaultPrice: 200.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: true,
  },
  {
    code: "HBGD012",
    description: "Ablation corps étranger canal radiculaire",
    category: "endodontie",
    basePrice: 60.0,
    defaultPrice: 150.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // CHIRURGIE - EXTRACTIONS
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "HBGD001",
    description: "Extraction dent temporaire",
    category: "chirurgie",
    basePrice: 16.72,
    defaultPrice: 25.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBGA004",
    description: "Extraction dent permanente (1 dent)",
    category: "chirurgie",
    basePrice: 33.44,
    defaultPrice: 50.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBGA002",
    description: "Extraction 2 dents permanentes (même séance)",
    category: "chirurgie",
    basePrice: 50.16,
    defaultPrice: 80.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBGA005",
    description: "Extraction 3 dents permanentes (même séance)",
    category: "chirurgie",
    basePrice: 60.19,
    defaultPrice: 100.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBGA003",
    description: "Extraction dent de sagesse incluse/retenue",
    category: "chirurgie",
    basePrice: 83.6,
    defaultPrice: 150.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: true,
  },
  {
    code: "HBGB005",
    description: "Résection apicale (1 racine)",
    category: "chirurgie",
    basePrice: 104.5,
    defaultPrice: 200.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // PARODONTIE
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "HBJA003",
    description: "Détartrage-surfaçage radiculaire (DSR) 1 sextant",
    category: "parodontie",
    basePrice: 100.8,
    defaultPrice: 100.8,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: false,
    notes: "Patient parodontite sévère ou ALD",
  },
  {
    code: "HBJA171",
    description: "DSR 2 sextants (même séance)",
    category: "parodontie",
    basePrice: 151.2,
    defaultPrice: 151.2,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: false,
  },
  {
    code: "HBJA634",
    description: "DSR 3 sextants ou plus (même séance)",
    category: "parodontie",
    basePrice: 201.6,
    defaultPrice: 201.6,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: false,
  },
  {
    code: "HBJA247",
    description: "Lambeau d'assainissement parodontal (1 sextant)",
    category: "parodontie",
    basePrice: 150.0,
    defaultPrice: 350.0,
    secuRate: 0.0,
    isOpposable: false,
    requiresTeeth: false,
    notes: "Non pris en charge (NPC)",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PROTHÈSE FIXE - COURONNES
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "HBLD090",
    description: "Inlay-core (infrastructure coronoradiculaire)",
    category: "prothese_fixe",
    basePrice: 70.0,
    defaultPrice: 150.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 150.0,
    requiresTeeth: true,
  },
  {
    code: "HBLD034",
    description: "Couronne transitoire (provisoire)",
    category: "prothese_fixe",
    basePrice: 10.0,
    defaultPrice: 50.0,
    secuRate: 0.0,
    isOpposable: false,
    requiresTeeth: true,
    notes: "NPC sauf contexte spécifique",
  },
  {
    code: "HBLD036",
    description: "Couronne métallique",
    category: "prothese_fixe",
    basePrice: 107.5,
    defaultPrice: 250.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 290.0,
    requiresTeeth: true,
    notes: "RAC 0 sur molaires",
  },
  {
    code: "HBLD038",
    description: "Couronne céramométallique (incisive/canine/prémolaire)",
    category: "prothese_fixe",
    basePrice: 107.5,
    defaultPrice: 450.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 500.0,
    requiresTeeth: true,
    notes: "RAC 0 sur dents visibles",
  },
  {
    code: "HBLD040",
    description: "Couronne céramométallique (molaire)",
    category: "prothese_fixe",
    basePrice: 107.5,
    defaultPrice: 400.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 440.0,
    requiresTeeth: true,
  },
  {
    code: "HBLD073",
    description: "Couronne céramique monolithique zircone (molaire)",
    category: "prothese_fixe",
    basePrice: 120.0,
    defaultPrice: 453.2,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 453.2,
    requiresTeeth: true,
    notes: "RAC 0 depuis 2024",
  },
  {
    code: "HBLD033",
    description: "Couronne céramique (incisive/canine)",
    category: "prothese_fixe",
    basePrice: 107.5,
    defaultPrice: 550.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 500.0,
    requiresTeeth: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // PROTHÈSE FIXE - BRIDGES
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "HBLD032",
    description: "Bridge 3 éléments métallique (2 piliers + 1 inter)",
    category: "prothese_fixe",
    basePrice: 279.5,
    defaultPrice: 750.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: true,
  },
  {
    code: "HBLD099",
    description: "Bridge 3 éléments céramique zircone (2 piliers + 1 inter)",
    category: "prothese_fixe",
    basePrice: 279.5,
    defaultPrice: 1359.6,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 1359.6,
    requiresTeeth: true,
    notes: "RAC 0 depuis 01/2026",
  },
  {
    code: "HBLD426",
    description: "Bridge 3 éléments céramique hors zircone",
    category: "prothese_fixe",
    basePrice: 279.5,
    defaultPrice: 1500.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: true,
    notes: "Panier libre",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PROTHÈSE AMOVIBLE
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "HBLD023",
    description: "Prothèse amovible résine 1-3 dents",
    category: "prothese_amovible",
    basePrice: 64.4,
    defaultPrice: 350.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 350.0,
    requiresTeeth: false,
  },
  {
    code: "HBLD024",
    description: "Prothèse amovible résine 4-6 dents",
    category: "prothese_amovible",
    basePrice: 96.6,
    defaultPrice: 500.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 500.0,
    requiresTeeth: false,
  },
  {
    code: "HBLD025",
    description: "Prothèse amovible résine 7-9 dents",
    category: "prothese_amovible",
    basePrice: 128.8,
    defaultPrice: 650.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 650.0,
    requiresTeeth: false,
  },
  {
    code: "HBLD026",
    description: "Prothèse amovible résine 10-13 dents",
    category: "prothese_amovible",
    basePrice: 161.0,
    defaultPrice: 800.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 800.0,
    requiresTeeth: false,
  },
  {
    code: "HBLD027",
    description: "Prothèse amovible complète (14 dents)",
    category: "prothese_amovible",
    basePrice: 182.7,
    defaultPrice: 950.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 950.0,
    requiresTeeth: false,
  },
  {
    code: "HBLD015",
    description: "Prothèse amovible châssis métallique 1-3 dents",
    category: "prothese_amovible",
    basePrice: 193.2,
    defaultPrice: 600.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: false,
  },
  {
    code: "HBMD015",
    description: "Réparation prothèse amovible (fracture résine)",
    category: "prothese_amovible",
    basePrice: 32.2,
    defaultPrice: 80.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 80.0,
    requiresTeeth: false,
  },
  {
    code: "HBMD007",
    description: "Adjonction 1 dent sur prothèse existante",
    category: "prothese_amovible",
    basePrice: 32.2,
    defaultPrice: 100.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 100.0,
    requiresTeeth: false,
  },
  {
    code: "HBMD018",
    description: "Rebasage prothèse amovible",
    category: "prothese_amovible",
    basePrice: 64.4,
    defaultPrice: 150.0,
    secuRate: 0.7,
    isOpposable: false,
    maxPrice: 150.0,
    requiresTeeth: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // RADIOLOGIE
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "HBQK389",
    description: "Radiographie intrabuccale (rétroalvéolaire)",
    category: "radiologie",
    basePrice: 4.64,
    defaultPrice: 10.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBQK002",
    description: "Radiographie panoramique dentaire",
    category: "radiologie",
    basePrice: 21.28,
    defaultPrice: 50.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: false,
  },
  {
    code: "HBQK001",
    description: "Téléradiographie de profil",
    category: "radiologie",
    basePrice: 23.94,
    defaultPrice: 45.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: false,
  },
  {
    code: "HAQK027",
    description: "Cone beam (CBCT) maxillaire ou mandibulaire",
    category: "radiologie",
    basePrice: 75.0,
    defaultPrice: 150.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // ORTHODONTIE
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "HBMD042",
    description: "Mainteneur d'espace",
    category: "orthodontie",
    basePrice: 70.0,
    defaultPrice: 200.0,
    secuRate: 0.7,
    isOpposable: false,
    requiresTeeth: true,
  },
  {
    code: "TO90",
    description: "Traitement orthodontique par semestre (TO90)",
    category: "orthodontie",
    basePrice: 193.5,
    defaultPrice: 600.0,
    secuRate: 1.0,
    isOpposable: false,
    requiresTeeth: false,
    notes: "Patients moins de 16 ans avec accord préalable",
  },

  // ═══════════════════════════════════════════════════════════════════
  // AUTRES ACTES
  // ═══════════════════════════════════════════════════════════════════
  {
    code: "YYYY183",
    description: "Supplément handicap (séance soins)",
    category: "autres",
    basePrice: 100.0,
    defaultPrice: 100.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: false,
    notes: "Patient bénéficiaire AEEH ou PCH",
  },
  {
    code: "YYYY185",
    description: "Supplément handicap (soins en plusieurs séances)",
    category: "autres",
    basePrice: 50.0,
    defaultPrice: 50.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: false,
  },
  {
    code: "HBFD004",
    description: "Pulpotomie d'urgence",
    category: "autres",
    basePrice: 26.97,
    defaultPrice: 50.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
  {
    code: "HBJD002",
    description: "Traitement d'urgence (drainage abcès)",
    category: "autres",
    basePrice: 26.97,
    defaultPrice: 50.0,
    secuRate: 0.7,
    isOpposable: true,
    requiresTeeth: true,
  },
]

export function findActByCode(code: string): CCamAct | undefined {
  return CCAM_ACTS.find((act) => act.code === code)
}

export function getActsByCategory(category: ActCategory): CCamAct[] {
  return CCAM_ACTS.filter((act) => act.category === category)
}

export function searchCCamActs(query: string): CCamAct[] {
  const lower = query.toLowerCase().trim()
  if (!lower) return CCAM_ACTS
  return CCAM_ACTS.filter(
    (act) =>
      act.code.toLowerCase().includes(lower) ||
      act.description.toLowerCase().includes(lower)
  )
}

export const ACT_CATEGORIES = {
  consultation: { label: "Consultations", color: "#3B82F6" },
  prevention: { label: "Prévention", color: "#22C55E" },
  soins_conservateurs: { label: "Soins conservateurs", color: "#10B981" },
  endodontie: { label: "Endodontie", color: "#8B5CF6" },
  chirurgie: { label: "Chirurgie", color: "#EF4444" },
  parodontie: { label: "Parodontie", color: "#14B8A6" },
  prothese_fixe: { label: "Prothèse fixe", color: "#F59E0B" },
  prothese_amovible: { label: "Prothèse amovible", color: "#F97316" },
  orthodontie: { label: "Orthodontie", color: "#EC4899" },
  radiologie: { label: "Radiologie", color: "#64748B" },
  autres: { label: "Autres actes", color: "#94A3B8" },
} as const
