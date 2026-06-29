import type { Metadata } from "next"
import { Barlow_Condensed, Barlow } from "next/font/google"
import { MotionConfig } from "motion/react"
import LenisWrapper from "@/components/layout/LenisWrapper"
import BottomNav from "@/components/layout/BottomNav"
import siteConfig from "@/site.config.json"
import "./globals.css"

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-headline",
  display: "swap",
})

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: siteConfig.businessName,
  description: `${siteConfig.businessName} — ${siteConfig.city}, ${siteConfig.state}`,
}

const navItems = [
  { label: "Home",     href: "#home",     icon: "🏠" },
  { label: "Services", href: "#services", icon: "🔧" },
  { label: "Reviews",  href: "#reviews",  icon: "⭐" },
  { label: "Contact",  href: "#contact",  icon: "📞" },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${barlow.variable}`}>
      <body className="font-sans antialiased">
        <MotionConfig reducedMotion="user">
          <LenisWrapper>
            {children}
            <BottomNav items={navItems} />
          </LenisWrapper>
        </MotionConfig>
      </body>
    </html>
  )
}
