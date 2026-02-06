import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { subscriptionApi } from "../api/subscription.api"
import type { PlanId, BillingCycle } from "../types/subscription.types"
import { PLANS } from "../constants/plans"

export const subscriptionKeys = {
  plans: ["subscription", "plans"] as const,
  current: ["subscription", "current"] as const,
}

export function usePlans() {
  return useQuery({
    queryKey: subscriptionKeys.plans,
    queryFn: () => subscriptionApi.getPlans(),
    initialData: PLANS,
  })
}

export function useCurrentSubscription() {
  return useQuery({
    queryKey: subscriptionKeys.current,
    queryFn: () => subscriptionApi.getCurrentSubscription(),
  })
}

export function useChangePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ planId, billingCycle }: { planId: PlanId; billingCycle: BillingCycle }) =>
      subscriptionApi.changePlan(planId, billingCycle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current })
      toast.success("Abonnement mis à jour")
    },
    onError: () => toast.error("Erreur lors du changement d'abonnement"),
  })
}

export function useCancelSubscription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => subscriptionApi.cancelSubscription(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current })
      toast.success("Abonnement annulé")
    },
    onError: () => toast.error("Erreur lors de l'annulation"),
  })
}
