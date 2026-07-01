"use client"

import { useEffect, useRef } from "react"

/**
 * Tracks a section's scroll progress (0 -> 1 as it passes through the
 * viewport) into a mutable ref, updated via a single shared rAF loop.
 * No re-renders — R3F components read the ref directly inside useFrame.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const sectionRef = useRef<T>(null)
  const progress = useRef(0)

  useEffect(() => {
    let rafId: number

    const update = () => {
      const el = sectionRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        // 0 when section top hits bottom of viewport, 1 when section bottom hits top
        const total = rect.height + vh
        const passed = vh - rect.top
        progress.current = Math.min(1, Math.max(0, passed / total))
      }
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return { sectionRef, progress }
}
