import DetectionChart from "./DetectionChart";
import SoilCrustChart from "./SoilCrustChart";

// ─── Interactive chart registry ──────────────────────────────────────────────
// A post embeds one of these with `{ type: "chart", chart: "<id>" }`. Each
// chart is a self-contained client component that takes the post's language
// and picks its own strings. To add one, write the component and list it here.

export const CHARTS = {
  "detection-probability": DetectionChart,
  "soil-crust-recovery": SoilCrustChart,
} satisfies Record<string, React.ComponentType<{ lang?: string }>>;

export type ChartId = keyof typeof CHARTS;
