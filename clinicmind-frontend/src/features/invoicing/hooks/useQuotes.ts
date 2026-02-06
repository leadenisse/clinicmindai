import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { quotesApi } from "../api/quotes.api"
import type { QuoteFilters, QuoteStatus } from "../types/invoicing.types"
import { invoiceKeys } from "./useInvoices"

export const quoteKeys = {
  all: ["quotes"] as const,
  lists: () => [...quoteKeys.all, "list"] as const,
  list: (filters: QuoteFilters) => [...quoteKeys.lists(), filters] as const,
  byPatient: (patientId: string) =>
    [...quoteKeys.all, "patient", patientId] as const,
  details: () => [...quoteKeys.all, "detail"] as const,
  detail: (id: string) => [...quoteKeys.details(), id] as const,
}

export const useQuotes = (filters?: QuoteFilters) => {
  return useQuery({
    queryKey: quoteKeys.list(filters ?? {}),
    queryFn: () => quotesApi.getAll(filters),
  })
}

export const usePatientQuotes = (patientId: string) => {
  return useQuery({
    queryKey: quoteKeys.byPatient(patientId),
    queryFn: () => quotesApi.getByPatient(patientId),
    enabled: !!patientId,
  })
}

export const useQuote = (id: string) => {
  return useQuery({
    queryKey: quoteKeys.detail(id),
    queryFn: () => quotesApi.getById(id),
    enabled: !!id,
  })
}

export const useCreateQuote = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: quotesApi.create,
    onSuccess: (quote) => {
      queryClient.invalidateQueries({ queryKey: quoteKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: quoteKeys.byPatient(quote.patientId),
      })
      toast.success("Devis créé")
    },
    onError: () => {
      toast.error("Erreur lors de la création")
    },
  })
}

export const useUpdateQuoteStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: QuoteStatus }) =>
      quotesApi.updateStatus(id, status),
    onSuccess: (quote) => {
      queryClient.invalidateQueries({ queryKey: quoteKeys.detail(quote.id) })
      queryClient.invalidateQueries({ queryKey: quoteKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: quoteKeys.byPatient(quote.patientId),
      })
      toast.success("Statut mis à jour")
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour")
    },
  })
}

export const useConvertQuoteToInvoice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: quotesApi.convertToInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quoteKeys.lists() })
      queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() })
      toast.success("Devis converti en facture")
    },
    onError: () => {
      toast.error("Erreur lors de la conversion")
    },
  })
}
