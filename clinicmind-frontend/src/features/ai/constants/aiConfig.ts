import type { AIGenerationType } from "../types/ai.types"

export interface GenerationTypeConfig {
  value: AIGenerationType
  label: string
  description: string
  icon: string
  placeholder: string
  defaultInstructions?: string
}

export const GENERATION_TYPES: Record<AIGenerationType, GenerationTypeConfig> = {
  report: {
    value: "report",
    label: "Compte rendu",
    description: "Générer un compte rendu de consultation",
    icon: "FileText",
    placeholder:
      "Décrivez la consultation : motif, examen clinique, diagnostic, traitement réalisé...",
    defaultInstructions:
      "Rédige un compte rendu de consultation professionnel et structuré.",
  },
  prescription: {
    value: "prescription",
    label: "Ordonnance",
    description: "Générer une ordonnance médicamenteuse",
    icon: "Pill",
    placeholder:
      "Indiquez les médicaments à prescrire, posologie, durée...",
    defaultInstructions:
      "Rédige une ordonnance avec les médicaments, posologies et durées de traitement.",
  },
  advice: {
    value: "advice",
    label: "Fiche conseil",
    description: "Générer des conseils post-opératoires",
    icon: "Lightbulb",
    placeholder:
      "Type d'intervention réalisée (extraction, implant, détartrage...)",
    defaultInstructions:
      "Rédige une fiche de conseils post-opératoires claire et complète.",
  },
  letter: {
    value: "letter",
    label: "Courrier",
    description: "Générer un courrier à un confrère",
    icon: "Mail",
    placeholder:
      "Destinataire, objet du courrier, informations à transmettre...",
    defaultInstructions:
      "Rédige un courrier médical professionnel à destination d'un confrère.",
  },
  summary: {
    value: "summary",
    label: "Résumé patient",
    description: "Générer un résumé du dossier patient",
    icon: "ClipboardList",
    placeholder:
      "Points spécifiques à résumer (antécédents, traitements, évolution...)",
    defaultInstructions:
      "Résume les informations clés du dossier patient de manière concise.",
  },
  custom: {
    value: "custom",
    label: "Personnalisé",
    description: "Génération libre avec instructions personnalisées",
    icon: "Wand2",
    placeholder: "Décrivez précisément ce que vous souhaitez générer...",
  },
}

export const SUGGESTED_QUESTIONS = [
  "Résume les antécédents médicaux de ce patient",
  "Quels sont les traitements en cours ?",
  "Liste les allergies connues",
  "Résume les dernières consultations",
  "Quels soins ont été réalisés sur ce patient ?",
  "Y a-t-il des contre-indications à noter ?",
]

export const AI_WARNING_MESSAGE =
  "⚠️ Ce contenu a été généré par intelligence artificielle. " +
  "Veuillez vérifier attentivement et corriger si nécessaire avant validation. " +
  "Le praticien reste seul responsable du contenu final."

export const AI_BADGE_TEXT = "Généré par IA"

export const MAX_RECORDING_DURATION = 300

export const DEFAULT_TRANSCRIPTION_LANGUAGE = "fr"

export const GENERATION_TYPE_LIST = Object.values(GENERATION_TYPES)
