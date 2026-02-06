import { useState } from "react"
import { useActsConfig, useToggleActActive, useUpdateAct } from "../hooks/useActsConfig"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ActForm } from "./ActForm"
import { Pencil } from "lucide-react"
import type { DentalActConfig } from "../types/settings.types"

function ActiveToggle({
  act,
  onToggle,
}: {
  act: DentalActConfig
  onToggle: (id: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(act.id)}
      className={act.isActive ? "text-green-600" : "text-muted-foreground"}
      aria-label={act.isActive ? "Désactiver" : "Activer"}
    >
      {act.isActive ? "Oui" : "Non"}
    </button>
  )
}

export function ActsConfigList() {
  const { data: acts, isLoading } = useActsConfig()
  const toggleActive = useToggleActActive()
  const updateAct = useUpdateAct()
  const [editingAct, setEditingAct] = useState<DentalActConfig | null>(null)

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Tarif</TableHead>
              <TableHead>Actif</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4].map((i) => (
              <TableRow key={i}>
                <TableCell colSpan={6} className="h-12 animate-pulse bg-muted/50" />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (!acts?.length) {
    return (
      <p className="rounded-md border border-dashed p-6 text-center text-muted-foreground">
        Aucun acte configuré.
      </p>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Tarif par défaut</TableHead>
              <TableHead>Actif</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {acts.map((act) => (
              <TableRow key={act.id}>
                <TableCell className="font-mono text-sm">{act.code}</TableCell>
                <TableCell>{act.description}</TableCell>
                <TableCell className="text-muted-foreground">{act.category}</TableCell>
                <TableCell>{act.defaultPrice.toFixed(2)} €</TableCell>
                <TableCell>
                  <ActiveToggle
                    act={act}
                    onToggle={(id) => toggleActive.mutate(id)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setEditingAct(act)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingAct} onOpenChange={() => setEditingAct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l&apos;acte</DialogTitle>
          </DialogHeader>
          {editingAct && (
            <ActForm
              act={editingAct}
              onSubmit={(data) => {
                updateAct.mutate(
                  { id: editingAct.id, data },
                  { onSuccess: () => setEditingAct(null) }
                )
              }}
              onCancel={() => setEditingAct(null)}
              isPending={updateAct.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
