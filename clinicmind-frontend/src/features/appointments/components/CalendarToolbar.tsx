import { Button } from "@/components/ui/button"
import { CalendarPlus } from "lucide-react"

interface CalendarToolbarProps {
  onNewAppointment: () => void
}

export function CalendarToolbar({ onNewAppointment }: CalendarToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold">Agenda</h1>
      <Button onClick={onNewAppointment} className="gap-2">
        <CalendarPlus className="h-4 w-4" />
        Nouveau RDV
      </Button>
    </div>
  )
}
