import { useRef } from "react"
import { useCabinet, useUploadCabinetLogo } from "../hooks/useCabinet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Upload } from "lucide-react"

export function CabinetLogoUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: cabinet } = useCabinet()
  const uploadLogo = useUploadCabinetLogo()

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) return
    uploadLogo.mutate(file)
    e.target.value = ""
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20 rounded-lg">
        {cabinet?.logoUrl ? (
          <img
            src={cabinet.logoUrl}
            alt="Logo cabinet"
            className="h-full w-full object-cover rounded-lg"
          />
        ) : (
          <AvatarFallback className="rounded-lg bg-muted text-muted-foreground">
            Logo
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
          disabled={uploadLogo.isPending}
        >
          <Upload className="mr-2 h-4 w-4" />
          {uploadLogo.isPending ? "Upload..." : "Changer le logo"}
        </Button>
        <p className="text-xs text-muted-foreground">
          PNG, JPG. Max 2 Mo.
        </p>
      </div>
    </div>
  )
}
