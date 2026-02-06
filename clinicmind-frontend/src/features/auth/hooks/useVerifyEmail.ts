import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { signupApi } from "../api/signup.api"

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) => signupApi.verifyEmail(token),
    onSuccess: () => {
      toast.success("Email vérifié. Vous pouvez vous connecter.")
    },
    onError: () => {
      toast.error("Lien invalide ou expiré")
    },
  })
}

export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: (email: string) => signupApi.resendVerificationEmail(email),
    onSuccess: () => {
      toast.success("Email renvoyé")
    },
    onError: () => {
      toast.error("Impossible de renvoyer l'email")
    },
  })
}
