"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChartFrame, INK, isZh, useWidth } from "./shared";

// ─── Desert soil crust heals slowly ──────────────────────────────────────────
// Recovery of biological soil crust inside WWII tank tracks in the Mojave
// Desert, about 55 years after the damage, as % of undisturbed ground.
// Data: Belnap & Warren (2002). Follows the manuscript's dot plot: one dot per
// row (a range for cyanobacteria), a "fully recovered" line at 100. Dots slide
// in from 0 when scrolled into view; hovering a row brings it forward.

type Row = { low: number; high?: number; en: string; zh: string };

const ROWS: Row[] = [
  { low: 46, high: 65, en: "Cyanobacteria (biomass)", zh: "藍藻（生物量）" },
  { low: 36, en: "Lichen C. squamulosum, under shrubs", zh: "地衣 C. squamulosum（灌叢下）" },
  { low: 6, en: "Lichen C. tenax, open ground", zh: "地衣 C. tenax（空曠地）" },
  { low: 3, en: "Lichen C. squamulosum, open ground", zh: "地衣 C. squamulosum（空曠地）" },
];

const DOT = "#2B78D0";
const GUIDE = "#E3E3DE";

const TEXT = {
  en: {
    title: "Desert soil crust heals slowly",
    subtitle: "Recovery inside WWII tank tracks in the Mojave Desert, about 55 years later",
    axis: "Recovered (% of undisturbed ground)",
    full: "fully recovered",
    source: "Source: Belnap & Warren (2002), Arid Land Research and Management 16: 245–258.",
    note: "The authors estimate that full recovery could take nearly 2,000 years at this pace.",
    aria: "Dot chart. About 55 years after the damage, cyanobacteria had recovered to 46–65% of undisturbed ground; the lichen C. squamulosum to 36% under shrubs and 3% on open ground; and C. tenax to 6% on open ground.",
  },
  zh: {
    title: "荒漠生物結皮恢復得很慢",
    subtitle: "美國莫哈韋沙漠二戰坦克車轍內，約 55 年後的恢復程度",
    axis: "恢復程度（相對於未擾動地面的百分比）",
    full: "完全恢復",
    source: "資料來源：Belnap & Warren (2002), Arid Land Research and Management 16: 245–258。",
    note: "作者估計，按這個速度，完全恢復可能需要近 2000 年。",
    aria: "點圖。受損約 55 年後，藍藻恢復到未擾動地面的 46–65%；地衣 C. squamulosum 在灌叢下恢復到 36%、在空曠地僅 3%；C. tenax 在空曠地為 6%。",
  },
};

/** Width of the longest label in the page's font, so the column never clips. */
function useLabelWidth(labels: string[], fontSize: number) {
  const [w, setW] = useState(labels.reduce((a, l) => Math.max(a, l.length), 0) * fontSize * 0.55);
  const key = labels.join("|");
  useEffect(() => {
    let live = true;
    // Measure once web fonts are in, or Geist's metrics would be guessed.
    document.fonts.ready.then(() => {
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx || !live) return;
      ctx.font = `${fontSize}px ${getComputedStyle(document.body).fontFamily}`;
      setW(Math.ceil(Math.max(...key.split("|").map((l) => ctx.measureText(l).width))));
    });
    return () => {
      live = false;
    };
  }, [key, fontSize]);
  return w;
}

const fmt = (r: Row) => (r.high ? `${r.low}–${r.high}%` : `${r.low}%`);

