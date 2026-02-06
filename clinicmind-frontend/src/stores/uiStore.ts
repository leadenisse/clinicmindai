import { create } from "zustand"

export type ThemeMode = "light" | "dark" | "system"

interface UIStore {
  sidebarCollapsed: boolean
  theme: ThemeMode
  primaryColor: string | null
  toggleSidebar: () => void
  setTheme: (theme: ThemeMode) => void
  setPrimaryColor: (color: string | null) => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  theme: "light",
  primaryColor: null,

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  setTheme: (theme) => set({ theme }),
  setPrimaryColor: (primaryColor) => set({ primaryColor }),
}))
