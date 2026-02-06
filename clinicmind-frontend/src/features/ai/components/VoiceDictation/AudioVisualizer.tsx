import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AudioVisualizerProps {
  isActive: boolean
  className?: string
}

export function AudioVisualizer({ isActive, className }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const barCount = 12
    const barWidth = width / barCount - 2

    let animationId: number

    const draw = () => {
      ctx.fillStyle = "rgb(248 250 252)"
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < barCount; i++) {
        const barHeight =
          (Math.sin(Date.now() / 100 + i * 0.5) * 0.5 + 0.5) * height * 0.8
        const x = i * (barWidth + 2)
        const y = (height - barHeight) / 2
        ctx.fillStyle = "rgb(34 197 94)"
        ctx.fillRect(x, y, barWidth, barHeight)
      }
      animationId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animationId)
  }, [isActive])

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={40}
      className={cn("rounded", className)}
      aria-hidden
    />
  )
}
