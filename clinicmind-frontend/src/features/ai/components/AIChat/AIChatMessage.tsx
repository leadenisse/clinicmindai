import type { ChatMessage as ChatMessageType } from "../../types/ai.types"
import { AIBadge } from "../common/AIBadge"
import { AILoadingState } from "../common/AILoadingState"
import { cn } from "@/lib/utils"
import { User, Bot } from "lucide-react"

interface AIChatMessageProps {
  message: ChatMessageType
  className?: string
}

export function AIChatMessage({ message, className }: AIChatMessageProps) {
  const isUser = message.role === "user"

  if (message.isLoading) {
    return (
      <div className={cn("flex gap-3", className)}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <Bot className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <AILoadingState message="Réflexion..." className="py-4" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser && "flex-row-reverse",
        className
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div
        className={cn(
          "min-w-0 flex-1 space-y-1",
          isUser && "text-right"
        )}
      >
        <div
          className={cn(
            "inline-block rounded-lg px-3 py-2 text-sm",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        {!isUser && (
          <div className="flex justify-start">
            <AIBadge size="sm" showTooltip={false} />
          </div>
        )}
      </div>
    </div>
  )
}
