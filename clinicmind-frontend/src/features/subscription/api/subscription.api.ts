import type { PlanId, BillingCycle, CurrentSubscription } from "../types/subscription.types"
import type { Plan } from "../types/subscription.types"
import { PLANS } from "../constants/plans"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let mockSubscription: CurrentSubscription = {
  planId: "professionnel",
  billingCycle: "monthly",
  status: "active",
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  trialEnd: undefined,
}

export const subscriptionApi = {
  async getPlans(): Promise<Plan[]> {
    await delay(300)
    return PLANS
  },

  async getCurrentSubscription(): Promise<CurrentSubscription> {
    await delay(250)
    return { ...mockSubscription }
  },

  async changePlan(planId: PlanId, billingCycle: BillingCycle): Promise<CurrentSubscription> {
    await delay(500)
    mockSubscription = {
      ...mockSubscription,
      planId,
      billingCycle,
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }
    return mockSubscription
  },

  async cancelSubscription(): Promise<void> {
    await delay(400)
    mockSubscription = {
      ...mockSubscription,
      status: "cancelled",
    }
  },
}
