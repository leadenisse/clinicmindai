import type {
  Appointment,
  AppointmentFilters,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
  AppointmentStatus,
} from "../types/appointment.types"
import { addDays, startOfWeek, setHours, setMinutes } from "date-fns"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function generateMockAppointments(): Appointment[] {
  const today = new Date()
  const weekStart = startOfWeek(today, { weekStartsOn: 1 })

  return [
    {
      id: "apt-1",
      patientId: "1",
      patientFirstName: "Sophia",
      patientLastName: "Mitchel",
      patientPhone: "06 70 80 90 00",
      practitionerId: "prat-1",
      practitionerName: "Dr. Martin",
      startTime: setMinutes(setHours(addDays(weekStart, 0), 9), 0).toISOString(),
      endTime: setMinutes(setHours(addDays(weekStart, 0), 9), 30).toISOString(),
      duration: 30,
      type: "followup",
      status: "completed",
      reason: "Contrôle post-extraction",
      notes: "Cicatrisation normale",
      createdBy: "user-1",
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-15T09:35:00Z",
    },
    {
      id: "apt-2",
      patientId: "2",
      patientFirstName: "Lucas",
      patientLastName: "Bernard",
      patientPhone: "06 12 34 56 78",
      practitionerId: "prat-1",
      practitionerName: "Dr. Martin",
      startTime: setMinutes(setHours(addDays(weekStart, 0), 10), 0).toISOString(),
      endTime: setMinutes(setHours(addDays(weekStart, 0), 10), 45).toISOString(),
      duration: 45,
      type: "prosthetics",
      status: "completed",
      reason: "Pose couronne 36",
      createdBy: "user-1",
      createdAt: "2024-01-08T14:00:00Z",
      updatedAt: "2024-01-15T10:50:00Z",
    },
    {
      id: "apt-3",
      patientId: "3",
      patientFirstName: "Marie",
      patientLastName: "Dubois",
      patientPhone: "06 98 76 54 32",
      practitionerId: "prat-1",
      practitionerName: "Dr. Martin",
      startTime: setMinutes(setHours(addDays(weekStart, 0), 14), 0).toISOString(),
      endTime: setMinutes(setHours(addDays(weekStart, 0), 14), 30).toISOString(),
      duration: 30,
      type: "cleaning",
      status: "cancelled",
      reason: "Détartrage semestriel",
      notes: "Annulé par le patient",
      createdBy: "user-1",
      createdAt: "2024-01-05T09:00:00Z",
      updatedAt: "2024-01-14T16:00:00Z",
    },
    {
      id: "apt-4",
      patientId: "4",
      patientFirstName: "Thomas",
      patientLastName: "Petit",
      patientPhone: "06 45 67 89 01",
      practitionerId: "prat-1",
      practitionerName: "Dr. Martin",
      startTime: setMinutes(setHours(addDays(weekStart, 1), 9), 30).toISOString(),
      endTime: setMinutes(setHours(addDays(weekStart, 1), 10), 30).toISOString(),
      duration: 60,
      type: "surgery",
      status: "confirmed",
      reason: "Extraction dent de sagesse 48",
      notes: "Voir bilan INR",
      createdBy: "user-1",
      createdAt: "2024-01-12T11:00:00Z",
      updatedAt: "2024-01-12T11:00:00Z",
    },
    {
      id: "apt-5",
      patientId: "5",
      patientFirstName: "Isabelle",
      patientLastName: "Moreau",
      patientPhone: "06 87 65 43 21",
      practitionerId: "prat-1",
      practitionerName: "Dr. Martin",
      startTime: setMinutes(setHours(addDays(weekStart, 1), 11), 0).toISOString(),
      endTime: setMinutes(setHours(addDays(weekStart, 1), 11), 30).toISOString(),
      duration: 30,
      type: "consultation",
      status: "confirmed",
      reason: "Douleur molaire inférieure gauche",
      createdBy: "user-1",
      createdAt: "2024-01-14T08:00:00Z",
      updatedAt: "2024-01-14T08:00:00Z",
    },
    {
      id: "apt-6",
      patientId: "6",
      patientFirstName: "Antoine",
      patientLastName: "Leroy",
      patientPhone: "07 11 22 33 44",
      practitionerId: "prat-1",
      practitionerName: "Dr. Martin",
      startTime: setMinutes(setHours(addDays(weekStart, 2), 8), 30).toISOString(),
      endTime: setMinutes(setHours(addDays(weekStart, 2), 9), 0).toISOString(),
      duration: 30,
      type: "orthodontics",
      status: "scheduled",
      reason: "Ajustement bagues",
      createdBy: "user-1",
      createdAt: "2024-01-10T15:00:00Z",
      updatedAt: "2024-01-10T15:00:00Z",
    },
    {
      id: "apt-7",
      patientId: "1",
      patientFirstName: "Sophia",
      patientLastName: "Mitchel",
      patientPhone: "06 70 80 90 00",
      practitionerId: "prat-1",
      practitionerName: "Dr. Martin",
      startTime: setMinutes(setHours(addDays(weekStart, 2), 15), 0).toISOString(),
      endTime: setMinutes(setHours(addDays(weekStart, 2), 15), 30).toISOString(),
      duration: 30,
      type: "consultation",
      status: "scheduled",
      reason: "Bilan annuel",
      createdBy: "user-1",
      createdAt: "2024-01-08T10:00:00Z",
      updatedAt: "2024-01-08T10:00:00Z",
    },
    {
      id: "apt-8",
      patientId: "2",
      patientFirstName: "Lucas",
      patientLastName: "Bernard",
      patientPhone: "06 12 34 56 78",
      practitionerId: "prat-1",
      practitionerName: "Dr. Martin",
      startTime: setMinutes(setHours(addDays(weekStart, 3), 10), 0).toISOString(),
      endTime: setMinutes(setHours(addDays(weekStart, 3), 10), 30).toISOString(),
      duration: 30,
      type: "cleaning",
      status: "scheduled",
      reason: "Détartrage",
      createdBy: "user-1",
      createdAt: "2024-01-11T09:00:00Z",
      updatedAt: "2024-01-11T09:00:00Z",
    },
    {
      id: "apt-9",
      patientId: "3",
      patientFirstName: "Marie",
      patientLastName: "Dubois",
      patientPhone: "06 98 76 54 32",
      practitionerId: "prat-1",
      practitionerName: "Dr. Martin",
      startTime: setMinutes(setHours(addDays(weekStart, 3), 14), 30).toISOString(),
      endTime: setMinutes(setHours(addDays(weekStart, 3), 15), 15).toISOString(),
      duration: 45,
      type: "prosthetics",
      status: "scheduled",
      reason: "Empreinte pour bridge",
      createdBy: "user-1",
      createdAt: "2024-01-09T16:00:00Z",
      updatedAt: "2024-01-09T16:00:00Z",
    },
    {
      id: "apt-10",
      patientId: "4",
      patientFirstName: "Thomas",
      patientLastName: "Petit",
      patientPhone: "06 45 67 89 01",
      practitionerId: "prat-1",
      practitionerName: "Dr. Martin",
      startTime: setMinutes(setHours(addDays(weekStart, 4), 9), 0).toISOString(),
      endTime: setMinutes(setHours(addDays(weekStart, 4), 9), 15).toISOString(),
      duration: 15,
      type: "followup",
      status: "scheduled",
      reason: "Contrôle composite",
      createdBy: "user-1",
      createdAt: "2024-01-13T14:00:00Z",
      updatedAt: "2024-01-13T14:00:00Z",
    },
    {
      id: "apt-11",
      patientId: "5",
      patientFirstName: "Isabelle",
      patientLastName: "Moreau",
      patientPhone: "06 87 65 43 21",
      practitionerId: "prat-1",
      practitionerName: "Dr. Martin",
      startTime: setMinutes(setHours(today, 16), 0).toISOString(),
      endTime: setMinutes(setHours(today, 16), 30).toISOString(),
      duration: 30,
      type: "emergency",
      status: "confirmed",
      reason: "Douleur aiguë + gonflement",
      notes: "Patient très anxieux",
      createdBy: "user-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
}

let mockAppointments = generateMockAppointments()

export const appointmentsApi = {
  async getAll(filters?: AppointmentFilters): Promise<Appointment[]> {
    await delay(400)

    let filtered = [...mockAppointments]

    if (filters?.startDate) {
      filtered = filtered.filter(
        (apt) => new Date(apt.startTime) >= new Date(filters.startDate!)
      )
    }
    if (filters?.endDate) {
      filtered = filtered.filter(
        (apt) => new Date(apt.startTime) <= new Date(filters.endDate!)
      )
    }
    if (filters?.practitionerId) {
      filtered = filtered.filter((apt) => apt.practitionerId === filters.practitionerId)
    }
    if (filters?.patientId) {
      filtered = filtered.filter((apt) => apt.patientId === filters.patientId)
    }
    if (filters?.status) {
      filtered = filtered.filter((apt) => apt.status === filters.status)
    }
    if (filters?.type) {
      filtered = filtered.filter((apt) => apt.type === filters.type)
    }

    filtered.sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )
    return filtered
  },

  async getByPatient(patientId: string): Promise<Appointment[]> {
    await delay(300)
    return mockAppointments
      .filter((apt) => apt.patientId === patientId)
      .sort(
        (a, b) =>
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      )
  },

  async getToday(): Promise<Appointment[]> {
    await delay(300)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = addDays(today, 1)
    return mockAppointments
      .filter((apt) => {
        const aptDate = new Date(apt.startTime)
        return aptDate >= today && aptDate < tomorrow
      })
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
  },

  async getUpcoming(limit = 5): Promise<Appointment[]> {
    await delay(300)
    const now = new Date()
    return mockAppointments
      .filter(
        (apt) =>
          new Date(apt.startTime) > now &&
          apt.status !== "cancelled" &&
          apt.status !== "completed"
      )
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
      .slice(0, limit)
  },

  async getById(id: string): Promise<Appointment> {
    await delay(300)
    const apt = mockAppointments.find((a) => a.id === id)
    if (!apt) throw new Error("Rendez-vous non trouvé")
    return apt
  },

  async create(data: CreateAppointmentRequest): Promise<Appointment> {
    await delay(500)
    const patientInfo = {
      patientFirstName: "Nouveau",
      patientLastName: "Patient",
      patientPhone: "06 00 00 00 00",
    }
    const startTime = new Date(data.startTime)
    const endTime = new Date(startTime.getTime() + data.duration * 60000)
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: data.patientId,
      ...patientInfo,
      practitionerId: data.practitionerId,
      practitionerName: "Dr. Martin",
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration: data.duration,
      type: data.type,
      status: "scheduled",
      reason: data.reason,
      notes: data.notes,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockAppointments.push(newAppointment)
    return newAppointment
  },

  async update(id: string, data: UpdateAppointmentRequest): Promise<Appointment> {
    await delay(400)
    const index = mockAppointments.findIndex((a) => a.id === id)
    if (index === -1) throw new Error("Rendez-vous non trouvé")

    let endTime = mockAppointments[index].endTime
    if (data.startTime != null || data.duration != null) {
      const start = new Date(
        data.startTime ?? mockAppointments[index].startTime
      )
      const duration =
        data.duration ?? mockAppointments[index].duration
      endTime = new Date(start.getTime() + duration * 60000).toISOString()
    }

    mockAppointments[index] = {
      ...mockAppointments[index],
      ...data,
      endTime,
      updatedAt: new Date().toISOString(),
    }
    return mockAppointments[index]
  },

  async updateStatus(id: string, status: AppointmentStatus): Promise<Appointment> {
    return this.update(id, { status })
  },

  async move(
    id: string,
    startTime: string,
    endTime: string
  ): Promise<Appointment> {
    await delay(300)
    const index = mockAppointments.findIndex((a) => a.id === id)
    if (index === -1) throw new Error("Rendez-vous non trouvé")
    const start = new Date(startTime)
    const end = new Date(endTime)
    const duration = Math.round((end.getTime() - start.getTime()) / 60000)
    mockAppointments[index] = {
      ...mockAppointments[index],
      startTime,
      endTime,
      duration,
      updatedAt: new Date().toISOString(),
    }
    return mockAppointments[index]
  },

  async delete(id: string): Promise<void> {
    await delay(300)
    const index = mockAppointments.findIndex((a) => a.id === id)
    if (index === -1) throw new Error("Rendez-vous non trouvé")
    mockAppointments.splice(index, 1)
  },

  async cancel(id: string, reason?: string): Promise<Appointment> {
    await delay(300)
    return this.update(id, {
      status: "cancelled",
      notes: reason ? `Annulé : ${reason}` : undefined,
    })
  },
}
