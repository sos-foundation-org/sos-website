"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Infinity as InfinityIcon,
  Sparkles,
  Scan,
  Network,
  ChevronDown,
  ArrowRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * SOS Foundation — Visual-first, scroll-choreographed framework
 *
 * What this gives you:
 * - Single-page scroll with “soft transitions” between divisions.
 * - Anchored whitespace: intentional empty space that never looks broken.
 * - Scroll progress drives: background tint, a continuity (∞) animation, and section reveals.
 * - Division switcher updates the URL hash + scrolls smoothly.
 * - Optional ambient audio hooks (you can swap in your tracks).
 *
 * Replace placeholders:
 * - Images: swap <ImagePanel> content with your photos/videos.
 * - Audio: set `AUDIO_TRACKS` to your mp3/ogg URLs.
 * - Copy: keep as question + thesis; add detail later.
 */

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

// Optional: plug in actual audio later
const AUDIO_TRACKS: Record<string, string> = {
  hero: "",
  meaning: "",
  pattern: "",
  mechanism: "",
};

type DivKey = "meaning" | "pattern" | "mechanism";

const DIVISIONS: Record<DivKey, any> = {
  meaning: {
    key: "meaning",
    label: "Meaning",
    name: "Art & Cultural Language",
    color: COLORS.art,
    icon: Sparkles,
    question: "What if sustainability had a language people actually feel?",
    thesis:
      "We translate sustainability into shared meaning through art, design, and cultural experiences—so engagement starts without persuasion.",
    anchors: ["Exhibitions", "Installations", "Public experiences"],
  },
  pattern: {
    key: "pattern",
    label: "Pattern",
    name: "Digitization & Natural Intelligence",
    color: COLORS.data,
    icon: Scan,
    question: "What if nature became a shared, computable knowledge commons?",
    thesis:
      "We digitize collections into 2D/3D/VR assets and open pathways for research, education, and bio-inspired innovation.",
    anchors: ["Digitization demos", "Virtual museums", "Shared datasets"],
  },
  mechanism: {
    key: "mechanism",
    label: "Mechanism",
    name: "Sustainable Systems & Economic Mechanisms",
    color: COLORS.mech,
    icon: Network,
    question: "What if sustainability happened by default—because the system rewards it?",
    thesis:
      "We design distributed, closed-loop incentive systems where value is shared—so sustainability scales through economics, not slogans.",
    anchors: ["Incentive loops", "Partner ecosystems", "System prototypes"],
  },
};

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      setP(max <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / max)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function mixHex(a: string, b: string, t: number) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  const r = Math.round(lerp(A.r, B.r, t));
  const g = Math.round(lerp(A.g, B.g, t));
  const bb = Math.round(lerp(A.b, B.b, t));
  return `rgb(${r}, ${g}, ${bb})`;
}

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
      style={{ background: "rgba(47,93,138,0.08)", color }}
    >
      {label}
    </span>
  );
}

