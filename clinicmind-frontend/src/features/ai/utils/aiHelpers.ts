import { format } from "date-fns"
import { fr } from "date-fns/locale"

export function formatAIDate(isoDate: string): string {
  return format(new Date(isoDate), "dd/MM/yyyy à HH:mm", { locale: fr })
}

export function formatRecordingDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}
