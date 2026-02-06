import { useState } from "react"
import { ActsConfigList } from "../components/ActsConfigList"
import { ActForm } from "../components/ActForm"
import { useCreateAct } from "../hooks/useActsConfig"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import type { DentalActConfig } from "../types/settings.types"

export function ActsPage() {
  const [addOpen, setAddOpen] = useState(false)
  const createAct = useCreateAct()

  const handleAdd = (data: Omit<DentalActConfig, "id">) => {
    createAct.mutate(data, {
      onSuccess: () => setAddOpen(false),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Actes et tarifs</h1>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un acte personnalisé
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Configuration des actes dentaires et tarifs par défaut (nomenclature + actes HN).
      </p>
      <ActsConfigList />

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un acte personnalisé</DialogTitle>
          </DialogHeader>
          <ActForm
            onSubmit={handleAdd}
            onCancel={() => setAddOpen(false)}
            isPending={createAct.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
