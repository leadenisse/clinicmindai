import { useState, useCallback } from "react"
import type { DocumentType } from "../types/document.types"
import type { Document } from "../types/document.types"
import { DocumentTypeSelect } from "./DocumentTypeSelect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload, X, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const ACCEPTED_TYPES = "application/pdf,image/jpeg,image/png,image/jpg"
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB

interface DocumentUploaderProps {
  patientId: string
  onUploadComplete: (doc: Document) => void
  onCancel: () => void
  onUpload: (data: { patientId: string; type: DocumentType; title: string; description?: string; file: File }) => Promise<Document>
  isUploading?: boolean
}

export function DocumentUploader({
  patientId,
  onUploadComplete,
  onCancel,
  onUpload,
  isUploading = false,
}: DocumentUploaderProps) {
  const [type, setType] = useState<DocumentType>("EXTERNAL")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError(null)
    const dropped = e.dataTransfer.files?.[0]
    if (!dropped) return
    if (!dropped.type.match(/^(application\/pdf|image\/(jpeg|png|jpg))$/)) {
      setError("Format accepté : PDF, JPG, PNG")
      return
    }
    if (dropped.size > MAX_SIZE_BYTES) {
      setError("Taille max : 10 Mo")
      return
    }
    setFile(dropped)
    if (!title.trim()) setTitle(dropped.name.replace(/\.[^.]+$/, ""))
  }, [title])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const selected = e.target.files?.[0]
    if (!selected) return
    if (!selected.type.match(/^(application\/pdf|image\/(jpeg|png|jpg))$/)) {
      setError("Format accepté : PDF, JPG, PNG")
      return
    }
    if (selected.size > MAX_SIZE_BYTES) {
      setError("Taille max : 10 Mo")
      return
    }
    setFile(selected)
    if (!title.trim()) setTitle(selected.name.replace(/\.[^.]+$/, ""))
  }, [title])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!file) {
      setError("Veuillez sélectionner un fichier")
      return
    }
    if (!title.trim()) {
      setError("Veuillez saisir un titre")
      return
    }
    try {
      const doc = await onUpload({
        patientId,
        type,
        title: title.trim(),
        description: description.trim() || undefined,
        file,
      })
      onUploadComplete(doc)
    } catch {
      setError("Erreur lors de l'upload")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DocumentTypeSelect value={type} onValueChange={setType} className="w-full" />

      <div className="space-y-2">
        <Label htmlFor="upload-title">Titre *</Label>
        <Input
          id="upload-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nom du document"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="upload-desc">Description (optionnel)</Label>
        <Textarea
          id="upload-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Commentaire ou contexte"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Fichier * (PDF, JPG, PNG — max 10 Mo)</Label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/20 px-4 py-8 transition-colors",
            dragActive && "border-primary/50 bg-primary/5",
            file && "border-success/50 bg-success/5"
          )}
        >
          <input
            type="file"
            accept={ACCEPTED_TYPES}
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
          />
          {file ? (
            <>
              <FileText className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} Ko
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
                className="gap-1"
              >
                <X className="h-4 w-4" />
                Retirer
              </Button>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 text-muted-foreground" />
              <label
                htmlFor="file-input"
                className="cursor-pointer text-sm font-medium text-primary hover:underline"
              >
                Glissez un fichier ou parcourir
              </label>
            </>
          )}
        </div>
        {error && (
          <p className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={70} className="h-2" />
          <p className="text-xs text-muted-foreground">Upload en cours...</p>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={!file || !title.trim() || isUploading}>
          {isUploading ? "Upload..." : "Uploader"}
        </Button>
      </div>
    </form>
  )
}
