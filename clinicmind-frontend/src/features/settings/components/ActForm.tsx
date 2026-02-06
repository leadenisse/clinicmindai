import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { DentalActConfig } from "../types/settings.types"

type ActFormData = Omit<DentalActConfig, "id">

interface ActFormProps {
  act?: DentalActConfig | null
  onSubmit: (data: ActFormData) => void
  onCancel?: () => void
  isPending?: boolean
}

export function ActForm({
  act,
  onSubmit,
  onCancel,
  isPending = false,
}: ActFormProps) {
  const [form, setForm] = useState<ActFormData>({
    code: "",
    description: "",
    category: "",
    defaultPrice: 0,
    isActive: true,
  })

  useEffect(() => {
    if (act) {
      setForm({
        code: act.code,
        description: act.description,
        category: act.category,
        defaultPrice: act.defaultPrice,
        isActive: act.isActive,
      })
    }
  }, [act])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code">Code CCAM</Label>
        <Input
          id="code"
          value={form.code}
          onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
          placeholder="HBMD050"
          required
          readOnly={!!act}
          className={act ? "bg-muted" : undefined}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Catégorie</Label>
        <Input
          id="category"
          value={form.category}
          onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
          placeholder="Prévention, Conservateur, etc."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="defaultPrice">Tarif par défaut (€)</Label>
        <Input
          id="defaultPrice"
          type="number"
          min={0}
          step={0.01}
          value={form.defaultPrice || ""}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              defaultPrice: Number(e.target.value) || 0,
            }))
          }
          required
        />
      </div>
      {!act && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) =>
              setForm((p) => ({ ...p, isActive: e.target.checked }))
            }
            className="rounded border-border"
          />
          Actif
        </label>
      )}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enregistrement..." : act ? "Enregistrer" : "Ajouter"}
        </Button>
      </div>
    </form>
  )
}
