import { useState, useEffect } from "react"
import { usePatients } from "@/features/patients/hooks/usePatients"
import type { Patient } from "@/features/patients/types/patient.types"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Search } from "lucide-react"
import { getAge } from "@/features/patients/utils/patient.utils"
import { cn } from "@/lib/utils"

interface PatientSearchSelectProps {
  value?: string
  onChange: (patientId: string, patient: Patient) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function PatientSearchSelect({
  onChange,
  disabled = false,
  placeholder = "Rechercher un patient (min. 2 caractères)",
  className,
}: PatientSearchSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const { data, isLoading } = usePatients({
    search: debouncedSearch.length >= 2 ? debouncedSearch : undefined,
    limit: 15,
    page: 1,
  })

  const patients = data?.data ?? []
  const showList = open && debouncedSearch.length >= 2

  const handleSelect = (patient: Patient) => {
    onChange(patient.id, patient)
    setSearch(`${patient.lastName} ${patient.firstName}`)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn("relative", className)}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="pl-9"
            disabled={disabled}
            autoComplete="off"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {!showList ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Saisissez au moins 2 caractères
          </p>
        ) : isLoading ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Chargement...
          </p>
        ) : patients.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Aucun patient trouvé
          </p>
        ) : (
          <ul className="max-h-60 overflow-y-auto py-1">
            {patients.map((patient) => (
              <li key={patient.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(patient)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted focus:bg-muted focus:outline-none"
                >
                  <span className="font-medium">
                    {patient.lastName} {patient.firstName}
                  </span>
                  <span className="ml-2 text-muted-foreground">
                    {patient.birthDate
                      ? `${getAge(patient.birthDate)} ans`
                      : ""}
                    {patient.phone ? ` · ${patient.phone}` : ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  )
}
