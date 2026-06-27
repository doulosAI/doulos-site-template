import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { MotionConfig } from "motion/react"
import LenisWrapper from "@/components/layout/LenisWrapper"
import BottomNav from "@/components/layout/BottomNav"
import siteConfig from "@/site.config.json"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })

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
    <html lang="en" className={geist.variable}>
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
