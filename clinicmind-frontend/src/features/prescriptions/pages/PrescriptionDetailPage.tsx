import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PrescriptionPreview } from "../components/PrescriptionPreview"
import { PrescriptionStatusBadge } from "../components/PrescriptionStatusBadge"
import { PrescriptionActions } from "../components/PrescriptionActions"
import { SignaturePad } from "../components/SignaturePad"
import { usePrescription } from "../hooks/usePrescription"
import { useSignPrescription } from "../hooks/usePrescriptionMutations"
import { useCabinet } from "@/features/settings/hooks/useCabinet"
import { ArrowLeft, Printer, Mail } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Skeleton } from "@/components/ui/skeleton"

export function PrescriptionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: prescription, isLoading } = usePrescription(id)
  const signPrescription = useSignPrescription()
  const { data: cabinet } = useCabinet()

  const [signature, setSignature] = useState("")

  const headerText = cabinet
    ? `${cabinet.name}\n${cabinet.address} - ${cabinet.zipCode} ${cabinet.city}\nTél : ${cabinet.phone}`
    : undefined

  const handleSign = () => {
    if (!id || !signature) return
    signPrescription.mutate(
      { id, signatureData: signature },
      { onSuccess: () => setSignature("") }
    )
  }

  if (isLoading || !prescription) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  const date = prescription.updatedAt
    ? format(new Date(prescription.updatedAt), "dd MMMM yyyy", { locale: fr })
    : ""

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/prescriptions")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{prescription.title}</h1>
            <p className="text-muted-foreground">
              {prescription.patientName} · {date}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PrescriptionStatusBadge status={prescription.status} />
          <PrescriptionActions
            prescription={prescription}
            onView={() => {}}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Aperçu</h3>
          </CardHeader>
          <CardContent>
            <PrescriptionPreview
              prescription={prescription}
              headerText={headerText}
              showSignature={prescription.isSigned}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          {!prescription.isSigned && (
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Signer l'ordonnance</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <SignaturePad
                  value={prescription.signatureData}
                  onChange={setSignature}
                />
                <Button
                  onClick={handleSign}
                  disabled={!signature || signPrescription.isPending}
                >
                  Signer
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <h3 className="font-semibold">Actions</h3>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Envoyer par email
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
