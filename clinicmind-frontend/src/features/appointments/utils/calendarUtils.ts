import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameDay,
} from "date-fns"
import { fr } from "date-fns/locale"

export function getWeekRange(date: Date): { start: Date; end: Date } {
  return {
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  }
}

export function getDayRange(date: Date): { start: Date; end: Date } {
  return {
    start: startOfDay(date),
    end: endOfDay(date),
  }
}

export function formatAppointmentTime(startTime: string, endTime: string): string {
  const start = new Date(startTime)
  const end = new Date(endTime)
  return `${format(start, "HH:mm", { locale: fr })} - ${format(end, "HH:mm", { locale: fr })}`
}

export function formatAppointmentDate(dateStr: string): string {
  return format(new Date(dateStr), "EEEE d MMMM yyyy", { locale: fr })
}

export { isSameDay, addDays, format }
