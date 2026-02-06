import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { onboardingApi } from "../api/onboarding.api"
import type {
  OnboardingLevel,
  OnboardingFormData,
  OnboardingStepId,
  OnboardingStatus,
} from "../types/onboarding.types"
import { STEPS_BY_LEVEL } from "../constants/onboardingSteps"

export const onboardingKeys = {
  status: ["onboarding", "status"] as const,
}

export function useOnboardingStatus() {
  return useQuery({
    queryKey: onboardingKeys.status,
    queryFn: () => onboardingApi.getStatus(),
  })
}

export function useCompleteOnboarding() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (level: OnboardingLevel) => onboardingApi.completeOnboarding(level),
    onSuccess: () => {
      queryClient.setQueryData(onboardingKeys.status, (old: OnboardingStatus) => ({
        ...old,
        completed: true,
        level: (old as OnboardingStatus).level,
        completedAt: new Date().toISOString(),
      }))
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status })
      toast.success("Personnalisation terminée. Bienvenue !")
    },
    onError: () => toast.error("Erreur lors de l'enregistrement"),
  })
}

export function useSkipOnboarding() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => onboardingApi.skipOnboarding(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status })
      toast.success("Vous pourrez personnaliser plus tard dans les paramètres.")
    },
    onError: () => toast.error("Erreur"),
  })
}

export function useSaveOnboardingStep() {
  return useMutation({
    mutationFn: (payload: { stepId: OnboardingStepId; data: Partial<OnboardingFormData> }) =>
      onboardingApi.saveStep({ stepId: payload.stepId, data: payload.data }),
  })
}

/** Retourne la liste des stepIds pour un niveau */
export function getStepsForLevel(level: OnboardingLevel): OnboardingStepId[] {
  return STEPS_BY_LEVEL[level]
}
