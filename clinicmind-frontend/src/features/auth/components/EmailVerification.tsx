import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useResendVerificationEmail } from "../hooks/useVerifyEmail"
import { useAuthStore } from "@/stores/authStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Mail, RefreshCw, ArrowRight } from "lucide-react"

interface EmailVerificationProps {
  email: string
}

export function EmailVerification({ email }: EmailVerificationProps) {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const resend = useResendVerificationEmail()
  const [changedEmail, setChangedEmail] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleResend = () => {
    resend.mutate(email, {
      onSuccess: () => {
        setResendSuccess(true)
        setTimeout(() => setResendSuccess(false), 3000)
      },
    })
  }

  const handleContinueDemo = () => {
    login({ email: email || "demo@cabinet.fr", password: "demo" })
    navigate("/onboarding", { replace: true })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          <Mail className="h-7 w-7" />
        </div>
        <h1 className="text-xl font-semibold">Vérifiez votre email</h1>
        <p className="text-sm text-muted-foreground">
          Un email de confirmation a été envoyé à :
        </p>
        <p className="font-medium">{email}</p>
        <p className="text-sm text-muted-foreground">
          Cliquez sur le lien dans l&apos;email pour activer votre compte.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {resendSuccess && (
          <div className="rounded-lg bg-green-50 p-3 text-center text-sm text-green-700">
            ✓ Email renvoyé avec succès
          </div>
        )}
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={handleResend}
          disabled={resend.isPending}
        >
          {resend.isPending ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Renvoyer l'email"
          )}
        </Button>

        <Button
          className="w-full gap-2 bg-primary-500 hover:bg-primary-600 text-white"
          onClick={handleContinueDemo}
        >
          Continuer sans vérification
          <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Mode démo : la vérification email sera simulée
        </p>

        <div className="border-t pt-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setChangedEmail(true)}
          >
            Changer d&apos;adresse email
          </Button>
          {changedEmail && (
            <p className="text-center text-sm text-muted-foreground">
              Retournez à l&apos;inscription pour modifier votre email.
            </p>
          )}
          <Button variant="link" className="w-full" asChild>
            <Link to="/login">Retour à la connexion</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
