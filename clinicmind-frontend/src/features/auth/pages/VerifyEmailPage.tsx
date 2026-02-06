import { useLocation, Navigate } from "react-router-dom"
import { EmailVerification } from "../components/EmailVerification"

export function VerifyEmailPage() {
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email

  if (!email) {
    return <Navigate to="/signup" replace />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <EmailVerification email={email} />
    </div>
  )
}
