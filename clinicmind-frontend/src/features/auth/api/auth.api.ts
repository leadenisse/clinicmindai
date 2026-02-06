import api from "@/lib/api"
import type { LoginCredentials, LoginResponse } from "@/features/auth/types/auth.types"

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<LoginResponse>("/auth/login", credentials),

  logout: () => api.post("/auth/logout"),

  refresh: () => api.post<{ token: string }>("/auth/refresh"),

  verifyMfa: (code: string) =>
    api.post<LoginResponse>("/auth/mfa/verify", { code }),
}
