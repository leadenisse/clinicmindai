import { useProfile } from "../hooks/useProfile"
import { useEnableMfa, useDisableMfa } from "../hooks/useSecurity"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ShieldCheck, ShieldOff } from "lucide-react"

export function MFASettings() {
  const { data: profile, isLoading } = useProfile()
  const enableMfa = useEnableMfa()
  const disableMfa = useDisableMfa()

  if (isLoading || !profile) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>
    )
  }

  const enabled = profile.mfaEnabled

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Authentification à deux facteurs (MFA)</h3>
        <p className="text-sm text-muted-foreground">
          Renforcez la sécurité de votre compte avec un code à usage unique.
        </p>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          {enabled ? (
            <>
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <Badge variant="default" className="bg-green-600">
                Activé
              </Badge>
            </>
          ) : (
            <>
              <ShieldOff className="h-5 w-5 text-muted-foreground" />
              <Badge variant="secondary">Désactivé</Badge>
            </>
          )}
        </div>
        {enabled ? (
          <Button
            variant="outline"
            onClick={() => disableMfa.mutate()}
            disabled={disableMfa.isPending}
          >
            {disableMfa.isPending ? "En cours..." : "Désactiver MFA"}
          </Button>
        ) : (
          <Button
            onClick={() => enableMfa.mutate()}
            disabled={enableMfa.isPending}
          >
            {enableMfa.isPending ? "En cours..." : "Activer MFA"}
          </Button>
        )}
      </CardContent>
      {enableMfa.isSuccess && enableMfa.data && !enabled && (
        <CardContent className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground mb-2">
            Scannez ce QR code avec votre application d’authentification (Google Authenticator, Authy, etc.) :
          </p>
          <div className="flex items-center gap-4">
            <img
              src={enableMfa.data.qrCodeUrl}
              alt="QR Code MFA"
              className="h-24 w-24 border border-border rounded"
            />
            <p className="text-xs text-muted-foreground break-all">
              Clé manuelle : {enableMfa.data.secret}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
