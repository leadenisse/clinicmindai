import { useNavigate } from "react-router-dom"
import { useUsers, useUpdateUser } from "../hooks/useUsers"
import { UserRoleBadge } from "./UserRoleBadge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Key, UserX, UserCheck } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { UserListItem } from "../types/settings.types"

function UserActions({
  user,
  onResetPassword,
}: {
  user: UserListItem
  onResetPassword: (user: UserListItem) => void
}) {
  const navigate = useNavigate()
  const updateUser = useUpdateUser(user.id)

  const toggleActive = () => {
    updateUser.mutate({ isActive: !user.isActive })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate(`/settings/users/${user.id}`)}>
          <Pencil className="mr-2 h-4 w-4" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onResetPassword(user)}>
          <Key className="mr-2 h-4 w-4" />
          Réinitialiser mot de passe
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleActive}>
          {user.isActive ? (
            <>
              <UserX className="mr-2 h-4 w-4" />
              Désactiver
            </>
          ) : (
            <>
              <UserCheck className="mr-2 h-4 w-4" />
              Activer
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function UserList({
  onResetPassword,
}: {
  onResetPassword: (user: UserListItem) => void
}) {
  const { data: users, isLoading } = useUsers()

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière connexion</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell colSpan={6} className="h-12 animate-pulse bg-muted/50" />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (!users?.length) {
    return (
      <p className="rounded-md border border-dashed p-6 text-center text-muted-foreground">
        Aucun utilisateur.
      </p>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Utilisateur</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Dernière connexion</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <UserRoleBadge role={user.role} />
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "default" : "secondary"}>
                    {user.isActive ? "Actif" : "Inactif"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {user.lastLoginAt
                    ? format(new Date(user.lastLoginAt), "dd MMM yyyy HH:mm", {
                        locale: fr,
                      })
                    : "—"}
                </TableCell>
                <TableCell>
                  <UserActions
                    user={user}
                    onResetPassword={onResetPassword}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
