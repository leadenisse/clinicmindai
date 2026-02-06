import { useState, useEffect } from "react"
import { useDentalActsSearch } from "../hooks/useDentalActs"
import type { DentalAct } from "../types/invoicing.types"
import { formatCurrency } from "../utils/invoiceCalculations"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActSearchSelectProps {
  onSelect: (act: DentalAct) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function ActSearchSelect({
  onSelect,
  disabled = false,
  placeholder = "Rechercher un acte (code ou description)",
  className,
}: ActSearchSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 250)
    return () => clearTimeout(t)
  }, [search])

  const { data: acts = [], isLoading } = useDentalActsSearch(debouncedSearch)
  const showList = open && debouncedSearch.length >= 2

  const handleSelect = (act: DentalAct) => {
    onSelect(act)
    setSearch("")
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
      >
        {showList && (
          <ul className="max-h-64 overflow-auto py-1">
            {isLoading ? (
              <li className="px-3 py-2 text-sm text-muted-foreground">
                Recherche...
              </li>
            ) : acts.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted-foreground">
                Aucun acte trouvé
              </li>
            ) : (
              acts.map((act) => (
                <li key={act.id}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-muted/50"
                    onClick={() => handleSelect(act)}
                  >
                    <span className="font-mono text-muted-foreground">
                      {act.code}
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      {act.description}
                    </span>
                    <span className="shrink-0 text-muted-foreground">
                      {formatCurrency(act.basePrice)}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  )
}
