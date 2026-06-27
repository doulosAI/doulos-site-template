"use client"

/**
 * PageTransition
 * Wraps page content with AnimatePresence for smooth route transitions.
 * Usage: Wrap children in root layout, pass pathname as key.
 *
 * In layout.tsx:
 * <PageTransition>{children}</PageTransition>
 *
 * For route-keyed transitions, use in a client wrapper that reads usePathname().
 */

import { AnimatePresence, motion } from "motion/react"
import { usePathname } from "next/navigation"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
