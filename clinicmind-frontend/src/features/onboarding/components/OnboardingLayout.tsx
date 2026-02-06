import type { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { OnboardingProgress } from "./OnboardingProgress"

interface OnboardingLayoutProps {
  title: string
  currentStep: number
  totalSteps: number
  children: ReactNode
  footer: ReactNode
}

export function OnboardingLayout({
  title,
  currentStep,
  totalSteps,
  children,
  footer,
}: OnboardingLayoutProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <OnboardingProgress current={currentStep} total={totalSteps} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
        <div className="flex justify-end pt-4 border-t">{footer}</div>
      </CardContent>
    </Card>
  )
}
