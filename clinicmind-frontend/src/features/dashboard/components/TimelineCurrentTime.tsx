import { cn } from "@/lib/utils"

interface TimelineCurrentTimeProps {
  topPx: number
  className?: string
}

export function TimelineCurrentTime({ topPx, className }: TimelineCurrentTimeProps) {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 h-0.5 bg-red-500 z-10 pointer-events-none",
        "before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-red-500",
        className
      )}
      style={{ top: topPx }}
      aria-hidden
    />
  )
}