export default function SoilCrustChart({ lang }: { lang?: string }) {
  const zh = isZh(lang);
  const t = zh ? TEXT.zh : TEXT.en;
  const [wrapRef, width] = useWidth<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-80px" });
  const [hover, setHover] = useState<number | null>(null);

  // Wide: labels in a right-aligned column, as in the original.
  // Narrow: each label sits above its row so the plot keeps the full width.
  const labelFull = useLabelWidth(ROWS.map((r) => (zh ? r.zh : r.en)), 14);
  const stacked = width - labelFull < 340;
  const labelW = stacked ? 0 : labelFull;
  const m = { top: 34, right: stacked ? 58 : 76, bottom: 58, left: stacked ? 8 : labelW + 18 };
  const rowH = stacked ? 64 : 56;
  const iw = Math.max(1, width - m.left - m.right);
  const height = m.top + rowH * ROWS.length + m.bottom;
  const x = (v: number) => m.left + (v / 100) * iw;
  const yRow = (i: number) => m.top + rowH * i + rowH / 2 + (stacked ? 10 : 0);
  const axisY = m.top + rowH * ROWS.length + 6;

  return (
    <ChartFrame title={t.title} subtitle={t.subtitle}>
      <div ref={wrapRef} className="mt-4 select-none">
        <svg ref={svgRef} width={width} height={height} role="img" aria-label={t.aria} className="block">
          {/* Fully recovered */}
          <line x1={x(100)} x2={x(100)} y1={m.top - 8} y2={axisY} stroke="#C9C9C2" strokeWidth={2} />
          <text x={x(100)} y={m.top - 16} textAnchor="end" fontSize={13} fill={INK.muted}>
            {t.full}
          </text>

          {ROWS.map((r, i) => {
            const cy = yRow(i);
            const dim = hover !== null && hover !== i;
            const mid = r.high ? (r.low + r.high) / 2 : r.low;
            const delay = 0.2 + i * 0.15;
            return (
              <g
                key={i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onTouchStart={() => setHover(i)}
                style={{ opacity: dim ? 0.35 : 1, transition: "opacity 200ms" }}
              >
                {/* hit area */}
                <rect x={0} y={cy - rowH / 2 - (stacked ? 10 : 0)} width={width} height={rowH} fill="transparent" />
                <text
                  x={stacked ? m.left : m.left - 18}
                  y={stacked ? cy - 20 : cy}
                  dy="0.35em"
                  textAnchor={stacked ? "start" : "end"}
                  fontSize={stacked ? 13 : 14}
                  fontWeight={hover === i ? 600 : 400}
                  fill={INK.body}
                >
                  {zh ? r.zh : r.en}
                </text>
                <line x1={x(0)} x2={x(100)} y1={cy} y2={cy} stroke={GUIDE} strokeWidth={2} />
                {r.high && (
                  <motion.line
                    y1={cy}
                    y2={cy}
                    stroke={DOT}
                    strokeWidth={4}
                    strokeLinecap="round"
                    initial={{ x1: x(mid), x2: x(mid), opacity: 0 }}
                    animate={inView ? { x1: x(r.low), x2: x(r.high), opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: delay + 1.0, ease: "easeOut" }}
                  />
                )}
                <motion.circle
                  cy={cy}
                  r={hover === i ? 9 : 7.5}
                  fill={DOT}
                  stroke="white"
                  strokeWidth={2.5}
                  initial={{ cx: x(0), opacity: 0 }}
                  animate={inView ? { cx: x(mid), opacity: 1 } : {}}
                  transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.text
                  x={x(r.high ?? r.low) + 14}
                  y={cy}
                  dy="0.35em"
                  fontSize={stacked ? 14 : 16}
                  fontWeight={hover === i ? 700 : 500}
                  fill={INK.strong}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: delay + (r.high ? 1.5 : 1.0) }}
                  className="tabular-nums"
                >
                  {fmt(r)}
                </motion.text>
              </g>
            );
          })}

          {/* x axis */}
          <line x1={x(0)} x2={x(100) + 14} y1={axisY} y2={axisY} stroke="#C9C9C2" strokeWidth={2} />
          {[0, 25, 50, 75, 100].map((v) => (
            <text key={v} x={x(v)} y={axisY + 22} textAnchor="middle" fontSize={13} fill={INK.muted}>
              {v}
            </text>
          ))}
          <text
            x={stacked ? m.left : x(50)}
            y={axisY + 46}
            textAnchor={stacked ? "start" : "middle"}
            fontSize={stacked ? 12 : 14}
            fill={INK.body}
          >
            {t.axis}
          </text>
        </svg>

        <p className="mt-4 text-xs leading-relaxed" style={{ color: INK.muted }}>
          {t.source}
          <br />
          {t.note}
        </p>
      </div>
    </ChartFrame>
  );
}
