import type { ProstheticOrder } from "../types/prosthetics.types"
import type { OrderFilters } from "../types/prosthetics.types"
import { useProstheticOrders } from "../hooks/useProsthetics"
import { PROSTHETIC_TYPES } from "../constants/prostheticsConfig"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { LaboratorySelect } from "./LaboratorySelect"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ORDER_STATUSES } from "../constants/prostheticsConfig"
import type { OrderStatus } from "../types/prosthetics.types"

interface ProstheticOrderListProps {
  filters?: OrderFilters
  onFiltersChange?: (filters: OrderFilters) => void
  onView: (order: ProstheticOrder) => void
}

export function ProstheticOrderList({
  filters,
  onFiltersChange,
  onView,
}: ProstheticOrderListProps) {
  const { data: orders = [], isLoading } = useProstheticOrders(filters)
  const statusFilter = filters?.status ?? ""

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Select
          value={statusFilter || "all"}
          onValueChange={(v) =>
            onFiltersChange?.({
              ...filters,
              status: v === "all" ? undefined : (v as OrderStatus),
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {(Object.entries(ORDER_STATUSES) as [OrderStatus, { label: string }][]).map(
              ([value, config]) => (
                <SelectItem key={value} value={value}>
                  {config.label}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        <div className="min-w-[200px]">
          <LaboratorySelect
            value={filters?.laboratoryId ?? ""}
            onValueChange={(v) =>
              onFiltersChange?.({ ...filters, laboratoryId: v || undefined })
            }
            placeholder="Laboratoire"
            allowAll
          />
        </div>
      </div>

      <div className="rounded-md border">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Chargement...
          </div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucune commande.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° commande</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dents</TableHead>
                <TableHead>Laboratoire</TableHead>
                <TableHead>Date commande</TableHead>
                <TableHead>Date prévue</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>
                    {order.patient?.lastName} {order.patient?.firstName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {PROSTHETIC_TYPES[order.type].label}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {order.teeth.join(", ")}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.laboratory?.name ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.orderDate}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.expectedDate ?? "—"}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} size="sm" />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => onView(order)}>
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
