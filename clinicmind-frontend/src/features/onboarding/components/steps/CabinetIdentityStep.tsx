import { useRef } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import type { CabinetIdentityData } from "../../types/onboarding.types"

interface CabinetIdentityStepProps {
  data: CabinetIdentityData
  onChange: (data: CabinetIdentityData) => void
}

export function CabinetIdentityStep({ data, onChange }: CabinetIdentityStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file?.type.startsWith("image/")) return
    const url = URL.createObjectURL(file)
    onChange({ ...data, logoUrl: url })
    e.target.value = ""
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label>Logo du cabinet</Label>
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24 rounded-lg">
            {data.logoUrl ? (
              <img
                src={data.logoUrl}
                alt="Logo"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <AvatarFallback className="rounded-lg bg-muted text-muted-foreground text-2xl">
                📷
              </AvatarFallback>
            )}
          </Avatar>
          <div className="space-y-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Télécharger un logo
            </Button>
            <p className="text-xs text-muted-foreground">
              Format : PNG, JPG (max 2 Mo). Recommandé : 200×200 px
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Label>Informations complémentaires</Label>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="cabinet-email">Email du cabinet</Label>
            <Input
              id="cabinet-email"
              type="email"
              placeholder="contact@cabinet.fr"
              value={data.email ?? ""}
              onChange={(e) => onChange({ ...data, email: e.target.value || undefined })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cabinet-website">Site web</Label>
            <Input
              id="cabinet-website"
              placeholder="www.cabinet-dentaire.fr"
              value={data.website ?? ""}
              onChange={(e) => onChange({ ...data, website: e.target.value || undefined })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cabinet-siret">N° SIRET</Label>
            <Input
              id="cabinet-siret"
              placeholder="123 456 789 00012"
              value={data.siret ?? ""}
              onChange={(e) => onChange({ ...data, siret: e.target.value || undefined })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
