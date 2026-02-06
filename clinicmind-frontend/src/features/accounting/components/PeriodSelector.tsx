import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { AccountingFilters } from "../types/accounting.types"
import { PERIOD_OPTIONS } from "../constants/accounting.constants"

interface PeriodSelectorProps {
  filters: AccountingFilters
  onChange: (f: AccountingFilters) => void
}

export function PeriodSelector({ filters, onChange }: PeriodSelectorProps) {
  const isCustom = filters.period === "custom"

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={filters.period}
        onValueChange={(v: AccountingFilters["period"]) =>
          onChange({ ...filters, period: v })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Période" />
        </SelectTrigger>
        <SelectContent>
          {PERIOD_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isCustom && (
        <>
          <div className="flex items-center gap-2">
            <Label className="text-sm text-muted-foreground">Du</Label>
            <Input
              type="date"
              value={filters.startDate ?? ""}
              onChange={(e) =>
                onChange({ ...filters, startDate: e.target.value || undefined })
              }
              className="w-36"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-sm text-muted-foreground">Au</Label>
            <Input
              type="date"
              value={filters.endDate ?? ""}
              onChange={(e) =>
                onChange({ ...filters, endDate: e.target.value || undefined })
              }
              className="w-36"
            />
          </div>
        </>
      )}
    </div>
  )
}
