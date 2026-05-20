"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS } from "@/lib/theme";
import { formatDate, getAuthor, getCategory } from "@/content/blog";
import { HIGHLIGHT_ROTATION_MS } from "@/content/blog/highlights";
import type { Post } from "@/content/blog/types";

// ─── Rotating hero slider ────────────────────────────────────────────────────
// Each slide is a featured post. Auto-advances every HIGHLIGHT_ROTATION_MS,
// pauses while the user is hovering. With a single highlight, renders as a
// static hero (no arrows, no dots, no timer).

export default function HighlightSlider({ posts }: { posts: Post[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const safeIndex = posts.length > 0 ? index % posts.length : 0;
  const current = posts[safeIndex];

  // Auto-advance — disabled when there's only one slide or the user hovers.
  useEffect(() => {
    if (posts.length < 2 || paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % posts.length),
      HIGHLIGHT_ROTATION_MS,
    );
    return () => window.clearInterval(id);
  }, [posts.length, paused]);

  // ── Empty state: brand-only hero (no posts at all). ─────────────────────
  if (!current) {
    return (
      <section className="relative w-full min-h-[66vh] flex items-center justify-center overflow-hidden">
        <img
          src="/pics/Nature_Salon.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0" style={{ background: "rgba(8,24,36,0.82)" }} />
        <div className="relative z-10 text-center px-5">
          <img
            src="/logo/SOS-LOGO_v2-for_SVG.svg"
            alt="SOS Foundation"
            className="mx-auto h-12 w-28"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg)",
            }}
          />
          <h1 className="mt-8 text-5xl md:text-6xl font-semibold tracking-tight text-white">
            Ideas, in public
          </h1>
        </div>
      </section>
    );
  }

  const author = getAuthor(current.authorId);
  const accent = current.accent ?? COLORS.data;
  const hasMultiple = posts.length > 1;

  const prev = () => setIndex((i) => (i - 1 + posts.length) % posts.length);
  const next = () => setIndex((i) => (i + 1) % posts.length);

  return (
    <section
      className="relative w-full min-h-[68vh] md:min-h-[72vh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* ── Cross-fading background image per slide ─────────────────────── */}
      <AnimatePresence>
        <motion.div
          key={current.slug + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={current.cover}
            alt={current.coverAlt ?? current.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,24,36,0.55) 0%, rgba(8,24,36,0.78) 60%, rgba(8,24,36,0.88) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Persistent brand strip — visible across every slide ─────────── */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-12 md:pt-16 text-center">
        <img
          src="/logo/SOS-LOGO_v2-for_SVG.svg"
          alt="SOS Foundation"
          className="mx-auto h-10 w-24 opacity-90"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg)",
          }}
        />
        <div className="mt-2 text-xs font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>
          SOS Blog · Ideas, in public
        </div>
      </div>

      {/* ── Per-slide content — title, excerpt, byline, CTA ─────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 pt-10 md:pt-14 pb-24 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug + "-content"}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {/* Featured + categories */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                style={{ background: `${accent}1F`, color: accent }}
              >
                Featured
              </span>
              {(current.tags ?? []).slice(0, 2).map((tag) => {
                const cat = getCategory(tag);
                return (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-[11px] font-medium"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: cat.color,
                      border: `1px solid ${cat.color}55`,
                    }}
                  >
                    {cat.label}
                  </span>
                );
              })}
            </div>

            <h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-white">
              {current.title}
            </h1>
            <p
              className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              {current.excerpt}
            </p>

            {/* Byline */}
            <div className="mt-6 flex items-center justify-center gap-2.5">
              <div className="h-7 w-7 rounded-full overflow-hidden bg-white/10">
                <img src={author.avatar} alt={author.name} className="h-full w-full object-cover" />
              </div>
              <div className="text-xs text-white/65">
                {author.name} · {formatDate(current.date)}
              </div>
            </div>

            <a
              href={`/blog/${current.slug}`}
              className="mt-7 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-[0.97]"
              style={{ background: COLORS.blue }}
            >
              Read the post <ArrowRight size={16} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Controls — arrows + dots, only when 2+ slides ───────────────── */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous highlight"
            className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border flex items-center justify-center text-white transition-all hover:scale-110 hover:bg-white/10 active:scale-95"
            style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(8,24,36,0.45)" }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next highlight"
            className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border flex items-center justify-center text-white transition-all hover:scale-110 hover:bg-white/10 active:scale-95"
            style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(8,24,36,0.45)" }}
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {posts.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to highlight ${i + 1}`}
                className="rounded-full transition-all"
                style={{
                  width: i === safeIndex ? 28 : 8,
                  height: 8,
                  background:
                    i === safeIndex ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
