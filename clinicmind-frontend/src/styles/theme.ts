/**
 * Palette ClinicMind AI — basée sur le logo
 * Utilisable en JS/TS pour graphiques, exports, ou surcharge dynamique.
 */

export const colors = {
  // ═══════════════════════════════════════════════════════════════
  // COULEURS PRINCIPALES (basées sur le logo ClinicMind AI)
  // ═══════════════════════════════════════════════════════════════

  primary: {
    50: "#F0FDFA",
    100: "#CCFBF1",
    200: "#99F6E4",
    300: "#5EEAD4",
    400: "#2DD4BF",
    500: "#14B8A6", // ⭐ COULEUR PRINCIPALE (Teal du logo)
    600: "#0D9488",
    700: "#0F766E",
    800: "#115E59",
    900: "#134E4A",
    950: "#042F2E",
  },

  // Bleu marine du logo (pour textes, titres)
  navy: {
    50: "#F0F4F8",
    100: "#D9E2EC",
    200: "#BCCCDC",
    300: "#9FB3C8",
    400: "#829AB1",
    500: "#627D98",
    600: "#486581",
    700: "#334E68",
    800: "#243B53",
    900: "#1A3B5C", // ⭐ BLEU MARINE DU LOGO
    950: "#102A43",
  },

  // Turquoise clair (accents, highlights)
  accent: {
    light: "#5BBFBA", // Cerveau dans le logo
    main: "#14B8A6", // Teal principal
    dark: "#0D9488",
  },

  // Couleurs sémantiques
  success: {
    50: "#F0FDF4",
    500: "#22C55E",
    600: "#16A34A",
  },
  warning: {
    50: "#FFFBEB",
    500: "#F59E0B",
    600: "#D97706",
  },
  error: {
    50: "#FEF2F2",
    500: "#EF4444",
    600: "#DC2626",
  },
  info: {
    50: "#F0FDFA",
    500: "#14B8A6", // Teal
    600: "#0D9488",
  },

  // Neutres
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
} as const
