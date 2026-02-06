import { useEffect } from "react"
import { useUIStore } from "@/stores/uiStore"

/** Applique le thème et la couleur primaire du store sur le document */
export function ThemeSync() {
  const theme = useUIStore((s) => s.theme)
  const primaryColor = useUIStore((s) => s.primaryColor)

  useEffect(() => {
    const root = document.documentElement
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    root.classList.toggle("dark", isDark)
  }, [theme])

  useEffect(() => {
    if (primaryColor) {
      document.documentElement.style.setProperty("--primary", primaryColor)
    }
  }, [primaryColor])

  return null
}
