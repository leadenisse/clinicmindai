import { cn } from "@/lib/utils"

interface TimelineSlotProps {
  hour: number
  children?: React.ReactNode
  className?: string
}

export function TimelineSlot({ hour, children, className }: TimelineSlotProps) {
  const label = hour < 10 ? `0${hour}h` : `${hour}h`
  return (
    <div
      className={cn(
        "flex gap-4 border-b border-border/60 last:border-b-0 min-h-[64px]",
        className
      )}
    >
      <div className="w-12 shrink-0 pt-1 text-sm font-medium text-muted-foreground">
        {label}
      </div>
      <div className="flex-1 min-w-0 relative py-0.5">{children}</div>
    </div>
  )
}
