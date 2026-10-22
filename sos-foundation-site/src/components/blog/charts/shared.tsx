"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { COLORS } from "@/lib/theme";

// ─── Shared pieces for interactive article charts ────────────────────────────

/** Muted ink tones used across charts (matches the article body text). */
export const INK = {
  strong: COLORS.ink,
  body: "rgba(31,42,51,0.72)",
  muted: "rgba(31,42,51,0.50)",
  faint: "rgba(31,42,51,0.12)",
  grid: "rgba(31,42,51,0.07)",
};

/** True for any Chinese variant, so charts can pick their strings. */
export function isZh(lang?: string) {
  return !!lang && lang.toLowerCase().startsWith("zh");
}

/** Tracks an element's rendered width so SVGs can draw in real pixels. */
export function useWidth<T extends HTMLElement>(fallback = 640) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

/** The white card every chart sits in: title, subtitle, then the chart. */
export function ChartFrame({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border bg-white p-4 sm:p-6"
      style={{ borderColor: INK.faint }}
    >
      <p className="text-lg sm:text-xl font-semibold leading-snug" style={{ color: INK.strong }}>
        {title}
      </p>
      <p className="mt-1 text-sm leading-relaxed" style={{ color: INK.muted }}>
        {subtitle}
      </p>
      {children}
    </div>
  );
}
