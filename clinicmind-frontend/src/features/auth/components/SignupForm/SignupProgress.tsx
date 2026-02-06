import { cn } from "@/lib/utils"

const STEPS = 4

interface SignupProgressProps {
  currentStep: number
  className?: string
}

export function SignupProgress({ currentStep, className }: SignupProgressProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: STEPS }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
              step < currentStep && "bg-primary text-primary-foreground",
              step === currentStep && "border-2 border-primary bg-primary text-primary-foreground",
              step > currentStep && "border border-border bg-muted text-muted-foreground"
            )}
          >
            {step}
          </div>
          {step < STEPS && (
            <div
              className={cn(
                "h-0.5 w-4 rounded",
                step < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
