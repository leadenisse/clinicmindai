import type { TranscriptionResponse } from "../../types/ai.types"
import { AIBadge } from "../common/AIBadge"
import { formatRecordingDuration } from "../../utils/aiHelpers"
import { cn } from "@/lib/utils"

interface TranscriptionPreviewProps {
  transcription: TranscriptionResponse
  className?: string
}

export function TranscriptionPreview({
  transcription,
  className,
}: TranscriptionPreviewProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>Durée : {formatRecordingDuration(transcription.duration)}</span>
        {transcription.confidence != null && (
          <span>
            Confiance : {Math.round(transcription.confidence * 100)} %
          </span>
        )}
      </div>
      <div className="rounded-md border bg-muted/30 p-3 text-sm">
        <p className="whitespace-pre-wrap">{transcription.text}</p>
      </div>
      <AIBadge size="sm" generatedAt={transcription.timestamp} />
    </div>
  )
}
