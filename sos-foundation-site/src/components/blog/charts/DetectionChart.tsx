"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChartFrame, INK, isZh, useWidth } from "./shared";

// ─── A short survey can easily miss a rare animal ────────────────────────────
// Chance that a survey records an animal on none of `days` days, when each day
// has an independent chance p of recording it: (1 − p)^days. Illustrative,
// not field data. Follows the manuscript's chart: three curves, two callouts
// on the 5% curve. The curves draw in on scroll; hovering or dragging across
// the chart reads all three at that day.

const MAX_DAYS = 60;
const AXIS = "#C9C9C2";
const GUIDE = "#E3E3DE";

const CURVES = [
  { p: 0.02, color: "#1FA97A", labelX: 24.5, labelY: 0.67 },
  { p: 0.05, color: "#E8643A", labelX: 23, labelY: 0.38 },
  { p: 0.1, color: "#2B78D0", labelX: 23, labelY: 0.13 },
];

const TEXT = {
  en: {
    title: "A short survey can easily miss a rare animal",
    subtitle: "Chance of recording no sightings at a site where the animal does live",
    legend: "Daily chance of recording the animal:",
    perDay: (n: number) => `${n}% per day`,
    ann1: ["10 days at 5% per day:", "60% chance of seeing nothing"],
    ann2: "30 days: still 21%",
    yAxis: "Chance of recording nothing (%)",
    xAxis: "Days of survey",
    day: (d: number) => `Day ${d}`,
    hint: "Hover or drag across the chart to read the curves",
    note: [
      "Illustration, not data from the Zhangye project. Assumes independent survey days with a fixed daily chance p:",
      "chance of recording nothing = (1 − p) ^ days.",
    ],
    aria: "Line chart. With a 5% daily chance of recording the animal, a 10-day survey still has a 60% chance of recording nothing, and a 30-day survey 21%. Curves for 2% and 10% per day are shown for comparison.",
  },
  zh: {
    title: "短期調查很容易漏掉稀有動物",
    subtitle: "在確有該動物生活的地點，調查若干天後仍「一次都沒記錄到」的機率",
    legend: "每天記錄到該動物的機率：",
    perDay: (n: number) => `每天 ${n}%`,
    ann1: ["每天 5%，調查 10 天：", "仍有 60% 的機率一次也看不到"],
    ann2: "調查 30 天：仍有 21%",
    yAxis: "一次都沒記錄到的機率（%）",
    xAxis: "調查天數",
    day: (d: number) => `第 ${d} 天`,
    hint: "滑過或拖曳圖表，即可讀取各曲線的數值",
    note: [
      "示意圖，並非張掖開發案的實際資料。假設每天調查相互獨立、每天的記錄機率 p 固定：",
      "一次都沒記錄到的機率 = (1 − p) ^ 天數。",
    ],
    aria: "折線圖。每天記錄機率為 5% 時，調查 10 天仍有 60% 的機率一次都沒記錄到，調查 30 天仍有 21%。圖中另以每天 2% 與 10% 的曲線作比較。",
  },
};

const miss = (p: number, d: number) => Math.pow(1 - p, d);

