"use client"

/**
 * BottomNav
 * Mobile-only fixed bottom navigation. Hidden on desktop.
 * 4 tabs, thumb-reachable, minimum 48px touch targets.
 *
 * Usage:
 * <BottomNav items={navItems} />
 *
 * navItems format:
 * [
 *   { label: "Home", href: "#home", icon: <HomeIcon /> },
 *   { label: "Services", href: "#services", icon: <WrenchIcon /> },
 *   { label: "Reviews", href: "#reviews", icon: <StarIcon /> },
 *   { label: "Contact", href: "#contact", icon: <PhoneIcon /> },
 * ]
 */

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface BottomNavProps {
  items: NavItem[]
}

export default function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2 pb-safe">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1",
                "min-h-[48px] min-w-[48px] px-3 rounded-lg",
                "transition-colors duration-150",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <motion.span
                whileTap={{ scale: 0.85 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="w-5 h-5">{item.icon}</span>
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </motion.span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
