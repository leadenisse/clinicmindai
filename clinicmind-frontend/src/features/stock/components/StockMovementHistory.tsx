import { useStockMovements } from "../hooks/useStock"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowDownToLine, ArrowUpFromLine, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { MovementType } from "../types/stock.types"

function MovementIcon({ type }: { type: MovementType }) {
  if (type === "in") return <ArrowDownToLine className="h-4 w-4 text-green-600" />
  if (type === "out") return <ArrowUpFromLine className="h-4 w-4 text-orange-600" />
  return <RefreshCw className="h-4 w-4 text-blue-600" />
}

export function StockMovementHistory({ itemId }: { itemId: string }) {
  const { data: movements, isLoading } = useStockMovements(itemId)

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  if (!movements?.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Aucun mouvement enregistré.
      </p>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10" />
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Quantité</TableHead>
            <TableHead>Raison</TableHead>
            <TableHead>Par</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.map((m) => (
            <TableRow key={m.id}>
              <TableCell>
                <MovementIcon type={m.type} />
              </TableCell>
              <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                {format(new Date(m.performedAt), "dd MMM yyyy HH:mm", { locale: fr })}
              </TableCell>
              <TableCell>
                {m.type === "in" && "Entrée"}
                {m.type === "out" && "Sortie"}
                {m.type === "adjustment" && "Ajustement"}
              </TableCell>
              <TableCell className="text-right font-medium">
                {m.quantity > 0 ? `+${m.quantity}` : m.quantity}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm max-w-[180px] truncate">
                {m.reason ?? "—"}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {m.performedBy}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
