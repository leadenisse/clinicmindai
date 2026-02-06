import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useOnboardingStatus, useCompleteOnboarding, useSkipOnboarding } from "../hooks/useOnboarding"
import { useOnboardingProgress } from "../hooks/useOnboardingProgress"
import { onboardingApi } from "../api/onboarding.api"
import { OnboardingChoice } from "../components/OnboardingChoice"
import { OnboardingLayout } from "../components/OnboardingLayout"
import { AppearanceStep } from "../components/steps/AppearanceStep"
import { ScheduleStep } from "../components/steps/ScheduleStep"
import { CabinetIdentityStep } from "../components/steps/CabinetIdentityStep"
import { AppointmentTypesStep } from "../components/steps/AppointmentTypesStep"
import { DocumentTemplatesStep } from "../components/steps/DocumentTemplatesStep"
import { PricingStep } from "../components/steps/PricingStep"
import { LegalMentionsStep } from "../components/steps/LegalMentionsStep"
import { ImportDataStep } from "../components/steps/ImportDataStep"
import { InviteTeamStep } from "../components/steps/InviteTeamStep"
import type {
  OnboardingLevel,
  OnboardingFormData,
  AppearanceData,
  ScheduleData,
} from "../types/onboarding.types"
import { getStepId } from "../constants/onboardingSteps"
import { useAuthStore } from "@/stores/authStore"
import { getHexForColor } from "../constants/themeColors"
import { useUIStore } from "@/stores/uiStore"
import { useUpdateCabinet } from "@/features/settings/hooks/useCabinet"
import { useUpdateLegalMentions } from "@/features/settings/hooks/useLegalMentions"
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react"

const DEFAULT_APPEARANCE: AppearanceData = {
  primaryColor: "blue",
  themeMode: "light",
}
const DEFAULT_SCHEDULE: ScheduleData = {
  openingTime: "08:00",
  closingTime: "19:00",
  workingDays: [1, 2, 3, 4, 5],
  defaultAppointmentDuration: 30,
}

function getDefaultFormData(): OnboardingFormData {
  return {
    appearance: DEFAULT_APPEARANCE,
    schedule: DEFAULT_SCHEDULE,
    cabinetIdentity: {},
    appointmentTypes: { types: [] },
    documentTemplates: {},
    pricing: { actPrices: {}, useConventionalRates: true },
    legalMentions: {},
    importData: { source: "none" },
    inviteTeam: { invites: [], allowPersonalization: true },
  }
}

