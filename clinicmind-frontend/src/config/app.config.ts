/** Chemins des assets logo (sensibilité à la casse : utiliser LOGO.png si le fichier est en majuscules) */
export const LOGO_PATHS = {
  /** Logo complet (page de connexion) — adapter si le fichier s'appelle logo.png */
  full: "/LOGO.png",
  /** Icône (sidebar, header mobile) — même fichier ou logo-icon.png */
  icon: "/LOGO.png",
  /** Version fond sombre (panneau inscription) */
  dark: "/logo-dark.png",
} as const

export const APP_CONFIG = {
  name: "ClinicMind AI",
  shortName: "ClinicMind",
  tagline: "L'intelligence au service des praticiens",
  version: "1.0.0",
} as const
