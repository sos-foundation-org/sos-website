"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
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

const DARK_BG = "#081824";

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
    meaningImage: "/pics/meaning_img.JPG",
    layout: "hero-plus-explain",
    question: "What if sustainability had a language people actually feel?",
    thesis:
      "Art, design, and culture give sustainability a shared language—felt before it is explained.",
    anchors: ["Exhibitions", "Installations", "Narratives & Archives"],

    explainTitle: "Meaning layer",
    explainBody:
      "Meaning is where sustainability becomes felt rather than argued. Through art, design, and cultural experience, it creates shared understanding before debate, policy, or persuasion takes place.",
  },
  pattern: {
    key: "pattern",
    label: "Pattern",
    name: "Digitization & Natural Patterns",
    color: COLORS.data,
    icon: Scan,
    patternImage: "/pics/pattern.JPG",
    question: "What if nature were readable as a shared, computable knowledge commons?",
    thesis:
      "By transforming natural collections into structured, computable representations, we create a shared foundation for research, education, and bio-inspired innovation.",
    anchors: ["Digitized representations", "Virtual collections", "Open datasets"],

    explainTitle: "Pattern layer",
    explainBody:
      "Pattern is where ecosystems become legible: we translate natural collections into shared, computable representations—supporting research, education, and bio-inspired inquiry.",
  },
  mechanism: {
    key: "mechanism",
    label: "Mechanism",
    name: "Economic Mechanisms & Sustainable Systems",
    color: COLORS.mech,
    icon: Network,
    mechanismImage: "/pics/mechanism.JPG",
    question: "What if sustainability happened by default—because the system rewards it?",
    thesis:
      "Distributed, closed-loop incentive systems align shared value with economic behavior—allowing sustainability to scale through economics rather than slogans.",
    anchors: ["Incentive loops", "Ecosystem partnerships", "System prototypes"],

    explainTitle: "Mechanism layer",
    explainBody:
      "Mechanism is where sustainability becomes automatic—when incentive structures and closed-loop systems align default behavior with long-term outcomes.",
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

function useCenterFocusOpacity(
  targetRef: React.RefObject<HTMLElement | null>,
  {
    minOpacity = 0,
    maxOpacity = 1,
    focusRadius = 0.6,
  }: { minOpacity?: number; maxOpacity?: number; focusRadius?: number } = {}
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
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const maxDistance = Math.max(1, window.innerHeight * focusRadius);
      const distance = Math.abs(elementCenter - viewportCenter);
      const clampedDistance = distance <= 0.4 * maxDistance ? 0 : distance;
      const t = 1 - Math.pow(Math.min(1, clampedDistance / maxDistance), 2);

      // Ease-in as we approach center.
      const eased = t * t;
      raw.set(minOpacity + (maxOpacity - minOpacity) * eased);
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [targetRef, raw, minOpacity, maxOpacity, focusRadius]);

  return opacity;
}

