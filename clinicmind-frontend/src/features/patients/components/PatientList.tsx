import type { Patient } from "../types/patient.types"
import type { PatientFilters } from "../types/patient.types"
import { formatLastActivity, getMedicalRisks } from "../utils/patient.utils"
import { MedicalAlerts } from "./MedicalAlerts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PatientListProps {
  patients: Patient[]
  filters: PatientFilters
  onFiltersChange: (f: Partial<PatientFilters>) => void
  total: number
  totalPages: number
  isLoading?: boolean
  onRowClick: (patient: Patient) => void
}

export function PatientList({
  patients,
  filters,
  onFiltersChange,
  total,
  totalPages,
  isLoading,
  onRowClick,
}: PatientListProps) {
  const page = filters.page ?? 1
  const limit = filters.limit ?? 10
  const sortBy = filters.sortBy ?? "name"
  const sortOrder = filters.sortOrder ?? "asc"

  const toggleSort = (field: PatientFilters["sortBy"]) => {
    if (!field) return
    onFiltersChange({
      sortBy: field,
      sortOrder: sortBy === field && sortOrder === "asc" ? "desc" : "asc",
    })
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 font-medium"
                  onClick={() => toggleSort("name")}
                >
                  Nom
                  {sortBy === "name" && (sortOrder === "asc" ? " ↑" : " ↓")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 font-medium"
                  onClick={() => toggleSort("name")}
                >
                  Prénom
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">INS</TableHead>
              <TableHead className="hidden lg:table-cell">Téléphone</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 font-medium"
                  onClick={() => toggleSort("lastActivity")}
                >
                  Dernière activité
                  {sortBy === "lastActivity" && (sortOrder === "asc" ? " ↑" : " ↓")}
                </Button>
              </TableHead>
              <TableHead className="w-24 text-right">Alertes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6} className="h-14 animate-pulse bg-muted/30" />
                </TableRow>
              ))
            ) : patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Aucun patient trouvé.
                </TableCell>
              </TableRow>
            ) : (
              patients.map((patient) => {
                const risks = getMedicalRisks(patient)
                return (
                  <TableRow
                    key={patient.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onRowClick(patient)}
                  >
                    <TableCell className="font-medium">
                      {patient.lastName}
                    </TableCell>
                    <TableCell>{patient.firstName}</TableCell>
                    <TableCell className="hidden font-mono text-xs md:table-cell">
                      {patient.ins}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {patient.phone}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatLastActivity(patient.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      {risks.length > 0 ? (
                        <MedicalAlerts risks={risks} />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {(page - 1) * limit + 1}-{Math.min(page * limit, total)} sur {total} patients
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFiltersChange({ page: page - 1 })}
              disabled={page <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFiltersChange({ page: page + 1 })}
              disabled={page >= totalPages}
            >
              Suivant
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
