import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { patientsApi } from "../api/patients.api"
import type { Patient, PatientFilters } from "../types/patient.types"

export const patientKeys = {
  all: ["patients"] as const,
  lists: () => [...patientKeys.all, "list"] as const,
  list: (filters: PatientFilters) => [...patientKeys.lists(), filters] as const,
  details: () => [...patientKeys.all, "detail"] as const,
  detail: (id: string) => [...patientKeys.details(), id] as const,
}

export const usePatients = (filters?: PatientFilters) => {
  return useQuery({
    queryKey: patientKeys.list(filters ?? {}),
    queryFn: () => patientsApi.getAll(filters),
  })
}

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: patientKeys.detail(id),
    queryFn: () => patientsApi.getById(id),
    enabled: !!id,
  })
}

export const useCreatePatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patientsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() })
      toast.success("Patient créé avec succès")
    },
    onError: () => {
      toast.error("Erreur lors de la création du patient")
    },
  })
}

export const useUpdatePatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Patient> }) =>
      patientsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: patientKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() })
      toast.success("Patient mis à jour")
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour")
    },
  })
}

export const useArchivePatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patientsApi.archive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() })
      toast.success("Patient archivé")
    },
    onError: () => {
      toast.error("Erreur lors de l'archivage")
    },
  })
}
