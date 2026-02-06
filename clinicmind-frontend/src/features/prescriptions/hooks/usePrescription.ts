import { useQuery } from "@tanstack/react-query"
import { prescriptionsApi } from "../api/prescriptions.api"
import { prescriptionKeys } from "./usePrescriptions"

export function usePrescription(id: string | undefined) {
  return useQuery({
    queryKey: prescriptionKeys.detail(id ?? ""),
    queryFn: () => prescriptionsApi.getById(id!),
    enabled: !!id,
  })
}
