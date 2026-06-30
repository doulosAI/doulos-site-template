"use client"

/**
 * BeforeAfterSlider
 * Draggable comparison reveal. Uses a single image with a CSS filter
 * to simulate a "before" treatment until real before/after photo pairs
 * are sourced per client.
 */

import { useState, useRef, useCallback } from "react"

interface BeforeAfterSliderProps {
  imageUrl: string
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfterSlider({
  imageUrl,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    updatePosition(e.clientX)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    updatePosition(e.clientX)
  }
  const onPointerUp = () => {
    dragging.current = false
  }

  const bg = `url('${imageUrl}?w=1400&auto=format&q=80')`

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video select-none overflow-hidden touch-none rounded-sm cursor-ew-resize"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: bg }} />
      <span className="absolute bottom-4 right-4 text-[11px] font-bold tracking-widest uppercase bg-background/85 text-foreground px-3 py-1.5 pointer-events-none">
        {afterLabel}
      </span>

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: bg,
          filter: "grayscale(0.9) sepia(0.25) brightness(0.6) contrast(0.9)",
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />
      <span
        className="absolute bottom-4 left-4 text-[11px] font-bold tracking-widest uppercase bg-background/85 text-foreground px-3 py-1.5 pointer-events-none transition-opacity"
        style={{ opacity: position > 14 ? 1 : 0 }}
      >
        {beforeLabel}
      </span>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <span className="text-primary-foreground text-sm font-bold">⇔</span>
        </div>
      </div>
    </div>
  )
}
