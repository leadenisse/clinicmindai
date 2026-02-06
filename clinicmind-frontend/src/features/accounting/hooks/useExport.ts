import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { accountingApi } from "../api/accounting.api"
import type { ExportOptions } from "../types/accounting.types"

export function useExport() {
  return useMutation({
    mutationFn: (options: ExportOptions) => accountingApi.exportData(options),
    onSuccess: (url) => {
      toast.success("Export prêt")
      if (url) window.open(url, "_blank")
    },
    onError: () => toast.error("Erreur lors de l'export"),
  })
}
