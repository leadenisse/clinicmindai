import { useNavigate } from "react-router-dom"
import { useCreatePatient } from "../hooks/usePatients"
import { PatientForm } from "../components/PatientForm"
import type { Patient } from "../types/patient.types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

type CreatePatientPayload = Omit<
  Patient,
  "id" | "createdAt" | "updatedAt" | "createdBy"
>

export function PatientCreatePage() {
  const navigate = useNavigate()
  const createPatient = useCreatePatient()

  const handleSubmit = (payload: CreatePatientPayload) => {
    createPatient.mutate(payload, {
      onSuccess: (patient) => {
        navigate(`/patients/${patient.id}`, { replace: true })
      },
    })
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/patients")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste
      </Button>
      <h1 className="text-2xl font-semibold">Nouveau patient</h1>
      <PatientForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/patients")}
        isSubmitting={createPatient.isPending}
      />
    </div>
  )
}
