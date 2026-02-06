import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { prescriptionsApi } from "../api/prescriptions.api"
import type { Prescription } from "../types/prescription.types"
import { prescriptionKeys } from "./usePrescriptions"

export function useCreatePrescription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Prescription>) => prescriptionsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
      toast.success("Ordonnance enregistrée")
    },
    onError: () => toast.error("Erreur lors de l'enregistrement"),
  })
}

export function useUpdatePrescription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Prescription> }) =>
      prescriptionsApi.update(id, data),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
      toast.success("Ordonnance mise à jour")
    },
    onError: () => toast.error("Erreur lors de la mise à jour"),
  })
}

export function useDeletePrescription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => prescriptionsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
      toast.success("Ordonnance supprimée")
    },
    onError: () => toast.error("Erreur lors de la suppression"),
  })
}

export function useSignPrescription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, signatureData }: { id: string; signatureData: string }) =>
      prescriptionsApi.sign(id, signatureData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
      toast.success("Ordonnance signée")
    },
    onError: () => toast.error("Erreur lors de la signature"),
  })
}

export function useValidatePrescription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => prescriptionsApi.validate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
      toast.success("Ordonnance validée")
    },
    onError: () => toast.error("Erreur lors de la validation"),
  })
}

export function useSendPrescription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, method }: { id: string; method: "email" | "print" }) =>
      prescriptionsApi.send(id, method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
      toast.success("Ordonnance envoyée")
    },
    onError: () => toast.error("Erreur lors de l'envoi"),
  })
}
