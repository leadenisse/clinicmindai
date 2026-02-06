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
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { USER_ROLES } from "../constants/settingsConfig"
import type { CreateUserRequest } from "../types/settings.types"
import type { UserRole } from "@/features/auth/types/auth.types"

export interface UserFormValues extends CreateUserRequest {
  sendInvitation?: boolean
}

interface UserFormProps {
  defaultValues?: Partial<UserFormValues> & { id?: string }
  onSubmit: (data: UserFormValues) => void
  isPending?: boolean
  submitLabel?: string
}

export function UserForm({
  defaultValues,
  onSubmit,
  isPending = false,
  submitLabel = "Créer l'utilisateur",
}: UserFormProps) {
  const [form, setForm] = useState<UserFormValues>({
    email: defaultValues?.email ?? "",
    firstName: defaultValues?.firstName ?? "",
    lastName: defaultValues?.lastName ?? "",
    role: (defaultValues?.role ?? "SECRETARY") as UserRole,
    password: defaultValues?.password ?? "",
    sendInvitation: defaultValues?.sendInvitation ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  const isEdit = !!defaultValues?.id
  const roles = Object.entries(USER_ROLES) as [UserRole, (typeof USER_ROLES)[UserRole]][]

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">
            {isEdit ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={form.firstName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, firstName: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={form.lastName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, lastName: e.target.value }))
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
              readOnly={isEdit}
              className={isEdit ? "bg-muted" : undefined}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Rôle</Label>
            <Select
              value={form.role}
              onValueChange={(v) => setForm((p) => ({ ...p, role: v as UserRole }))}
            >
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map(([value, config]) => (
                  <SelectItem key={value} value={value}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {!isEdit && (
            <>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe temporaire</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                  required={!isEdit}
                  placeholder="Min. 8 caractères"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.sendInvitation ?? true}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, sendInvitation: e.target.checked }))
                  }
                  className="rounded border-border"
                />
                Envoyer un email d&apos;invitation
              </label>
            </>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Enregistrement..." : submitLabel}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
