import type {
  DashboardStats,
  DashboardTask,
  DashboardNotification,
  WeekActivity,
} from "../types/dashboard.types"
import { startOfWeek, addDays, format, subDays } from "date-fns"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const dashboardApi = {
  async getStats(params: {
    rdvToday: number
    alertsCount?: number
  }): Promise<DashboardStats> {
    await delay(250)
    return {
      rdvToday: params.rdvToday,
      rdvTodayDiff: 2,
      pendingCount: 3,
      caMonth: 8450,
      caMonthEvolutionPercent: 12,
      alertsCount: params.alertsCount ?? 5,
    }
  },

  _tasks: null as DashboardTask[] | null,

  async getTasks(): Promise<DashboardTask[]> {
    await delay(300)
    const today = format(new Date(), "yyyy-MM-dd")
    if (!dashboardApi._tasks) {
      dashboardApi._tasks = [
        {
          id: "t1",
          title: "Valider CR - Mme Dupont",
          status: "todo",
          source: "cr",
          patientId: "1",
          patientName: "Mme Dupont",
          dueAt: today,
          createdAt: new Date().toISOString(),
        },
        {
          id: "t2",
          title: "Signer devis - M. Bernard",
          status: "todo",
          source: "quote",
          patientName: "M. Bernard",
          createdAt: new Date().toISOString(),
        },
        {
          id: "t3",
          title: "Rappeler patient (retard CB)",
          status: "todo",
          source: "callback",
          createdAt: new Date().toISOString(),
        },
        {
          id: "t4",
          title: "Commande labo envoyée",
          status: "done",
          source: "labo",
          createdAt: new Date().toISOString(),
        },
      ]
    }
    return [...dashboardApi._tasks]
  },

  async toggleTask(taskId: string, done: boolean): Promise<DashboardTask> {
    await delay(200)
    if (!dashboardApi._tasks) await dashboardApi.getTasks()
    const t = dashboardApi._tasks!.find((x) => x.id === taskId)
    if (t) t.status = done ? "done" : "todo"
    return t ?? { id: taskId, title: "", status: done ? "done" : "todo", createdAt: "" }
  },

  async addTask(title: string): Promise<DashboardTask> {
    await delay(300)
    if (!dashboardApi._tasks) await dashboardApi.getTasks()
    const newTask: DashboardTask = {
      id: `t-${Date.now()}`,
      title,
      status: "todo",
      source: "manual",
      createdAt: new Date().toISOString(),
    }
    dashboardApi._tasks!.push(newTask)
    return newTask
  },

  async getNotifications(): Promise<DashboardNotification[]> {
    await delay(300)
    return [
      {
        id: "n1",
        type: "new_appointment",
        title: "Nouveau RDV en ligne",
        message: "10:32 - Consultation",
        link: "/appointments",
        read: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "n2",
        type: "stock_alert",
        title: "Stock bas : Composite A2",
        link: "/stock/alerts",
        read: false,
        createdAt: subDays(new Date(), 0).toISOString(),
      },
      {
        id: "n3",
        type: "document_received",
        title: "Document reçu : Radio pano",
        message: "Patient M. Martin",
        link: "/patients",
        read: true,
        createdAt: subDays(new Date(), 1).toISOString(),
      },
      {
        id: "n4",
        type: "invoice_overdue",
        title: "Facture impayée > 30j",
        message: "Facture FACT-2024-0012",
        link: "/invoices",
        read: false,
        createdAt: subDays(new Date(), 2).toISOString(),
      },
    ]
  },

  async getWeekActivity(): Promise<WeekActivity> {
    await delay(350)
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
    const days: WeekActivity["days"] = []
    let totalRdv = 0
    let totalCa = 0
    for (let i = 0; i < 7; i++) {
      const d = addDays(weekStart, i)
      const rdvCount = i <= 4 ? 8 + (i % 3) * 2 : 0
      const ca = i <= 4 ? 1200 + i * 450 : 0
      days.push({
        date: format(d, "yyyy-MM-dd"),
        rdvCount,
        ca,
      })
      totalRdv += rdvCount
      totalCa += ca
    }
    return { days, totalRdv, totalCa }
  },
}
