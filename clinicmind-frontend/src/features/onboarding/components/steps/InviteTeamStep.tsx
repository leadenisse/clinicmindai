import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSendInvitation } from "@/features/auth/hooks/useInvitation"
import type { InviteTeamData, PendingInvite } from "../../types/onboarding.types"
import { UserPlus } from "lucide-react"

const ROLE_LABELS: Record<"PRACTITIONER" | "SECRETARY", string> = {
  PRACTITIONER: "Praticien",
  SECRETARY: "Secrétaire",
}

interface InviteTeamStepProps {
  data: InviteTeamData
  onChange: (data: InviteTeamData) => void
  maxUsers?: number
}

export function InviteTeamStep({
  data,
  onChange,
  maxUsers = 3,
}: InviteTeamStepProps) {
  const sendInvitation = useSendInvitation()
  const [newEmail, setNewEmail] = useState("")
  const [newFirstName, setNewFirstName] = useState("")
  const [newLastName, setNewLastName] = useState("")
  const [newRole, setNewRole] = useState<"PRACTITIONER" | "SECRETARY">("SECRETARY")
  const invites = data.invites ?? []
  const currentCount = invites.length

  const addRow = () => {
    if (!newEmail.trim()) return
    const invite: PendingInvite = {
      email: newEmail.trim(),
      firstName: newFirstName.trim(),
      lastName: newLastName.trim(),
      role: newRole,
    }
    onChange({
      ...data,
      invites: [...invites, invite],
    })
    setNewEmail("")
    setNewFirstName("")
    setNewLastName("")
  }

  const sendInvite = (invite: PendingInvite) => {
    sendInvitation.mutate(
      {
        email: invite.email,
        firstName: invite.firstName,
        lastName: invite.lastName,
        role: invite.role,
        allowPersonalization: data.allowPersonalization ?? true,
      },
      {
        onSuccess: () => {
          onChange({
            ...data,
            invites: invites.filter((i) => i.email !== invite.email),
          })
        },
      }
    )
  }

  return (
    <div className="space-y-8">
      <Label>Invitez vos collaborateurs</Label>
      <ul className="space-y-2 rounded-lg border divide-y">
        {invites.map((inv) => (
          <li
            key={inv.email}
            className="flex items-center gap-4 py-3 px-4 first:pt-0 flex-wrap"
          >
            <span className="font-medium min-w-[180px]">{inv.email}</span>
            <span className="text-muted-foreground text-sm">
              {ROLE_LABELS[inv.role]}
            </span>
            <Button
              type="button"
              size="sm"
              onClick={() => sendInvite(inv)}
              disabled={sendInvitation.isPending}
            >
              Envoyer
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-end gap-2">
        <Input
          placeholder="email@..."
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="min-w-[200px]"
        />
        <Input
          placeholder="Prénom"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
          className="w-32"
        />
        <Input
          placeholder="Nom"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
          className="w-32"
        />
        <Select value={newRole} onValueChange={(v: "PRACTITIONER" | "SECRETARY") => setNewRole(v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PRACTITIONER">{ROLE_LABELS.PRACTITIONER}</SelectItem>
            <SelectItem value="SECRETARY">{ROLE_LABELS.SECRETARY}</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          onClick={addRow}
          disabled={!newEmail.trim()}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Ajouter un collaborateur
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Votre plan Professionnel inclut {maxUsers} utilisateurs. Utilisateurs ajoutés :{" "}
        {currentCount}/{maxUsers}
      </p>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.allowPersonalization ?? true}
          onChange={(e) =>
            onChange({ ...data, allowPersonalization: e.target.checked })
          }
        />
        <span className="text-sm">Les invités pourront personnaliser leur interface</span>
      </label>
    </div>
  )
}
