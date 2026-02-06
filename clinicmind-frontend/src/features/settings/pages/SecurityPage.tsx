import { PasswordChangeForm } from "../components/PasswordChangeForm"
import { MFASettings } from "../components/MFASettings"

export function SecurityPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sécurité</h1>
      <div className="space-y-6">
        <PasswordChangeForm />
        <MFASettings />
      </div>
    </div>
  )
}
