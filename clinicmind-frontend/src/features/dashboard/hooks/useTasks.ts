import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { dashboardApi } from "../api/dashboard.api"

export const taskKeys = {
  all: ["dashboard", "tasks"] as const,
}

export function useTasks() {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: () => dashboardApi.getTasks(),
  })
}

export function useToggleTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ taskId, done }: { taskId: string; done: boolean }) =>
      dashboardApi.toggleTask(taskId, done),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })
}

export function useAddTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (title: string) => dashboardApi.addTask(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
      toast.success("Tâche ajoutée")
    },
    onError: () => toast.error("Erreur lors de l'ajout"),
  })
}
