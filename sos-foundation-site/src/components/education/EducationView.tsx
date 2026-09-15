"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import MobileNav from "@/components/ui/MobileNav";

// ─── Design tokens ───────────────────────────────────────────────────────────
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

// ─── Hooks (same as AboutView) ───────────────────────────────────────────────

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function mixHex(a: string, b: string, t: number) {
  const A = hexToRgb(a), B = hexToRgb(b);
  return `rgb(${Math.round(lerp(A.r, B.r, t))}, ${Math.round(lerp(A.g, B.g, t))}, ${Math.round(lerp(A.b, B.b, t))})`;
}

function useActiveSection(sectionIds: string[]) {
  const idsKey = sectionIds.join("|");
  const [active, setActive] = useState(sectionIds[0] || "");
  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;
    const ratios = new Map<string, number>();
    let raf = 0;
    const commitBest = () => {
      raf = 0;
      setActive((prev) => {
        let bestId = prev || sectionIds[0] || "";
        let bestScore = -1;
        for (const id of sectionIds) {
          const score = ratios.get(id) ?? 0;
          if (score > bestScore + 1e-6) { bestScore = score; bestId = id; }
        }
        return bestId || prev;
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set((entry.target as HTMLElement).id, entry.isIntersecting ? entry.intersectionRatio : 0);
        if (!raf) raf = window.requestAnimationFrame(commitBest);
      },
      { root: null, threshold: [0, 0.08, 0.15, 0.25, 0.4, 0.55, 0.7], rootMargin: "-84px 0px -40% 0px" }
    );
    for (const el of elements) observer.observe(el);
    return () => { if (raf) window.cancelAnimationFrame(raf); observer.disconnect(); };
  }, [idsKey]);
  return active;
}

function useCenterFocusOpacity(
  targetRef: React.RefObject<HTMLElement | null>,
  { minOpacity = 0, maxOpacity = 1, focusRadius = 0.6 }: { minOpacity?: number; maxOpacity?: number; focusRadius?: number } = {}
) {
  const raw = useMotionValue(maxOpacity);
  const opacity = useSpring(raw, { stiffness: 140, damping: 22, mass: 0.25 });
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vc = window.innerHeight / 2, ec = rect.top + rect.height / 2;
      const maxD = Math.max(1, window.innerHeight * focusRadius);
      const d = Math.abs(ec - vc), cd = d <= 0.4 * maxD ? 0 : d;
      const t = 1 - Math.pow(Math.min(1, cd / maxD), 2);
      raw.set(minOpacity + (maxOpacity - minOpacity) * t * t);
    };
    const handler = () => { if (!raf) raf = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => { if (raf) window.cancelAnimationFrame(raf); window.removeEventListener("scroll", handler); window.removeEventListener("resize", handler); };
  }, [targetRef, raw, minOpacity, maxOpacity, focusRadius]);
  return opacity;
}

// ─── Background crossfade ────────────────────────────────────────────────────

type BgConfig = { image: string; overlay: string; position?: string } | null;

const BG_MAP: Record<string, BgConfig> = {
  "edu-hero": { image: "/pics/edu_01.jpg", overlay: "rgba(8, 24, 36, 0.82)" },
  "edu-philosophy": { image: "/pics/edu_01.jpg", overlay: "rgba(8, 24, 36, 0.82)" },
  "edu-pathway": null,
  "edu-interdisciplinary": { image: "/pics/edu_03.jpg", overlay: "rgba(8, 24, 36, 0.78)" },
  "edu-tracks": null,
};

