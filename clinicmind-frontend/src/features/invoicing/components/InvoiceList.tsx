import type { Invoice } from "../types/invoicing.types"
import { useInvoices } from "../hooks/useInvoices"
import { InvoiceStatusBadge } from "./InvoiceStatusBadge"
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
import type { InvoiceFilters } from "../types/invoicing.types"

interface InvoiceListProps {
  filters?: InvoiceFilters
  onFiltersChange?: (filters: InvoiceFilters) => void
  onView: (invoice: Invoice) => void
}

export function InvoiceList({
  filters,
  onFiltersChange,
  onView,
}: InvoiceListProps) {
  const { data: invoices = [], isLoading } = useInvoices(filters)
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
        ) : invoices.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucune facture.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N°</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Payé</TableHead>
                <TableHead className="text-right">Reste</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-sm">
                    {inv.invoiceNumber}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {inv.issueDate}
                  </TableCell>
                  <TableCell>
                    {inv.patient?.lastName} {inv.patient?.firstName}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(inv.total)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(inv.totalPaid)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(inv.remainingBalance)}
                  </TableCell>
                  <TableCell>
                    <InvoiceStatusBadge status={inv.status} size="sm" />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(inv)}
                    >
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
