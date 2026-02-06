import { useQuery } from "@tanstack/react-query"
import { prescriptionsApi } from "../api/prescriptions.api"
import type { PrescriptionFilters } from "../types/prescription.types"

export const prescriptionKeys = {
  all: ["prescriptions"] as const,
  list: (filters?: PrescriptionFilters) =>
    [...prescriptionKeys.all, "list", filters] as const,
  detail: (id: string) => [...prescriptionKeys.all, id] as const,
  byPatient: (patientId: string) =>
    [...prescriptionKeys.all, "patient", patientId] as const,
  templates: () => [...prescriptionKeys.all, "templates"] as const,
}

export function usePrescriptions(filters?: PrescriptionFilters) {
  return useQuery({
    queryKey: prescriptionKeys.list(filters),
    queryFn: () => prescriptionsApi.getAll(filters),
  })
}
