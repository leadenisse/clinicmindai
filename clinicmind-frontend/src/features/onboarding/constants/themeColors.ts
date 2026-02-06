import type { InterfaceColor } from "../types/onboarding.types"

export const INTERFACE_COLORS: Record<
  InterfaceColor,
  { hex: string; label: string; tailwind: string }
> = {
  blue: { hex: "#3B82F6", label: "Bleu", tailwind: "bg-blue-500" },
  green: { hex: "#10B981", label: "Vert", tailwind: "bg-emerald-500" },
  violet: { hex: "#8B5CF6", label: "Violet", tailwind: "bg-violet-500" },
  cyan: { hex: "#06B6D4", label: "Cyan", tailwind: "bg-cyan-500" },
  orange: { hex: "#F59E0B", label: "Orange", tailwind: "bg-amber-500" },
  red: { hex: "#EF4444", label: "Rouge", tailwind: "bg-red-500" },
  gray: { hex: "#6B7280", label: "Gris", tailwind: "bg-gray-500" },
}

export function getHexForColor(color: InterfaceColor): string {
  return INTERFACE_COLORS[color]?.hex ?? INTERFACE_COLORS.blue.hex
}
