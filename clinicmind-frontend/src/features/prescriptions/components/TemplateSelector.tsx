import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTemplates } from "../hooks/useTemplates"
import { TemplateCard } from "./TemplateCard"
import type { PrescriptionTemplate } from "../types/prescription.types"
import { Skeleton } from "@/components/ui/skeleton"

interface TemplateSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (template: PrescriptionTemplate) => void
}

export function TemplateSelector({
  open,
  onOpenChange,
  onSelect,
}: TemplateSelectorProps) {
  const { data: templates = [], isLoading } = useTemplates()

  const handleSelect = (template: PrescriptionTemplate) => {
    onSelect(template)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choisir un modèle</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {templates.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                onSelect={() => handleSelect(t)}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
