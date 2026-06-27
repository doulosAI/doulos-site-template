"use client"

/**
 * SwipeableCards
 * Horizontal drag-to-scroll card group for mobile.
 * Uses Motion drag with x-axis constraints.
 * Auto-detects total width for constraints.
 *
 * Usage:
 * <SwipeableCards>
 *   <ServiceCard title="HVAC" ... />
 *   <ServiceCard title="Plumbing" ... />
 *   <ServiceCard title="Electrical" ... />
 * </SwipeableCards>
 */

import { useRef, useState } from "react"
import { motion } from "motion/react"

interface SwipeableCardsProps {
  children: React.ReactNode
  className?: string
  gap?: number // Gap between cards in px (default 16)
}

export default function SwipeableCards({
  children,
  className = "",
  gap = 16,
}: SwipeableCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const getConstraints = () => {
    if (!containerRef.current || !trackRef.current) return { left: 0, right: 0 }
    const containerWidth = containerRef.current.offsetWidth
    const trackWidth = trackRef.current.scrollWidth
    return {
      left: -(trackWidth - containerWidth + gap),
      right: 0,
    }
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      aria-label="Swipeable card list"
    >
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={getConstraints()}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className={`flex ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ gap }}
        // Prevent click events from firing during drag
        onClick={(e) => isDragging && e.preventDefault()}
      >
        {children}
      </motion.div>

      {/* Swipe hint — fades out after first interaction */}
      <p className="text-xs text-muted-foreground text-center mt-3 md:hidden" aria-hidden="true">
        ← Swipe to see more →
      </p>
    </div>
  )
}
