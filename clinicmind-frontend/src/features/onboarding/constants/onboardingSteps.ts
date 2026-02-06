import type { OnboardingLevel, OnboardingStepId } from "../types/onboarding.types"

export interface StepDefinition {
  id: OnboardingStepId
  label: string
  shortLabel?: string
}

export const STEP_DEFINITIONS: Record<OnboardingStepId, StepDefinition> = {
  appearance: { id: "appearance", label: "Apparence", shortLabel: "Couleur & thème" },
  schedule: { id: "schedule", label: "Horaires" },
  cabinetIdentity: { id: "cabinetIdentity", label: "Identité du cabinet" },
  appointmentTypes: { id: "appointmentTypes", label: "Types de RDV" },
  documentTemplates: { id: "documentTemplates", label: "Modèles de documents" },
  pricing: { id: "pricing", label: "Tarifs" },
  legalMentions: { id: "legalMentions", label: "Mentions légales" },
  importData: { id: "importData", label: "Import de données" },
  inviteTeam: { id: "inviteTeam", label: "Inviter l'équipe" },
}

/** Ordre des étapes par niveau */
export const STEPS_BY_LEVEL: Record<OnboardingLevel, OnboardingStepId[]> = {
  quick: ["appearance", "schedule"],
  intermediate: [
    "appearance",
    "schedule",
    "cabinetIdentity",
    "appointmentTypes",
    "documentTemplates",
  ],
  complete: [
    "appearance",
    "schedule",
    "cabinetIdentity",
    "appointmentTypes",
    "documentTemplates",
    "pricing",
    "legalMentions",
    "importData",
    "inviteTeam",
  ],
}

export const ONBOARDING_LEVELS: Record<
  OnboardingLevel,
  { label: string; duration: string; description: string; steps: OnboardingStepId[] }
> = {
  quick: {
    label: "Rapide",
    duration: "~5 min",
    description: "L'essentiel pour démarrer immédiatement",
    steps: STEPS_BY_LEVEL.quick,
  },
  intermediate: {
    label: "Intermédiaire",
    duration: "~15 min",
    description: "Configuration complète recommandée",
    steps: STEPS_BY_LEVEL.intermediate,
  },
  complete: {
    label: "Complet",
    duration: "~30 min",
    description: "Maîtrisez chaque détail de votre cabinet",
    steps: STEPS_BY_LEVEL.complete,
  },
}

export function getStepIndex(level: OnboardingLevel, stepId: OnboardingStepId): number {
  return STEPS_BY_LEVEL[level].indexOf(stepId)
}

export function getStepId(level: OnboardingLevel, index: number): OnboardingStepId | undefined {
  return STEPS_BY_LEVEL[level][index]
}

export function getTotalSteps(level: OnboardingLevel): number {
  return STEPS_BY_LEVEL[level].length
}
