import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { appointmentsApi } from "../api/appointments.api"
import type {
  AppointmentFilters,
  UpdateAppointmentRequest,
  AppointmentStatus,
} from "../types/appointment.types"

export const appointmentKeys = {
  all: ["appointments"] as const,
  lists: () => [...appointmentKeys.all, "list"] as const,
  list: (filters: AppointmentFilters) =>
    [...appointmentKeys.lists(), filters] as const,
  byPatient: (patientId: string) =>
    [...appointmentKeys.all, "patient", patientId] as const,
  today: () => [...appointmentKeys.all, "today"] as const,
  upcoming: (limit?: number) =>
    [...appointmentKeys.all, "upcoming", limit] as const,
  details: () => [...appointmentKeys.all, "detail"] as const,
  detail: (id: string) => [...appointmentKeys.details(), id] as const,
}

export const useAppointments = (filters?: AppointmentFilters) => {
  return useQuery({
    queryKey: appointmentKeys.list(filters ?? {}),
    queryFn: () => appointmentsApi.getAll(filters),
  })
}

export const usePatientAppointments = (patientId: string) => {
  return useQuery({
    queryKey: appointmentKeys.byPatient(patientId),
    queryFn: () => appointmentsApi.getByPatient(patientId),
    enabled: !!patientId,
  })
}

export const useTodayAppointments = () => {
  return useQuery({
    queryKey: appointmentKeys.today(),
    queryFn: () => appointmentsApi.getToday(),
  })
}

export const useUpcomingAppointments = (limit = 5) => {
  return useQuery({
    queryKey: appointmentKeys.upcoming(limit),
    queryFn: () => appointmentsApi.getUpcoming(limit),
  })
}

export const useAppointment = (id: string) => {
  return useQuery({
    queryKey: appointmentKeys.detail(id),
    queryFn: () => appointmentsApi.getById(id),
    enabled: !!id,
  })
}

export const useCreateAppointment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: appointmentsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.today() })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.upcoming() })
      toast.success("Rendez-vous créé")
    },
    onError: () => {
      toast.error("Erreur lors de la création du RDV")
    },
  })
}

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: UpdateAppointmentRequest
    }) => appointmentsApi.update(id, data),
    onSuccess: (apt) => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.detail(apt.id) })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.byPatient(apt.patientId) })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.today() })
      toast.success("Rendez-vous modifié")
    },
    onError: () => {
      toast.error("Erreur lors de la modification")
    },
  })
}

export const useMoveAppointment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      startTime,
      endTime,
    }: {
      id: string
      startTime: string
      endTime: string
    }) => appointmentsApi.move(id, startTime, endTime),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.today() })
      toast.success("Rendez-vous déplacé")
    },
    onError: () => {
      toast.error("Erreur lors du déplacement")
    },
  })
}

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string
      status: AppointmentStatus
    }) => appointmentsApi.updateStatus(id, status),
    onSuccess: (apt) => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.detail(apt.id) })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.byPatient(apt.patientId) })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.today() })
      toast.success("Statut mis à jour")
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du statut")
    },
  })
}

export const useCancelAppointment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      appointmentsApi.cancel(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.today() })
      toast.success("Rendez-vous annulé")
    },
    onError: () => {
      toast.error("Erreur lors de l'annulation")
    },
  })
}

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: appointmentsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.today() })
      toast.success("Rendez-vous supprimé")
    },
    onError: () => {
      toast.error("Erreur lors de la suppression")
    },
  })
}
