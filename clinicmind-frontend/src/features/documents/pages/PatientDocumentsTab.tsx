import { useState } from "react"
import type { Document } from "../types/document.types"
import { DocumentGroupedList } from "../components/DocumentGroupedList"
import { DocumentViewer } from "../components/DocumentViewer"
import { DocumentUploader } from "../components/DocumentUploader"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUploadDocument, useValidateDocument, useSignDocument, useDeleteDocument } from "../hooks/useDocuments"
import { Plus } from "lucide-react"

interface PatientDocumentsTabProps {
  patientId: string
}

export function PatientDocumentsTab({ patientId }: PatientDocumentsTabProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [showViewer, setShowViewer] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const uploadMutation = useUploadDocument()
  const validateMutation = useValidateDocument()
  const signMutation = useSignDocument()
  const deleteMutation = useDeleteDocument()

  const handleDocumentClick = (doc: Document) => {
    setSelectedDocument(doc)
    setShowViewer(true)
  }

  const handleCloseViewer = () => {
    setShowViewer(false)
    setSelectedDocument(null)
  }

  const handleUploadComplete = () => {
    setShowUploadModal(false)
  }

  const handleValidate = (doc: Document) => {
    validateMutation.mutate(doc.id, {
      onSuccess: () => setSelectedDocument((prev) => (prev?.id === doc.id ? { ...prev, aiValidated: true, aiValidatedAt: new Date().toISOString(), aiValidatedBy: "Dr. Martin" } : prev)),
    })
  }

  const handleSign = (doc: Document) => {
    signMutation.mutate(doc.id, {
      onSuccess: () => {
        setSelectedDocument((prev) =>
          prev?.id === doc.id
            ? { ...prev, isSigned: true, signedAt: new Date().toISOString(), signedBy: "Dr. Martin" }
            : prev
        )
      },
    })
  }

  const handleDelete = (doc: Document) => {
    deleteMutation.mutate(doc.id, {
      onSuccess: () => {
        if (selectedDocument?.id === doc.id) handleCloseViewer()
      },
    })
  }

  const handleUpload = (data: {
    patientId: string
    type: Document["type"]
    title: string
    description?: string
    file: File
  }) => {
    return uploadMutation.mutateAsync(data)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Documents</h2>
        <Button onClick={() => setShowUploadModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un document
        </Button>
      </div>

      <DocumentGroupedList
        patientId={patientId}
        onDocumentClick={handleDocumentClick}
      />

      <DocumentViewer
        document={selectedDocument}
        isOpen={showViewer}
        onClose={handleCloseViewer}
        onValidate={handleValidate}
        onSign={handleSign}
        onDelete={handleDelete}
        isValidating={validateMutation.isPending}
        isSigning={signMutation.isPending}
      />

      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un document</DialogTitle>
          </DialogHeader>
          <DocumentUploader
            patientId={patientId}
            onUploadComplete={handleUploadComplete}
            onCancel={() => setShowUploadModal(false)}
            onUpload={handleUpload}
            isUploading={uploadMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