function AnchoredWhitespace({
  prompt,
  note,
  color = COLORS.blue,
}: {
  prompt: string;
  note: string;
  color?: string;
}) {
  return (
    <div
      className="rounded-3xl border p-6 md:p-8"
      style={{
        borderColor: "rgba(31,42,51,0.10)",
        background: "rgba(245,247,246,0.85)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="h-10 w-10 rounded-2xl grid place-items-center"
          style={{ background: `${color}22` }}
        >
          <span className="text-xs font-semibold" style={{ color }}>
            ?
          </span>
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>
            {prompt}
          </div>
          <div className="mt-2 text-sm" style={{ color: "rgba(31,42,51,0.70)" }}>
            {note}
          </div>
          <div className="mt-4 h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} />
          <div className="mt-3 text-xs" style={{ color: "rgba(31,42,51,0.55)" }}>
             
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagePanel({
  label,
  tone,
  aspect = "aspect-[16/10]",
}: {
  label: string;
  tone: string;
  aspect?: string;
}) {
  // Minimal “visual placeholder” card.
  // Replace with real images (img/video) as you populate content.
  const bg =
    tone === "meaning"
      ? "linear-gradient(135deg, rgba(46,102,80,0.18), rgba(245,247,246,0.0))"
      : tone === "pattern"
      ? "linear-gradient(135deg, rgba(47,93,138,0.16), rgba(245,247,246,0.0))"
      : tone === "mechanism"
      ? "linear-gradient(135deg, rgba(31,42,51,0.14), rgba(245,247,246,0.0))"
      : "linear-gradient(135deg, rgba(224,182,62,0.14), rgba(245,247,246,0.0))";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border ${aspect}`}
      style={{ borderColor: "rgba(31,42,51,0.12)", background: bg }}
    >
      <div className="absolute inset-0" />
      <div className="absolute inset-0 flex items-end p-4">
        <div
          className="rounded-2xl px-3 py-2 text-xs"
          style={{
            background: "rgba(245,247,246,0.85)",
            color: "rgba(31,42,51,0.70)",
            border: "1px solid rgba(31,42,51,0.10)",
          }}
        >
          {label}
        </div>
      </div>
      <div className="absolute left-4 top-4">
        <div className="text-[11px]" style={{ color: "rgba(31,42,51,0.45)" }}>
          Visual placeholder
        </div>
      </div>
    </div>
  );
}

function FullscreenVisual({ division, accent }: { division: any; accent: string }) {
  /**
   * Full-screen image section with an overlay “blank area” for text.
   * Mobile: text panel becomes a bottom sheet; desktop: left panel.
   */
  return (
    <div className="relative h-[92vh] min-h-[620px] w-full overflow-hidden">
      {/* Background visual */}
      <div className="absolute inset-0">
        {/* Replace this panel with your real media */}
        <div
          className="absolute inset-0"
          style={{
            background:
              division.key === "meaning"
                ? "radial-gradient(1200px 900px at 20% 10%, rgba(46,102,80,0.35), rgba(245,247,246,0.0)), linear-gradient(120deg, rgba(31,42,51,0.12), rgba(245,247,246,0.0))"
                : division.key === "pattern"
                ? "radial-gradient(1200px 900px at 20% 10%, rgba(47,93,138,0.33), rgba(245,247,246,0.0)), linear-gradient(120deg, rgba(31,42,51,0.10), rgba(245,247,246,0.0))"
                : "radial-gradient(1200px 900px at 20% 10%, rgba(224,182,62,0.24), rgba(245,247,246,0.0)), linear-gradient(120deg, rgba(31,42,51,0.10), rgba(245,247,246,0.0))",
          }}
        />

        {/* Subtle darkening for contrast */}
        <div className="absolute inset-0" style={{ background: "rgba(31,42,51,0.20)" }} />
      </div>

      {/* Overlay typography panel — desktop */}
      <div className="relative z-10 mx-auto h-full max-w-6xl px-5">
        <div className="flex h-full items-end md:items-center">
          <div className="w-full md:max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl border p-5 md:p-7"
              style={{
                background:
                  "linear-gradient(180deg, rgba(245,247,246,0.92), rgba(245,247,246,0.78))",
                borderColor: "rgba(245,247,246,0.35)",
                boxShadow: "0 18px 60px rgba(0,0,0,0.18)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                <div className="text-xs" style={{ color: "rgba(31,42,51,0.62)" }}>
                  {division.label} → {division.name}
                </div>
              </div>

              <h2
                className="mt-3 text-2xl md:text-4xl font-semibold leading-tight"
                style={{ color: COLORS.ink }}
              >
                {division.question}
              </h2>
              <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(31,42,51,0.72)" }}>
                {division.thesis}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {division.anchors.slice(0, 3).map((a: string) => (
                  <span
                    key={a}
                    className="rounded-2xl px-3 py-1 text-[12px]"
                    style={{
                      background: "rgba(31,42,51,0.06)",
                      color: "rgba(31,42,51,0.70)",
                    }}
                  >
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Button className="rounded-2xl" style={{ background: accent, color: "white" }}>
                  Explore this division <ArrowRight className="ml-2" size={16} />
                </Button>
                <span className="text-xs" style={{ color: "rgba(31,42,51,0.55)" }}>
                  Scroll to continue
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade to separate the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-28"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0), rgba(245,247,246,1))" }}
      />
    </div>
  );
}

function LogoDerivedMark({ progress, active }: { progress: number; active: string }) {
  /**
   * Logo-derived animation scaffold.
   *
   * How to use with your real logo:
   * 1) Export your SOS logo as SVG (Illustrator/Figma).
   * 2) Paste your real path 'd' strings into the placeholders below.
   * 3) This component will then animate: division emphasis, continuity loop, and ∞ draw by scroll.
   */

  const mv = useMotionValue(progress);
  useEffect(() => mv.set(progress), [progress, mv]);
  const sp = useSpring(mv, { stiffness: 70, damping: 20, mass: 0.6 });

  const isMeaning = active === "meaning";
  const isPattern = active === "pattern";
  const isMechanism = active === "mechanism";

  // PLACEHOLDERS — replace with your real logo path data (SVG 'd' strings)
  const sMeaningPathD = "M25 30 C 18 40, 18 52, 30 58 C 44 65, 42 78, 30 86";
  const sPatternPathD = "M60 30 C 48 40, 48 52, 60 58 C 74 65, 72 78, 60 86";
  const sMechanismPathD = "M95 30 C 82 40, 82 52, 90 58 C 104 65, 102 78, 90 86";

  const ringPathD = "M60 60 m-26 0 a 26 26 0 1 0 52 0 a 26 26 0 1 0 -52 0";
  const infinityPathD =
    "M 22 60 C 36 42, 52 42, 60 60 C 68 78, 84 78, 98 60 C 84 42, 68 42, 60 60 C 52 78, 36 78, 22 60";

  return (
    <div className="relative h-16 w-16 md:h-20 md:w-20">
      <motion.div
        className="absolute inset-0 rounded-[28px] border"
        style={{
          borderColor: "rgba(31,42,51,0.12)",
          background: "rgba(245,247,246,0.65)",
        }}
      />

      <svg viewBox="0 0 120 120" className="absolute inset-0">
        {/* Continuity loop */}
        <motion.path
          d={ringPathD}
          fill="none"
          stroke="rgba(224,182,62,0.45)"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "60px 60px" }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        />

        {/* Infinity baseline */}
        <path
          d={infinityPathD}
          fill="none"
          stroke="rgba(47,93,138,0.28)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Infinity draw by scroll */}
        <motion.path
          d={infinityPathD}
          fill="none"
          stroke={COLORS.gold}
          strokeWidth="6"
          strokeLinecap="round"
          style={{ pathLength: sp }}
        />

        {/* Division strokes */}
        <motion.path
          d={sMeaningPathD}
          fill="none"
          stroke={COLORS.art}
          strokeWidth="6"
          strokeLinecap="round"
          animate={{ opacity: isMeaning ? 1 : 0.35, scale: isMeaning ? 1.02 : 1 }}
          style={{ transformOrigin: "30px 60px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
        <motion.path
          d={sPatternPathD}
          fill="none"
          stroke={COLORS.data}
          strokeWidth="6"
          strokeLinecap="round"
          animate={{ opacity: isPattern ? 1 : 0.35, scale: isPattern ? 1.02 : 1 }}
          style={{ transformOrigin: "60px 60px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
        <motion.path
          d={sMechanismPathD}
          fill="none"
          stroke={COLORS.mech}
          strokeWidth="6"
          strokeLinecap="round"
          animate={{ opacity: isMechanism ? 1 : 0.35, scale: isMechanism ? 1.02 : 1 }}
          style={{ transformOrigin: "90px 60px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] || "");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id);
          });
        },
        { root: null, threshold: 0.55 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);
  return active;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.history.replaceState(null, "", `#${id}`);
  window.scrollTo({ top: y, behavior: "smooth" });
}

function useAmbientAudio(activeId: string, enabled: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      return;
    }

    const src =
      activeId === "hero" ? AUDIO_TRACKS.hero :
      activeId === "meaning" ? AUDIO_TRACKS.meaning :
      activeId === "pattern" ? AUDIO_TRACKS.pattern :
      activeId === "mechanism" ? AUDIO_TRACKS.mechanism : "";

    if (!src) return; // if you haven’t set tracks yet

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }

    const a = audioRef.current;
    if (a.src !== src) {
      a.src = src;
      a.load();
      a.play().then(() => setReady(true)).catch(() => setReady(false));
    }
  }, [activeId, enabled]);

  return { ready };
}

