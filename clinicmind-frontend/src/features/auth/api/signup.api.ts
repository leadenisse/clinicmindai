import type {
  SignupPayload,
  SignupResponse,
  InviteUserPayload,
  Invitation,
  AcceptInvitePayload,
} from "../types/auth.types"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockPendingVerification: string[] = []

export const signupApi = {
  async signup(data: SignupPayload): Promise<SignupResponse> {
    await delay(800)
    mockPendingVerification.push(data.email)
    return {
      success: true,
      requiresEmailVerification: true,
      email: data.email,
    }
  },

  async verifyEmail(_token: string): Promise<{ success: boolean }> {
    await delay(500)
    return { success: true }
  },

  async resendVerificationEmail(_email: string): Promise<{ success: boolean }> {
    await delay(400)
    return { success: true }
  },

  async sendInvitation(_data: InviteUserPayload): Promise<{ id: string }> {
    await delay(600)
    return { id: `inv-${Date.now()}` }
  },

  async getInvitation(token: string): Promise<Invitation | null> {
    await delay(400)
    if (!token) return null
    return {
      id: "inv-1",
      email: "collaborateur@email.fr",
      role: "SECRETARY",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      cabinetName: "Cabinet Dentaire du Soleil",
    }
  },

  async acceptInvite(_data: AcceptInvitePayload): Promise<{ success: boolean }> {
    await delay(600)
    return { success: true }
  },
}
