import { ProfileForm } from "../components/ProfileForm"

export function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Mon profil</h1>
      <ProfileForm />
    </div>
  )
}
