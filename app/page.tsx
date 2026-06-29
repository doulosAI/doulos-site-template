"use client"

import { useState, useEffect } from "react"
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
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current text-primary" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const phone   = config.phone
  const telHref = `tel:${phone.replace(/\D/g, "")}`

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--cx", `${e.clientX}px`)
      document.documentElement.style.setProperty("--cy", `${e.clientY}px`)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <>
      <div className="cursor-glow" aria-hidden="true" />
      <main className="flex flex-col min-h-[100dvh] pb-16 md:pb-0">

        {/* ── Hero ── */}
        <section
          id="home"
          className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
        >
          {config.heroImageUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${config.heroImageUrl}?w=1920&auto=format&q=80')` }}
            />
          )}
          <div className="absolute inset-0 bg-background/75" />
          {config.heroImageUrl ? (
            <>
              <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/25 blur-[130px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[100px] pointer-events-none" />
            </>
          ) : (
            <AmbientBackground />
          )}

          <div className="relative z-10 w-full max-w-3xl mx-auto">
            <SectionReveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary bg-primary/10 border border-primary/25 px-4 py-1.5 mb-8 tracking-widest uppercase">
                📍 {config.hero.eyebrow}
              </span>
            </SectionReveal>

            <h1 className="text-[clamp(3rem,8vw,6rem)] font-display font-bold leading-[0.95] tracking-tight mb-6 uppercase">
              <TextReveal text={config.hero.headline} />
              <br />
              <span className="text-primary">
                <TextReveal text={config.hero.subheadline} delay={0.3} />
              </span>
            </h1>

            <SectionReveal delay={0.5}>
              <p className="text-base sm:text-lg text-foreground/70 mb-10 max-w-xl mx-auto leading-relaxed">
                {config.hero.tagline}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.65}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.a
                  href={telHref}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 bg-primary text-primary-foreground font-bold text-base tracking-wide uppercase hover:bg-primary/90 transition-colors"
                >
                  📞 {phone}
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center min-h-[52px] px-8 border border-foreground/30 font-semibold text-base tracking-wide uppercase hover:border-primary hover:text-primary transition-colors"
                >
                  Free Estimate →
                </motion.a>
              </div>
            </SectionReveal>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="text-[10px] tracking-widest uppercase text-foreground/35">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent" />
          </motion.div>
        </section>

        {/* ── Trust Strip ── */}
        {config.trustItems && config.trustItems.length > 0 && (
          <div className="border-y border-border bg-muted/20">
            <div className="max-w-5xl mx-auto px-6 py-5">
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
                {config.trustItems.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Stats ── */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <StaggerContainer className="grid grid-cols-3 gap-8">
              {config.stats.map((stat: StatItem, i: number) => (
                <StaggerItem key={i}>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground tracking-widest uppercase">{stat.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="py-20 px-6 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <SectionReveal>
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4 text-center">About Us</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 leading-tight uppercase text-center">
                {config.about.heading}
              </h2>
              <div className="h-0.5 w-16 bg-primary mb-10 mx-auto" />
            </SectionReveal>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <SectionReveal>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{config.about.body}</p>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-primary tracking-wide uppercase hover:opacity-70 transition-opacity"
                >
                  Call Us Today →
                </a>
              </SectionReveal>

              {config.reviews.length > 0 && (
                <SectionReveal delay={0.2}>
                  <div className="bg-background border border-border p-8 relative">
                    <div className="text-8xl font-display font-bold text-primary/10 absolute -top-6 left-4 leading-none select-none pointer-events-none">&ldquo;</div>
                    <div className="mb-3"><Stars count={config.reviews[0].stars} /></div>
                    <p className="text-lg font-medium leading-relaxed italic relative z-10">
                      &ldquo;{config.reviews[0].text}&rdquo;
                    </p>
                    <div className="mt-5 pt-5 border-t border-border">
                      <p className="font-bold text-sm">{config.reviews[0].name}</p>
                      <p className="text-xs text-muted-foreground">{config.reviews[0].role}</p>
                    </div>
                  </div>
                </SectionReveal>
              )}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <SectionReveal>
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3 text-center">What We Do</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center uppercase">Every Project. Done Right.</h2>
            </SectionReveal>

            <StaggerContainer className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {config.services.map((svc: ServiceItem, i: number) => (
                <StaggerItem key={i}>
                  <div className="bg-background p-7 hover:bg-muted/40 transition-colors group h-full">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <span className="text-xl">{svc.icon}</span>
                    </div>
                    <p className="font-display font-bold uppercase tracking-wide text-sm mb-2">{svc.name}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="md:hidden">
              <SwipeableCards>
                {config.services.map((svc: ServiceItem, i: number) => (
                  <div key={i} className="shrink-0 w-56 border border-border bg-muted/40 p-5">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-xl">{svc.icon}</span>
                    </div>
                    <p className="font-display font-bold mb-1 text-sm uppercase tracking-wide">{svc.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{svc.desc}</p>
                  </div>
                ))}
              </SwipeableCards>
            </div>
          </div>
        </section>

        {/* ── Reviews ── */}
        {config.reviews.length > 0 && (
          <section id="reviews" className="py-20 px-6 bg-muted/20">
            <div className="max-w-5xl mx-auto">
              <SectionReveal>
                <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3 text-center">Client Reviews</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center uppercase">Straight From the People We Serve</h2>
              </SectionReveal>

              <StaggerContainer className="hidden md:grid md:grid-cols-3 gap-px bg-border">
                {config.reviews.map((r: ReviewItem, i: number) => (
                  <StaggerItem key={i}>
                    <div className="bg-background p-7 h-full flex flex-col">
                      <div className="mb-3"><Stars count={r.stars} /></div>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 italic">&ldquo;{r.text}&rdquo;</p>
                      <div className="pt-4 border-t border-border">
                        <p className="font-bold text-sm">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.role}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="md:hidden">
                <SwipeableCards>
                  {config.reviews.map((r: ReviewItem, i: number) => (
                    <div key={i} className="shrink-0 w-72 border border-border bg-background p-6 flex flex-col">
                      <div className="mb-3"><Stars count={r.stars} /></div>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 italic">&ldquo;{r.text}&rdquo;</p>
                      <div className="pt-4 border-t border-border">
                        <p className="font-bold text-sm">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.role}</p>
                      </div>
                    </div>
                  ))}
                </SwipeableCards>
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <SectionReveal>
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-10 uppercase">Common Questions</h2>
            </SectionReveal>
            {config.faq.map((item: FaqItem, i: number) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="border-b border-border">
                  <button
                    className="w-full text-left flex justify-between items-center gap-4 py-5 min-h-[52px] group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-medium text-sm md:text-base group-hover:text-primary transition-colors">{item.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-primary shrink-0 text-xl leading-none"
                    >+</motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed pb-5">{item.a}</p>
                  </motion.div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ── CTA — amber background ── */}
        <section id="contact" className="py-24 px-6 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")' }} />
          <div className="relative max-w-2xl mx-auto text-center">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary-foreground uppercase leading-tight">
                {config.cta.heading}
              </h2>
              <p className="text-primary-foreground/80 mb-10 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
                {config.cta.body}
              </p>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <motion.a
                href={telHref}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-3 min-h-[56px] px-10 bg-primary-foreground text-primary font-bold text-lg uppercase tracking-wide hover:opacity-90 transition-opacity"
              >
                📞 Call {phone}
              </motion.a>
              <p className="text-sm text-primary-foreground/60 mt-4">{config.serviceArea}</p>
            </SectionReveal>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-6 px-6 bg-black border-t border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="font-display font-bold uppercase tracking-widest text-white/50 text-xs">
              {config.businessName}
            </div>
            <div className="flex items-center gap-6 text-xs text-white/30">
              <a href={telHref} className="hover:text-primary transition-colors">{phone}</a>
              <span>{config.city}, {config.state}</span>
            </div>
          </div>
        </footer>

        <ChatbotWidget
          businessName={config.businessName}
          systemPrompt={`You are a helpful assistant for ${config.businessName} in ${config.city}, ${config.state}. Services: ${config.services.map((s: ServiceItem) => s.name).join(", ")}. Phone: ${phone}. Keep responses short and friendly. If unsure, suggest calling ${phone}.`}
          greeting="Hi! I can answer questions about services, pricing, or scheduling. What do you need?"
        />

      </main>
    </>
  )
}
