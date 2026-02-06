import type { Plan, PlanId, SpecialOffer } from "../types/subscription.types"

export const PLAN_IDS: PlanId[] = ["essentiel", "professionnel", "premium", "groupe"]

export const PLANS: Plan[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    description: "Pour démarrer en douceur",
    priceMonthly: 89,
    priceAnnual: 854,
    features: [
      { id: "patients", label: "Patients illimités", included: true },
      { id: "agenda", label: "Agenda & RDV", included: true },
      { id: "documents", label: "Documents et fichiers", included: true },
      { id: "facturation", label: "Facturation", included: true, value: "Basique" },
      { id: "users", label: "Utilisateurs", included: true, value: "1" },
      { id: "stock", label: "Module Stock", included: false },
      { id: "prothesiste", label: "Module Prothésiste", included: false },
      { id: "comptabilite", label: "Comptabilité", included: false },
      { id: "ia_dictée", label: "IA Dictée vocale", included: false },
      { id: "ia_cr", label: "IA Génération CR", included: false },
      { id: "ia_chat", label: "IA Chat patient", included: false },
      { id: "ia_radio", label: "IA Analyse radio", included: false },
      { id: "multi_sites", label: "Multi-sites", included: false },
      { id: "api", label: "API & intégrations", included: false },
      { id: "support", label: "Support", included: true, value: "Email" },
    ],
    excluded: [
      "Fonctionnalités IA",
      "Multi-utilisateurs",
      "Stock et prothésiste",
      "Comptabilité avancée",
      "Support prioritaire",
    ],
  },
  {
    id: "professionnel",
    name: "Professionnel",
    description: "L'essentiel pour un cabinet moderne",
    priceMonthly: 149,
    priceAnnual: 1430,
    recommended: true,
    features: [
      { id: "patients", label: "Patients illimités", included: true },
      { id: "agenda", label: "Agenda & RDV", included: true },
      { id: "documents", label: "Documents", included: true },
      { id: "facturation", label: "Facturation", included: true, value: "Complète" },
      { id: "users", label: "Utilisateurs", included: true, value: "Jusqu'à 3" },
      { id: "stock", label: "Module Stock", included: true },
      { id: "prothesiste", label: "Module Prothésiste", included: true },
      { id: "comptabilite", label: "Comptabilité", included: true, value: "Export" },
      { id: "ia_dictée", label: "IA Dictée vocale", included: true },
      { id: "ia_cr", label: "IA Génération CR", included: true },
      { id: "ia_chat", label: "IA Chat patient", included: false },
      { id: "ia_radio", label: "IA Analyse radio", included: false },
      { id: "multi_sites", label: "Multi-sites", included: false },
      { id: "api", label: "API & intégrations", included: false },
      { id: "support", label: "Support", included: true, value: "Email prioritaire" },
    ],
    excluded: [
      "IA avancée (diagnostic, chat patient)",
      "Utilisateurs illimités",
      "API & intégrations",
      "Support téléphonique",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "La puissance de l'IA au service du cabinet",
    priceMonthly: 249,
    priceAnnual: 2390,
    features: [
      { id: "patients", label: "Patients illimités", included: true },
      { id: "agenda", label: "Agenda & RDV", included: true },
      { id: "documents", label: "Documents", included: true },
      { id: "facturation", label: "Facturation", included: true, value: "Avancée" },
      { id: "users", label: "Utilisateurs", included: true, value: "Illimité" },
      { id: "stock", label: "Module Stock", included: true },
      { id: "prothesiste", label: "Module Prothésiste", included: true },
      { id: "comptabilite", label: "Comptabilité", included: true, value: "Complète" },
      { id: "ia_dictée", label: "IA Dictée vocale", included: true },
      { id: "ia_cr", label: "IA Génération CR", included: true },
      { id: "ia_chat", label: "IA Chat patient", included: true },
      { id: "ia_radio", label: "IA Analyse radio", included: true },
      { id: "multi_sites", label: "Multi-sites", included: true, value: "Jusqu'à 3 sites" },
      { id: "api", label: "API & intégrations", included: true },
      { id: "support", label: "Support", included: true, value: "Téléphone" },
    ],
    excluded: [],
  },
  {
    id: "groupe",
    name: "Groupe",
    description: "Pour les structures importantes",
    priceMonthly: 450,
    priceAnnual: 4500,
    customQuote: true,
    features: [
      { id: "patients", label: "Patients illimités", included: true },
      { id: "agenda", label: "Agenda & RDV", included: true },
      { id: "documents", label: "Documents", included: true },
      { id: "facturation", label: "Facturation", included: true, value: "Avancée" },
      { id: "users", label: "Utilisateurs", included: true, value: "Illimité" },
      { id: "stock", label: "Module Stock", included: true },
      { id: "prothesiste", label: "Module Prothésiste", included: true },
      { id: "comptabilite", label: "Comptabilité", included: true, value: "Complète" },
      { id: "ia_dictée", label: "IA Dictée vocale", included: true },
      { id: "ia_cr", label: "IA Génération CR", included: true },
      { id: "ia_chat", label: "IA Chat patient", included: true },
      { id: "ia_radio", label: "IA Analyse radio", included: true },
      { id: "multi_sites", label: "Multi-sites", included: true, value: "Illimités" },
      { id: "api", label: "API & intégrations", included: true, value: "Sur mesure" },
      { id: "support", label: "Support", included: true, value: "Account manager" },
    ],
    excluded: [],
  },
]

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: "trial",
    label: "Essai gratuit",
    description: "30 jours sur plan Professionnel, sans CB",
  },
  {
    id: "annual",
    label: "Annuel -20%",
    description: "2 mois offerts sur engagement annuel",
  },
  {
    id: "parrainage",
    label: "Parrainage",
    description: "1 mois offert par filleul inscrit",
  },
  {
    id: "jeune",
    label: "Jeune diplômé",
    description: "-50% la 1ère année (sur justificatif)",
  },
]

export const COMPARISON_FEATURE_IDS = [
  "patients",
  "agenda",
  "documents",
  "facturation",
  "users",
  "stock",
  "prothesiste",
  "comptabilite",
  "ia_dictée",
  "ia_cr",
  "ia_chat",
  "ia_radio",
  "multi_sites",
  "api",
  "support",
] as const

export function getPlanById(id: PlanId): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}

export function getMonthlyFromAnnual(priceAnnual: number): number {
  return Math.round(priceAnnual / 12)
}
