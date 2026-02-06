import { Link } from "react-router-dom"
import { useDashboardStats } from "../hooks/useDashboardStats"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, TrendingUp, AlertTriangle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const cards = [
  {
    key: "rdv" as const,
    title: "RDV du jour",
    icon: Calendar,
    link: "/appointments",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    key: "pending" as const,
    title: "En attente",
    subtitle: "à valider",
    icon: Clock,
    link: "/invoices",
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
  },
  {
    key: "ca" as const,
    title: "CA du mois",
    icon: TrendingUp,
    link: "/invoices",
    color: "text-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    key: "alerts" as const,
    title: "Alertes",
    icon: AlertTriangle,
    link: "/stock/alerts",
    color: "text-red-600",
    bgColor: "bg-red-500/10",
  },
]

export function StatsCards() {
  const { data: stats, isLoading } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon
        const value =
          c.key === "rdv"
            ? stats?.rdvToday ?? 0
            : c.key === "pending"
              ? stats?.pendingCount ?? 0
              : c.key === "ca"
                ? `${stats?.caMonth?.toLocaleString("fr-FR") ?? 0} €`
                : stats?.alertsCount ?? 0
        const subtitle =
          c.key === "rdv" && stats?.rdvTodayDiff != null
            ? `${stats.rdvTodayDiff >= 0 ? "+" : ""}${stats.rdvTodayDiff} vs hier`
            : c.key === "pending"
              ? "à valider"
              : c.key === "ca" && stats?.caMonthEvolutionPercent != null
                ? `${stats.caMonthEvolutionPercent >= 0 ? "+" : ""}${stats.caMonthEvolutionPercent}% vs M-1`
                : "stock + doc"

        return (
          <Link key={c.key} to={c.link}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {c.title}
                    </p>
                    <p className="text-2xl font-semibold">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {subtitle}
                    </p>
                  </div>
                  <div
                    className={`rounded-full p-2 ${c.bgColor} ${c.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
