import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserList } from "../components/UserList"
import { InviteUserModal } from "@/features/auth/components/InviteUserModal"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useResetUserPassword } from "../hooks/useUsers"
import { UserPlus, Mail } from "lucide-react"
import { toast } from "sonner"

export function UsersPage() {
  const navigate = useNavigate()
  const resetPassword = useResetUserPassword()
  const [inviteOpen, setInviteOpen] = useState(false)
  const [resetModal, setResetModal] = useState<{
    id: string
    email: string
  } | null>(null)
  const [newPassword, setNewPassword] = useState("")

  const handleResetPassword = () => {
    if (!resetModal || !newPassword || newPassword.length < 8) {
      toast.error("Mot de passe d'au moins 8 caractères requis")
      return
    }
    resetPassword.mutate(
      { id: resetModal.id, newPassword },
      {
        onSuccess: () => {
          setResetModal(null)
          setNewPassword("")
        },
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h1 className="text-2xl font-semibold">Gestion des utilisateurs</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setInviteOpen(true)}>
            <Mail className="mr-2 h-4 w-4" />
            Inviter un collaborateur
          </Button>
          <Button onClick={() => navigate("/settings/users/new")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nouvel utilisateur
          </Button>
        </div>
      </div>
      <InviteUserModal open={inviteOpen} onOpenChange={setInviteOpen} />
      <UserList
        onResetPassword={(user) => setResetModal({ id: user.id, email: user.email })}
      />

      <Dialog open={!!resetModal} onOpenChange={() => setResetModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Réinitialiser le mot de passe</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {resetModal && (
              <p className="text-sm text-muted-foreground">
                Nouveau mot de passe temporaire pour{" "}
                <strong>{resetModal.email}</strong>.
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 caractères"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setResetModal(null)}>
                Annuler
              </Button>
              <Button
                onClick={handleResetPassword}
                disabled={newPassword.length < 8 || resetPassword.isPending}
              >
                {resetPassword.isPending ? "En cours..." : "Réinitialiser"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
