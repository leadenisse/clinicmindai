import { useQuery } from "@tanstack/react-query"
import { prescriptionsApi } from "../api/prescriptions.api"
import { prescriptionKeys } from "./usePrescriptions"

export function useTemplates() {
  return useQuery({
    queryKey: prescriptionKeys.templates(),
    queryFn: () => prescriptionsApi.getTemplates(),
  })
}
