"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  BookOpen,
  Microscope,
  Database,
  Mail,
  ExternalLink,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import MobileNav from "@/components/ui/MobileNav";

// ─── Design tokens — identical to main site ──────────────────────────────────
const COLORS = {
  ink: "#1F2A33",
  bg: "#F5F7F6",
  blue: "#2F5D8A",
  green: "#3F8F6B",
  gold: "#E0B63E",
  art: "#5FA58B",
  data: "#2E9C9A",
  mech: "#C9A23A",
};

const DARK_BG = "#081824";

const IMPACT_AREAS = [
  {
    icon: Microscope,
    label: "Research",
    color: COLORS.data,
    description:
      "Fund biodiversity digitization, ecological fieldwork, and open-access publications that make nature's patterns available to the scientific community.",
  },
  {
    icon: BookOpen,
    label: "Education",
    color: COLORS.green,
    description:
      "Support mentored research experiences, AI skills training, and community science programs that connect people to the work of sustainability.",
  },
  {
    icon: Database,
    label: "Open Data Infrastructure",
    color: COLORS.mech,
    description:
      "Build and maintain the shared datasets, tools, and platforms — including the Internet of Bioinspiration (IoBI) and Discovery Commons — that make nature's knowledge accessible to all.",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function DonateView() {
  return (
    <div className="min-h-screen" style={{ background: DARK_BG }}>
      {/* Background grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(31,42,51,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,42,51,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
        }}
      />

      <div className="relative z-10">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-50 backdrop-blur-xl"
          style={{ background: "rgba(245,247,246,0.72)", borderBottom: "1px solid rgba(31,42,51,0.08)" }}
        >
          <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <a href="/" className="h-9 w-9 rounded-2xl overflow-hidden hover:opacity-80 transition-opacity">
                <Image src="/logo/SOS-LOGO_v3-icon.svg" alt="SOS Foundation Logo" width={36} height={36} className="h-full w-full object-cover" unoptimized />
              </a>
              <div className="leading-tight">
                <div className="text-m font-semibold" style={{ color: COLORS.ink }}>
                  Sustainability of Sustainability
                </div>
                <div className="text-xs" style={{ color: "rgba(31,42,51,0.55)" }}>
                  Meaning + Pattern + Mechanism &rarr; Continuity
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-3 text-sm tracking-tight" style={{ color: "rgba(31,42,51,0.75)" }}>
              <a href="/about" className="text-m hover:opacity-80">About</a>
              <a href="/about#about-meaning" className="text-m hover:opacity-80">Meaning</a>
              <a href="/about#about-pattern" className="text-m hover:opacity-80">Pattern</a>
              <a href="/about#about-mechanism" className="text-m hover:opacity-80">Mechanism</a>
              <a href="/about#about-work" className="text-m hover:opacity-80">Work</a>
              <a href="/research" className="text-m hover:opacity-80">Research</a>
              <a href="/education" className="text-m hover:opacity-80">Education</a>
              <a href="/blog" className="text-m hover:opacity-80">Blog</a>
              <a href="/about#about-involved" className="text-m hover:opacity-80">Join</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="https://www.linkedin.com/company/sos-commons/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-xl transition-opacity hover:opacity-80" style={{ color: "#0A66C2" }}><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/sustainability.dialogue/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-xl transition-opacity hover:opacity-80" style={{ color: "#E1306C" }}><Instagram size={18} /></a>
              <a href="https://www.facebook.com/profile.php?id=61587085297510" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-xl transition-opacity hover:opacity-80" style={{ color: "#1877F2" }}><Facebook size={18} /></a>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/"
                className="hidden md:inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85 shrink-0"
                style={{ background: COLORS.blue }}
              >
                <ArrowLeft size={14} /> SOS Foundation
              </a>
            </div>

            <MobileNav currentPage="/donate" />
          </div>
        </header>

        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="relative w-full min-h-[60svh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${DARK_BG} 0%, rgba(63,143,107,0.12) 100%)` }} />

            <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center py-24 md:py-32">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Image
                  src="/logo/SOS-LOGO_v2-for_SVG.svg"
                  alt="SOS Foundation logo"
                  width={96}
                  height={40}
                  className="mx-auto opacity-100"
                  style={{
                    filter: "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg)",
                  }}
                  unoptimized
                />
                <div className="mt-2 text-xs font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.60)" }}>
                  Sustainability of Sustainability Foundation
                </div>

                <h1 className="mt-8 text-5xl md:text-6xl font-semibold tracking-tight text-white">
                  Support SOS Foundation
                </h1>
                <p className="mt-5 text-xl md:text-2xl leading-relaxed" style={{ color: "rgba(245,247,246,0.85)" }}>
                  Every contribution helps sustain humanity&apos;s ability to learn from nature.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── What Donations Support ────────────────────────────────────── */}
          <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: COLORS.gold }}>
                Your Impact
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                What Your Support Makes Possible
              </h2>
            </motion.div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {IMPACT_AREAS.map((area, i) => (
                <motion.div
                  key={area.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className="rounded-3xl border p-6"
                  style={{ borderColor: "rgba(31,42,51,0.10)", background: "rgba(245,247,246,0.92)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${area.color}15` }}
                    >
                      <area.icon size={20} style={{ color: area.color }} />
                    </div>
                    <div className="text-sm font-semibold" style={{ color: area.color }}>
                      {area.label}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(31,42,51,0.72)" }}>
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Contact & Form ────────────────────────────────────────────── */}
          <section className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl border p-6 md:p-10"
              style={{ borderColor: "rgba(31,42,51,0.10)", background: "rgba(245,247,246,0.92)" }}
            >
              <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: COLORS.blue }}>
                Get in Touch
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: COLORS.ink }}>
                Ways to Support
              </h2>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-base leading-relaxed" style={{ color: "rgba(31,42,51,0.78)" }}>
                    For investment inquiries or to discuss supporting SOS, contact us directly:
                  </p>
                  <a
                    href="mailto:sos.initiative.org@gmail.com"
                    className="inline-flex items-center gap-1.5 text-sm mt-2 hover:opacity-80 transition-opacity"
                    style={{ color: COLORS.blue }}
                  >
                    <Mail size={14} />
                    sos.initiative.org@gmail.com
                  </a>
                </div>

                <div className="h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} />

                <div>
                  <p className="text-base leading-relaxed" style={{ color: "rgba(31,42,51,0.78)" }}>
                    Leave your information and we&apos;ll follow up:
                  </p>
                  <a
                    href="https://forms.gle/kzxSKDewYjhxLeyBA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-[0.97]"
                    style={{ background: COLORS.blue }}
                  >
                    Interest Form <ExternalLink size={14} />
                  </a>
                </div>

                <div className="h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} />

                <div
                  className="rounded-2xl p-4"
                  style={{ background: "rgba(47,93,138,0.06)" }}
                >
                  <p className="text-sm" style={{ color: "rgba(31,42,51,0.55)" }}>
                    Online donation options are coming soon. In the meantime, please reach out via the form above or email to discuss how you&apos;d like to contribute.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ── Tax Deduction Note ────────────────────────────────────────── */}
          <section className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl border p-6 md:p-8 text-center"
              style={{ borderColor: "rgba(31,42,51,0.10)", background: "rgba(245,247,246,0.05)" }}
            >
              <div className="flex justify-center mb-4">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${COLORS.green}15` }}
                >
                  <Heart size={24} style={{ color: COLORS.green }} />
                </div>
              </div>
              <p className="text-base font-medium text-white">
                Tax-Deductible Contributions
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(245,247,246,0.65)" }}>
                SOS Foundation is a 501(c)(3) public charity. Contributions are tax-deductible to the extent allowed by law.
              </p>
              <p className="mt-1 text-xs tracking-wide" style={{ color: "rgba(245,247,246,0.45)" }}>
                EIN: 41-3097632
              </p>
            </motion.div>
          </section>
        </main>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <footer className="border-t" style={{ borderColor: "rgba(31,42,51,0.10)" }}>
          <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold" style={{ color: COLORS.bg }}>Sustainability of Sustainability</div>
              <div className="mt-1 text-xs" style={{ color: COLORS.bg }}>
                Meaning + Pattern + Mechanism &rarr; Continuity
              </div>
            </div>
            <div className="text-xs" style={{ color: COLORS.bg }}>
              &copy; {new Date().getFullYear()} Sustainability of Sustainability
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
