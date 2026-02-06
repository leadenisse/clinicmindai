import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PrescriptionCard } from "./PrescriptionCard"
import { usePrescriptions } from "../hooks/usePrescriptions"
import type { Prescription, PrescriptionFilters } from "../types/prescription.types"
import { Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface PrescriptionsListProps {
  filters?: PrescriptionFilters
  onFiltersChange?: (f: PrescriptionFilters) => void
  onView: (p: Prescription) => void
}

export function PrescriptionsList({
  filters,
  onFiltersChange,
  onView,
}: PrescriptionsListProps) {
  const { data: prescriptions = [], isLoading } = usePrescriptions(filters)
  const search = filters?.search ?? ""
  const status = filters?.status
  const isAiOnly = filters?.isAiGenerated

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={search}
            onChange={(e) =>
              onFiltersChange?.({ ...filters, search: e.target.value || undefined })
            }
            className="pl-9"
          />
        </div>
        <Select
          value={status ?? "all"}
          onValueChange={(v) =>
            onFiltersChange?.({
              ...filters,
              status: v === "all" ? undefined : (v as Prescription["status"]),
            })
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="signed">Signée</SelectItem>
            <SelectItem value="sent">Envoyée</SelectItem>
          </SelectContent>
        </Select>
        <label className="flex items-center gap-2 text-sm whitespace-nowrap">
          <input
            type="checkbox"
            checked={!!isAiOnly}
            onChange={(e) =>
              onFiltersChange?.({
                ...filters,
                isAiGenerated: e.target.checked ? true : undefined,
              })
            }
          />
          IA uniquement
        </label>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : prescriptions.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          Aucune ordonnance.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prescriptions.map((p) => (
            <PrescriptionCard key={p.id} prescription={p} onView={onView} />
          ))}
        </div>
      )}
    </div>
  )
}