function usePreloadedImages(urls: string[]) {
  const loadedRef = useRef<Set<string>>(new Set());
  const [, forceRerender] = useState(0);

  const isLoaded = React.useCallback((url?: string | null) => {
    if (!url) return true;
    return loadedRef.current.has(url);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      for (const url of urls) {
        if (cancelled) return;
        if (!url || loadedRef.current.has(url)) continue;

        try {
          const img = new Image();
          img.decoding = "async";
          img.src = url;

          if ("decode" in img) {
            await (img as any).decode();
          } else {
            await new Promise<void>((resolve) => {
              (img as HTMLImageElement).onload = () => resolve();
              (img as HTMLImageElement).onerror = () => resolve();
            });
          }
        } catch {
          // Ignore decode errors; load best-effort.
        }

        if (cancelled) return;
        loadedRef.current.add(url);
        forceRerender((t) => t + 1);
      }
    };

    const w = window as any;
    const handle =
      typeof w.requestIdleCallback === "function"
        ? w.requestIdleCallback(run, { timeout: 1500 })
        : window.setTimeout(run, 250);

    return () => {
      cancelled = true;
      if (typeof handle === "number") window.clearTimeout(handle);
      else if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(handle);
    };
  }, [urls.join("|")]);

  return { isLoaded };
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
  children,
}: {
  label: string;
  tone: string;
  aspect?: string;
  children?: React.ReactNode;
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
      <div className="pointer-events-none absolute inset-0 flex items-end p-4">
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
      <div className="absolute inset-0">
        {children ? (
          children
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <img
              src="/logo/SOS-LOGO_v2-for_SVG.svg"
              alt={label}
              className="h-3/4 w-3/4 object-contain opacity-20"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function LogoDerivedMark({ progress, active }: { progress: number; active: string }) {
  // progress is kept in the signature because callers pass it today.
  void progress;

  const tint =
    active === "meaning"
      ? COLORS.art
      : active === "pattern"
      ? COLORS.data
      : active === "mechanism"
      ? COLORS.mech
      : COLORS.blue;

  const tintStrength = active === "meaning" || active === "pattern" || active === "mechanism" ? 0.65 : 0.18;

  return (
    <div className="relative h-16 w-16 md:h-20 md:w-20">
      <motion.div
        className="absolute inset-0 rounded-[28px] border"
        style={{
          borderColor: "rgba(31,42,51,0.12)",
          background: "rgba(245,247,246,0.65)",
        }}
      />

      {/* Static SVG from /public/icon/icon.svg with blend tint */}
      <div className="absolute inset-0 overflow-hidden rounded-[28px] isolate">
        <img
          src="/logo/SOS-LOGO_v2-for_SVG.svg"
          alt="SOS icon"
          className="absolute inset-0 h-full w-full object-contain p-3"
          style={{ filter: "contrast(1.05)" }}
        />
        <motion.div
          className="absolute inset-0 mix-blend-multiply pointer-events-none"
          initial={false}
          animate={{ backgroundColor: tint, opacity: tintStrength }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function DivisionBackgroundCrossfade({
  active,
  bgTint,
}: {
  active: string;
  bgTint: string;
}) {
  const key =
    active === "hero" ||
    active === "meaning" ||
    active === "pattern" ||
    active === "mechanism" ||
    active === "work" ||
    active === "involved"
      ? active
      : "none";

  const preloadUrls = useMemo(
    () => [
      "/pics/Vision_bg.png",
      DIVISIONS.meaning.meaningImage as string,
      DIVISIONS.pattern.patternImage as string,
      DIVISIONS.mechanism.mechanismImage as string,
      "/pics/work.JPG",
      "/pics/involved.JPG",
    ],
    []
  );
  const { isLoaded } = usePreloadedImages(preloadUrls);

  const cfgFor = (k: string) =>
    k === "meaning"
      ? {
          image: DIVISIONS.meaning.meaningImage as string,
          overlay:
            "linear-gradient(180deg, rgba(31,42,51,0) 0%, rgba(31,42,51,0.10) 6%, rgba(0,0,0,0.58) 100%)",
        }
      : k === "pattern"
      ? {
          image: DIVISIONS.pattern.patternImage as string,
          overlay:
            "linear-gradient(180deg, rgba(6, 50, 3, 0.2) 5%, rgba(4, 34, 2, 0.4) 22%, rgba(4, 34, 2, 0.70) 100%)",
        }
      : k === "mechanism"
      ? {
          image: DIVISIONS.mechanism.mechanismImage as string,
          overlay:
            "linear-gradient(180deg, rgba(106, 66, 81, 0.20) 5%, rgba(106, 66, 81, 0.4) 8%, rgba(0,0,0,0.7) 100%)",
        }
      : k === "hero"
      ? {
          image: "/pics/Vision_bg.png",
          overlay: "rgba(8, 24, 36, 0.85)",
          position: "center top -100px",
        }
      : k === "work"
      ? {
          image: "/pics/work.JPG",
          overlay:
            "linear-gradient(180deg, rgba(245,247,246,0.3) 0%, rgba(245,247,246,0.3) 55%, rgba(245,247,246,0.3) 100%)",
        }
      : k === "involved"
      ? {
          image: "/pics/involved.JPG",
          overlay:
            "linear-gradient(180deg, rgba(245,247,246,0.5) 0%, rgba(245,247,246,0.5) 55%, rgba(245,247,246,0.5) 100%)",
        }
      : null;

  const [displayKey, setDisplayKey] = useState(key);

  useEffect(() => {
    if (key === "none") {
      setDisplayKey("none");
      return;
    }

    const next = cfgFor(key);
    if (!next?.image || isLoaded(next.image)) {
      setDisplayKey(key);
    }
  }, [key, isLoaded]);

  const cfg = cfgFor(displayKey);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ backgroundColor: bgTint }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ willChange: "background-color" }}
      />
      <AnimatePresence mode="sync">
        <motion.div
          key={displayKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0"
          style={{ willChange: "opacity" }}
        >
          {cfg?.image ? (
            <img
              src={cfg.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: (cfg as any).position || "center", transform: "translateZ(0)" }}
              decoding="async"
            />
          ) : null}
          {cfg?.overlay ? (
            <div className="absolute inset-0" style={{ background: cfg.overlay }} />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function useActiveSection(sectionIds: string[]) {
  const idsKey = sectionIds.join("|");
  const [active, setActive] = useState(sectionIds[0] || "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

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
          if (score > bestScore + 1e-6) {
            bestScore = score;
            bestId = id;
          }
        }

        if (!bestId) return prev;
        return prev === bestId ? prev : bestId;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        if (!raf) raf = window.requestAnimationFrame(commitBest);
      },
      {
        root: null,
        // More forgiving than 0.55 so smaller sections (Work/Involved) can activate on mobile.
        threshold: [0, 0.08, 0.15, 0.25, 0.4, 0.55, 0.7],
        // Bias toward the center area, and account for the sticky header.
        rootMargin: "-84px 0px -40% 0px",
      }
    );

    for (const el of elements) observer.observe(el);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
    // Depend on a stable key, not the array identity.
  }, [idsKey]);

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
  const sectionIds = useMemo(() => ["hero", "meaning", "pattern", "mechanism", "work", "involved"], []);
  const active = useActiveSection(sectionIds);

  const [audioOn, setAudioOn] = useState(false);
  useAmbientAudio(active, audioOn);

  // Background “soft transitions” by active section
  const bgTint = useMemo(() => {
    const t =
      active === "hero" ? mixHex(DARK_BG, "#007B33", 0.35) :
      active === "meaning" ? mixHex(DARK_BG, COLORS.art, 0.55) :
      active === "pattern" ? mixHex(DARK_BG, COLORS.data, 0.55) :
      active === "mechanism" ? mixHex(DARK_BG, COLORS.mech, 0.55) :
      DARK_BG;
    return t;
  }, [active]);

  const headline = useMemo(() => {
    if (active === "hero") return "Vision";
    if (active === "meaning") return "Meaning";
    if (active === "pattern") return "Pattern";
    if (active === "mechanism") return "Mechanism";
    return "Continuity";
  }, [active]);

  return (
    <div className="min-h-screen transition-colors duration-700" style={{ background: bgTint }}>
      <DivisionBackgroundCrossfade active={active} bgTint={bgTint} />

      {/* Floating background grid (anchored whitespace signal) */}
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

      {/* Top nav */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{ background: "rgba(245,247,246,0.72)", borderBottom: "1px solid rgba(31,42,51,0.08)" }}
      >
        <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scrollToId("hero")} 
              className="h-9 w-9 rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img 
              src="/logo/SOS-LOGO_v3-icon.svg" 
              alt="SOS Foundation Logo" 
              className="h-full w-full object-cover"
              />
            </button>
            <div className="leading-tight">
              <div className="text-m font-semibold" style={{ color: COLORS.ink }}>
                Sustainability of Sustainability
              </div>
              <div className="text-s" style={{ color: "rgba(31,42,51,0.55)" }}>
                Meaning + Pattern + Mechanism → Continuity
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-sm" style={{ color: "rgba(31,42,51,0.75)" }}>
            <button className="text-m hover:opacity-80" onClick={() => scrollToId("meaning")}>Meaning</button>
            <button className="text-m hover:opacity-80" onClick={() => scrollToId("pattern")}>Pattern</button>
            <button className="text-m hover:opacity-80" onClick={() => scrollToId("mechanism")}>Mechanism</button>
            <button className="text-m hover:opacity-80" onClick={() => scrollToId("work")}>Work</button>
            <button className="text-m hover:opacity-80" onClick={() => scrollToId("involved")}>Get involved</button>
          </nav>

          <div className="flex items-center gap-2">
            <Button className="rounded-2xl" style={{ background: COLORS.blue, color: "white" }} onClick={() => scrollToId("work")}
            >
              See work <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </header>

      {/* Side “chapter” indicator — reinforces whitespace as structure */}
      <div className="hidden lg:block fixed top-28 left-8 z-40">
        <div className="w-31 rounded-3xl border px-5 py-4" style={{ borderColor: "rgba(31,42,51,0.10)", background: "rgba(245,247,246,0.72)" }}>
          <div className="text-sm" style={{ color: COLORS.ink }}>Now</div>
            <div className="mt-1 text-lg font-semibold text-center" style={{ color: COLORS.ink }}>{headline}</div>
          <div className="mt-3"><LogoDerivedMark progress={clamp01(progress)} active={active} /></div>
          <div className="mt-3 text-xs" style={{ color: COLORS.ink }}>Scroll to reveal</div>
        </div>
      </div>

      {/* HERO */}
      <main>
        <section id="hero" className="relative w-full min-h-screen pt-14 md:pt-20 flex items-center justify-center overflow-hidden">
            {/* Foreground content (kept as-is) */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 flex items-center justify-center">
            <motion.div
              className="w-full max-w-4xl -translate-y-10 md:-translate-y-14"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-col items-center">
                <img
                  src="/logo/SOS-LOGO_v2-for_SVG.svg"
                  alt="SOS Foundation Icon"
                  className="h-14 w-32 md:h-22 md:w-48 opacity-90"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg)",
                  }}
                />
                <div
                  className="mt-1 md:mt-1 text-xs font-medium text-center tracking-wide leading-none"
                  style={{ color: COLORS.bg, opacity: 0.85 }}
                >
                  Sustainability of Sustainability
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <h1
                className="mt-10 text-6xl md:text-6xl font-semibold tracking-tight max-w-6xl"
                style={{ color: COLORS.bg }}
                >
                Sustainability isn't self-sustaining
                </h1>
              <p
                className="mt-5 text-4xl md:text-4xl leading-relaxed max-w-2xl"
                style={{ color: COLORS.mech }}
              >
                Sustainability scales when Meaning, Pattern, and Mechanism form a loop —enabling Continuity to emerge
              </p>
              {/* Anchored whitespace: looks intentional */}
              </div>
            </motion.div>
            </div>
        </section>

        {/* Spacer that reads as intentional breathing room */}
        <div className="mx-auto max-w-6xl px-5 mt-20 md:mt-28">
          <div className="h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} />
        </div>

        {/* DIVISION CHAPTERS */}
        <MeaningSection cfg={DIVISIONS.meaning as MeaningConfig} id="meaning" />

        {/* Spacer that reads as intentional breathing room */}
        <div className="mx-auto max-w-6xl px-5 mt-20 md:mt-28">
          <div className="h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} />
        </div>

        <PatternSection cfg={DIVISIONS.pattern as PatternConfig} id="pattern" />

        {/* Spacer that reads as intentional breathing room */}
        <div className="mx-auto max-w-6xl px-5 mt-20 md:mt-28">
          <div className="h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} />
        </div>

        <MechanismSection cfg={DIVISIONS.mechanism as MechanismConfig} id="mechanism" />

        {/* Spacer that reads as intentional breathing room */}
        <div className="mx-auto max-w-6xl px-5 mt-20 md:mt-28">
          <div className="h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} />
        </div>

        <WorkSection />

        {/* Spacer that reads as intentional breathing room */}
        <div className="mx-auto max-w-6xl px-5 mt-20 md:mt-28">
          <div className="h-px w-full" style={{ background: "rgba(31,42,51,0.10)" }} />
        </div>

        <ContactSection />

        {/* FOOTER */}
        <footer className="border-t" style={{ borderColor: "rgba(31,42,51,0.10)" }}>
          <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold" style={{ color: COLORS.bg }}>Sustainability of Sustainability</div>
              <div className="mt-1 text-xs" style={{ color: COLORS.bg }}>
                Meaning + Pattern + Mechanism → Continuity
              </div>
            </div>
            <div className="text-xs" style={{ color: COLORS.bg }}>
              © {new Date().getFullYear()} SOS Initiative. All rights reserved.
            </div>
          </div>
        </footer>
      </main>

      </div>
    </div>
  );
}


