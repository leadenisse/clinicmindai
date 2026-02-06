import { useNavigate } from "react-router-dom"
import { UserForm, type UserFormValues } from "../components/UserForm"
import { useCreateUser } from "../hooks/useUsers"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function UserCreatePage() {
  const navigate = useNavigate()
  const createUser = useCreateUser()

  const handleSubmit = (data: UserFormValues) => {
    createUser.mutate(
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        password: data.password,
      },
      {
        onSuccess: () => navigate("/settings/users"),
      }
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
      <h1 className="text-2xl font-semibold">Nouvel utilisateur</h1>
      <UserForm
        onSubmit={handleSubmit}
        isPending={createUser.isPending}
        submitLabel="Créer l'utilisateur"
      />
    </div>
  )
}
