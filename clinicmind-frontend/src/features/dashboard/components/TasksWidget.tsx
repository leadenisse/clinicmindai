import { useState } from "react"
import { useTasks, useToggleTask, useAddTask } from "../hooks/useTasks"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckSquare, Square, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function TasksWidget() {
  const { data: tasks, isLoading } = useTasks()
  const toggleTask = useToggleTask()
  const addTask = useAddTask()
  const [newTitle, setNewTitle] = useState("")
  const [showInput, setShowInput] = useState(false)

  const todoTasks = tasks?.filter((t) => t.status === "todo") ?? []
  const doneTasks = tasks?.filter((t) => t.status === "done") ?? []

  const handleAdd = () => {
    const title = newTitle.trim()
    if (!title) return
    addTask.mutate(title, {
      onSuccess: () => {
        setNewTitle("")
        setShowInput(false)
      },
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Tâches du jour</h2>
      </CardHeader>
      <CardContent className="space-y-2">
        {[...todoTasks, ...doneTasks].map((task) => (
          <label
            key={task.id}
            className={cn(
              "flex items-center gap-3 rounded-md border p-2 cursor-pointer transition-colors hover:bg-muted/50",
              task.status === "done" && "opacity-60"
            )}
          >
            <button
              type="button"
              onClick={() =>
                toggleTask.mutate({
                  taskId: task.id,
                  done: task.status !== "done",
                })
              }
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              {task.status === "done" ? (
                <CheckSquare className="h-5 w-5 text-green-600" />
              ) : (
                <Square className="h-5 w-5" />
              )}
            </button>
            <span
              className={cn(
                "flex-1 text-sm",
                task.status === "done" && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </span>
          </label>
        ))}
        {showInput ? (
          <div className="flex gap-2">
            <Input
              placeholder="Nouvelle tâche..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd()
                if (e.key === "Escape") setShowInput(false)
              }}
              autoFocus
              className="h-9"
            />
            <Button size="sm" onClick={handleAdd} disabled={!newTitle.trim() || addTask.isPending}>
              Ajouter
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowInput(false)}>
              Annuler
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground"
            onClick={() => setShowInput(true)}
          >
            <Plus className="h-4 w-4" />
            Ajouter une tâche
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
