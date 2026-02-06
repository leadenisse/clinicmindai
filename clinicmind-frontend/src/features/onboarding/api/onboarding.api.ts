import type {
  OnboardingStatus,
  OnboardingLevel,
  OnboardingFormData,
  OnboardingSaveRequest,
} from "../types/onboarding.types"

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

const STORAGE_KEY = "clinicmind_onboarding"

function getStored(): OnboardingStatus & { formData?: OnboardingFormData } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return {
    completed: false,
    level: null,
    formData: undefined,
  }
}

function setStored(data: OnboardingStatus & { formData?: OnboardingFormData }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export const onboardingApi = {
  async getStatus(): Promise<OnboardingStatus> {
    await delay(200)
    const { completed, level, completedAt } = getStored()
    return { completed, level, completedAt }
  },

  async saveStep(payload: OnboardingSaveRequest): Promise<void> {
    await delay(300)
    const stored = getStored()
    const formData: OnboardingFormData = { ...stored.formData, ...payload.data }
    setStored({ ...stored, formData })
  },

  async completeOnboarding(level: OnboardingLevel): Promise<OnboardingStatus> {
    await delay(400)
    const stored = getStored()
    const next: OnboardingStatus = {
      completed: true,
      level,
      completedAt: new Date().toISOString(),
    }
    setStored({ ...stored, ...next, formData: stored.formData })
    return next
  },

  async skipOnboarding(): Promise<OnboardingStatus> {
    await delay(200)
    const next: OnboardingStatus = {
      completed: true,
      level: null,
      completedAt: new Date().toISOString(),
    }
    setStored({ ...getStored(), ...next })
    return next
  },

  getStoredFormData(): OnboardingFormData | undefined {
    return getStored().formData
  },
}