type MeaningConfig = {
  key: string;
  label: string;
  name: string;
  color: string;
  icon: React.ElementType;
  meaningImage: string;
  question: string;
  thesis: string;
  anchors: string[];
  explainTitle: string;
  explainBody: string;
};

function MeaningSection({ cfg, id }: { cfg: MeaningConfig; id: string }) {
  const focusRef = useRef<HTMLDivElement | null>(null);
  const focusOpacity = useCenterFocusOpacity(focusRef);

  return (
    <section id={id} className="relative w-full min-h-screen overflow-hidden flex items-center">
      <motion.div
        ref={focusRef}
        style={{ opacity: focusOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-32 -translate-y-6 md:-translate-y-20"
      >
        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-12">
          {/* Question + thesis card */}
          <div className="md:col-span-8">
        <div
        className="rounded-3xl border p-6 md:p-10"
        style={{
        background: "transparent",
        borderColor: "rgba(255,255,255,0.0)",
        }}
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/85">
          <span className="text-lg font-semibold">{cfg.name}</span>
          </div>

          <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {cfg.question}
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80 md:text-2xl">
          {cfg.thesis}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
          {cfg.anchors.map((a) => (
          <span
          key={a}
          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/75"
          >
          {a}
          </span>
          ))}
          </div>
        </div>
        </div>

          {/* Explanation card */}
          <div className="md:col-span-4">
            <div
              className="h-full rounded-3xl p-6 md:p-8 border flex flex-col"
              style={{
              background: "rgba(31,42,51,0.92)",
              borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div>
              <div className="mb-4">
              <div className="text-sm font-medium tracking-wide text-white/60">{cfg.explainTitle}</div>
              <div className="mt-2 h-[2px] w-10 rounded-full" style={{ background: cfg.color, opacity: 0.7 }} />
              </div>

              <h3 className="text-lg font-semibold text-white">What is happening in this division?</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/78">{cfg.explainBody}</p>
              </div>

              <div className="mt-auto rounded-2xl bg-white/5 p-4">
              <div className="text-xs font-medium text-white/60">This layer takes shape through:</div>
              <ul className="mt-2 space-y-2 text-sm text-white/80">
                {cfg.anchors.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full" style={{ background: cfg.color, opacity: 0.8 }} />
                  <span>{a}</span>
                </li>
                ))}
              </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

type PatternConfig = {
  key: string;
  label: string;
  name: string;
  color: string;
  icon: React.ElementType;
  patternImage: string;
  question: string;
  thesis: string;
  anchors: string[];
  explainTitle: string;
  explainBody: string;
};

function PatternSection({ cfg, id }: { cfg: PatternConfig; id: string }) {
  const focusRef = useRef<HTMLDivElement | null>(null);
  const focusOpacity = useCenterFocusOpacity(focusRef);

  return (
    <section id={id} className="relative w-full min-h-screen overflow-hidden flex items-center">
      <motion.div
        ref={focusRef}
        style={{ opacity: focusOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-32 -translate-y-6 md:-translate-y-20"
      >
        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-12">
          {/* Explanation card */}
          <div className="md:col-span-4">
            <div
              className="h-full rounded-3xl p-6 md:p-8 border flex flex-col"
              style={{
                background: "rgba(31,42,51,0.92)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div>
              <div className="mb-4">
                <div className="text-sm font-medium tracking-wide text-white/60">{cfg.explainTitle}</div>
                <div className="mt-2 h-[2px] w-10 rounded-full" style={{ background: cfg.color, opacity: 0.7 }} />
              </div>

              <h3 className="text-lg font-semibold text-white">What is happening in this division?</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/78">{cfg.explainBody}</p>
              </div>

              <div className="mt-auto rounded-2xl bg-white/5 p-4">
                <div className="text-xs font-medium text-white/60">This layer takes shape through:</div>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  {cfg.anchors.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full"
                        style={{ background: cfg.color, opacity: 0.8 }}
                      />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Question + thesis card */}
          <div className="md:col-span-8">
            <div
              className="rounded-3xl border p-6 md:p-10"
              style={{
                background: "transparent",
                borderColor: "rgba(255,255,255,0.0)",
              }}
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/85">
                <span className="text-lg font-semibold">{cfg.name}</span>
              </div>

              <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                {cfg.question}
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80 md:text-2xl">
                {cfg.thesis}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {cfg.anchors.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/75"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

type MechanismConfig = {
  key: string;
  label: string;
  name: string;
  color: string;
  icon: React.ElementType;
  mechanismImage: string;
  question: string;
  thesis: string;
  anchors: string[];
  explainTitle: string;
  explainBody: string;
};

function MechanismSection({ cfg, id }: { cfg: MechanismConfig; id: string }) {
  const focusRef = useRef<HTMLDivElement | null>(null);
  const focusOpacity = useCenterFocusOpacity(focusRef);

  return (
    <section id={id} className="relative w-full min-h-screen overflow-hidden flex items-center">
      <motion.div
        ref={focusRef}
        style={{ opacity: focusOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-32 -translate-y-6 md:-translate-y-20"
      >
        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-12">
          {/* Question + thesis card */}
          <div className="md:col-span-8">
            <div
              className="rounded-3xl border p-6 md:p-10"
              style={{
                background: "transparent",
                borderColor: "rgba(255,255,255,0.0)",
              }}
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/85">
                <span className="text-lg font-semibold">{cfg.name}</span>
              </div>

              <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                {cfg.question}
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80 md:text-2xl">
                {cfg.thesis}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {cfg.anchors.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/75"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Explanation card */}
          <div className="md:col-span-4">
            <div
              className="h-full rounded-3xl p-6 md:p-8 border flex flex-col"
              style={{
                background: "rgba(31,42,51,0.92)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div>
              <div className="mb-4">
                <div className="text-sm font-medium tracking-wide text-white/60">{cfg.explainTitle}</div>
                <div className="mt-2 h-[2px] w-10 rounded-full" style={{ background: cfg.color, opacity: 0.7 }} />
              </div>

              <h3 className="text-lg font-semibold text-white">What is happening in this division?</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/78">{cfg.explainBody}</p>
              </div>

              <div className="mt-auto rounded-2xl bg-white/5 p-4">
                <div className="text-xs font-medium text-white/60">This layer takes shape through:</div>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  {cfg.anchors.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full"
                        style={{ background: cfg.color, opacity: 0.8 }}
                      />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <Pill label="Work" color={COLORS.blue} />
            <h2 className="mt-4 text-2xl md:text-4xl font-semibold" style={{ color: COLORS.ink }}>
              What is taking shape?
            </h2>
            <p className="mt-3 text-base md:text-lg" style={{ color: "rgba(31,42,51,0.78)" }}>
              Selected works and signals emerging across Meaning, Pattern, and Mechanism.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mt-10 grid md:grid-cols-3 gap-5">
        <ImagePanel label="Featured exhibition / installation" tone="meaning" aspect="aspect-[4/5]">
          <iframe
            title="Poppish-Patrick Hughes"
            src="https://www.kiriengine.app/share/3dgsEmbed/1992812111444574208?userId=923097&type=0&bg_theme=bright&auto_spin=0"
            className="h-full w-full"
            style={{ border: 0 }}
            allow="autoplay; fullscreen"
            allowFullScreen
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 p-4 flex items-start justify-start">
            <div
              className="rounded-full px-3 py-1 text-[11px] tracking-wide"
              style={{
                background: "rgba(31,42,51,0.75)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(6px)",
              }}
            >
              3D Interactive   drag / zoom / explore
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-end p-4">
            <div
              className="rounded-2xl px-3 py-2 text-xs"
              style={{
                background: "rgba(31,42,51,0.85)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              Patrick Hughes | Poppish (3D Dillustion)
            </div>
          </div>
        </ImagePanel>

        <ImagePanel label="Digitization demo / virtual museum preview" tone="pattern" aspect="aspect-[4/5]">
          <iframe
            title={'Hippopotamus "William"'}
            src="https://www.kiriengine.app/share/3dgsEmbed/1994757825678540800?userId=923097&type=0&bg_theme=dark&auto_spin=0"
            className="h-full w-full"
            style={{ border: 0 }}
            allow="autoplay; fullscreen"
            allowFullScreen
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 p-4 flex items-start justify-start">
            <div
              className="rounded-full px-3 py-1 text-[11px] tracking-wide"
              style={{
                background: "rgba(31,42,51,0.75)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(6px)",
              }}
            >
              3D Interactive   drag / zoom / explore
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-end p-4">
            <div
              className="rounded-2xl px-3 py-2 text-xs"
              style={{
                background: "rgba(31,42,51,0.85)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              Met Museum | “William” the Hippopotamus (3D)
            </div>
          </div>
        </ImagePanel>

        <ImagePanel label="System prototype / incentive loop" tone="mechanism" aspect="aspect-[4/5]">
          <img src="/pics/talk.png" alt="Featured exhibition" className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 flex items-end p-4">
            <div
              className="rounded-2xl px-3 py-2 text-xs"
              style={{
                background: "rgba(31,42,51,0.85)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              Presenting a system prototype
            </div>
          </div>
        </ImagePanel>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-5">
        <div
          className="rounded-3xl border p-6 md:p-8"
          style={{
            borderColor: "rgba(31,42,51,0.10)",
            background: "rgba(245,247,246,0.85)",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="text-xl font-semibold" style={{ color: COLORS.ink }}>
                Signals across the loop
              </div>
              <div className="mt-2 text-lg" style={{ color: COLORS.ink }}>
                A few concrete artifacts across Meaning, Pattern, and Mechanism. Less explanation here; more evidence. Each piece is a doorway into the loop.
              </div>
            </div>
          </div>
        </div>

        <ImagePanel
          label="Future slot: partner spotlight / upcoming event"
          tone="neutral"
          aspect="aspect-[16/10]"
        >
          <img src="/pics/Nature_Salon.png" alt="Featured exhibition" className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 flex items-end p-4">
            <div
              className="rounded-2xl px-3 py-2 text-sm"
              style={{
                background: "rgba(31,42,51,0.85)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              Upcoming | Nature Salon-Art for the Dialog of Sustainability
            </div>
          </div>
        </ImagePanel>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="involved" className="mx-auto max-w-6xl px-5 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Pill label="Get involved" color={COLORS.blue} />
        <h2 className="mt-4 text-2xl md:text-4xl font-semibold" style={{ color: COLORS.ink }}>
          Want to turn the loop into continuity?
        </h2>
        <p className="mt-3 text-base md:text-lg" style={{ color: "rgba(31,42,51,0.78)" }}>
          Join at the layer where you contribute most—Meaning, Pattern, Mechanism, or Continuity.
        </p>
      </motion.div>

      <div className="mt-10 grid md:grid-cols-4 gap-5">
        <RoleCard
          title="Artists, Curators & Cultural Producers"
          body="Meaning: translate sustainability into shared language: through art, culture, and lived experience (exhibitions, installations, storytelling, and more)."
          color={COLORS.art}
          bgImage="/pics/aritsts.jpg"
        />
        <RoleCard
          title="Museums, Universities & Researchers"
          body="Pattern: turn nature and collections into shared, computable representations: through digitization, virtual access, and open datasets."
          color={COLORS.data}
          bgImage="/pics/museums.JPG"
        />
        <RoleCard
          title="Entrepreneurs & System Builders"
          body="Mechanism: design incentive loops and closed-loop operations: so sustainable behavior is rewarded by default (pilots, prototypes, partnerships, and beyond)."
          color={COLORS.mech}
          bgImage="/pics/industry.JPG"
        />
        <RoleCard
          title="Partners, Funders & Hosts"
          body="Continuity: provide the support and infrastructure that lets projects persist and compound: funding, hosting, partnerships, and long-term stewardship."
          color={COLORS.blue}
          bgImage="/pics/partners.JPG"
        />
      </div>

      <div
        className="mt-10 rounded-3xl p-6 md:p-8 border relative overflow-hidden"
        style={{ borderColor: "rgba(31,42,51,0.10)" }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: "rgba(31,42,51,0.85)" }} />
        </div>

        <div className="relative z-10 flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl overflow-hidden">
            <img
              src="/logo/SOS-LOGO_v3-icon.svg"
              alt="SOS Foundation Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="mt-2 text-lg" style={{ color: COLORS.gold }}>
              Leave your email and tell us which layer you're coming from. We'll follow up with the most relevant next step.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                className="rounded-2xl border-2 border-white"
                style={{ background: COLORS.blue, color: "white" }}
              >
                <a href={formUrl} target="_blank" rel="noopener noreferrer">
                  Leave your email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const formUrl = "https://forms.gle/kzxSKDewYjhxLeyBA";

// RoleCard toggle behavior:
// - "auto": tap-to-toggle only on touch-like devices (recommended)
// - "on": enable toggle everywhere
// - "off": disable toggle everywhere (hover/focus still works)
const ROLE_CARD_TOGGLE_MODE: "auto" | "on" | "off" = "auto";

function useIsTouchLikeDevice() {
  const [touchLike, setTouchLike] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const mql = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setTouchLike(!!mql.matches);
    update();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }

    // Safari < 14
    mql.addListener(update);
    return () => mql.removeListener(update);
  }, []);

  return touchLike;
}

function useRoleCardToggleEnabled() {
  const touchLike = useIsTouchLikeDevice();
  if (ROLE_CARD_TOGGLE_MODE === "on") return true;
  if (ROLE_CARD_TOGGLE_MODE === "off") return false;
  return touchLike;
}

function RoleCard({
  title,
  body,
  color,
  bgImage,
}: {
  title: string;
  body: string;
  color: string;
  bgImage?: string;
}) {
  const [open, setOpen] = useState(false);
  const toggleEnabled = useRoleCardToggleEnabled();

  useEffect(() => {
    if (!toggleEnabled) setOpen(false);
  }, [toggleEnabled]);

  const toggle = () => setOpen((v) => !v);

  const onCardClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!toggleEnabled) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("a,button,input,textarea,select,label")) return;
    toggle();
  };

  const onCardKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!toggleEnabled) return;
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    toggle();
  };

  return (
    <Card
      className="group rounded-3xl overflow-hidden h-90 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2"
      style={{ borderColor: "rgba(31,42,51,0.10)" }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={onCardClick}
      onKeyDown={onCardKeyDown}
    >
      <div className="relative h-full">
        {bgImage ? (
            <div className="absolute inset-0">
            <img src={bgImage} alt="" className="h-full w-full object-cover" />
            <div
              className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-60 group-focus-within:opacity-60 ${
                open ? "opacity-60" : ""
              }`}
              style={{ background: "rgb(31,42,51)" }}
            />
            </div>
        ) : null}

        <CardContent className="relative flex h-full flex-col p-4">
          <div className="flex-1">
            <div
              className="w-full px-1 py-1 text-lg font-semibold text-center"
              style={{ 
              color: bgImage ? COLORS.bg : COLORS.ink,
              background: bgImage 
                ? `${color}DD` 
                : `${color}99`
              }}
            >
              {title}
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100 ${
                open ? "max-h-40 opacity-100" : ""
              }`}
            >
              <p
                className="mt-5 text-m"
                style={{ color: bgImage ? COLORS.bg : COLORS.ink }}
              >
                {body}
              </p>
            </div>
          </div>

          <div className="mt-auto">
            <Button
              asChild
              className="rounded-2xl border-2 border-white"
              style={{ background: color, color: "white" }}
            >
              <a href={formUrl} target="_blank" rel="noopener noreferrer">
                Reach out
              </a>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

/** backup scripted for potential later use
 * FullscreenVisual component
 */

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
