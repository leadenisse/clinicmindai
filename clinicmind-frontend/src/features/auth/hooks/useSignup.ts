import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { signupApi } from "../api/signup.api"
import type { SignupPayload } from "../types/auth.types"

export function useSignup() {
  return useMutation({
    mutationFn: (data: SignupPayload) => signupApi.signup(data),
    onSuccess: () => {
      toast.success("Compte créé. Vérifiez votre email.")
    },
    onError: () => {
      toast.error("Erreur lors de l'inscription")
    },
  })
}
