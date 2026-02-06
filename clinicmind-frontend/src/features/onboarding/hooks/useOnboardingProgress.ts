import type { OnboardingLevel } from "../types/onboarding.types"
import { getTotalSteps, getStepId, getStepIndex } from "../constants/onboardingSteps"

export function useOnboardingProgress(level: OnboardingLevel | null, currentStepIndex: number) {
  const totalSteps = level ? getTotalSteps(level) : 0
  const currentStepNumber = totalSteps > 0 ? Math.min(currentStepIndex + 1, totalSteps) : 0
  const stepId = level ? getStepId(level, currentStepIndex) : undefined
  const isFirstStep = currentStepIndex === 0
  const isLastStep = totalSteps > 0 && currentStepIndex >= totalSteps - 1
  const stepIndexForId = (id: string) => (level ? getStepIndex(level, id as never) : -1)

  return {
    totalSteps,
    currentStepNumber,
    stepId,
    isFirstStep,
    isLastStep,
    stepIndexForId,
  }
}
