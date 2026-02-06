import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { prescriptionsApi } from "../api/prescriptions.api"
import { prescriptionKeys } from "./usePrescriptions"

export function useCreateFromTemplate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      templateId,
      patientId,
      patientName,
    }: {
      templateId: string
      patientId: string
      patientName: string
    }) =>
      prescriptionsApi.createFromTemplate(
        templateId,
        patientId,
        patientName
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
      toast.success("Ordonnance créée à partir du modèle")
    },
    onError: () => toast.error("Erreur lors de la création"),
  })
}
