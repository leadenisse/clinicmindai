export type PlanId = "essentiel" | "professionnel" | "premium" | "groupe"

export type BillingCycle = "monthly" | "annual"

export interface PlanFeature {
  id: string
  label: string
  included: boolean
  value?: string
}

export interface Plan {
  id: PlanId
  name: string
  description: string
  priceMonthly: number
  priceAnnual: number
  recommended?: boolean
  customQuote?: boolean
  features: PlanFeature[]
  excluded?: string[]
}

export interface CurrentSubscription {
  planId: PlanId
  billingCycle: BillingCycle
  status: "active" | "trialing" | "past_due" | "cancelled"
  currentPeriodEnd: string
  trialEnd?: string
}

export interface SpecialOffer {
  id: string
  label: string
  description: string
}
