import { useRef, useEffect } from "react"
import { useAIChat } from "../../hooks/useAIChat"
import { AIChatMessage } from "./AIChatMessage"
import { AIChatInput } from "./AIChatInput"
import { SuggestedQuestions } from "./SuggestedQuestions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Bot, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIChatPanelProps {
  patientId: string
  className?: string
}

export function AIChatPanel({ patientId, className }: AIChatPanelProps) {
  const { messages, isLoading, sendMessage, clearChat } = useAIChat({
    patientId,
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, isLoading])

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <span className="flex items-center gap-2 font-medium">
          <Bot className="h-5 w-5 text-teal-600" />
          Assistant IA
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearChat}
          className="text-muted-foreground"
        >
          <Trash2 className="h-4 w-4" />
          Effacer
        </Button>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 overflow-hidden">
        {messages.length === 0 ? (
          <SuggestedQuestions
            onSelect={sendMessage}
            disabled={isLoading}
          />
        ) : null}

        <div
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto pr-2 min-h-[120px]"
        >
          {messages.map((msg) => (
            <AIChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <AIChatMessage
              message={{
                id: "loading",
                role: "assistant",
                content: "",
                timestamp: new Date().toISOString(),
                isLoading: true,
              }}
            />
          )}
        </div>

        <AIChatInput
          onSend={sendMessage}
          disabled={isLoading}
        />
      </CardContent>
    </Card>
  )
}
