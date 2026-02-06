import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface JoinCabinetFormProps {
  inviteCode: string
  onInviteCodeChange: (value: string) => void
  onSubmit: () => void
  isPending?: boolean
}

export function JoinCabinetForm({
  inviteCode,
  onInviteCodeChange,
  onSubmit,
  isPending,
}: JoinCabinetFormProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-lg font-semibold">Rejoindre un cabinet</h2>
        <p className="text-sm text-muted-foreground">
          Saisissez le code d&apos;invitation reçu par email.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="inviteCode">Code d&apos;invitation</Label>
          <Input
            id="inviteCode"
            value={inviteCode}
            onChange={(e) => onInviteCodeChange(e.target.value)}
            placeholder="XXXX-XXXX-XXXX"
          />
        </div>
        <Button
          className="w-full"
          onClick={onSubmit}
          disabled={!inviteCode.trim() || isPending}
        >
          {isPending ? "Vérification..." : "Rejoindre le cabinet"}
        </Button>
      </CardContent>
    </Card>
  )
}
