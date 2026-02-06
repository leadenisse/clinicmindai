import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PrescriptionForm } from "../components/PrescriptionForm"
import { TemplateSelector } from "../components/TemplateSelector"
import { AIGenerateModal } from "../components/AIGenerateModal"
import { useCreatePrescription } from "../hooks/usePrescriptionMutations"
import { useCreateFromTemplate } from "../hooks/useCreateFromTemplate"
import { useCabinet } from "@/features/settings/hooks/useCabinet"
import type {
  Prescription,
  PrescriptionMedication,
  PrescriptionTemplate,
} from "../types/prescription.types"
import { ArrowLeft, FileText, Bot, PenLine } from "lucide-react"

const emptyMedications: PrescriptionMedication[] = []

const defaultForm: Partial<Prescription> & {
  patientId?: string
  patientName?: string
  title?: string
  content?: string
  medications: PrescriptionMedication[]
} = {
  patientId: undefined,
  patientName: undefined,
  title: "",
  content: "",
  medications: emptyMedications,
}

export function NewPrescriptionPage() {
  const navigate = useNavigate()
  const { data: cabinet } = useCabinet()
  const createPrescription = useCreatePrescription()
  const createFromTemplate = useCreateFromTemplate()

  const [form, setForm] = useState(defaultForm)
  const [templateModalOpen, setTemplateModalOpen] = useState(false)
  const [aiModalOpen, setAiModalOpen] = useState(false)

  const headerText = cabinet
    ? `${cabinet.name}\n${cabinet.address} - ${cabinet.zipCode} ${cabinet.city}\nTél : ${cabinet.phone}`
    : undefined

  const handleSaveDraft = () => {
    createPrescription.mutate(
      {
        ...form,
        patientId: form.patientId ?? "",
        patientName: form.patientName ?? "",
        title: form.title ?? "",
        content: form.content ?? "",
        medications: form.medications,
      },
      {
        onSuccess: (data: Prescription) => navigate(`/prescriptions/${data.id}`),
      }
    )
  }

  const handleTemplateSelect = (template: PrescriptionTemplate) => {
    if (!form.patientId || !form.patientName) return
    createFromTemplate.mutate(
      {
        templateId: template.id,
        patientId: form.patientId,
        patientName: form.patientName,
      },
      {
        onSuccess: (data: Prescription) => navigate(`/prescriptions/${data.id}`),
      }
    )
    setTemplateModalOpen(false)
  }

  const handleAIGenerated = (prescription: Prescription) => {
    navigate(`/prescriptions/${prescription.id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/prescriptions")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Nouvelle ordonnance</h1>
      </div>

      <Card>
        <CardHeader>
          <p className="text-sm text-muted-foreground">
            Patient *
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setTemplateModalOpen(true)}
              disabled={!form.patientId}
            >
              <FileText className="mr-2 h-4 w-4" />
              Modèle
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setAiModalOpen(true)}
              disabled={!form.patientId}
            >
              <Bot className="mr-2 h-4 w-4" />
              Générer avec IA
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setForm(defaultForm)}
            >
              <PenLine className="mr-2 h-4 w-4" />
              Ordonnance vide
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <PrescriptionForm
            value={form}
            onChange={setForm}
            headerText={headerText}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate("/prescriptions")}>
          Annuler
        </Button>
        <Button
          onClick={handleSaveDraft}
          disabled={
            !form.patientId ||
            createPrescription.isPending
          }
        >
          Enregistrer brouillon
        </Button>
        <Button disabled>Signer et imprimer</Button>
      </div>

      <TemplateSelector
        open={templateModalOpen}
        onOpenChange={setTemplateModalOpen}
        onSelect={handleTemplateSelect}
      />

      <AIGenerateModal
        open={aiModalOpen}
        onOpenChange={setAiModalOpen}
        patientId={form.patientId ?? ""}
        patientName={form.patientName}
        onGenerated={handleAIGenerated}
      />
    </div>
  )
}
