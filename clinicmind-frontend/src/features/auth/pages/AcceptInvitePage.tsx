import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useInvitation, useAcceptInvite } from "../hooks/useInvitation"
import { USER_ROLES } from "@/features/settings/constants/settingsConfig"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, EyeOff } from "lucide-react"

export function AcceptInvitePage() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const { data: invitation, isLoading } = useInvitation(token ?? "")
  const acceptInvite = useAcceptInvite()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!token || password !== confirmPassword || password.length < 8) return
    acceptInvite.mutate(
      { token, password, confirmPassword },
      {
        onSuccess: () => navigate("/login", { replace: true }),
      }
    )
  }

  if (!token) {
    navigate("/login", { replace: true })
    return null
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!invitation) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-lg font-semibold">Invitation invalide</h1>
            <p className="text-sm text-muted-foreground">
              Ce lien a expiré ou est invalide.
            </p>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/login")} className="w-full">
              Retour à la connexion
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const roleLabel = USER_ROLES[invitation.role]?.label ?? invitation.role

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-xl font-semibold">Rejoindre {invitation.cabinetName}</h1>
          <p className="text-sm text-muted-foreground">
            Vous avez été invité en tant que <strong>{roleLabel}</strong>.
          </p>
          <p className="text-sm text-muted-foreground">
            Créez votre mot de passe pour activer votre compte ({invitation.email}).
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 caractères"
                  required
                  minLength={8}
                  className="pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-sm text-destructive">Les mots de passe ne correspondent pas</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={
                password.length < 8 ||
                password !== confirmPassword ||
                acceptInvite.isPending
              }
            >
              {acceptInvite.isPending ? "Activation..." : "Activer mon compte"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
