import { useTodayAppointments } from "../hooks/useTodayAppointments"
import { DashboardHeader } from "../components/DashboardHeader"
import { DayPlanningWidget } from "../components/DayPlanningWidget"
import { StatsCards } from "../components/StatsCards"
import { TasksWidget } from "../components/TasksWidget"
import { NotificationsWidget } from "../components/NotificationsWidget"
import { UpcomingPatientsWidget } from "../components/UpcomingPatientsWidget"
import { WeekActivityChart } from "../components/WeekActivityChart"

export function DashboardPage() {
  const { data: todayAppointments } = useTodayAppointments()
  const rdvCount = todayAppointments?.filter((a) => a.status !== "cancelled").length ?? 0
  const pendingConfirmationCount =
    todayAppointments?.filter((a) => a.status === "scheduled").length ?? 0

  return (
    <div className="space-y-6 p-6">
      <DashboardHeader
        rdvCount={rdvCount}
        pendingConfirmationCount={pendingConfirmationCount}
      />

      <DayPlanningWidget />

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <TasksWidget />
        <NotificationsWidget />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingPatientsWidget />
        <WeekActivityChart />
      </div>
    </div>
  )
}
