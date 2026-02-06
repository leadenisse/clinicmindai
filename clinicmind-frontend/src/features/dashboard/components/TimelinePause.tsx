import { cn } from "@/lib/utils"

interface TimelinePauseProps {
  label?: string
  className?: string
  style?: React.CSSProperties
}

export function TimelinePause({
  label = "Pause",
  className,
  style,
}: TimelinePauseProps) {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 flex items-center justify-center rounded border border-dashed border-muted-foreground/30 bg-muted/40 text-sm text-muted-foreground",
        className
      )}
      style={style}
    >
      {label}
    </div>
  )
}