export function OnboardingPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const { data: status, isLoading } = useOnboardingStatus()
  const completeOnboarding = useCompleteOnboarding()
  const skipOnboarding = useSkipOnboarding()
  const updateCabinet = useUpdateCabinet()
  const updateLegal = useUpdateLegalMentions()

  const [level, setLevel] = useState<OnboardingLevel | null>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [formData, setFormData] = useState<OnboardingFormData>(getDefaultFormData)

  const progress = useOnboardingProgress(level, stepIndex)
  const stepId = level ? getStepId(level, stepIndex) : null

  useEffect(() => {
    const stored = onboardingApi.getStoredFormData()
    if (stored) setFormData(() => ({ ...getDefaultFormData(), ...stored }))
  }, [])

  useEffect(() => {
    if (!status?.completed && level && formData.appearance) {
      useUIStore.getState().setTheme(formData.appearance.themeMode as "light" | "dark" | "system")
      useUIStore.getState().setPrimaryColor(getHexForColor(formData.appearance.primaryColor))
    }
  }, [level, formData.appearance])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  if (status?.completed) {
    navigate("/", { replace: true })
    return null
  }

  const userName = user?.firstName ? `Dr ${user.lastName}` : undefined

  if (!level) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
        <OnboardingChoice
          userName={userName}
          onSelect={(l) => {
            setLevel(l)
            setStepIndex(0)
          }}
          onSkip={() =>
            skipOnboarding.mutate(undefined, {
              onSuccess: () => navigate("/", { replace: true }),
            })
          }
        />
      </div>
    )
  }

  const totalSteps = progress.totalSteps
  const title =
    level === "quick"
      ? "Personnalisation rapide"
      : level === "intermediate"
        ? "Personnalisation intermédiaire"
        : "Personnalisation complète"

  const goBack = () => {
    if (progress.isFirstStep) {
      setLevel(null)
      setStepIndex(0)
    } else {
      setStepIndex((i) => i - 1)
    }
  }

  const goNext = () => {
    if (progress.isLastStep) {
      const payload = formData
      if (payload.schedule) {
        updateCabinet.mutate({
          openingTime: payload.schedule.openingTime,
          closingTime: payload.schedule.closingTime,
          workingDays: payload.schedule.workingDays,
          defaultAppointmentDuration: payload.schedule.defaultAppointmentDuration,
        })
      }
      if (payload.appearance?.primaryColor) {
        updateCabinet.mutate({
          primaryColor: getHexForColor(payload.appearance.primaryColor),
        })
      }
      if (payload.cabinetIdentity?.email !== undefined) {
        updateCabinet.mutate({
          email: payload.cabinetIdentity.email,
          website: payload.cabinetIdentity.website,
          siret: payload.cabinetIdentity.siret,
          logoUrl: payload.cabinetIdentity.logoUrl,
        })
      }
      if (
        payload.legalMentions &&
        (payload.legalMentions.prescriptionFooter || payload.legalMentions.invoiceFooter)
      ) {
        updateLegal.mutate({
          prescriptionFooter: payload.legalMentions.prescriptionFooter,
          invoiceFooter: payload.legalMentions.invoiceFooter,
        })
      }
      completeOnboarding.mutate(level, {
        onSuccess: () => navigate("/", { replace: true }),
      })
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  const footer = (
    <div className="flex w-full justify-between">
      <Button variant="outline" onClick={goBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {progress.isFirstStep ? "Retour" : "Retour"}
      </Button>
      <Button onClick={goNext} disabled={completeOnboarding.isPending}>
        {progress.isLastStep ? (
          <>
            Terminer et commencer <Rocket className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Continuer <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <OnboardingLayout
        title={title}
        currentStep={progress.currentStepNumber}
        totalSteps={totalSteps}
        footer={footer}
      >
        {stepId === "appearance" && (
          <AppearanceStep
            data={formData.appearance ?? DEFAULT_APPEARANCE}
            onChange={(d) => setFormData((prev) => ({ ...prev, appearance: d }))}
          />
        )}
        {stepId === "schedule" && (
          <ScheduleStep
            data={formData.schedule ?? DEFAULT_SCHEDULE}
            onChange={(d) => setFormData((prev) => ({ ...prev, schedule: d }))}
          />
        )}
        {stepId === "cabinetIdentity" && (
          <CabinetIdentityStep
            data={formData.cabinetIdentity ?? {}}
            onChange={(d) => setFormData((prev) => ({ ...prev, cabinetIdentity: d }))}
          />
        )}
        {stepId === "appointmentTypes" && (
          <AppointmentTypesStep
            data={formData.appointmentTypes ?? { types: [] }}
            onChange={(d) => setFormData((prev) => ({ ...prev, appointmentTypes: d }))}
          />
        )}
        {stepId === "documentTemplates" && (
          <DocumentTemplatesStep
            data={formData.documentTemplates ?? {}}
            onChange={(d) => setFormData((prev) => ({ ...prev, documentTemplates: d }))}
          />
        )}
        {stepId === "pricing" && (
          <PricingStep
            data={formData.pricing ?? { actPrices: {}, useConventionalRates: true }}
            onChange={(d) => setFormData((prev) => ({ ...prev, pricing: d }))}
          />
        )}
        {stepId === "legalMentions" && (
          <LegalMentionsStep
            data={formData.legalMentions ?? {}}
            onChange={(d) => setFormData((prev) => ({ ...prev, legalMentions: d }))}
          />
        )}
        {stepId === "importData" && (
          <ImportDataStep
            data={formData.importData ?? { source: "none" }}
            onChange={(d) => setFormData((prev) => ({ ...prev, importData: d }))}
          />
        )}
        {stepId === "inviteTeam" && (
          <InviteTeamStep
            data={formData.inviteTeam ?? { invites: [], allowPersonalization: true }}
            onChange={(d) => setFormData((prev) => ({ ...prev, inviteTeam: d }))}
          />
        )}
      </OnboardingLayout>
    </div>
  )
}
