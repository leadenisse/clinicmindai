import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PRESCRIPTION_CATEGORIES } from "../constants/prescription.constants"
import type { PrescriptionTemplate } from "../types/prescription.types"
import { FileText } from "lucide-react"

interface TemplateCardProps {
  template: PrescriptionTemplate
  onSelect: () => void
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const categoryConfig = PRESCRIPTION_CATEGORIES[template.category]
  const medCount = template.medications.length

  return (
    <Card className="cursor-pointer transition-colors hover:bg-muted/50">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <h3 className="font-semibold truncate">{template.name}</h3>
              <p className="text-xs text-muted-foreground truncate">
                {categoryConfig?.label ?? template.category}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {template.description}
        </p>
        <p className="text-xs text-muted-foreground">
          {medCount} médicament{medCount > 1 ? "s" : ""}
        </p>
        <Button size="sm" className="w-full" onClick={onSelect}>
          Choisir
        </Button>
      </CardContent>
    </Card>
  )
}
