import { CabinetForm } from "../components/CabinetForm"

export function CabinetPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Paramètres du cabinet</h1>
      <CabinetForm />
    </div>
  )
}
