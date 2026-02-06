import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { documentsApi } from "../api/documents.api"
import type { DocumentFilters, DocumentUploadRequest } from "../types/document.types"

export const documentKeys = {
  all: ["documents"] as const,
  lists: () => [...documentKeys.all, "list"] as const,
  list: (filters: DocumentFilters) => [...documentKeys.lists(), filters] as const,
  byPatient: (patientId: string) => [...documentKeys.all, "patient", patientId] as const,
  byPatientGrouped: (patientId: string) =>
    [...documentKeys.byPatient(patientId), "grouped"] as const,
  details: () => [...documentKeys.all, "detail"] as const,
  detail: (id: string) => [...documentKeys.details(), id] as const,
}

export const useDocuments = (filters?: DocumentFilters) => {
  return useQuery({
    queryKey: documentKeys.list(filters ?? {}),
    queryFn: () => documentsApi.getAll(filters),
  })
}

export const usePatientDocuments = (patientId: string) => {
  return useQuery({
    queryKey: documentKeys.byPatient(patientId),
    queryFn: () => documentsApi.getAll({ patientId }),
    enabled: !!patientId,
  })
}

export const usePatientDocumentsGrouped = (patientId: string) => {
  return useQuery({
    queryKey: documentKeys.byPatientGrouped(patientId),
    queryFn: () => documentsApi.getByPatientGrouped(patientId),
    enabled: !!patientId,
  })
}

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => documentsApi.getById(id),
    enabled: !!id,
  })
}

export const useCreateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentsApi.create,
    onSuccess: (doc) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.byPatient(doc.patientId) })
      queryClient.invalidateQueries({
        queryKey: documentKeys.byPatientGrouped(doc.patientId),
      })
      toast.success("Document créé avec succès")
    },
    onError: () => {
      toast.error("Erreur lors de la création du document")
    },
  })
}

export const useUploadDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: DocumentUploadRequest) => documentsApi.upload(data),
    onSuccess: (doc) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.byPatient(doc.patientId) })
      queryClient.invalidateQueries({
        queryKey: documentKeys.byPatientGrouped(doc.patientId),
      })
      toast.success("Document uploadé avec succès")
    },
    onError: () => {
      toast.error("Erreur lors de l'upload")
    },
  })
}

export const useValidateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentsApi.validateAI,
    onSuccess: (doc) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.detail(doc.id) })
      queryClient.invalidateQueries({ queryKey: documentKeys.byPatient(doc.patientId) })
      queryClient.invalidateQueries({
        queryKey: documentKeys.byPatientGrouped(doc.patientId),
      })
      toast.success("Document validé")
    },
    onError: () => {
      toast.error("Erreur lors de la validation")
    },
  })
}

export const useSignDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentsApi.sign,
    onSuccess: (doc) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.detail(doc.id) })
      queryClient.invalidateQueries({ queryKey: documentKeys.byPatient(doc.patientId) })
      queryClient.invalidateQueries({
        queryKey: documentKeys.byPatientGrouped(doc.patientId),
      })
      toast.success("Document signé")
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Erreur lors de la signature")
    },
  })
}

export const useDeleteDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() })
      toast.success("Document supprimé")
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Erreur lors de la suppression")
    },
  })
}