export default function SOSFoundationFramework() {
  const progress = useScrollProgress();
  const active = useActiveSection(["hero", "meaning", "pattern", "mechanism", "work", "involved"]);

  const [audioOn, setAudioOn] = useState(false);
  useAmbientAudio(active, audioOn);

  // Background “soft transitions” by active section
  const bgTint = useMemo(() => {
    const t =
      active === "meaning" ? mixHex(COLORS.bg, COLORS.art, 0.06) :
      active === "pattern" ? mixHex(COLORS.bg, COLORS.data, 0.06) :
      active === "mechanism" ? mixHex(COLORS.bg, COLORS.mech, 0.06) :
      COLORS.bg;
    return t;
  }, [active]);

  const headline = useMemo(() => {
    if (active === "meaning") return "Meaning";
    if (active === "pattern") return "Pattern";
    if (active === "mechanism") return "Mechanism";
    return "Continuity";
  }, [active]);

  return (
    <div className="min-h-screen transition-colors duration-700" style={{ background: bgTint }}>
      {/* Floating background grid (anchored whitespace signal) */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(31,42,51,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,42,51,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
        }}
      />

      {/* Top nav */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{ background: "rgba(245,247,246,0.72)", borderBottom: "1px solid rgba(31,42,51,0.08)" }}
      >
        <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl grid place-items-center" style={{ background: "rgba(47,93,138,0.10)" }}>
              <InfinityIcon size={18} style={{ color: COLORS.blue }} />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>
                SOS Foundation
              </div>
              <div className="text-xs" style={{ color: "rgba(31,42,51,0.55)" }}>
                Meaning → Pattern → Mechanism → Continuity
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-sm" style={{ color: "rgba(31,42,51,0.75)" }}>
            <button className="hover:opacity-80" onClick={() => scrollToId("meaning")}>Meaning</button>
            <button className="hover:opacity-80" onClick={() => scrollToId("pattern")}>Pattern</button>
            <button className="hover:opacity-80" onClick={() => scrollToId("mechanism")}>Mechanism</button>
            <button className="hover:opacity-80" onClick={() => scrollToId("work")}>Work</button>
            <button className="hover:opacity-80" onClick={() => scrollToId("involved")}>Get involved</button>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-2xl"
              style={{ borderColor: "rgba(31,42,51,0.18)", color: COLORS.ink }}
              onClick={() => setAudioOn((v) => !v)}
              title="Ambient audio (optional)"
            >
              {audioOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </Button>
            <Button className="rounded-2xl" style={{ background: COLORS.blue, color: "white" }} onClick={() => scrollToId("work")}
            >
              See work <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </header>

      {/* Side “chapter” indicator — reinforces whitespace as structure */}
      <div className="hidden lg:block fixed top-28 left-8 z-40">
        <div className="rounded-3xl border px-4 py-4" style={{ borderColor: "rgba(31,42,51,0.10)", background: "rgba(245,247,246,0.72)" }}>
          <div className="text-xs" style={{ color: "rgba(31,42,51,0.55)" }}>Now</div>
          <div className="mt-1 text-sm font-semibold" style={{ color: COLORS.ink }}>{headline}</div>
          <div className="mt-3"><LogoDerivedMark progress={clamp01(progress)} active={active} /></div>
          <div className="mt-3 text-xs" style={{ color: "rgba(31,42,51,0.55)" }}>Scroll to reveal</div>
        </div>
      </div>

      {/* HERO */}
      <main>
        <section id="hero" className="mx-auto max-w-6xl px-5 pt-14 md:pt-20">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <motion.div className="md:col-span-6" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs" style={{ background: "rgba(47,93,138,0.10)", color: COLORS.blue }}>
                <InfinityIcon size={14} /> Sustainability of Sustainability
              </div>
              <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight" style={{ color: COLORS.ink }}>
                What if sustainability could sustain itself?
              </h1>
              <p className="mt-5 text-base md:text-lg leading-relaxed" style={{ color: "rgba(31,42,51,0.78)" }}>
                SOS builds a complete model—cultural meaning, natural patterns, and economic mechanisms—designed for continuity.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button className="rounded-2xl" style={{ background: COLORS.green, color: "white" }} onClick={() => scrollToId("meaning")}>
                  Enter the model <ChevronDown className="ml-2" size={16} />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl"
                  style={{ borderColor: "rgba(31,42,51,0.18)", color: COLORS.ink }}
                  onClick={() => scrollToId("involved")}
                >
                  Partner with us
                </Button>
              </div>

              {/* Anchored whitespace: looks intentional */}
              <div className="mt-10">
                <AnchoredWhitespace
                  prompt="Why do so many sustainability efforts fade?"
                  note="Because meaning, knowledge, and incentives are rarely designed as one reinforcing system."
                  color={COLORS.gold}
                />
              </div>
            </motion.div>

            <motion.div className="md:col-span-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <div className="relative">
                <ImagePanel label="Hero visual: SOS logo / exhibition hero photo / short loop video" tone="neutral" aspect="aspect-[16/12]" />
                <div className="absolute -bottom-6 left-6 right-6">
                  <Card className="rounded-3xl shadow-sm" style={{ borderColor: "rgba(31,42,51,0.10)", background: "rgba(245,247,246,0.92)" }}>
                    <CardContent className="p-4 md:p-5 flex items-start gap-3">
                      <div className="h-10 w-10 rounded-2xl grid place-items-center" style={{ background: "rgba(224,182,62,0.18)" }}>
                        <InfinityIcon size={18} style={{ color: COLORS.gold }} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>
                          Thesis
                        </div>
                        <div className="mt-1 text-sm" style={{ color: "rgba(31,42,51,0.72)" }}>
                          Sustainability scales when Meaning, Pattern, and Mechanism form a loop—until Continuity becomes automatic.
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Spacer that reads as intentional breathing room */}
        <div className="mx-auto max-w-6xl px-5 mt-20 md:mt-28">
          <div className="h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} />
        </div>

        {/* DIVISION CHAPTERS */}
        <ChapterSection division={DIVISIONS.meaning} id="meaning" />
        <ChapterSection division={DIVISIONS.pattern} id="pattern" />
        <ChapterSection division={DIVISIONS.mechanism} id="mechanism" />

        {/* WORK (visual gallery) */}
        <section id="work" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <Pill label="Work" color={COLORS.blue} />
                <h2 className="mt-4 text-2xl md:text-4xl font-semibold" style={{ color: COLORS.ink }}>
                  What is happening right now?
                </h2>
                <p className="mt-3 text-base md:text-lg" style={{ color: "rgba(31,42,51,0.78)" }}>
                  Visual updates across divisions. Minimal text. Maximum signal.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <LogoDerivedMark progress={clamp01(progress)} active={active} />
              </div>
            </div>
          </motion.div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <ImagePanel label="Featured exhibition / installation" tone="meaning" aspect="aspect-[4/5]" />
            <ImagePanel label="Digitization demo / virtual museum preview" tone="pattern" aspect="aspect-[4/5]" />
            <ImagePanel label="System prototype / incentive loop" tone="mechanism" aspect="aspect-[4/5]" />
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-5">
            <AnchoredWhitespace
              prompt="What will fill this space next?"
              note="This page is designed to expand as new pilots, exhibitions, and collaborations launch."
              color={COLORS.blue}
            />
            <ImagePanel label="Future slot: partner spotlight / upcoming event" tone="neutral" aspect="aspect-[16/10]" />
          </div>
        </section>

        {/* GET INVOLVED */}
        <section id="involved" className="mx-auto max-w-6xl px-5 pb-24">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <Pill label="Get involved" color={COLORS.blue} />
            <h2 className="mt-4 text-2xl md:text-4xl font-semibold" style={{ color: COLORS.ink }}>
              Want to build continuity with us?
            </h2>
            <p className="mt-3 text-base md:text-lg" style={{ color: "rgba(31,42,51,0.78)" }}>
              Artists, museums, researchers, and builders—start small, scale thoughtfully.
            </p>
          </motion.div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <RoleCard title="Artists & Curators" body="Exhibitions and cultural experiences." color={COLORS.art} />
            <RoleCard title="Museums & Universities" body="Digitization pilots and virtual access." color={COLORS.data} />
            <RoleCard title="Industry & Builders" body="Systems and incentive mechanisms." color={COLORS.mech} />
          </div>

          <div className="mt-10 rounded-3xl p-6 md:p-8 border" style={{ borderColor: "rgba(31,42,51,0.10)", background: "rgba(47,93,138,0.06)" }}>
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-2xl grid place-items-center" style={{ background: "rgba(47,93,138,0.16)" }}>
                <InfinityIcon size={18} style={{ color: COLORS.blue }} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>Contact</div>
                <p className="mt-2 text-sm" style={{ color: "rgba(31,42,51,0.72)" }}>
                  Hook this to your email, a form, or a Typeform. Keep it lightweight now; expand later.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button className="rounded-2xl" style={{ background: COLORS.blue, color: "white" }}>
                    Email us
                  </Button>
                  <Button variant="outline" className="rounded-2xl" style={{ borderColor: "rgba(31,42,51,0.18)", color: COLORS.ink }}>
                    Download one-pager (soon)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t" style={{ borderColor: "rgba(31,42,51,0.10)" }}>
          <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>SOS Foundation</div>
              <div className="mt-1 text-xs" style={{ color: "rgba(31,42,51,0.55)" }}>
                Meaning → Pattern → Mechanism → Continuity
              </div>
            </div>
            <div className="text-xs" style={{ color: "rgba(31,42,51,0.55)" }}>
              © {new Date().getFullYear()} SOS Foundation. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function RoleCard({ title, body, color }: { title: string; body: string; color: string }) {
  return (
    <Card className="rounded-3xl" style={{ borderColor: "rgba(31,42,51,0.10)" }}>
      <CardContent className="p-6">
        <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>{title}</div>
        <p className="mt-2 text-sm" style={{ color: "rgba(31,42,51,0.72)" }}>{body}</p>
        <Button className="mt-4 rounded-2xl" style={{ background: color, color: "white" }}>Reach out</Button>
      </CardContent>
    </Card>
  );
}

function ChapterSection({ division, id }: { division: any; id: string }) {
  /**
   * Full-screen “tension” layout:
   * - Each division gets a hero-like fullscreen visual.
   * - Copy sits on a deliberate "blank" region via an overlay gradient panel.
   * - Mobile-safe: overlay becomes bottom sheet; typography scales down.
   *
   * Replace visuals:
   * - Swap the <ImagePanel> with <img> or <video> (cover) inside FullscreenVisual.
   */

  const color = division.color;

  return (
    <section id={id} className="w-full">
      {/* Fullscreen division visual */}
      <FullscreenVisual division={division} accent={color} />

      {/* After the full-screen hit: lighter, modular blocks (optional) */}
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2">
            <Pill label={`${division.label} layer`} color={COLORS.blue} />
            <span className="text-xs" style={{ color: "rgba(31,42,51,0.55)" }}>
              — {division.name}
            </span>
          </div>

          <div className="mt-6 grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5">
              <h3 className="text-xl md:text-2xl font-semibold" style={{ color: COLORS.ink }}>
                What is happening in this division?
              </h3>
              <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(31,42,51,0.72)" }}>
                Keep this section lightweight: a few key projects, collaborations, or upcoming events.
              </p>
              <div className="mt-6 grid gap-2">
                {division.anchors.map((a: string) => (
                  <div key={a} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full" style={{ background: color }} />
                    <div className="text-sm" style={{ color: "rgba(31,42,51,0.72)" }}>{a}</div>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <Button className="rounded-2xl" style={{ background: color, color: "white" }}>
                  View projects (soon) <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>

            <div className="md:col-span-7 grid gap-5">
              <div className="grid md:grid-cols-2 gap-5">
                <ImagePanel label="Upcoming / archive slot" tone={division.key} aspect="aspect-[16/12]" />
                <ImagePanel label="Upcoming / archive slot" tone={division.key} aspect="aspect-[16/12]" />
              </div>
              <AnchoredWhitespace
                prompt="This space is designed to expand."
                note="As pilots launch, this page will grow with photos, outcomes, and partner spotlights."
                color={color}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} />
      </div>
    </section>
  );
}
