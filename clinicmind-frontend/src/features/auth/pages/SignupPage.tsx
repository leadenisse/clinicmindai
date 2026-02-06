import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useSignup } from "../hooks/useSignup"
import { Step1PersonalInfo } from "../components/SignupForm/Step1PersonalInfo"
import { Step2Cabinet } from "../components/SignupForm/Step2Cabinet"
import { Step3Plan } from "../components/SignupForm/Step3Plan"
import { Step4Password } from "../components/SignupForm/Step4Password"
import { SignupProgress } from "../components/SignupForm/SignupProgress"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {
  SignupStep1Data,
  SignupStep2Data,
  SignupStep3Data,
  SignupStep4Data,
  SignupPayload,
} from "../types/auth.types"

const defaultStep1: SignupStep1Data = {
  specialty: "dentist",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  rpps: "",
}

const defaultStep2: SignupStep2Data = {
  mode: "new",
  cabinetName: "",
  address: "",
  zipCode: "",
  city: "",
  cabinetPhone: "",
  cabinetSize: "small",
}

const defaultStep3: SignupStep3Data = {
  planId: "professionnel",
  billingCycle: "monthly",
}

const defaultStep4: SignupStep4Data = {
  password: "",
  confirmPassword: "",
  acceptCgu: false,
  acceptNewsletter: false,
}

function buildPayload(
  s1: SignupStep1Data,
  s2: SignupStep2Data,
  s3: SignupStep3Data,
  s4: SignupStep4Data
): SignupPayload {
  return {
    ...s1,
    ...s2,
    ...s3,
    ...s4,
  }
}

function validateStep1(s1: SignupStep1Data): Partial<Record<keyof SignupStep1Data, string>> {
  const e: Partial<Record<keyof SignupStep1Data, string>> = {}
  if (!s1.firstName?.trim()) e.firstName = "Requis"
  if (!s1.lastName?.trim()) e.lastName = "Requis"
  if (!s1.email?.trim()) e.email = "Requis"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s1.email)) e.email = "Email invalide"
  if (!s1.rpps || s1.rpps.length !== 11) e.rpps = "11 chiffres requis"
  return e
}

export function SignupPage() {
  const navigate = useNavigate()
  const signup = useSignup()
  const [step, setStep] = useState(1)
  const [step1, setStep1] = useState<SignupStep1Data>(defaultStep1)
  const [step2, setStep2] = useState<SignupStep2Data>(defaultStep2)
  const [step3, setStep3] = useState<SignupStep3Data>(defaultStep3)
  const [step4, setStep4] = useState<SignupStep4Data>(defaultStep4)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleNext1 = () => {
    const e = validateStep1(step1)
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    setErrors({})
    setStep(2)
  }

  const handleNext2 = () => {
    if (step2.mode === "new") {
      const e: Record<string, string> = {}
      if (!step2.cabinetName?.trim()) e.cabinetName = "Requis"
      if (!step2.address?.trim()) e.address = "Requis"
      if (!step2.zipCode?.trim()) e.zipCode = "Requis"
      if (!step2.city?.trim()) e.city = "Requis"
      if (Object.keys(e).length) {
        setErrors(e)
        return
      }
    }
    setErrors({})
    setStep(3)
  }

  const handleNext3 = () => setStep(4)

  const handleSubmit4 = () => {
    const e: Partial<Record<keyof SignupStep4Data, string>> = {}
    if (!step4.password || step4.password.length < 8)
      e.password = "Min. 8 caractères, maj, min, chiffre"
    if (step4.password !== step4.confirmPassword)
      e.confirmPassword = "Les mots de passe ne correspondent pas"
    if (!step4.acceptCgu) e.acceptCgu = "Vous devez accepter les CGU"
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    setErrors({})
    const payload = buildPayload(step1, step2, step3, step4)
    signup.mutate(payload, {
      onSuccess: (res) => {
        navigate("/verify-email", { state: { email: res.email }, replace: true })
      },
    })
  }

  return (
    <div className="flex min-h-screen">
      {/* Panneau gauche avec branding (desktop) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-primary-500 to-primary-700 p-12">
        <div>
          <img
            src="/logo-dark.png"
            alt="ClinicMind AI"
            className="h-16 w-auto object-contain object-left"
          />
        </div>
        <div className="text-white">
          <h1 className="mb-4 text-4xl font-bold">
            Bienvenue sur ClinicMind AI
          </h1>
          <p className="text-xl text-primary-100">
            Le logiciel de gestion de cabinet dentaire augmenté par
            l&apos;intelligence artificielle.
          </p>
        </div>
        <div className="text-sm text-primary-200">
          © {new Date().getFullYear()} ClinicMind AI. Tous droits réservés.
        </div>
      </div>

      {/* Panneau droit avec formulaire */}
      <div className="flex w-full flex-col items-center justify-center bg-muted/30 p-4 lg:w-1/2">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Inscription</CardTitle>
            <CardDescription>
              Étape {step}/4 :{" "}
              {step === 1 && "Vos informations"}
              {step === 2 && "Votre cabinet"}
              {step === 3 && "Votre abonnement"}
              {step === 4 && "Créez votre compte"}
            </CardDescription>
            <div className="flex justify-center pt-2">
              <SignupProgress currentStep={step} />
            </div>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <Step1PersonalInfo
                data={step1}
                onChange={setStep1}
                onNext={handleNext1}
                errors={errors as Partial<Record<keyof SignupStep1Data, string>>}
              />
            )}
            {step === 2 && (
              <Step2Cabinet
                data={step2}
                onChange={setStep2}
                onBack={() => setStep(1)}
                onNext={handleNext2}
                errors={errors}
              />
            )}
            {step === 3 && (
              <Step3Plan
                data={step3}
                onChange={setStep3}
                onBack={() => setStep(2)}
                onNext={handleNext3}
              />
            )}
            {step === 4 && (
              <Step4Password
                data={step4}
                onChange={setStep4}
                onBack={() => setStep(3)}
                onSubmit={handleSubmit4}
                errors={errors as Partial<Record<keyof SignupStep4Data, string>>}
                isSubmitting={signup.isPending}
              />
            )}
          </CardContent>
        </Card>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link to="/login" className="text-primary underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
