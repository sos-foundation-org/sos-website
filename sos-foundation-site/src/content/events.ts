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
  /** Set to "nature-salon" when the event is part of the series below. */
  series?: "nature-salon";
};

/** The recurring Nature Salon series (Meaning pillar). */
export const NATURE_SALON = {
  name: "Nature Salon",
  alternateName: "The Sustainability Dialogue for Artists, Scientists & Entrepreneurs",
  description:
    "Nature Salon is the SOS Foundation's recurring sustainability dialogue that brings artists, scientists, and entrepreneurs together to give sustainability a shared language through art, design, and conversation.",
  image: "/pics/Nature_Salon.jpg",
  sameAs: ["https://www.instagram.com/sustainability.dialogue/"],
};

export const EVENTS: SosEvent[] = [
  // ↑ add confirmed events here
];
