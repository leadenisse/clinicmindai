import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { ImportDataStepData, ImportSource } from "../../types/onboarding.types"
import { FileUp, HelpCircle } from "lucide-react"

const SOURCES: { value: ImportSource; label: string }[] = [
  { value: "julie", label: "Julie" },
  { value: "logos", label: "Logos" },
  { value: "visiodent", label: "Visiodent" },
  { value: "other", label: "Autre logiciel" },
  { value: "none", label: "Je démarre sans données existantes" },
]

interface ImportDataStepProps {
  data: ImportDataStepData
  onChange: (data: ImportDataStepData) => void
}

export function ImportDataStep({ data, onChange }: ImportDataStepProps) {
  const source = data.source ?? "none"
  const showUpload = source !== "none"

  return (
    <div className="space-y-8">
      <Label>Importer vos données existantes (optionnel)</Label>
      <p className="text-sm text-muted-foreground">Vous utilisez actuellement :</p>
      <div className="space-y-2">
        {SOURCES.map((s) => (
          <label key={s.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="import-source"
              checked={source === s.value}
              onChange={() => onChange({ ...data, source: s.value })}
            />
            <span>{s.label}</span>
          </label>
        ))}
      </div>
      {showUpload && (
        <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
          <FileUp className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">Déposez votre fichier d'export ici</p>
          <p className="text-xs text-muted-foreground mt-1">
            Formats acceptés : CSV, XML
          </p>
          <input
            type="file"
            accept=".csv,.xml"
            className="mt-4 text-sm"
            onChange={(e) => onChange({ ...data, file: e.target.files?.[0] })}
          />
        </div>
      )}
      <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-4">
        <HelpCircle className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" />
        <div className="text-sm text-muted-foreground">
          Nous pouvons vous accompagner pour l'import.{" "}
          <Button type="button" variant="link" className="p-0 h-auto text-primary">
            Prendre RDV avec le support
          </Button>
        </div>
      </div>
    </div>
  )
}
