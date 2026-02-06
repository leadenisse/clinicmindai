import { useWeekActivity } from "../hooks/useWeekActivity"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
const DAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"]

export function WeekActivityChart() {
  const { data: week, isLoading } = useWeekActivity()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-4 w-32 mt-2" />
        </CardContent>
      </Card>
    )
  }

  const maxRdv = Math.max(...(week?.days.map((d) => d.rdvCount) ?? [1]), 1)

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Activité de la semaine</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between gap-1 h-16">
          {week?.days.map((d, i) => (
            <div
              key={d.date}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <div
                className="w-full max-w-8 rounded-t bg-primary/70 transition-all hover:bg-primary"
                style={{
                  height: `${(d.rdvCount / maxRdv) * 100}%`,
                  minHeight: d.rdvCount > 0 ? 4 : 0,
                }}
                title={`${d.rdvCount} RDV`}
              />
              <span className="text-xs font-medium text-muted-foreground">
                {DAY_LABELS[i]}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 border-t pt-3 text-sm">
          <span className="text-muted-foreground">
            RDV : <strong className="text-foreground">{week?.totalRdv ?? 0}</strong>
          </span>
          <span className="text-muted-foreground">
            CA :{" "}
            <strong className="text-foreground">
              {(week?.totalCa ?? 0).toLocaleString("fr-FR")} €
            </strong>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
