"use client"

/**
 * SectionReveal
 * Simple scroll-triggered fade-up for section entrances.
 * The single-element version of StaggerReveal.
 * Use this for section wrappers, headings, standalone elements.
 *
 * Usage:
 * <SectionReveal>
 *   <h2>Your Section Heading</h2>
 * </SectionReveal>
 *
 * // With delay
 * <SectionReveal delay={0.2}>
 *   <p>Body text that comes in slightly after heading</p>
 * </SectionReveal>
 */

import { motion } from "motion/react"

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number // Distance to travel up from (default 40px)
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 40,
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
