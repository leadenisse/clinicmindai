import { useNavigate } from "react-router-dom"
import { useStockItems } from "../hooks/useStock"
import { StockLevelBadge } from "./StockLevelBadge"
import { STOCK_CATEGORIES } from "../constants/stockConfig"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Pencil, ArrowDownToLine, ArrowUpFromLine, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StockItem, StockFilters, StockCategory, StockLevel } from "../types/stock.types"

const STOCK_LEVEL_OPTIONS: { value: StockLevel; label: string }[] = [
  { value: "ok", label: "OK" },
  { value: "low", label: "Stock bas" },
  { value: "critical", label: "Critique" },
  { value: "out", label: "Rupture" },
]

const categories = Object.entries(STOCK_CATEGORIES) as [string, { label: string }][]

interface StockListProps {
  filters: StockFilters
  onFiltersChange: (f: StockFilters) => void
  onNewItem: () => void
  onEdit: (item: StockItem) => void
  onMovementIn: (item: StockItem) => void
  onMovementOut: (item: StockItem) => void
  onDelete: (item: StockItem) => void
}

export function StockList({
  filters,
  onFiltersChange,
  onEdit,
  onMovementIn,
  onMovementOut,
  onDelete,
}: StockListProps) {
  const navigate = useNavigate()
  const { data: items, isLoading } = useStockItems(filters)

  const updateFilter = <K extends keyof StockFilters>(key: K, value: StockFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Seuil min</TableHead>
              <TableHead>Niveau</TableHead>
              <TableHead>Fournisseur</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell colSpan={7} className="h-14 animate-pulse bg-muted/50" />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (!items?.length) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
        Aucun produit ne correspond aux filtres.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Rechercher (nom, référence)..."
          value={filters.search ?? ""}
          onChange={(e) => updateFilter("search", e.target.value || undefined)}
          className="max-w-xs"
        />
        <Select
          value={filters.category ?? "all"}
          onValueChange={(v) =>
            updateFilter("category", v === "all" ? undefined : (v as StockCategory))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes catégories</SelectItem>
            {categories.map(([value, config]) => (
              <SelectItem key={value} value={value}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.stockLevel ?? "all"}
          onValueChange={(v) =>
            updateFilter("stockLevel", v === "all" ? undefined : (v as StockLevel))
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous niveaux</SelectItem>
            {STOCK_LEVEL_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Seuil min</TableHead>
              <TableHead>Niveau</TableHead>
              <TableHead>Fournisseur</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const max = item.maxQuantity ?? item.minQuantity * 2
              const progressPercent = Math.min(
                100,
                (item.currentQuantity / max) * 100
              )
              const categoryLabel = STOCK_CATEGORIES[item.category]?.label ?? item.category
              return (
                <TableRow
                  key={item.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/stock/${item.id}`)}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.reference && (
                        <p className="text-xs text-muted-foreground font-mono">
                          {item.reference}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {categoryLabel}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Progress
                        value={progressPercent}
                        className={cn(
                          "h-2 flex-1 max-w-[80px]",
                          item.stockLevel === "out" && "[&>div]:bg-red-500",
                          item.stockLevel === "critical" && "[&>div]:bg-red-400",
                          item.stockLevel === "low" && "[&>div]:bg-orange-500"
                        )}
                      />
                      <span className="text-sm tabular-nums">
                        {item.currentQuantity} {item.unit}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {item.minQuantity} {item.unit}
                  </TableCell>
                  <TableCell>
                    <StockLevelBadge level={item.stockLevel} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[140px] truncate">
                    {item.supplier ?? "—"}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onMovementIn(item)}>
                          <ArrowDownToLine className="mr-2 h-4 w-4" />
                          Entrée stock
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onMovementOut(item)}
                          disabled={item.currentQuantity === 0}
                        >
                          <ArrowUpFromLine className="mr-2 h-4 w-4" />
                          Sortie stock
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(item)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(item)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
