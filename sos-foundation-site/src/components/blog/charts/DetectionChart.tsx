"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS } from "@/lib/theme";
import { ChartFrame, INK, Slider, isZh, useWidth } from "./shared";

// ─── "Not seeing it is not the same as it not being there" ───────────────────
// Chance that a survey records an animal on none of `days` days, when each day
// has an independent chance `p` of recording it: (1 − p)^days. Illustrative,
// not field data. Readers move the daily chance and the survey length (by
// slider or by dragging across the chart) and watch the miss rate change.

const MAX_DAYS = 60;
const PRESETS = [0.02, 0.05, 0.1];
/** Where along each dashed reference curve its label sits, in days. */
const LABEL_DAY: Record<number, number> = { 0.02: 46, 0.05: 34, 0.1: 24 };

const TEXT = {
  en: {
    title: "A short survey can easily miss a rare animal",
    subtitle:
      "At a site where the animal really lives, the chance that a survey records it on none of its days",
    missLead: (d: number) => `chance a ${d}-day survey records no animal at all`,
    sureLead: "days needed to be 95% sure of at least one record",
    pLabel: "Chance of recording it on any one day",
    dLabel: "Length of survey",
    days: (d: number) => `${d} day${d === 1 ? "" : "s"}`,
    xAxis: "Days of survey",
    yAxis: "Chance of no record",
    sure: "95% sure",
    perDay: (n: number) => `${n}% a day`,
    beyond: (n: number) => `95% sure only after ${n} days`,
    hint: "Drag across the chart, or use the sliders",
    aria: (p: number, d: number, miss: number) =>
      `Line chart. With a ${p}% daily chance of recording the animal, the chance of recording it on none of ${d} survey days is ${miss}%.`,
  },
  zh: {
    title: "短期調查很容易漏掉稀有動物",
    subtitle: "在確實有這種動物生活的地點，調查若干天後仍「一次都沒記錄到」的機率",
    missLead: (d: number) => `調查 ${d} 天，一次都沒記錄到的機率`,
    sureLead: "要有 95% 把握至少記錄到一次，所需天數",
    pLabel: "每天記錄到這種動物的機率",
    dLabel: "調查天數",
    days: (d: number) => `${d} 天`,
    xAxis: "調查天數",
    yAxis: "一次都沒記錄到的機率",
    sure: "95% 把握",
    perDay: (n: number) => `每天 ${n}%`,
    beyond: (n: number) => `要 ${n} 天才有 95% 把握`,
    hint: "在圖上拖曳，或使用下方滑桿",
    aria: (p: number, d: number, miss: number) =>
      `折線圖。每天記錄機率為 ${p}% 時，調查 ${d} 天一次都沒記錄到的機率為 ${miss}%。`,
  },
};

const miss = (p: number, d: number) => Math.pow(1 - p, d);
const daysFor95 = (p: number) => Math.ceil(Math.log(0.05) / Math.log(1 - p));

