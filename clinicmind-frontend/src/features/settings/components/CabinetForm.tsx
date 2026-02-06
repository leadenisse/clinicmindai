import { useState, useEffect } from "react"
import { useCabinet, useUpdateCabinet } from "../hooks/useCabinet"
import { CabinetLogoUpload } from "./CabinetLogoUpload"
import { WORKING_DAYS_LABELS } from "../constants/settingsConfig"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { CabinetSettings } from "../types/settings.types"

const DAYS = [1, 2, 3, 4, 5, 6, 0] as const

export function CabinetForm() {
  const { data: cabinet, isLoading } = useCabinet()
  const updateCabinet = useUpdateCabinet()
  const [form, setForm] = useState<Partial<CabinetSettings>>({})

  useEffect(() => {
    if (cabinet) {
      setForm({
        name: cabinet.name,
        address: cabinet.address,
        zipCode: cabinet.zipCode,
        city: cabinet.city,
        phone: cabinet.phone,
        email: cabinet.email ?? "",
        website: cabinet.website ?? "",
        siret: cabinet.siret ?? "",
        rpps: cabinet.rpps ?? "",
        defaultAppointmentDuration: cabinet.defaultAppointmentDuration,
        openingTime: cabinet.openingTime,
        closingTime: cabinet.closingTime,
        workingDays: cabinet.workingDays ? [...cabinet.workingDays] : [1, 2, 3, 4, 5],
      })
    }
  }, [cabinet])

  const toggleDay = (day: number) => {
    setForm((prev) => {
      const days = prev.workingDays ?? []
      const next = days.includes(day)
        ? days.filter((d) => d !== day)
        : [...days, day].sort((a, b) => a - b)
      return { ...prev, workingDays: next }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateCabinet.mutate(form)
  }

  if (isLoading || !cabinet) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Informations générales</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Logo</Label>
            <CabinetLogoUpload />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nom du cabinet</Label>
            <Input
              id="name"
              value={form.name ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={form.address ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="zipCode">Code postal</Label>
              <Input
                id="zipCode"
                value={form.zipCode ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, zipCode: e.target.value }))}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                value={form.city ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Site web</Label>
            <Input
              id="website"
              type="url"
              value={form.website ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
              placeholder="https://..."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="siret">SIRET</Label>
              <Input
                id="siret"
                value={form.siret ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, siret: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpps">N° RPPS</Label>
              <Input
                id="rpps"
                value={form.rpps ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, rpps: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Horaires d&apos;ouverture</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="openingTime">Heure d&apos;ouverture</Label>
              <Input
                id="openingTime"
                type="time"
                value={form.openingTime ?? "09:00"}
                onChange={(e) => setForm((p) => ({ ...p, openingTime: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closingTime">Heure de fermeture</Label>
              <Input
                id="closingTime"
                type="time"
                value={form.closingTime ?? "18:00"}
                onChange={(e) => setForm((p) => ({ ...p, closingTime: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Durée RDV par défaut (min)</Label>
              <Input
                id="duration"
                type="number"
                min={5}
                max={120}
                step={5}
                value={form.defaultAppointmentDuration ?? 30}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    defaultAppointmentDuration: Number(e.target.value) || 30,
                  }))
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Jours travaillés</Label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((d) => (
                <label
                  key={d}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                >
                  <input
                    type="checkbox"
                    checked={(form.workingDays ?? []).includes(d)}
                    onChange={() => toggleDay(d)}
                    className="sr-only"
                  />
                  <span className="pointer-events-none">
                    {WORKING_DAYS_LABELS[d]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={updateCabinet.isPending}>
        {updateCabinet.isPending ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  )
}
