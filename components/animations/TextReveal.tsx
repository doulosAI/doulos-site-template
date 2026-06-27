"use client"

/**
 * TextReveal
 * Reveals text word-by-word or character-by-character on scroll.
 * Adapted from Olivier Larose text animation patterns.
 *
 * Usage:
 * // Word reveal (default)
 * <TextReveal text="Your headline goes here" />
 *
 * // With custom className
 * <TextReveal text="Big bold headline" className="text-5xl font-bold" />
 *
 * // Character mode
 * <TextReveal text="Precise" mode="char" />
 */

import { useRef } from "react"
import { motion, useInView } from "motion/react"

interface TextRevealProps {
  text: string
  className?: string
  mode?: "word" | "char"
  delay?: number
  duration?: number
}

export default function TextReveal({
  text,
  className = "",
  mode = "word",
  delay = 0,
  duration = 0.5,
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const units = mode === "word" ? text.split(" ") : text.split("")
  const separator = mode === "word" ? " " : ""

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration,
              delay: delay + i * (mode === "word" ? 0.08 : 0.03),
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {unit}
          </motion.span>
          {i < units.length - 1 && mode === "word" && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}