export default function DetectionChart({ lang }: { lang?: string }) {
  const t = isZh(lang) ? TEXT.zh : TEXT.en;
  const [p, setP] = useState(0.05);
  const [days, setDays] = useState(10);
  const [wrapRef, width] = useWidth<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-80px" });

  const narrow = width < 480;
  const m = { top: 18, right: 18, bottom: 44, left: narrow ? 40 : 52 };
  const height = Math.round(Math.min(380, Math.max(260, width * 0.56)));
  const iw = Math.max(1, width - m.left - m.right);
  const ih = height - m.top - m.bottom;
  const x = (d: number) => m.left + (d / MAX_DAYS) * iw;
  const y = (v: number) => m.top + (1 - v) * ih;

  // Same number of points for every curve, so framer-motion can tween `d`.
  const curve = (q: number) => {
    let s = "";
    for (let i = 0; i <= MAX_DAYS * 2; i++) {
      const d = i / 2;
      s += `${i ? "L" : "M"}${x(d).toFixed(1)},${y(miss(q, d)).toFixed(1)}`;
    }
    return s;
  };
  const main = useMemo(() => curve(p), [p, width, height]); // eslint-disable-line react-hooks/exhaustive-deps
  const area = `${main}L${x(MAX_DAYS)},${y(0)}L${x(0)},${y(0)}Z`;

  const missPct = Math.round(miss(p, days) * 100);
  const n95 = daysFor95(p);
  const pPct = Math.round(p * 100);

  const pickDay = (clientX: number) => {
    const box = svgRef.current?.getBoundingClientRect();
    if (!box) return;
    const d = Math.round(((clientX - box.left - m.left) / iw) * MAX_DAYS);
    setDays(Math.min(MAX_DAYS, Math.max(1, d)));
  };

  const accent = COLORS.data;
  const warm = "#D9623B";
  const mx = x(days);
  const my = y(miss(p, days));
  const labelLeft = mx > m.left + iw * 0.62;

  return (
    <ChartFrame title={t.title} subtitle={t.subtitle}>
      {/* Headline numbers */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl p-3 sm:p-4" style={{ background: "rgba(217,98,59,0.08)" }}>
          <div className="text-3xl sm:text-4xl font-semibold tabular-nums" style={{ color: warm }}>
            {missPct}%
          </div>
          <div className="mt-1 text-xs sm:text-sm leading-snug" style={{ color: INK.body }}>
            {t.missLead(days)}
          </div>
        </div>
        <div className="rounded-xl p-3 sm:p-4" style={{ background: "rgba(46,156,154,0.08)" }}>
          <div className="text-3xl sm:text-4xl font-semibold tabular-nums" style={{ color: accent }}>
            {n95}
          </div>
          <div className="mt-1 text-xs sm:text-sm leading-snug" style={{ color: INK.body }}>
            {t.sureLead}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div ref={wrapRef} className="mt-4 select-none">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          role="img"
          aria-label={t.aria(pPct, days, missPct)}
          className="block touch-pan-y cursor-crosshair"
          onPointerDown={(e) => pickDay(e.clientX)}
          onPointerMove={(e) => (e.buttons || e.pointerType === "mouse") && pickDay(e.clientX)}
        >
          <defs>
            <linearGradient id="detect-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity={0.22} />
              <stop offset="100%" stopColor={accent} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          {/* Grid + y ticks */}
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <g key={v}>
              <line x1={m.left} x2={m.left + iw} y1={y(v)} y2={y(v)} stroke={v ? INK.grid : INK.faint} />
              <text x={m.left - 8} y={y(v)} dy="0.32em" textAnchor="end" fontSize={12} fill={INK.muted}>
                {v * 100}%
              </text>
            </g>
          ))}
          {/* x ticks */}
          {[0, 10, 20, 30, 40, 50, 60].map((d) => (
            <text key={d} x={x(d)} y={m.top + ih + 18} textAnchor="middle" fontSize={12} fill={INK.muted}>
              {d}
            </text>
          ))}
          <text x={m.left + iw / 2} y={height - 4} textAnchor="middle" fontSize={12} fill={INK.body}>
            {t.xAxis}
          </text>

          {/* Reference curves for the three illustrative daily chances */}
          {PRESETS.filter((q) => q !== p).map((q) => {
            const ld = LABEL_DAY[q];
            return (
              <motion.g
                key={q}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <path d={curve(q)} fill="none" stroke={INK.faint} strokeWidth={1.5} strokeDasharray="4 4" />
                <text x={x(ld)} y={y(miss(q, ld)) - 6} textAnchor="middle" fontSize={11} fill={INK.muted}>
                  {t.perDay(Math.round(q * 100))}
                </text>
              </motion.g>
            );
          })}

          {/* 95%-sure marker */}
          {n95 <= MAX_DAYS ? (
            <g>
              <line
                x1={x(n95)} x2={x(n95)} y1={m.top} y2={m.top + ih}
                stroke={accent} strokeDasharray="3 4" strokeOpacity={0.7}
              />
              <text
                x={x(n95) + (x(n95) > m.left + iw * 0.8 ? -6 : 6)}
                y={m.top + 12}
                textAnchor={x(n95) > m.left + iw * 0.8 ? "end" : "start"}
                fontSize={12}
                fontWeight={600}
                fill={accent}
              >
                {t.sure} · {t.days(n95)}
              </text>
            </g>
          ) : (
            <text x={m.left + iw} y={m.top + 12} textAnchor="end" fontSize={12} fontWeight={600} fill={accent}>
              {t.beyond(n95)} →
            </text>
          )}

          {/* Main curve */}
          <motion.path
            d={area}
            fill="url(#detect-area)"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0, d: area }}
            transition={{ opacity: { duration: 0.8, delay: 0.6 }, d: { duration: 0.35 } }}
          />
          <motion.path
            fill="none"
            stroke={accent}
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: 0, d: main }}
            animate={{ pathLength: inView ? 1 : 0, d: main }}
            transition={{ pathLength: { duration: 1.4, ease: "easeInOut" }, d: { duration: 0.35 } }}
          />

          {/* Selected day */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 1.2 }}>
            <line x1={mx} x2={mx} y1={my} y2={m.top + ih} stroke={warm} strokeOpacity={0.5} />
            <motion.circle
              r={7}
              cx={mx}
              cy={my}
              initial={false}
              fill={warm}
              stroke="white"
              strokeWidth={3}
              animate={{ cx: mx, cy: my }}
              transition={{ duration: 0.2 }}
            />
            <text
              x={mx + (labelLeft ? -12 : 12)}
              y={my - 12}
              textAnchor={labelLeft ? "end" : "start"}
              fontSize={13}
              fontWeight={600}
              fill={warm}
              stroke="white"
              strokeWidth={4}
              paintOrder="stroke"
            >
              {t.days(days)} → {missPct}%
            </text>
          </motion.g>
        </svg>
        <p className="mt-1 text-xs" style={{ color: INK.muted }}>
          {t.hint}
        </p>
      </div>

      {/* Controls */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Slider
            label={t.pLabel}
            value={pPct}
            display={`${pPct}%`}
            min={1}
            max={20}
            step={1}
            color={accent}
            onChange={(v) => setP(v / 100)}
          />
          <div className="mt-2 flex gap-2">
            {PRESETS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setP(q)}
                className="rounded-full border px-3 py-0.5 text-xs transition-colors"
                style={{
                  borderColor: q === p ? accent : INK.faint,
                  background: q === p ? accent : "transparent",
                  color: q === p ? "white" : INK.body,
                }}
              >
                {Math.round(q * 100)}%
              </button>
            ))}
          </div>
        </div>
        <Slider
          label={t.dLabel}
          value={days}
          display={t.days(days)}
          min={1}
          max={MAX_DAYS}
          step={1}
          color={warm}
          onChange={setDays}
        />
      </div>
    </ChartFrame>
  );
}
