import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { usePatients } from "../hooks/usePatients"
import type { PatientFilters } from "../types/patient.types"
import { PatientSearch } from "../components/PatientSearch"
import { PatientList } from "../components/PatientList"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { UserPlus } from "lucide-react"

const DEBOUNCE_MS = 300

export function PatientsPage() {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [filters, setFilters] = useState<PatientFilters>({
    page: 1,
    limit: 10,
    sortBy: "name",
    sortOrder: "asc",
  })

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [searchInput])

  const queryFilters: PatientFilters = {
    ...filters,
    search: debouncedSearch || undefined,
  }

  const { data, isLoading, isError } = usePatients(queryFilters)

  const handleFiltersChange = (next: Partial<PatientFilters>) => {
    setFilters((prev) => ({ ...prev, ...next }))
  }

  const handleRowClick = (patient: { id: string }) => {
    navigate(`/patients/${patient.id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Dossiers patients</h1>
        <Button onClick={() => navigate("/patients/new")} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Nouveau patient
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <PatientSearch
          value={searchInput}
          onChange={setSearchInput}
          className="sm:max-w-xs"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Afficher</span>
          <Select
            value={String(filters.limit ?? 10)}
            onValueChange={(v) => handleFiltersChange({ limit: Number(v), page: 1 })}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">par page</span>
        </div>
      </div>

      {isError ? (
        <p className="text-error">Erreur lors du chargement des patients.</p>
      ) : data ? (
        <PatientList
          patients={data.data}
          filters={queryFilters}
          onFiltersChange={handleFiltersChange}
          total={data.total}
          totalPages={data.totalPages}
          isLoading={isLoading}
          onRowClick={handleRowClick}
        />
      ) : (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      )}
    </div>
  )
}
