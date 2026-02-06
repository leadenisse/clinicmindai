import { create } from "zustand"
import type { User } from "@/features/auth/types/auth.types"

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}

const MOCK_USER: User = {
  id: "mock-1",
  email: "praticien@clinicmind.fr",
  firstName: "Jean",
  lastName: "Dupont",
  role: "PRACTITIONER",
  mfaEnabled: false,
  lastLogin: new Date(),
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async () => {
    set({
      user: MOCK_USER,
      token: "mock-token",
      isAuthenticated: true,
    })
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    })
  },

  setUser: (user) => set({ user }),
}))
