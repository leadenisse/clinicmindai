import { useParams, useNavigate } from "react-router-dom"
import { UserForm, type UserFormValues } from "../components/UserForm"
import { useUser, useUpdateUser } from "../hooks/useUsers"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

export function UserEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: user, isLoading } = useUser(id ?? "")
  const updateUser = useUpdateUser(id ?? "")

  const handleSubmit = (data: UserFormValues) => {
    if (!id) return
    updateUser.mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      },
      {
        onSuccess: () => navigate("/settings/users"),
      }
    )
  }

  if (!id) {
    navigate("/settings/users", { replace: true })
    return null
  }

  if (isLoading || !user) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/settings/users")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste
      </Button>
      <h1 className="text-2xl font-semibold">
        Modifier {user.firstName} {user.lastName}
      </h1>
      <UserForm
        defaultValues={{
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        }}
        onSubmit={handleSubmit}
        isPending={updateUser.isPending}
        submitLabel="Enregistrer"
      />
    </div>
  )
}
