"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Mail,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import { WORK, type WorkCard } from "@/content/home/work";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MobileNav from "@/components/ui/MobileNav";
import { POSTS, formatDate, getAuthor, getCategory } from "@/content/blog";
import { HIGHLIGHT_SLUGS, HIGHLIGHT_ROTATION_MS } from "@/content/blog/highlights";

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

// ─── Shared hooks (same logic as HomeView) ───────────────────────────────────

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
        for (const entry of entries) {
          ratios.set((entry.target as HTMLElement).id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
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
      const vc = window.innerHeight / 2;
      const ec = rect.top + rect.height / 2;
      const maxD = Math.max(1, window.innerHeight * focusRadius);
      const d = Math.abs(ec - vc);
      const cd = d <= 0.4 * maxD ? 0 : d;
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

// ─── Background crossfade — same pattern as HomeView ─────────────────────────

type BgConfig = { image: string; overlay: string; position?: string } | null;

const BG_MAP: Record<string, BgConfig> = {
  "about-hero": { image: "/pics/Vision_bg.jpg", overlay: "rgba(8, 24, 36, 0.88)", position: "center top -100px" },
  "about-mission": { image: "/pics/Vision_bg.jpg", overlay: "rgba(8, 24, 36, 0.88)", position: "center top -100px" },
  "about-meaning": { image: "/pics/meaning_img.JPG", overlay: "linear-gradient(180deg, rgba(31,42,51,0) 0%, rgba(31,42,51,0.10) 6%, rgba(0,0,0,0.58) 100%)" },
  "about-pattern": { image: "/pics/pattern.JPG", overlay: "linear-gradient(180deg, rgba(6,50,3,0.2) 5%, rgba(4,34,2,0.4) 22%, rgba(4,34,2,0.70) 100%)" },
  "about-mechanism": { image: "/pics/mechanism.JPG", overlay: "linear-gradient(180deg, rgba(106,66,81,0.20) 5%, rgba(106,66,81,0.4) 8%, rgba(0,0,0,0.7) 100%)" },
  "about-research-education": { image: "/pics/mountains.jpg", overlay: "linear-gradient(180deg, rgba(8,24,36,0.75) 0%, rgba(8,24,36,0.85) 50%, rgba(8,24,36,0.90) 100%)" },
  "about-work": { image: "/pics/involved.JPG", overlay: "rgba(8, 24, 36, 0.72)" },
  "about-blog": { image: "/pics/involved.JPG", overlay: "rgba(8, 24, 36, 0.72)" },
  "about-involved": { image: "/pics/involved.JPG", overlay: "rgba(8, 24, 36, 0.72)" },
  "about-legal": { image: "/pics/involved.JPG", overlay: "rgba(8, 24, 36, 0.72)" },
};

function BackgroundCrossfade({ active, bgTint }: { active: string; bgTint: string }) {
  const cfg = BG_MAP[active] ?? null;
  // Use image+overlay as key so identical backgrounds don't trigger a transition
  const bgKey = cfg ? `${cfg.image}|${cfg.overlay}` : "none";

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ backgroundColor: bgTint }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <AnimatePresence mode="sync">
        <motion.div
          key={bgKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {cfg?.image && (
            <Image src={cfg.image} alt="Section background" fill className="object-cover" style={{ objectPosition: cfg.position || "center" }} sizes="100vw" priority />
          )}
          {cfg?.overlay && <div className="absolute inset-0" style={{ background: cfg.overlay }} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Pillar section — no per-section bg image (handled by crossfade) ─────────

function PillarSection({
  id, name, question, thesis, anchors, explainTitle, explainBody, color, reverse = false,
}: {
  id: string; name: string; question: string; thesis: string; anchors: string[];
  explainTitle: string; explainBody: string; color: string; reverse?: boolean;
}) {
  const focusRef = useRef<HTMLDivElement | null>(null);
  const focusOpacity = useCenterFocusOpacity(focusRef);

  const questionCard = (
    <div className="md:col-span-8">
      <div className="rounded-3xl border p-6 md:p-10" style={{ background: "transparent", borderColor: "rgba(255,255,255,0.0)" }}>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/85">
          <span className="text-lg font-semibold">{name}</span>
        </div>
        <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-white md:text-5xl">{question}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80 md:text-2xl">{thesis}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {anchors.map((a) => (
            <span key={a} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/75">{a}</span>
          ))}
        </div>
      </div>
    </div>
  );

  const explainCard = (
    <div className="md:col-span-4">
      <div className="h-full rounded-3xl p-6 md:p-8 border flex flex-col" style={{ background: "rgba(31,42,51,0.92)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div>
          <div className="mb-4">
            <div className="text-sm font-medium tracking-wide text-white/60">{explainTitle}</div>
            <div className="mt-2 h-[2px] w-10 rounded-full" style={{ background: color, opacity: 0.7 }} />
          </div>
          <h3 className="text-lg font-semibold text-white">What is happening in this division?</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/78">{explainBody}</p>
        </div>
        <div className="mt-auto rounded-2xl bg-white/5 p-4">
          <div className="text-xs font-medium text-white/60">This layer takes shape through:</div>
          <ul className="mt-2 space-y-2 text-sm text-white/80">
            {anchors.map((a) => (
              <li key={a} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full" style={{ background: color, opacity: 0.8 }} />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <section id={id} className="relative w-full min-h-screen overflow-hidden flex items-center">
      <motion.div
        ref={focusRef}
        style={{ opacity: focusOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-32 -translate-y-6 md:-translate-y-20"
      >
        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-12">
          {reverse ? <>{explainCard}{questionCard}</> : <>{questionCard}{explainCard}</>}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const BOARD_MEMBERS = [
  { name: "Dr. Cong Liu", color: COLORS.data },
  { name: "Dr. Wei-Ping Chan", color: COLORS.art },
  { name: "Cheng-An Lee", color: COLORS.mech },
];

const EDUCATION_TRACKS = [
  { label: "Community & Communication", desc: "Interdisciplinary dialogue, community connection, real-world engagement" },
  { label: "AI Skills", desc: "Use AI to learn, connect across fields, and support research" },
  { label: "Digitize Nature", desc: "IoBI, Mountain Digital Twins, and open tools" },
  { label: "Mentored Research", desc: "Interdisciplinary projects with top-institution mentors" },
  { label: "Real Contributions", desc: "Discovery Commons, datasets, publications" },
];

// ─── Spacer ──────────────────────────────────────────────────────────────────
function Spacer() {
  return (
    <div className="mx-auto max-w-6xl px-5 mt-20 md:mt-28">
      <div className="h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} />
    </div>
  );
}

// ─── Work card (same rendering as HomeView) ─────────────────────────────────
function AboutWorkCard({ card }: { card: WorkCard }) {
  const m = card.media;
  const tone = card.tone;
  const bg = tone === "meaning"
    ? "linear-gradient(135deg, rgba(46,102,80,0.18), rgba(245,247,246,0.0))"
    : tone === "pattern"
    ? "linear-gradient(135deg, rgba(47,93,138,0.16), rgba(245,247,246,0.0))"
    : tone === "mechanism"
    ? "linear-gradient(135deg, rgba(31,42,51,0.14), rgba(245,247,246,0.0))"
    : "linear-gradient(135deg, rgba(224,182,62,0.14), rgba(245,247,246,0.0))";

  return (
    <div className={`relative overflow-hidden rounded-3xl border ${card.aspect}`} style={{ borderColor: "rgba(31,42,51,0.12)", background: bg }}>
      <div className="absolute inset-0">
        {m.kind === "iframe" ? (
          <iframe title={m.title} src={m.src} className="h-full w-full" style={{ border: 0 }} allow={m.allow ?? "autoplay; fullscreen"} allowFullScreen loading="lazy" />
        ) : (
          <Image src={m.src} alt={m.alt ?? card.caption ?? ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        )}
      </div>
      {card.topBadge && (
        <div className="pointer-events-none absolute inset-0 p-4 flex items-start justify-start">
          <div className="rounded-full px-3 py-1 text-[11px] tracking-wide" style={{ background: "rgba(31,42,51,0.75)", color: "white", border: "1px solid rgba(255,255,255,0.14)", backdropFilter: "blur(6px)" }}>
            {card.topBadge}
          </div>
        </div>
      )}
      {card.caption && (
        <div className="pointer-events-none absolute inset-0 flex items-end p-4">
          <div className="rounded-2xl px-3 py-2 text-xs" style={{ background: "rgba(31,42,51,0.85)", color: "white", border: "1px solid rgba(255,255,255,0.10)" }}>
            {card.caption}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Role cards for Get Involved ─────────────────────────────────────────────
const FORM_URL = "https://forms.gle/kzxSKDewYjhxLeyBA";

const ROLE_CARDS = [
  { title: "Artists, Curators & Cultural Producers", body: "Meaning: translate sustainability into shared language through art, culture, and lived experience.", color: COLORS.art, bgImage: "/pics/aritsts.jpg" },
  { title: "Museums, Universities & Researchers", body: "Pattern: turn nature and collections into shared, computable representations through digitization and open datasets.", color: COLORS.data, bgImage: "/pics/museums.JPG" },
  { title: "Entrepreneurs & System Builders", body: "Mechanism: build open knowledge infrastructure so nature’s design intelligence becomes accessible to all.", color: COLORS.mech, bgImage: "/pics/industry.JPG" },
  { title: "Partners, Funders & Hosts", body: "Continuity: provide the support that lets projects persist and compound — funding, hosting, and long-term stewardship.", color: COLORS.blue, bgImage: "/pics/partners.JPG" },
  { title: "Educators, Schools & Learning Institutions", body: "Foundation: embed sustainability into learning at every level through curricula, workshops, and youth engagement.", color: COLORS.green, bgImage: "/pics/education.jpg" },
];

function AboutRoleCard({ title, body, color, bgImage }: { title: string; body: string; color: string; bgImage: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Card
      className="group rounded-3xl overflow-hidden min-h-110 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      style={{ borderColor: "rgba(31,42,51,0.10)" }}
      role="button" tabIndex={0} aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((v) => !v); } }}
    >
      <div className="relative h-full">
        <div className="absolute inset-0">
          <Image src={bgImage} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 20vw" />
          <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-60 group-focus-within:opacity-60 ${open ? "opacity-60" : ""}`} style={{ background: "rgb(31,42,51)" }} />
        </div>
        <CardContent className="relative flex h-full flex-col p-4">
          <div className="flex-1">
            <div className="w-full px-1 py-1 text-lg font-semibold text-center" style={{ color: COLORS.bg, background: `${color}DD` }}>{title}</div>
            <div className={`overflow-hidden transition-all duration-300 ease-out max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 group-focus-within:max-h-96 group-focus-within:opacity-100 ${open ? "max-h-96 opacity-100" : ""}`}>
              <p className="mt-5 text-m" style={{ color: COLORS.bg }}>{body}</p>
            </div>
          </div>
          <div className="mt-auto">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-2xl border-2 border-white px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85" style={{ background: color }}>Reach out</a>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// ─── Blog mini slider — same rotating pattern as Blog page hero ──────────────
function AboutBlogSlider() {
  const highlightPosts = useMemo(() => {
    if (HIGHLIGHT_SLUGS.length === 0) return POSTS.slice(0, 2);
    return HIGHLIGHT_SLUGS.map((s) => POSTS.find((p) => p.slug === s)).filter(Boolean) as typeof POSTS;
  }, []);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const safeIdx = highlightPosts.length > 0 ? idx % highlightPosts.length : 0;
  const current = highlightPosts[safeIdx];

  useEffect(() => {
    if (highlightPosts.length < 2 || paused) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % highlightPosts.length), HIGHLIGHT_ROTATION_MS);
    return () => window.clearInterval(id);
  }, [highlightPosts.length, paused]);

  if (!current) return null;

  const author = getAuthor(current.authorId);
  const accent = current.accent ?? COLORS.data;
  const hasMultiple = highlightPosts.length > 1;

  return (
    <div
      className="relative rounded-3xl overflow-hidden min-h-[340px] md:min-h-[400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image crossfade */}
      <AnimatePresence>
        <motion.div
          key={current.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image src={current.cover} alt={current.coverAlt ?? current.title} fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,24,36,0.50) 0%, rgba(8,24,36,0.82) 60%, rgba(8,24,36,0.92) 100%)" }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10 min-h-[340px] md:min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug + "-c"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide" style={{ background: `${accent}1F`, color: accent }}>Featured</span>
              {(current.tags ?? []).slice(0, 2).map((tag) => {
                const cat = getCategory(tag);
                return <span key={tag} className="rounded-full px-3 py-1 text-[11px] font-medium" style={{ background: "rgba(255,255,255,0.08)", color: cat.color, border: `1px solid ${cat.color}55` }}>{cat.label}</span>;
              })}
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{current.title}</h3>
            <p className="mt-2 max-w-xl text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.70)" }}>{current.excerpt}</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full overflow-hidden bg-white/10">
                  <Image src={author.avatar} alt={author.name} width={24} height={24} className="h-full w-full object-cover" />
                </div>
                <span className="text-xs text-white/60">{author.name} · {formatDate(current.date)}</span>
              </div>
              <a href={`/blog/${current.slug}`} className="inline-flex items-center gap-1.5 rounded-2xl px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85" style={{ background: COLORS.blue }}>
                Read <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        {hasMultiple && (
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-1.5">
            {highlightPosts.map((p, i) => (
              <button key={p.slug} type="button" onClick={() => setIdx(i)} aria-label={`Go to post ${i + 1}`}
                className="flex items-center justify-center min-w-[28px] min-h-[28px]"
              >
                <span className="rounded-full transition-all block" style={{ width: i === safeIdx ? 24 : 8, height: 8, background: i === safeIdx ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)" }} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AboutView() {
  const sectionIds = useMemo(() => [
    "about-hero", "about-mission", "about-meaning", "about-pattern", "about-mechanism",
    "about-research-education", "about-work", "about-blog", "about-involved", "about-legal",
  ], []);
  const active = useActiveSection(sectionIds);

  const bgTint = useMemo(() => {
    if (active === "about-hero") return mixHex(DARK_BG, "#007B33", 0.35);
    if (active === "about-meaning") return mixHex(DARK_BG, COLORS.art, 0.55);
    if (active === "about-pattern") return mixHex(DARK_BG, COLORS.data, 0.55);
    if (active === "about-mechanism") return mixHex(DARK_BG, COLORS.mech, 0.55);
    return DARK_BG;
  }, [active]);

  return (
    <div className="min-h-screen transition-colors duration-700" style={{ background: bgTint }}>
      <BackgroundCrossfade active={active} bgTint={bgTint} />

      {/* Background grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(31,42,51,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,42,51,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
        }}
      />

      <div className="relative z-10">
        {/* ── Header ── */}
        <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(245,247,246,0.72)", borderBottom: "1px solid rgba(31,42,51,0.08)" }}>
          <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <a href="/" className="h-9 w-9 rounded-2xl overflow-hidden shrink-0 hover:opacity-80 transition-opacity">
                <Image src="/logo/SOS-LOGO_v3-icon.svg" alt="SOS Foundation Logo" width={36} height={36} className="h-full w-full object-cover" unoptimized />
              </a>
              <div className="leading-tight">
                <div className="text-m font-semibold" style={{ color: COLORS.ink }}>Sustainability of Sustainability</div>
                <div className="hidden sm:block text-xs" style={{ color: "rgba(31,42,51,0.55)" }}>Meaning + Pattern + Mechanism &rarr; Continuity</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-3 text-sm tracking-tight" style={{ color: "rgba(31,42,51,0.75)" }}>
              <a href="/" className="text-m font-semibold" style={{ color: COLORS.blue }}>About</a>
              <a href="#about-meaning" className="text-m hover:opacity-80">Meaning</a>
              <a href="#about-pattern" className="text-m hover:opacity-80">Pattern</a>
              <a href="#about-mechanism" className="text-m hover:opacity-80">Mechanism</a>
              <a href="#about-work" className="text-m hover:opacity-80">Work</a>
              <a href="/research" className="text-m hover:opacity-80">Research</a>
              <a href="/education" className="text-m hover:opacity-80">Education</a>
              <a href="/blog" className="text-m hover:opacity-80">Blog</a>
              <a href="#about-involved" className="text-m hover:opacity-80">Join</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="https://www.linkedin.com/company/sos-commons/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-xl transition-opacity hover:opacity-80" style={{ color: "#0A66C2" }}><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/sustainability.dialogue/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-xl transition-opacity hover:opacity-80" style={{ color: "#E1306C" }}><Instagram size={18} /></a>
              <a href="https://www.facebook.com/profile.php?id=61587085297510" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-xl transition-opacity hover:opacity-80" style={{ color: "#1877F2" }}><Facebook size={18} /></a>
            </div>

            <div className="hidden md:flex items-center gap-2 shrink-0">
              <a href="/" className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85 shrink-0" style={{ background: COLORS.blue }}>
                <ArrowLeft size={14} /> Home
              </a>
            </div>

            <MobileNav currentPage="/" />
          </div>
        </header>

        <main>
          {/* ── Hero ── */}
          <section id="about-hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                <Image
                  src="/logo/SOS-LOGO_v2-for_SVG.svg" alt="SOS Foundation logo" width={192} height={88}
                  className="mx-auto h-14 w-32 md:h-22 md:w-48 opacity-90"
                  style={{ filter: "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg)" }}
                  unoptimized
                />
                <div className="mt-1 text-xs font-medium tracking-wide" style={{ color: "rgba(245,247,246,0.6)" }}>
                  Sustainability of Sustainability Foundation
                </div>
                <h1 className="mt-10 text-5xl md:text-6xl font-semibold tracking-tight text-white">
                  Sustaining humanity&apos;s ability to learn from nature
                </h1>
                <p className="mt-5 text-xl md:text-2xl leading-relaxed" style={{ color: "rgba(245,247,246,0.75)" }}>
                  We work across research, education, and open knowledge infrastructure to ensure that what nature teaches us is never lost.
                </p>
                <p className="mt-3 text-sm tracking-wide" style={{ color: "rgba(245,247,246,0.4)" }}>
                  501(c)(3) public charity &middot; since 2025
                </p>
              </motion.div>
            </div>
          </section>

          <Spacer />

          {/* ── Mission ── */}
          <section id="about-mission" className="mx-auto max-w-6xl px-5 py-20 md:py-28 flex justify-center">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="max-w-3xl text-center">
                <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: COLORS.gold }}>Our Mission</div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  To strengthen the long-term resilience of communities and ecosystems
                </h2>
                <p className="mt-6 text-lg leading-relaxed" style={{ color: "rgba(245,247,246,0.75)" }}>
                  Sustainability itself is not self-sustaining. The knowledge, cultural frameworks, and institutional capacity that make sustainable practices possible require deliberate investment. SOS Foundation works to improve how sustainability is understood, communicated, and practiced — ensuring that humanity&apos;s ability to learn from nature persists and grows.
                </p>
                <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(245,247,246,0.55)" }}>
                  We organize our work around three interlocking pillars — Meaning, Pattern, and Mechanism — with Education as a cross-cutting layer that connects them all.
                </p>

                {/* M-P-M Architecture Diagram — product-designer refined */}
                <div className="mt-14 w-full max-w-3xl mx-auto hidden md:block">
                  <svg viewBox="0 0 780 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
                    <defs>
                      <marker id="arrowR" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                        <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                      </marker>
                      <filter id="glowArt"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={COLORS.art} floodOpacity="0.15" /></filter>
                      <filter id="glowData"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={COLORS.data} floodOpacity="0.15" /></filter>
                      <filter id="glowMech"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={COLORS.mech} floodOpacity="0.15" /></filter>
                    </defs>

                    {/* ── Title ── */}
                    <text x="390" y="24" textAnchor="middle" fill="rgba(245,247,246,0.3)" fontSize="10" fontWeight="500" letterSpacing="3">SOS FOUNDATION</text>

                    {/* ── Education bar ── */}
                    <rect x="50" y="42" width="680" height="38" rx="8" fill={COLORS.green} fillOpacity="0.10" stroke={COLORS.green} strokeWidth="1" strokeOpacity="0.5" />
                    <text x="390" y="66" textAnchor="middle" fill={COLORS.green} fontSize="13" fontWeight="600" letterSpacing="1">SOS Education</text>

                    {/* Dashed connectors */}
                    <line x1="140" y1="80" x2="140" y2="108" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="390" y1="80" x2="390" y2="108" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="640" y1="80" x2="640" y2="108" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />

                    {/* ── Meaning pillar ── x=30..250, center=140 */}
                    <rect x="30" y="108" width="220" height="80" rx="14" fill={COLORS.art} fillOpacity="0.08" stroke={COLORS.art} strokeWidth="1.2" filter="url(#glowArt)" />
                    <text x="140" y="142" textAnchor="middle" fill={COLORS.art} fontSize="18" fontWeight="700">Meaning</text>
                    <text x="140" y="162" textAnchor="middle" fill="rgba(245,247,246,0.4)" fontSize="10" letterSpacing="0.5">Art &amp; Cultural Language</text>

                    {/* ── Arrow M→P ── */}
                    <line x1="256" y1="148" x2="274" y2="148" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" markerEnd="url(#arrowR)" />

                    {/* ── Pattern pillar ── x=280..500, center=390 */}
                    <rect x="280" y="108" width="220" height="80" rx="14" fill={COLORS.data} fillOpacity="0.08" stroke={COLORS.data} strokeWidth="1.2" filter="url(#glowData)" />
                    <text x="390" y="142" textAnchor="middle" fill={COLORS.data} fontSize="18" fontWeight="700">Pattern</text>
                    <text x="390" y="162" textAnchor="middle" fill="rgba(245,247,246,0.4)" fontSize="10" letterSpacing="0.5">Digitization &amp; Natural Patterns</text>

                    {/* ── Arrow P→Mech ── */}
                    <line x1="506" y1="148" x2="524" y2="148" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" markerEnd="url(#arrowR)" />

                    {/* ── Mechanism pillar ── x=530..750, center=640 */}
                    <rect x="530" y="108" width="220" height="80" rx="14" fill={COLORS.mech} fillOpacity="0.08" stroke={COLORS.mech} strokeWidth="1.2" filter="url(#glowMech)" />
                    <text x="640" y="142" textAnchor="middle" fill={COLORS.mech} fontSize="18" fontWeight="700">Mechanism</text>
                    <text x="640" y="162" textAnchor="middle" fill="rgba(245,247,246,0.4)" fontSize="10" letterSpacing="0.5">Knowledge Systems &amp; Open Infrastructure</text>

                    {/* ── Project pills ── */}
                    {/* Meaning */}
                    <line x1="140" y1="188" x2="140" y2="216" stroke={COLORS.art} strokeWidth="0.8" strokeOpacity="0.3" />
                    <rect x="80" y="220" width="120" height="24" rx="12" fill={COLORS.art} fillOpacity="0.08" stroke={COLORS.art} strokeWidth="0.8" strokeOpacity="0.4" />
                    <text x="140" y="236" textAnchor="middle" fill={COLORS.art} fontSize="10" fontWeight="500">Nature Salon</text>

                    {/* Pattern */}
                    <line x1="390" y1="188" x2="390" y2="216" stroke={COLORS.data} strokeWidth="0.8" strokeOpacity="0.3" />
                    <rect x="310" y="220" width="160" height="24" rx="12" fill={COLORS.data} fillOpacity="0.08" stroke={COLORS.data} strokeWidth="0.8" strokeOpacity="0.4" />
                    <text x="390" y="236" textAnchor="middle" fill={COLORS.data} fontSize="10" fontWeight="500">SOS Research Unit</text>
                    <rect x="318" y="250" width="144" height="24" rx="12" fill={COLORS.data} fillOpacity="0.08" stroke={COLORS.data} strokeWidth="0.8" strokeOpacity="0.4" />
                    <text x="390" y="266" textAnchor="middle" fill={COLORS.data} fontSize="10" fontWeight="500">Mountain Digital Twins</text>

                    {/* Mechanism */}
                    <line x1="640" y1="188" x2="640" y2="216" stroke={COLORS.mech} strokeWidth="0.8" strokeOpacity="0.3" />
                    <rect x="560" y="220" width="160" height="24" rx="12" fill={COLORS.mech} fillOpacity="0.08" stroke={COLORS.mech} strokeWidth="0.8" strokeOpacity="0.4" />
                    <text x="640" y="236" textAnchor="middle" fill={COLORS.mech} fontSize="10" fontWeight="500">Discovery Commons</text>
                    <rect x="605" y="250" width="70" height="24" rx="12" fill={COLORS.mech} fillOpacity="0.08" stroke={COLORS.mech} strokeWidth="0.8" strokeOpacity="0.4" />
                    <text x="640" y="266" textAnchor="middle" fill={COLORS.mech} fontSize="10" fontWeight="500">IoBI</text>

                    {/* ── Divider ── */}
                    <line x1="150" y1="310" x2="630" y2="310" stroke="rgba(245,247,246,0.08)" strokeWidth="1" />

                    {/* ── Tagline ── */}
                    <text x="390" y="345" textAnchor="middle" fill={COLORS.gold} fontSize="12" fontWeight="500" fontStyle="italic" opacity="0.7">
                      Sustaining humanity&apos;s ability to learn from nature.
                    </text>

                    {/* ── Continuity ── */}
                    <text x="390" y="375" textAnchor="middle" fill="rgba(245,247,246,0.25)" fontSize="9" letterSpacing="4" fontWeight="500">MEANING + PATTERN + MECHANISM → CONTINUITY</text>
                  </svg>
                </div>

                {/* Mobile-only stacked architecture */}
                <div className="mt-10 md:hidden space-y-3">
                  <div className="rounded-2xl border p-4 text-center" style={{ borderColor: `${COLORS.green}40`, background: `${COLORS.green}10` }}>
                    <div className="text-xs font-semibold tracking-wide" style={{ color: COLORS.green }}>SOS Education</div>
                    <div className="text-[10px] mt-1" style={{ color: "rgba(245,247,246,0.4)" }}>Cross-cutting layer</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-2xl border p-3 text-center" style={{ borderColor: `${COLORS.art}40`, background: `${COLORS.art}08` }}>
                      <div className="text-sm font-semibold" style={{ color: COLORS.art }}>Meaning</div>
                      <div className="text-[9px] mt-1" style={{ color: "rgba(245,247,246,0.4)" }}>Nature Salon</div>
                    </div>
                    <div className="rounded-2xl border p-3 text-center" style={{ borderColor: `${COLORS.data}40`, background: `${COLORS.data}08` }}>
                      <div className="text-sm font-semibold" style={{ color: COLORS.data }}>Pattern</div>
                      <div className="text-[9px] mt-1" style={{ color: "rgba(245,247,246,0.4)" }}>Research · MDT</div>
                    </div>
                    <div className="rounded-2xl border p-3 text-center" style={{ borderColor: `${COLORS.mech}40`, background: `${COLORS.mech}08` }}>
                      <div className="text-sm font-semibold" style={{ color: COLORS.mech }}>Mechanism</div>
                      <div className="text-[9px] mt-1" style={{ color: "rgba(245,247,246,0.4)" }}>Commons · IoBI</div>
                    </div>
                  </div>
                  <div className="text-center text-[10px] pt-2" style={{ color: "rgba(245,247,246,0.25)" }}>Meaning + Pattern + Mechanism → Continuity</div>
                </div>
              </div>
            </motion.div>
          </section>

          <Spacer />

          {/* ── Meaning ── */}
          <PillarSection
            id="about-meaning"
            name="Art & Cultural Language"
            question="What if sustainability had a language people actually feel?"
            thesis="Art, design, and culture give sustainability a shared language — felt before it is explained."
            anchors={["Nature Salon", "Exhibitions & Installations", "Narratives & Archives"]}
            explainTitle="Meaning layer"
            explainBody="Meaning is where sustainability becomes felt rather than argued. Through art, design, and cultural experience, it creates shared understanding before debate, policy, or persuasion takes place."
            color={COLORS.art}
          />

          <Spacer />

          {/* ── Pattern ── */}
          <PillarSection
            id="about-pattern"
            name="Digitization & Natural Patterns"
            question="What if nature were readable as a shared, computable knowledge commons?"
            thesis="By transforming natural collections into structured, computable representations, we create a shared foundation for research, education, and bio-inspired innovation."
            anchors={["SOS Research Unit", "Mountain Digital Twins (MDT)", "Open datasets"]}
            explainTitle="Pattern layer"
            explainBody="Pattern is where ecosystems become legible: we translate natural collections into shared, computable representations — supporting research, education, and bio-inspired inquiry."
            color={COLORS.data}
            reverse
          />

          <Spacer />

          {/* ── Mechanism ── */}
          <PillarSection
            id="about-mechanism"
            name="Knowledge Systems & Open Infrastructure"
            question="What if nature's knowledge were open, searchable, and accessible to everyone?"
            thesis="Open knowledge infrastructure makes nature's design intelligence findable and usable — connecting researchers, educators, and innovators through shared data and tools."
            anchors={["Discovery Commons", "Internet of Bioinspiration (IoBI)", "Open datasets & tools"]}
            explainTitle="Mechanism layer"
            explainBody="Mechanism is where knowledge becomes accessible — when open infrastructure, shared datasets, and contributor networks make nature's design intelligence available to those who need it."
            color={COLORS.mech}
          />

          <Spacer />

          {/* ── Research Unit + Education — combined ── */}
          <section id="about-research-education" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }}>

              {/* Research Unit teaser */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 flex-wrap mb-10">
                <div>
                  <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium" style={{ background: "rgba(255,255,255,0.12)", color: "rgba(245,247,246,0.85)" }}>
                    Research &amp; Education
                  </div>
                  <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-white">SOS Research Unit + Education</h2>
                  <p className="mt-3 text-base md:text-lg" style={{ color: "rgba(245,247,246,0.65)" }}>
                    Research generates knowledge. Education turns it into lasting capacity. Together they form a self-reinforcing cycle.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Research card — clickable */}
                <a href="/research" className="group relative rounded-3xl overflow-hidden aspect-[16/10] cursor-pointer transition-transform duration-200 hover:scale-[1.01]">
                  <Image src="/pics/light_trap.JPG" alt="SOS Research Unit" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,24,36,0.20) 0%, rgba(8,24,36,0.72) 100%)" }} />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Pattern</div>
                    <div className="text-xl font-semibold text-white">SOS Research Unit</div>
                    <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                      Co-directed by Cong Liu &amp; Wei-Ping Chan — bridging natural history and computational innovation. 40+ publications, 800+ citations.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["IoBI", "MDT", "Nature Digitization", "Conservation Genomics"].map((tag) => (
                        <span key={tag} className="rounded-full border px-2 py-0.5 text-[10px]" style={{ borderColor: "rgba(255,255,255,0.15)", color: COLORS.data, background: "rgba(0,0,0,0.3)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>

                {/* Education card — clickable */}
                <a href="/education" className="group relative rounded-3xl overflow-hidden aspect-[16/10] cursor-pointer transition-transform duration-200 hover:scale-[1.01]">
                  <Image src="/pics/edu_01.jpg" alt="SOS Education" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,24,36,0.20) 0%, rgba(8,24,36,0.75) 100%)" }} />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="rounded-2xl p-4" style={{ background: "rgba(8,24,36,0.70)", backdropFilter: "blur(8px)" }}>
                      <div className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: COLORS.green }}>Cross-cutting layer</div>
                      <div className="text-xl font-semibold text-white">SOS Education</div>
                      <p className="mt-2 text-sm font-medium" style={{ color: COLORS.gold }}>
                        Education should not end with learning. It should lead to real contributions.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {EDUCATION_TRACKS.map((t) => (
                          <span key={t.label} className="rounded-full border px-2 py-0.5 text-[10px]" style={{ borderColor: "rgba(255,255,255,0.15)", color: COLORS.green, background: "rgba(0,0,0,0.3)" }}>
                            {t.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </motion.div>
          </section>

          <Spacer />

          {/* ── Work ── */}
          <section id="about-work" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium" style={{ background: "rgba(255,255,255,0.12)", color: "rgba(245,247,246,0.85)" }}>Work</div>
              <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-white">{WORK.title}</h2>
              <p className="mt-3 text-base md:text-lg" style={{ color: "rgba(245,247,246,0.75)" }}>{WORK.subtitle}</p>
            </motion.div>

            <div className="mt-10 grid md:grid-cols-3 gap-5">
              {WORK.cards.map((card) => <AboutWorkCard key={card.id} card={card} />)}
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-5">
              {/* Discovery Commons card — links to external site */}
              <a href="https://discovery-commons.vercel.app/" target="_blank" rel="noopener noreferrer" className="group relative rounded-3xl overflow-hidden aspect-[16/10] cursor-pointer transition-transform duration-200 hover:scale-[1.01]">
                <Image src="/pics/discovery_commons.png" alt="Discovery Commons" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,24,36,0.0) 0%, rgba(8,24,36,0.55) 100%)" }} />
                <div className="pointer-events-none absolute inset-0 flex items-end p-4">
                  <div className="rounded-2xl px-3 py-2 text-xs" style={{ background: "rgba(31,42,51,0.85)", color: "white", border: "1px solid rgba(255,255,255,0.10)" }}>
                    Discovery Commons | Open knowledge infrastructure for nature
                  </div>
                </div>
              </a>
              <AboutWorkCard card={WORK.spotlight} />
            </div>
          </section>

          <Spacer />

          {/* ── Blog — mini highlight slider ── */}
          <section id="about-blog" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 flex-wrap mb-10">
                <div>
                  <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium" style={{ background: "rgba(255,255,255,0.12)", color: "rgba(245,247,246,0.85)" }}>Blog</div>
                  <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-white">Ideas, in public</h2>
                  <p className="mt-3 text-base" style={{ color: "rgba(245,247,246,0.65)" }}>Field notes, project updates, and essays from SOS Foundation.</p>
                </div>
                <a href="/blog" className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85 shrink-0" style={{ background: COLORS.blue }}>
                  All posts <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
            <AboutBlogSlider />
          </section>

          <Spacer />

          {/* ── Get Involved ── */}
          <section id="about-involved" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium" style={{ background: "rgba(255,255,255,0.12)", color: "rgba(245,247,246,0.85)" }}>Get involved</div>
              <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-white">Want to turn the loop into continuity?</h2>
              <p className="mt-3 text-base md:text-lg" style={{ color: "rgba(245,247,246,0.75)" }}>Join at the layer where you contribute most — Meaning, Pattern, Mechanism, or Continuity.</p>
            </motion.div>

            <div className="mt-10 grid md:grid-cols-5 gap-5">
              {ROLE_CARDS.map((r) => (
                <AboutRoleCard key={r.title} {...r} />
              ))}
            </div>

            <div className="mt-10 rounded-3xl p-6 md:p-8 border relative overflow-hidden" style={{ borderColor: "rgba(31,42,51,0.10)" }}>
              <div className="absolute inset-0" style={{ background: "rgba(31,42,51,0.85)" }} />
              <div className="relative z-10 flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl overflow-hidden shrink-0">
                  <Image src="/logo/SOS-LOGO_v3-icon.svg" alt="SOS" width={48} height={48} className="h-full w-full object-cover" unoptimized />
                </div>
                <div className="flex-1">
                  <p className="mt-2 text-lg" style={{ color: COLORS.gold }}>Leave your email and tell us which layer you&apos;re coming from. We&apos;ll follow up with the most relevant next step.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-2xl border-2 border-white px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85" style={{ background: COLORS.blue }}>
                      Leave your email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Board + Legal — compact, at the very end ── */}
          <section id="about-legal" className="mx-auto max-w-6xl px-5 py-14">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "rgba(245,247,246,0.35)" }}>Board of Directors</div>
              <div className="text-sm mb-6" style={{ color: "rgba(245,247,246,0.50)" }}>
                {BOARD_MEMBERS.map((m, i) => (<span key={m.name}>{m.name}{i < BOARD_MEMBERS.length - 1 ? " · " : ""}</span>))}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: "rgba(245,247,246,0.30)" }}>
                Sustainability of Sustainability Foundation &middot; 501(c)(3) Public Charity &middot; EIN 41-3097632 &middot; Since 2025
              </div>
            </motion.div>
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
