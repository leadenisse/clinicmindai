import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CategoryBadgeProps {
  label: string
  color?: string
  className?: string
}

export function CategoryBadge({ label, color, className }: CategoryBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn("text-xs font-normal", className)}
      style={color ? { backgroundColor: `${color}20`, color } : undefined}
    >
      {label}
    </Badge>
  )
}
