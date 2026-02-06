import { useNavigate } from "react-router-dom"
import { StockLevelBadge } from "./StockLevelBadge"
import { STOCK_CATEGORIES } from "../constants/stockConfig"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Package, Pencil, ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StockItem } from "../types/stock.types"

interface StockItemCardProps {
  item: StockItem
  onEdit?: (item: StockItem) => void
  onMovementIn?: (item: StockItem) => void
  onMovementOut?: (item: StockItem) => void
}

export function StockItemCard({
  item,
  onEdit,
  onMovementIn,
  onMovementOut,
}: StockItemCardProps) {
  const navigate = useNavigate()
  const categoryConfig = STOCK_CATEGORIES[item.category]
  const max = item.maxQuantity ?? item.minQuantity * 2
  const progressPercent = Math.min(100, (item.currentQuantity / max) * 100)

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => navigate(`/stock/${item.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 shrink-0 text-muted-foreground" />
              <h3 className="font-medium truncate">{item.name}</h3>
            </div>
            {item.reference && (
              <p className="mt-0.5 text-xs text-muted-foreground font-mono">
                {item.reference}
              </p>
            )}
            <p className="mt-1 text-sm text-muted-foreground">
              {categoryConfig?.label ?? item.category}
            </p>
          </div>
          <StockLevelBadge level={item.stockLevel} />
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm">
            <span>
              {item.currentQuantity} {item.unit}
            </span>
            <span className="text-muted-foreground">
              min. {item.minQuantity} {item.unit}
            </span>
          </div>
          <Progress
            value={progressPercent}
            className={cn(
              "mt-1 h-2",
              item.stockLevel === "out" && "[&>div]:bg-red-500",
              item.stockLevel === "critical" && "[&>div]:bg-red-400",
              item.stockLevel === "low" && "[&>div]:bg-orange-500"
            )}
          />
        </div>
        {item.supplier && (
          <p className="mt-2 text-xs text-muted-foreground truncate">
            {item.supplier}
          </p>
        )}
        <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
          {onMovementIn && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onMovementIn(item)}
            >
              <ArrowDownToLine className="mr-1 h-3.5 w-3.5" />
              Entrée
            </Button>
          )}
          {onMovementOut && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onMovementOut(item)}
            >
              <ArrowUpFromLine className="mr-1 h-3.5 w-3.5" />
              Sortie
            </Button>
          )}
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(item)}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
