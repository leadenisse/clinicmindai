import { USER_ROLES } from "../constants/settingsConfig"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/features/auth/types/auth.types"

const variantByColor: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  purple: "default",
  blue: "secondary",
  green: "outline",
}

export function UserRoleBadge({ role }: { role: UserRole }) {
  const config = USER_ROLES[role]
  if (!config) return null
  return (
    <Badge
      variant={variantByColor[config.color] ?? "secondary"}
      className={cn(
        config.color === "purple" && "bg-purple-600 hover:bg-purple-700",
        config.color === "blue" && "bg-blue-600 hover:bg-blue-700 text-white",
        config.color === "green" && "bg-green-600 hover:bg-green-700 text-white"
      )}
    >
      {config.label}
    </Badge>
  )
}
