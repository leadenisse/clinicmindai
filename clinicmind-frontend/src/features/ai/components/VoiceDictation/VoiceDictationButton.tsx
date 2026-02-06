import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"
import { VoiceDictationModal } from "./VoiceDictationModal"
import { cn } from "@/lib/utils"

interface VoiceDictationButtonProps {
  onTranscriptionComplete: (text: string) => void
  patientId?: string
  disabled?: boolean
  variant?: "default" | "outline" | "ghost" | "link" | "secondary" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function VoiceDictationButton({
  onTranscriptionComplete,
  patientId,
  disabled = false,
  variant = "outline",
  size = "icon",
  className,
}: VoiceDictationButtonProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const handleInsert = (text: string) => {
    onTranscriptionComplete(text)
    setModalOpen(false)
  }

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={cn(className)}
        onClick={() => setModalOpen(true)}
        disabled={disabled}
        aria-label="Ouvrir la dictée vocale"
      >
        <Mic className="h-4 w-4" />
      </Button>
      <VoiceDictationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onInsert={handleInsert}
        patientId={patientId}
      />
    </>
  )
}
