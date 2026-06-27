"use client"

import { useState } from "react"
import config from "@/site.config.json"
import AmbientBackground from "@/components/animations/AmbientBackground"
import SectionReveal from "@/components/animations/SectionReveal"
import TextReveal from "@/components/animations/TextReveal"
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerReveal"
import SwipeableCards from "@/components/animations/SwipeableCards"
import ChatbotWidget from "@/components/chatbot/ChatbotWidget"
import { motion } from "motion/react"

type ServiceItem = (typeof config.services)[number]
type ReviewItem  = (typeof config.reviews)[number]
type FaqItem     = (typeof config.faq)[number]
type StatItem    = (typeof config.stats)[number]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-3" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-primary text-primary" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const phone    = config.phone
  const telHref  = `tel:${phone.replace(/\D/g, "")}`

  return (
    <main className="flex flex-col min-h-[100dvh] pb-16 md:pb-0">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
      >
        <AmbientBackground />
        <div className="relative z-10 w-full max-w-2xl mx-auto">

          <SectionReveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold text-primary bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-8 tracking-widest uppercase">
              📍 {config.hero.eyebrow}
            </span>
          </SectionReveal>

          <h1 className="text-[clamp(2rem,5.5vw,3.75rem)] font-bold leading-[1.08] tracking-tight mb-6">
            <TextReveal text={config.hero.headline} />
            <br />
            <span className="text-primary">
              <TextReveal text={config.hero.subheadline} delay={0.35} />
            </span>
          </h1>

          <SectionReveal delay={0.55}>
            <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
              {config.hero.tagline}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.a
                href={telHref}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
              >
                📞 Call {phone}
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center min-h-[52px] px-8 rounded-full border border-border bg-background/20 backdrop-blur-sm font-semibold text-base hover:border-primary hover:text-primary transition-colors"
              >
                Get a Free Quote →
              </motion.a>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.85}>
            <div className="mt-16 flex items-center justify-center gap-10">
              {config.stats.map((stat: StatItem, i: number) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-primary">{stat.value}</span>
                  <span className="text-[11px] text-muted-foreground mt-1 tracking-wide uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <div className="w-5 h-8 rounded-full border border-border/60 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">About Us</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-5 leading-tight">{config.about.heading}</h2>
            <div className="h-0.5 w-12 bg-primary mb-6" />
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{config.about.body}</p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3 text-center">What We Do</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Every Project. Done Right.</h2>
          </SectionReveal>

          <StaggerContainer className="hidden md:flex flex-wrap justify-center gap-3">
            {config.services.map((svc: ServiceItem, i: number) => (
              <StaggerItem key={i}>
                <div className="w-[280px] rounded-2xl p-6 border border-border bg-muted/50 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 cursor-default">
                  <span className="text-2xl mb-3 block">{svc.icon}</span>
                  <p className="font-semibold mb-1">{svc.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="md:hidden">
            <SwipeableCards>
              {config.services.map((svc: ServiceItem, i: number) => (
                <div key={i} className="shrink-0 w-56 rounded-2xl p-5 border border-border bg-muted/60">
                  <span className="text-2xl mb-3 block">{svc.icon}</span>
                  <p className="font-semibold mb-1 text-sm">{svc.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{svc.desc}</p>
                </div>
              ))}
            </SwipeableCards>
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      {config.reviews.length > 0 && (
        <section id="reviews" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <SectionReveal>
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3 text-center">Reviews</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">What Clients Say</h2>
            </SectionReveal>

            <StaggerContainer className="hidden md:grid md:grid-cols-3 gap-4">
              {config.reviews.map((r: ReviewItem, i: number) => (
                <StaggerItem key={i}>
                  <div className="h-full rounded-2xl p-6 border border-border bg-muted/40 flex flex-col">
                    <Stars count={r.stars} />
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 italic">&ldquo;{r.text}&rdquo;</p>
                    <div>
                      <p className="font-semibold text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.role}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="md:hidden">
              <SwipeableCards>
                {config.reviews.map((r: ReviewItem, i: number) => (
                  <div key={i} className="shrink-0 w-72 rounded-2xl p-6 border border-border bg-muted/60 flex flex-col">
                    <Stars count={r.stars} />
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 italic">&ldquo;{r.text}&rdquo;</p>
                    <div>
                      <p className="font-semibold text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.role}</p>
                    </div>
                  </div>
                ))}
              </SwipeableCards>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <SectionReveal>
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-10">Common Questions</h2>
          </SectionReveal>
          {config.faq.map((item: FaqItem, i: number) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <div className="border-b border-border">
                <button
                  className="w-full text-left flex justify-between items-center gap-4 py-5 min-h-[52px]"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-medium text-sm md:text-base">{item.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.18 }}
                    className="text-primary shrink-0 text-xl leading-none"
                  >+</motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground text-sm leading-relaxed pb-5">{item.a}</p>
                </motion.div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-xl mx-auto text-center">
          <SectionReveal>
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Get Started</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{config.cta.heading}</h2>
            <p className="text-muted-foreground mb-10 text-base md:text-lg leading-relaxed">{config.cta.body}</p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <motion.a
              href={telHref}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-3 min-h-[56px] px-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/30 hover:opacity-90 transition-opacity mb-6"
            >
              📞  {phone}
            </motion.a>
            <p className="text-sm text-muted-foreground">{config.serviceArea}</p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Chatbot ───────────────────────────────────────────────────────── */}
      <ChatbotWidget
        businessName={config.businessName}
        systemPrompt={`You are a helpful assistant for ${config.businessName} in ${config.city}, ${config.state}. Services: ${config.services.map((s: ServiceItem) => s.name).join(", ")}. Phone: ${phone}. Keep responses short and friendly. If unsure, suggest calling ${phone}.`}
        greeting="Hi! I can answer questions about services, pricing, or scheduling. What do you need?"
      />

    </main>
  )
}