function BackgroundCrossfade({ active, bgTint }: { active: string; bgTint: string }) {
  const cfg = BG_MAP[active] ?? null;
  const bgKey = cfg ? `${cfg.image}|${cfg.overlay}` : "none";
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <motion.div className="absolute inset-0" initial={false} animate={{ backgroundColor: bgTint }} transition={{ duration: 1, ease: "easeOut" }} />
      <AnimatePresence mode="sync">
        <motion.div key={bgKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="absolute inset-0">
          {cfg?.image && <Image src={cfg.image} alt="Section background" fill className="object-cover" style={{ objectPosition: cfg.position || "center" }} sizes="100vw" priority />}
          {cfg?.overlay && <div className="absolute inset-0" style={{ background: cfg.overlay }} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const COMPARISON = [
  { dimension: "Goal", typical: "Learn science", sos: "Contribute to science" },
  { dimension: "Project", typical: "School projects", sos: "Real-world questions" },
  { dimension: "Support", typical: "Teachers / short camps", sos: "Researchers + mentors" },
  { dimension: "Outcome", typical: "Presentation", sos: "Reviewable contributions" },
];

const TRACKS = [
  {
    num: "01", title: "Community & Communication", color: COLORS.blue,
    desc: "Students learn to communicate science across disciplines and connect with communities who depend on it. Interdisciplinary communication, community connection, and real-world engagement.",
  },
  {
    num: "02", title: "AI Skills", color: COLORS.data,
    desc: "AI literacy becomes a bridge between curiosity and contribution. Students use AI to learn, connect across fields, and support ongoing research.",
  },
  {
    num: "03", title: "Digitize Nature", color: COLORS.green,
    desc: "Students participate in digitizing natural collections and building shared, computable representations of nature through IoBI, Mountain Digital Twins, and open tools.",
  },
  {
    num: "04", title: "Mentored Research", color: COLORS.gold,
    desc: "Students work on real questions alongside working scientists through interdisciplinary projects guided by local researchers and top-institution mentors.",
  },
  {
    num: "05", title: "Real Contributions", color: COLORS.mech,
    desc: "The endpoint is not a grade. It is a contribution that others can build on: Discovery Commons entries, datasets, and publications.",
  },
];

// ─── Spacer ──────────────────────────────────────────────────────────────────
function Spacer() {
  return <div className="mx-auto max-w-6xl px-5 mt-16 md:mt-24"><div className="h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} /></div>;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function EducationView() {
  const sectionIds = useMemo(() => ["edu-hero", "edu-philosophy", "edu-pathway", "edu-interdisciplinary", "edu-tracks"], []);
  const active = useActiveSection(sectionIds);
  const bgTint = useMemo(() => {
    if (active === "edu-hero" || active === "edu-philosophy") return mixHex(DARK_BG, COLORS.green, 0.25);
    if (active === "edu-interdisciplinary") return mixHex(DARK_BG, COLORS.data, 0.3);
    return DARK_BG;
  }, [active]);

  const interdisciplinaryRef = useRef<HTMLDivElement | null>(null);
  const interdisciplinaryOpacity = useCenterFocusOpacity(interdisciplinaryRef);

  return (
    <div className="min-h-screen transition-colors duration-700" style={{ background: bgTint }}>
      <BackgroundCrossfade active={active} bgTint={bgTint} />

      {/* Grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]" style={{
        backgroundImage: "linear-gradient(to right, rgba(31,42,51,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,42,51,0.06) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
      }} />

      <div className="relative z-10">
        {/* ── Header ── */}
        <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(245,247,246,0.72)", borderBottom: "1px solid rgba(31,42,51,0.08)" }}>
          <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <a href="/" className="h-9 w-9 rounded-2xl overflow-hidden hover:opacity-80 transition-opacity">
                <Image src="/logo/SOS-LOGO_v3-icon.svg" alt="SOS Foundation Logo" width={36} height={36} className="h-full w-full object-cover" unoptimized />
              </a>
              <div className="leading-tight">
                <div className="text-m font-semibold" style={{ color: COLORS.ink }}>Sustainability of Sustainability</div>
                <div className="text-xs" style={{ color: "rgba(31,42,51,0.55)" }}>Meaning + Pattern + Mechanism &rarr; Continuity</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-3 text-sm tracking-tight" style={{ color: "rgba(31,42,51,0.75)" }}>
              <a href="/about" className="text-m hover:opacity-80">About</a>
              <a href="/about#about-meaning" className="text-m hover:opacity-80">Meaning</a>
              <a href="/about#about-pattern" className="text-m hover:opacity-80">Pattern</a>
              <a href="/about#about-mechanism" className="text-m hover:opacity-80">Mechanism</a>
              <a href="/about#about-work" className="text-m hover:opacity-80">Work</a>
              <a href="/research" className="text-m hover:opacity-80">Research</a>
              <a href="/education" className="text-m font-semibold" style={{ color: COLORS.blue }}>Education</a>
              <a href="/blog" className="text-m hover:opacity-80">Blog</a>
              <a href="/about#about-involved" className="text-m hover:opacity-80">Join</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="https://www.linkedin.com/company/sos-commons/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-xl transition-opacity hover:opacity-80" style={{ color: "#0A66C2" }}><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/sustainability.dialogue/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-xl transition-opacity hover:opacity-80" style={{ color: "#E1306C" }}><Instagram size={18} /></a>
              <a href="https://www.facebook.com/profile.php?id=61587085297510" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-xl transition-opacity hover:opacity-80" style={{ color: "#1877F2" }}><Facebook size={18} /></a>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a href="/" className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85 shrink-0" style={{ background: COLORS.blue }}>
                <ArrowLeft size={14} /> Home
              </a>
            </div>

            <MobileNav currentPage="/education" />
          </div>
        </header>

        <main>
          {/* ── Hero ── */}
          <section id="edu-hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-8" style={{ background: `${COLORS.green}20`, color: COLORS.green, border: `1px solid ${COLORS.green}40` }}>
                  Cross-cutting layer
                </div>
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white">
                  SOS Education
                </h1>
                <p className="mt-8 text-2xl md:text-3xl leading-relaxed font-medium" style={{ color: COLORS.gold }}>
                  Education should not end with learning.
                </p>
                <p className="text-2xl md:text-3xl leading-relaxed font-medium" style={{ color: COLORS.gold }}>
                  It should lead to real contributions.
                </p>
              </motion.div>
            </div>
          </section>

          <Spacer />

          {/* ── Philosophy — why this matters ── */}
          <section id="edu-philosophy" className="mx-auto max-w-6xl px-5 py-20 md:py-28 flex justify-center">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="max-w-3xl text-center">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Most science education stops at learning
                </h2>
                <p className="mt-6 text-lg leading-relaxed" style={{ color: "rgba(245,247,246,0.75)" }}>
                  Students learn about climate change, biodiversity, and evolution. But they rarely get to contribute to solving those problems. SOS Education connects learning to real, interdisciplinary research from the start.
                </p>
                <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(245,247,246,0.55)" }}>
                  By working alongside researchers across ecology, computer science, design, and data science, students don't just learn about interdisciplinary work. They do it.
                </p>
              </div>
            </motion.div>
          </section>

          <Spacer />

          {/* ── The Missing Pathway — full-width comparison ── */}
          <section id="edu-pathway" className="mx-auto max-w-5xl px-5 py-20 md:py-28">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="text-center mb-14">
                <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: COLORS.gold }}>The Missing Pathway</div>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                  From classroom curiosity<br />to real contribution
                </h2>
              </div>

              {/* Comparison — two columns with center labels */}
              <div className="rounded-3xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                {/* Header */}
                <div className="grid grid-cols-3 border-b" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                  <div className="px-3 py-4 md:px-6 md:py-5 text-center text-xs md:text-sm font-bold tracking-wide uppercase" style={{ color: "rgba(245,247,246,0.45)", background: "rgba(255,255,255,0.02)" }}>
                    Typical Path
                  </div>
                  <div className="px-3 py-4 md:px-6 md:py-5 text-center" style={{ background: "rgba(255,255,255,0.03)" }} />
                  <div className="px-3 py-4 md:px-6 md:py-5 text-center text-xs md:text-sm font-bold tracking-wide uppercase" style={{ color: COLORS.green, background: `${COLORS.green}08` }}>
                    SOS Education
                  </div>
                </div>

                {COMPARISON.map((row) => (
                  <div key={row.dimension} className="grid grid-cols-3 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                    <div className="px-3 py-4 md:px-6 md:py-6 flex items-center justify-center text-center" style={{ color: "rgba(245,247,246,0.4)", background: "rgba(255,255,255,0.01)" }}>
                      <span className="text-xs md:text-base">{row.typical}</span>
                    </div>
                    <div className="px-2 py-4 md:px-4 md:py-6 flex items-center justify-center text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(245,247,246,0.3)" }}>{row.dimension}</span>
                    </div>
                    <div className="px-3 py-4 md:px-6 md:py-6 flex items-center justify-center text-center" style={{ color: COLORS.green, background: `${COLORS.green}05` }}>
                      <span className="text-xs md:text-base font-medium">{row.sos}</span>
                    </div>
                  </div>
                ))}

              </div>
            </motion.div>
          </section>

          <Spacer />

          {/* ── Interdisciplinary Research — immersive section ── */}
          <section id="edu-interdisciplinary" className="relative w-full min-h-[80vh] overflow-hidden flex items-center">
            <motion.div
              ref={interdisciplinaryRef}
              style={{ opacity: interdisciplinaryOpacity }}
              className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-32"
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                <div className="md:col-span-7">
                  <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-6" style={{ background: `${COLORS.data}20`, color: COLORS.data }}>
                    Core Principle
                  </div>
                  <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-white">
                    Interdisciplinary research is the education
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed" style={{ color: "rgba(245,247,246,0.80)" }}>
                    In SOS Education, research is not a reward for finishing coursework. It is the coursework. Students enter real projects that span ecology, data science, AI, design, and community engagement from day one.
                  </p>
                  <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(245,247,246,0.60)" }}>
                    A student digitizing moth specimens learns biology, imaging technology, data management, and scientific communication simultaneously because the project demands it. This is not a simulation. The data they produce enters Discovery Commons. The analyses they run contribute to publications. The tools they build become part of IoBI.
                  </p>
                </div>
                <div className="md:col-span-5">
                  <div className="rounded-3xl border p-6 md:p-8 h-full flex flex-col justify-center" style={{ background: "rgba(31,42,51,0.88)", borderColor: "rgba(255,255,255,0.06)" }}>
                    <div className="text-sm font-medium tracking-wide text-white/50 mb-4">What makes it different</div>
                    <div className="space-y-5">
                      {[
                        { label: "Not simulated", detail: "Real research questions, real data, real publications" },
                        { label: "Not siloed", detail: "Every project crosses at least two disciplines" },
                        { label: "Not temporary", detail: "Contributions persist in Discovery Commons and IoBI" },
                        { label: "Not unsupported", detail: "Active mentorship from Harvard-affiliated researchers" },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="text-sm font-semibold text-white">{item.label}</div>
                          <div className="text-xs mt-0.5" style={{ color: "rgba(245,247,246,0.55)" }}>{item.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <Spacer />

          {/* ── Five Tracks ── */}
          <section id="edu-tracks" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="text-center mb-14">
                <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: COLORS.data }}>Five Tracks</div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  A pathway from curiosity to contribution
                </h2>
                <p className="mt-4 text-base leading-relaxed mx-auto max-w-2xl" style={{ color: "rgba(245,247,246,0.55)" }}>
                  Each track builds on the last. Together they form a complete pipeline from engagement to lasting impact.
                </p>
              </div>
            </motion.div>

            {/* Track cards — staggered 2-column on desktop, stacked on mobile */}
            <div className="space-y-5">
              {TRACKS.map((track, i) => (
                <motion.div
                  key={track.num}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                  className="rounded-3xl border p-6 md:p-8 flex flex-col md:flex-row items-start gap-5"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="text-4xl font-bold shrink-0 w-16 text-center" style={{ color: track.color, opacity: 0.7 }}>
                    {track.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{track.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(245,247,246,0.6)" }}>{track.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="border-t" style={{ borderColor: "rgba(31,42,51,0.10)" }}>
          <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold" style={{ color: COLORS.bg }}>Sustainability of Sustainability</div>
              <div className="mt-1 text-xs" style={{ color: COLORS.bg }}>Meaning + Pattern + Mechanism &rarr; Continuity</div>
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