export default function DetectionChart({ lang }: { lang?: string }) {
  const t = isZh(lang) ? TEXT.zh : TEXT.en;
  const [wrapRef, width] = useWidth<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-80px" });
  const [day, setDay] = useState<number | null>(null);

  const narrow = width < 520;
  // Text scales with the chart, keeping the original's proportions.
  const fs = Math.max(11, Math.min(14, width * 0.02));
  const m = { top: 16, right: narrow ? 10 : 20, bottom: 52, left: narrow ? 34 : 62 };
  const height = Math.round(Math.min(460, Math.max(280, width * 0.6)));
  const iw = Math.max(1, width - m.left - m.right);
  const ih = height - m.top - m.bottom;
  const x = (d: number) => m.left + (d / MAX_DAYS) * iw;
  const y = (v: number) => m.top + (1 - v) * ih;

  const curve = (p: number) => {
    let s = "";
    for (let i = 0; i <= MAX_DAYS * 2; i++) {
      const d = i / 2;
      s += `${i ? "L" : "M"}${x(d).toFixed(1)},${y(miss(p, d)).toFixed(1)}`;
    }
    return s;
  };

  const pick = (clientX: number) => {
    const box = svgRef.current?.getBoundingClientRect();
    if (!box) return;
    const d = Math.round(((clientX - box.left - m.left) / iw) * MAX_DAYS);
    setDay(Math.min(MAX_DAYS, Math.max(0, d)));
  };

  // Callouts: start-anchored where the original puts them; on narrow screens
  // they hug the right edge so they never run off the chart.
  const a1 = { x: x(10), y: y(miss(0.05, 10)) };
  const a2 = { x: x(30), y: y(miss(0.05, 30)) };
  const t1 = narrow ? { x: m.left + iw, y: y(0.93), anchor: "end" } : { x: x(28), y: y(0.9), anchor: "start" };
  const t2 = narrow ? { x: m.left + iw, y: y(0.33), anchor: "end" } : { x: x(32.5), y: y(0.3), anchor: "start" };
  const reveal = { initial: { opacity: 0 }, animate: { opacity: inView ? (day === null ? 1 : 0.25) : 0 } };

  // Tooltip box for the hovered day.
  const tipW = narrow ? 118 : 138;
  const tipX = day !== null && x(day) + tipW + 14 > m.left + iw ? x(day) - tipW - 10 : (day !== null ? x(day) + 10 : 0);

  return (
    <ChartFrame title={t.title} subtitle={t.subtitle}>
      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm" style={{ color: INK.body }}>
        <span>{t.legend}</span>
        {CURVES.map((c) => (
          <span key={c.p} className="inline-flex items-center gap-2 tabular-nums">
            <span className="inline-block h-[3px] w-7 rounded-full" style={{ background: c.color }} />
            {Math.round(c.p * 100)}%
          </span>
        ))}
      </div>

      {narrow && (
        <p className="mt-3 text-xs" style={{ color: INK.body }}>
          {t.yAxis}
        </p>
      )}

      <div ref={wrapRef} className={narrow ? "mt-1 select-none" : "mt-3 select-none"}>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          role="img"
          aria-label={t.aria}
          className="block touch-pan-y"
          onPointerDown={(e) => pick(e.clientX)}
          onPointerMove={(e) => (e.buttons || e.pointerType === "mouse") && pick(e.clientX)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setDay(null)}
        >
          {/* Grid + axes */}
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <g key={v}>
              {v > 0 && <line x1={m.left} x2={m.left + iw} y1={y(v)} y2={y(v)} stroke={GUIDE} strokeWidth={1.5} />}
              <text x={m.left - 8} y={y(v)} dy="0.35em" textAnchor="end" fontSize={fs} fill={INK.muted}>
                {v * 100}
              </text>
            </g>
          ))}
          <line x1={m.left} x2={m.left} y1={m.top} y2={m.top + ih} stroke={AXIS} strokeWidth={1.5} />
          <line x1={m.left} x2={m.left + iw} y1={m.top + ih} y2={m.top + ih} stroke={AXIS} strokeWidth={1.5} />
          {[0, 10, 20, 30, 40, 50, 60].map((d) => (
            <text key={d} x={x(d)} y={m.top + ih + 20} textAnchor="middle" fontSize={fs} fill={INK.muted}>
              {d}
            </text>
          ))}
          <text x={m.left + iw / 2} y={height - 6} textAnchor="middle" fontSize={fs + 1} fill={INK.body}>
            {t.xAxis}
          </text>
          {!narrow && (
            <text
              transform={`translate(18 ${m.top + ih / 2}) rotate(-90)`}
              textAnchor="middle"
              fontSize={fs}
              fill={INK.body}
            >
              {t.yAxis}
            </text>
          )}

          {/* Curves */}
          {CURVES.map((c, i) => (
            <motion.path
              key={c.p}
              d={curve(c.p)}
              fill="none"
              stroke={c.color}
              strokeWidth={narrow ? 2.5 : 3}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView ? 1 : 0 }}
              transition={{ duration: 1.4, delay: 0.15 * i, ease: "easeInOut" }}
            />
          ))}

          {/* Curve labels (on phones the legend carries this instead) */}
          {!narrow && CURVES.map((c) => (
            <motion.text
              key={c.p}
              x={x(c.labelX)}
              y={y(c.labelY)}
              fontSize={fs}
              fill={INK.body}
              {...reveal}
              transition={{ duration: 0.4, delay: day === null ? 1.4 : 0 }}
            >
              {t.perDay(Math.round(c.p * 100))}
            </motion.text>
          ))}

          {/* Callouts on the 5% curve */}
          <motion.g {...reveal} transition={{ duration: 0.5, delay: day === null ? 1.7 : 0 }}>
            <line
              x1={a1.x + 8} y1={a1.y - 3}
              x2={narrow ? t1.x - 60 : x(30.5)} y2={t1.y + fs * 1.9}
              stroke="#8A8A85" strokeWidth={1.5}
            />
            <text x={t1.x} y={t1.y} textAnchor={t1.anchor as "start" | "end"} fontSize={fs + 1} fill={INK.strong}>
              <tspan x={t1.x}>{t.ann1[0]}</tspan>
              <tspan x={t1.x} dy="1.25em">{t.ann1[1]}</tspan>
            </text>
            <line
              x1={a2.x + 8} y1={a2.y - 2}
              x2={narrow ? t2.x - 30 : x(34.5)} y2={t2.y + fs * 0.6}
              stroke="#8A8A85" strokeWidth={1.5}
            />
            <text x={t2.x} y={t2.y} textAnchor={t2.anchor as "start" | "end"} fontSize={fs + 1} fill={INK.strong}>
              {t.ann2}
            </text>
            {[a1, a2].map((a, i) => (
              <circle key={i} cx={a.x} cy={a.y} r={narrow ? 6 : 7.5} fill="#E8643A" stroke="white" strokeWidth={2.5} />
            ))}
          </motion.g>

          {/* Crosshair readout */}
          {day !== null && inView && (
            <g pointerEvents="none">
              <line x1={x(day)} x2={x(day)} y1={m.top} y2={m.top + ih} stroke={INK.muted} strokeDasharray="3 4" />
              {CURVES.map((c) => (
                <circle key={c.p} cx={x(day)} cy={y(miss(c.p, day))} r={5.5} fill={c.color} stroke="white" strokeWidth={2} />
              ))}
              <g transform={`translate(${tipX} ${m.top + 6})`}>
                <rect width={tipW} height={fs * 5.6} rx={8} fill="white" stroke={GUIDE} />
                <text x={10} y={fs * 1.45} fontSize={fs} fontWeight={600} fill={INK.strong}>
                  {t.day(day)}
                </text>
                {CURVES.map((c, i) => (
                  <text key={c.p} x={10} y={fs * (2.75 + i * 1.2)} fontSize={fs - 0.5} fill={c.color} className="tabular-nums">
                    {t.perDay(Math.round(c.p * 100))} · {Math.round(miss(c.p, day) * 100)}%
                  </text>
                ))}
              </g>
            </g>
          )}
        </svg>
      </div>

      <p className="mt-1 text-xs" style={{ color: INK.muted }}>
        {t.hint}
      </p>
      <p className="mt-3 text-xs leading-relaxed" style={{ color: INK.muted }}>
        {t.note[0]}
        <br />
        {t.note[1]}
      </p>
    </ChartFrame>
  );
}
