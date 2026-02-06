import { Link } from "react-router-dom"
import { useNotifications } from "../hooks/useNotifications"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Bell, Calendar, Package, FileText, AlertCircle, FileCheck } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { NotificationType } from "../types/dashboard.types"
import { cn } from "@/lib/utils"

const ICONS: Record<NotificationType, typeof Bell> = {
  new_appointment: Calendar,
  stock_alert: Package,
  document_received: FileText,
  invoice_overdue: AlertCircle,
  quote_signed: FileCheck,
  other: Bell,
}

export function NotificationsWidget() {
  const { data: notifications, isLoading } = useNotifications()

  const list = notifications?.slice(0, 5) ?? []

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-44" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-lg font-semibold">Notifications récentes</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">Voir toutes</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">
            Aucune notification.
          </p>
        ) : (
          <ul className="space-y-2">
            {list.map((n) => {
              const Icon = ICONS[n.type] ?? Bell
              return (
                <li key={n.id}>
                  <Link
                    to={n.link ?? "#"}
                    className={cn(
                      "flex gap-3 rounded-md p-2 text-sm transition-colors hover:bg-muted/50",
                      !n.read && "bg-primary/5"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-tight">{n.title}</p>
                      {n.message && (
                        <p className="text-muted-foreground text-xs truncate">
                          {n.message}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {format(new Date(n.createdAt), "dd MMM HH:mm", {
                          locale: fr,
                        })}
                      </p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
