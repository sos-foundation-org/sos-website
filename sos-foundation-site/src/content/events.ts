// ─── Events ──────────────────────────────────────────────────────────────────
// Feeds schema.org Event / EventSeries JSON-LD (home page) and /llms.txt, so
// search engines and AI assistants can answer "when is the next Nature Salon?".
//
// To announce an event, add an entry to EVENTS. Only list real, confirmed
// events — past ones may stay (they still count as track record).

export type SosEvent = {
  /** Event title, e.g. "Nature Salon: Moths and Light". */
  name: string;
  description: string;
  /** ISO 8601 date or date-time, e.g. "2026-11-08T19:00-05:00". */
  startDate: string;
  endDate?: string;
  /** Venue name + address for in-person events; omit for online-only. */
  location?: { name: string; address: string };
  /** Registration / details link. Online-only events need one. */
  url?: string;
  online?: boolean;
  /** Image path in /public. */
  image?: string;
  /** Set when the event belongs to one of the series below. */
  series?: "nature-salon" | "ecotone";
};

/**
 * Ecotone 兼容並續 — interdisciplinary sustainability forum co-organized by
 * NTU, NYCU and SOS. Shown on the home Work section and /education.
 */
export const ECOTONE = {
  name: "Ecotone 兼容並續",
  alternateName: "Ecotone · Interdisciplinary Sustainability Forum",
  url: "https://sustainable-ecotone.vercel.app/en",
  image: "/pics/ecotone.jpg",
  tagline: "Above ground, a series of talks. Below it, the web that joins them.",
  description:
    "Ecotone (兼容並續) is an interdisciplinary sustainability forum co-organized by National Taiwan University, National Yang Ming Chiao Tung University, and the SOS Foundation. Named after the zone where two ecosystems meet, each volume places speakers from different fields and countries side by side — from ecology and climate to literature, landscape design, and medicine.",
  organizers: [
    { name: "National Taiwan University", url: "https://www.ntu.edu.tw/" },
    { name: "National Yang Ming Chiao Tung University", url: "https://www.nycu.edu.tw/" },
  ],
  latest: {
    volume: "Vol. 01",
    title: "Sustainable Urbanization? Rewilding?",
    question: "Can cities grow sustainably, or should some of the land go back to nature?",
    sessions: ["Mon 16 Nov 2026 (evening) · NTU Gongguan Campus, Taipei", "Tue 17 Nov 2026 (afternoon) · NYCU Hsinchu Campus"],
  },
};

/** The Nature Salon series (Meaning pillar). */
export const NATURE_SALON = {
  name: "Nature Salon",
  alternateName: "The Sustainability Dialogue for Artists, Scientists & Entrepreneurs",
  description:
    "Nature Salon is the SOS Foundation's sustainability dialogue that brings artists, scientists, and entrepreneurs together to give sustainability a shared language through art, design, and conversation.",
  image: "/pics/Nature_Salon.jpg",
  sameAs: ["https://www.instagram.com/sustainability.dialogue/"],
};

const ECOTONE_VOL1_DESCRIPTION =
  "Ecotone Vol. 01: Sustainable Urbanization? Rewilding? Five speakers — Syuan-Jyun Sun, Wei-Ping Chan, Na Yen, Goh Yu Han, and Hank Wang — on insects in the city, artificial light at night, how humans have recorded nature, and rewilding. Co-organized by NTU, NYCU, and the SOS Foundation.";

export const EVENTS: SosEvent[] = [
  {
    name: "Ecotone 兼容並續 Vol. 01: Sustainable Urbanization? Rewilding? (NTU session)",
    description: ECOTONE_VOL1_DESCRIPTION,
    startDate: "2026-11-16",
    location: { name: "National Taiwan University, Gongguan Campus", address: "Taipei, Taiwan" },
    url: ECOTONE.url,
    image: ECOTONE.image,
    series: "ecotone",
  },
  {
    name: "Ecotone 兼容並續 Vol. 01: Sustainable Urbanization? Rewilding? (NYCU session)",
    description: ECOTONE_VOL1_DESCRIPTION,
    startDate: "2026-11-17",
    location: { name: "National Yang Ming Chiao Tung University, Hsinchu Campus", address: "Hsinchu, Taiwan" },
    url: ECOTONE.url,
    image: ECOTONE.image,
    series: "ecotone",
  },
  // ↑ add confirmed events here
];
