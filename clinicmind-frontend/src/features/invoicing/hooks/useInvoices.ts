import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { invoicesApi } from "../api/invoices.api"
import type { InvoiceFilters } from "../types/invoicing.types"

export const invoiceKeys = {
  all: ["invoices"] as const,
  lists: () => [...invoiceKeys.all, "list"] as const,
  list: (filters: InvoiceFilters) =>
    [...invoiceKeys.lists(), filters] as const,
  byPatient: (patientId: string) =>
    [...invoiceKeys.all, "patient", patientId] as const,
  details: () => [...invoiceKeys.all, "detail"] as const,
  detail: (id: string) => [...invoiceKeys.details(), id] as const,
}

export const useInvoices = (filters?: InvoiceFilters) => {
  return useQuery({
    queryKey: invoiceKeys.list(filters ?? {}),
    queryFn: () => invoicesApi.getAll(filters),
  })
}

export const usePatientInvoices = (patientId: string) => {
  return useQuery({
    queryKey: invoiceKeys.byPatient(patientId),
    queryFn: () => invoicesApi.getByPatient(patientId),
    enabled: !!patientId,
  })
}

export const useInvoice = (id: string) => {
  return useQuery({
    queryKey: invoiceKeys.detail(id),
    queryFn: () => invoicesApi.getById(id),
    enabled: !!id,
  })
}

export const useCreateInvoice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: invoicesApi.create,
    onSuccess: (invoice) => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.byPatient(invoice.patientId),
      })
      toast.success("Facture créée")
    },
    onError: () => {
      toast.error("Erreur lors de la création")
    },
  })
}

export const useValidateInvoice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: invoicesApi.validate,
    onSuccess: (invoice) => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(invoice.id) })
      queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() })
      toast.success("Facture validée")
    },
    onError: () => {
      toast.error("Erreur lors de la validation")
    },
  })
}

export const useRecordPayment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: invoicesApi.recordPayment,
    onSuccess: (invoice) => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(invoice.id) })
      queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.byPatient(invoice.patientId),
      })
      toast.success("Paiement enregistré")
    },
    onError: () => {
      toast.error("Erreur lors de l'enregistrement du paiement")
    },
  })
}

export const useCancelInvoice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: invoicesApi.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() })
      toast.success("Facture annulée")
    },
    onError: () => {
      toast.error("Erreur lors de l'annulation")
    },
  })
}

export const useExportInvoicesCSV = () => {
  return useMutation({
    mutationFn: invoicesApi.exportCSV,
    onSuccess: (csvData) => {
      const blob = new Blob([csvData], {
        type: "text/csv;charset=utf-8;",
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `factures_${new Date().toISOString().slice(0, 10)}.csv`
      link.click()
      URL.revokeObjectURL(url)
      toast.success("Export téléchargé")
    },
    onError: () => {
      toast.error("Erreur lors de l'export")
    },
  })
}
