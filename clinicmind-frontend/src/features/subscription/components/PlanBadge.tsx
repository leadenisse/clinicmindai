import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function PlanBadge() {
  return (
    <Badge className="gap-1 bg-amber-500/90 hover:bg-amber-500 text-white font-medium">
      <Star className="h-3.5 w-3.5 fill-current" />
      Recommandé
    </Badge>
  )
}
