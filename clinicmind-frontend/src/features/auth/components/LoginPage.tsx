import { useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import { LOGO_PATHS } from "@/config/app.config"
import { LoginForm } from "./LoginForm"

const LOGO_ALT = "ClinicMind AI"
const LOGO_FALLBACKS: readonly string[] = [
  LOGO_PATHS.full,
  "/logo.png",
  "/logo-icon.png",
]

export default function LoginPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [logoSrcIndex, setLogoSrcIndex] = useState(0)
  const showTextFallback = logoSrcIndex >= LOGO_FALLBACKS.length

  const handleLogoError = () => {
    setLogoSrcIndex((i) => Math.min(i + 1, LOGO_FALLBACKS.length))
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          {showTextFallback ? (
            <div
              className="mx-auto flex h-20 flex-col items-center justify-center text-primary-600"
              role="img"
              aria-label={LOGO_ALT}
            >
              <span className="text-2xl font-bold">
                Clinic<span className="text-primary-500">Mind</span>
              </span>
              <span className="text-sm font-medium text-primary-500">AI</span>
            </div>
          ) : (
            <img
              src={LOGO_FALLBACKS[logoSrcIndex]}
              alt={LOGO_ALT}
              className="mx-auto h-20 w-auto object-contain"
              onError={handleLogoError}
            />
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            L&apos;intelligence au service des praticiens
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
