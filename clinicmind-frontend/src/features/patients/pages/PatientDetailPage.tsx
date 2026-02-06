import { useParams, useNavigate } from "react-router-dom"
import { usePatient } from "../hooks/usePatients"
import { PatientHeader } from "../components/PatientHeader"
import { PatientSidebar } from "../components/PatientSidebar"
import { PatientTabs } from "../components/PatientTabs"
import { PatientTimeline } from "../components/PatientTimeline"
import { PatientDocumentsTab } from "@/features/documents"
import { PatientAppointmentsTab } from "@/features/appointments"
import { PatientInvoicesTab } from "@/features/invoicing"
import { PatientProstheticsTab } from "@/features/prosthetics"
import { QuickGenerateButtons, AIChatPanel } from "@/features/ai"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: patient, isLoading, isError } = usePatient(id ?? "")

  if (!id) {
    navigate("/patients", { replace: true })
    return null
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate("/patients")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <p className="text-error">Patient non trouvé.</p>
      </div>
    )
  }

  if (isLoading || !patient) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="flex gap-6">
          <Skeleton className="h-96 flex-1" />
          <Skeleton className="h-96 w-72" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate("/patients")} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste
      </Button>

      <PatientHeader patient={patient} />

      <Card>
        <CardContent className="py-3">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Génération IA
          </p>
          <QuickGenerateButtons
            patientId={patient.id}
            onGenerate={(content) => {
              navigator.clipboard.writeText(content).then(() => {
                toast.success("Contenu généré copié dans le presse-papier")
              })
            }}
          />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1">
          <PatientTabs
            observationContent={
              <Card>
                <CardContent className="py-6">
                  <p className="text-muted-foreground">
                    Formulaire d'anamnèse et observation initiale. À compléter par le praticien.
                  </p>
                </CardContent>
              </Card>
            }
            suiviContent={
              <PatientTimeline patientId={patient.id} patient={patient} />
            }
            documentsContent={
              <Card>
                <CardContent className="py-6">
                  <PatientDocumentsTab patientId={patient.id} />
                </CardContent>
              </Card>
            }
            imagerieContent={
              <Card>
                <CardContent className="py-6">
                  <p className="text-muted-foreground">
                    Galerie des radios (à venir).
                  </p>
                </CardContent>
              </Card>
            }
            devisContent={
              <Card>
                <CardContent className="py-6">
                  <PatientInvoicesTab patientId={patient.id} patient={patient} />
                </CardContent>
              </Card>
            }
            prothesesContent={
              <Card>
                <CardContent className="py-6">
                  <PatientProstheticsTab patientId={patient.id} />
                </CardContent>
              </Card>
            }
            rdvContent={
              <Card>
                <CardContent className="py-6">
                  <PatientAppointmentsTab patientId={patient.id} patient={patient} />
                </CardContent>
              </Card>
            }
          />
        </div>
        <div className="flex w-72 shrink-0 flex-col gap-4">
          <PatientSidebar patient={patient} />
          <AIChatPanel patientId={patient.id} />
        </div>
      </div>
    </div>
  )
}
