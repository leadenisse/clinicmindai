import { Label } from "@/components/ui/label"
import { ColorPicker } from "../ColorPicker"
import { ThemeToggle } from "../ThemeToggle"
import type { AppearanceData, InterfaceColor, ThemeMode } from "../../types/onboarding.types"
import { useUIStore } from "@/stores/uiStore"
import { getHexForColor } from "../../constants/themeColors"
import { useEffect } from "react"

interface AppearanceStepProps {
  data: AppearanceData
  onChange: (data: AppearanceData) => void
}

export function AppearanceStep({ data, onChange }: AppearanceStepProps) {
  const setTheme = useUIStore((s) => s.setTheme)
  const setPrimaryColor = useUIStore((s) => s.setPrimaryColor)

  useEffect(() => {
    setTheme(data.themeMode as "light" | "dark" | "system")
    setPrimaryColor(getHexForColor(data.primaryColor))
  }, [data.themeMode, data.primaryColor, setTheme, setPrimaryColor])

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Label>Choisissez la couleur de votre interface</Label>
        <ColorPicker
          value={data.primaryColor}
          onChange={(c: InterfaceColor) => onChange({ ...data, primaryColor: c })}
        />
      </div>
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground mb-2">Aperçu :</p>
        <div className="flex gap-2 items-center">
          <div
            className="h-8 w-24 rounded"
            style={{ backgroundColor: getHexForColor(data.primaryColor) }}
          />
          <span className="text-sm">Contenu avec boutons à la couleur choisie</span>
        </div>
      </div>
      <div className="space-y-3">
        <Label>Mode d'affichage</Label>
        <ThemeToggle
          value={data.themeMode}
          onChange={(mode: ThemeMode) => onChange({ ...data, themeMode: mode })}
        />
      </div>
    </div>
  )
}
