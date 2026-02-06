import { useMemo } from "react"
import { TimelineAppointment } from "./TimelineAppointment"
import { TimelinePause } from "./TimelinePause"
import { TimelineCurrentTime } from "./TimelineCurrentTime"
import type { Appointment } from "@/features/appointments/types/appointment.types"
import type { TimelineAppointmentExtra } from "../types/dashboard.types"
import { cn } from "@/lib/utils"

const ROW_HEIGHT = 64

export interface PauseBlock {
  startHour: number
  endHour: number
  label?: string
}

export interface DayTimelineProps {
  appointments: Appointment[]
  startHour?: number
  endHour?: number
  pauses?: PauseBlock[]
  getExtra?: (appointment: Appointment) => TimelineAppointmentExtra | null
  onAppointmentClick?: (id: string) => void
  className?: string
}

function minutesFromMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes()
}

export function DayTimeline({
  appointments,
  startHour = 8,
  endHour = 19,
  pauses = [{ startHour: 12, endHour: 14, label: "Pause déjeuner" }],
  getExtra,
  onAppointmentClick,
  className,
}: DayTimelineProps) {
  const totalMinutes = (endHour - startHour) * 60
  const totalHeight = (endHour - startHour) * ROW_HEIGHT

  const { appointmentBlocks, pauseBlocks, currentTimeTop } = useMemo(() => {
    const startMinutes = startHour * 60
    const blocks: {
      appointment: Appointment
      top: number
      height: number
      extra: TimelineAppointmentExtra | null
    }[] = []
    for (const apt of appointments) {
      const start = new Date(apt.startTime)
      const aptStartMinutes = minutesFromMidnight(start) - startMinutes
      if (aptStartMinutes < 0 || aptStartMinutes >= totalMinutes) continue
      const top = (aptStartMinutes / totalMinutes) * totalHeight
      const height = Math.min(
        (apt.duration / 60) * ROW_HEIGHT,
        totalHeight - top
      )
      blocks.push({
        appointment: apt,
        top,
        height: Math.max(24, height),
        extra: getExtra?.(apt) ?? null,
      })
    }
    const pauseBlocksRendered = (pauses ?? []).map((p) => {
      const top = ((p.startHour - startHour) * 60 / totalMinutes) * totalHeight
      const height = ((p.endHour - p.startHour) * 60 / totalMinutes) * totalHeight
      return { top, height, label: p.label }
    })
    const now = new Date()
    const nowMinutes = minutesFromMidnight(now) - startMinutes
    const currentTimeTop =
      nowMinutes >= 0 && nowMinutes < totalMinutes
        ? (nowMinutes / totalMinutes) * totalHeight
        : -1
    return {
      appointmentBlocks: blocks,
      pauseBlocks: pauseBlocksRendered,
      currentTimeTop,
    }
  }, [appointments, startHour, endHour, totalMinutes, totalHeight, pauses, getExtra])

  return (
    <div
      className={cn(
        "flex rounded-md border border-border/60 overflow-hidden bg-background",
        className
      )}
    >
      <div
        className="flex flex-col shrink-0 w-12 border-r border-border/60 bg-muted/5 text-xs text-muted-foreground"
        style={{ height: totalHeight }}
      >
        {Array.from({ length: endHour - startHour }, (_, i) => (
          <div
            key={i}
            className="flex items-start justify-center pt-1"
            style={{ height: ROW_HEIGHT }}
          >
            {startHour + i < 10 ? `0${startHour + i}h` : `${startHour + i}h`}
          </div>
        ))}
      </div>
      <div
        className="relative flex-1 min-h-0 bg-muted/10 overflow-hidden"
        style={{ height: totalHeight }}
      >
        {pauseBlocks.map((p, i) => (
          <TimelinePause
            key={i}
            label={p.label}
            style={{
              top: p.top,
              height: p.height,
            }}
          />
        ))}
        {appointmentBlocks.map(({ appointment, top, height, extra }) => (
          <div
            key={appointment.id}
            className="absolute left-2 right-2 z-[1]"
            style={{ top, height }}
          >
            <TimelineAppointment
              appointment={appointment}
              extra={extra}
              onClick={onAppointmentClick}
              className="h-full"
            />
          </div>
        ))}
        {currentTimeTop >= 0 && (
          <TimelineCurrentTime topPx={currentTimeTop} />
        )}
      </div>
    </div>
  )
}
