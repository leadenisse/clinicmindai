import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { prescriptionsApi } from "../api/prescriptions.api"
import type { GeneratePrescriptionRequest } from "../types/prescription.types"
import { prescriptionKeys } from "./usePrescriptions"

export function useGeneratePrescriptionAI() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (request: GeneratePrescriptionRequest) =>
      prescriptionsApi.generateWithAI(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
      toast.success("Ordonnance générée par l'IA. Pensez à valider le contenu.")
    },
    onError: () => toast.error("Erreur lors de la génération"),
  })
}
