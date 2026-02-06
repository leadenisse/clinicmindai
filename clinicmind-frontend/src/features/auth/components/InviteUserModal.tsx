import { useState } from "react"
import { useSendInvitation } from "../hooks/useInvitation"
import { USER_ROLES } from "@/features/settings/constants/settingsConfig"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { UserRole } from "../types/auth.types"

const ROLES_FOR_INVITE: UserRole[] = ["PRACTITIONER", "SECRETARY"]

interface InviteUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InviteUserModal({ open, onOpenChange }: InviteUserModalProps) {
  const sendInvitation = useSendInvitation()
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState<UserRole>("SECRETARY")
  const [allowPersonalization, setAllowPersonalization] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendInvitation.mutate(
      { email, firstName, lastName, role, allowPersonalization },
      {
        onSuccess: () => {
          setEmail("")
          setFirstName("")
          setLastName("")
          setRole("SECRETARY")
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inviter un collaborateur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invite-email">Email *</Label>
            <Input
              id="invite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="collaborateur@email.fr"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invite-firstName">Prénom *</Label>
              <Input
                id="invite-firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Marie"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-lastName">Nom *</Label>
              <Input
                id="invite-lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Dupont"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Rôle</Label>
            <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLES_FOR_INVITE.map((r) => (
                  <SelectItem key={r} value={r}>
                    {USER_ROLES[r].label} — {USER_ROLES[r].description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={allowPersonalization}
              onChange={(e) => setAllowPersonalization(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm">
              Autoriser la personnalisation de l&apos;interface
            </span>
          </label>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={sendInvitation.isPending}>
              {sendInvitation.isPending ? "Envoi..." : "Envoyer l'invitation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
