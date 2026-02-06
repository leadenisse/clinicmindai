import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { OnboardingLevel } from "../types/onboarding.types"
import { ONBOARDING_LEVELS } from "../constants/onboardingSteps"
import { Zap, Star, Trophy, ChevronRight } from "lucide-react"

const ICONS = { quick: Zap, intermediate: Star, complete: Trophy } as const

const BULLETS: Record<OnboardingLevel, string[]> = {
  quick: ["Couleur de l'interface", "Horaires d'ouverture"],
  intermediate: [
    "Tout le niveau Rapide +",
    "Logo et identité visuelle",
    "Types de RDV personnalisés",
    "Modèles de documents",
  ],
  complete: [
    "Tout le niveau Intermédiaire +",
    "Tarifs personnalisés des actes",
    "Mentions légales (ordonnances, factures)",
    "Import de données existantes",
    "Inviter vos collaborateurs",
  ],
}

interface OnboardingChoiceProps {
  userName?: string
  onSelect: (level: OnboardingLevel) => void
  onSkip: () => void
}

export function OnboardingChoice({ userName, onSelect, onSkip }: OnboardingChoiceProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          🎉 Bienvenue sur ClinicMind{userName ? `, ${userName} !` : " !"}
        </h1>
        <p className="text-muted-foreground">
          Personnalisez votre logiciel selon le temps dont vous disposez
        </p>
      </div>

      <div className="space-y-4">
        {(Object.keys(ONBOARDING_LEVELS) as OnboardingLevel[]).map((level) => {
          const config = ONBOARDING_LEVELS[level]
          const Icon = ICONS[level]
          return (
            <Card key={level} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-semibold uppercase tracking-wide">{config.label}</span>
                      <span className="text-sm text-muted-foreground">{config.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{config.description}</p>
                    <ul className="list-disc list-inside text-sm space-y-0.5">
                      {BULLETS[level].map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <Button onClick={() => onSelect(level)}>
                    Commencer <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={onSkip} className="text-muted-foreground">
          Passer pour l'instant → (configurable plus tard)
        </Button>
      </div>
    </div>
  )
}
