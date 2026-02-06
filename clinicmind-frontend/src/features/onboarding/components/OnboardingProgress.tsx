import { cn } from "@/lib/utils"

interface OnboardingProgressProps {
  current: number
  total: number
  className?: string
}

export function OnboardingProgress({ current, total, className }: OnboardingProgressProps) {
  if (total <= 0) return null
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
              step < current && "bg-primary text-primary-foreground",
              step === current && "border-2 border-primary bg-primary text-primary-foreground",
              step > current && "border border-border bg-muted text-muted-foreground"
            )}
          >
            {step}
          </div>
          {step < total && (
            <div
              className={cn("h-0.5 w-4 rounded", step < current ? "bg-primary" : "bg-muted")}
            />
          )}
        </div>
      ))}
    </div>
  )
}
