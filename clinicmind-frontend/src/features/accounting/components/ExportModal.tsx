import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useExport } from "../hooks/useExport"
import type { AccountingFilters, ExportOptions } from "../types/accounting.types"

interface ExportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: AccountingFilters
}

const FORMATS = [
  { value: "csv" as const, label: "CSV" },
  { value: "excel" as const, label: "Excel" },
  { value: "pdf" as const, label: "PDF" },
]

export function ExportModal({
  open,
  onOpenChange,
  filters,
}: ExportModalProps) {
  const [format, setFormat] = useState<ExportOptions["format"]>("csv")
  const [includeDetails, setIncludeDetails] = useState(true)
  const exportMutation = useExport()

  const handleExport = () => {
    exportMutation.mutate(
      {
        format,
        period: filters.period,
        startDate: filters.startDate,
        endDate: filters.endDate,
        includeDetails,
      },
      { onSuccess: () => onOpenChange(false) }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Exporter les données</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Format</Label>
            <Select
              value={format}
              onValueChange={(v: ExportOptions["format"]) => setFormat(v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeDetails}
              onChange={(e) => setIncludeDetails(e.target.checked)}
            />
            <span className="text-sm">Inclure le détail des lignes</span>
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            onClick={handleExport}
            disabled={exportMutation.isPending}
          >
            {exportMutation.isPending ? "Export..." : "Exporter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
