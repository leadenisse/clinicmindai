import type { Quote } from "../types/invoicing.types"
import { useQuotes } from "../hooks/useQuotes"
import { QuoteStatusBadge } from "./QuoteStatusBadge"
import { formatCurrency } from "../utils/invoiceCalculations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search } from "lucide-react"
import type { QuoteFilters } from "../types/invoicing.types"

interface QuoteListProps {
  filters?: QuoteFilters
  onFiltersChange?: (filters: QuoteFilters) => void
  onView: (quote: Quote) => void
}

export function QuoteList({
  filters,
  onFiltersChange,
  onView,
}: QuoteListProps) {
  const { data: quotes = [], isLoading } = useQuotes(filters)
  const search = filters?.search ?? ""

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher (n°, patient)"
            value={search}
            onChange={(e) =>
              onFiltersChange?.({ ...filters, search: e.target.value || undefined })
            }
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Chargement...
          </div>
        ) : quotes.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucun devis.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N°</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Validité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-mono text-sm">
                    {q.quoteNumber}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {q.createdAt.slice(0, 10)}
                  </TableCell>
                  <TableCell>
                    {q.patient?.lastName} {q.patient?.firstName}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(q.total)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {q.validUntil}
                  </TableCell>
                  <TableCell>
                    <QuoteStatusBadge status={q.status} size="sm" />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => onView(q)}>
                      Voir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
