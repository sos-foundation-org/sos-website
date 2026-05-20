import type { Author } from "./types";

// ─── Authors ─────────────────────────────────────────────────────────────────
// Add a new contributor here, then reference their key from a post's `authorId`.
// The `bio` is the 4–5 sentence signature shown at the end of every post.

export const AUTHORS: Record<string, Author> = {
  "sos-foundation": {
    id: "sos-foundation",
    name: "SOS Foundation",
    role: "Sustainability of Sustainability",
    avatar: "/logo/SOS-LOGO_v3-icon.svg",
    bio: "The Sustainability of Sustainability Foundation works to make sustainability self-reinforcing rather than effortful. We connect art, data, and economic design into a single continuity loop — Meaning, Pattern, and Mechanism. This blog is where we think out loud: field notes, project updates, and the questions we are still sitting with. We believe ideas grow stronger when they grow in public.",
    links: [{ label: "sos foundation", href: "/" }],
  },

  "wei-ping-chan": {
    id: "wei-ping-chan",
    name: "Wei-Ping Chan",
    role: "Research Director, SOS Research Unit",
    avatar: "/pics/Wei-Ping.jpg",
    bio: "Wei-Ping Chan is an interdisciplinary researcher and a Research Director of the SOS Foundation. His work moves between high-throughput imaging, physics-informed ecological modeling, and causal inference, with a long-running fascination for Lepidoptera and climate–biodiversity systems. He earned his Ph.D. in Organismic and Evolutionary Biology at Harvard University. He writes here about turning messy natural observations into structured, computable knowledge — and why that matters.",
    links: [
      { label: "personal site", href: "https://wpchanwork.github.io/wei-ping_chan/home.html" },
    ],
  },

  "cong-liu": {
    id: "cong-liu",
    name: "Cong Liu",
    role: "Research Director, SOS Research Unit",
    avatar: "/pics/Cong.jpg",
    bio: "Cong Liu is an entomologist, AI scientist, and a Research Director of the SOS Foundation. He studies ant systematics, conservation genomics, and biosecurity, and brings industry-grade machine learning from the pharmaceutical sector into ecological research. His fieldwork spans three continents and more than fifteen years, alongside 34+ peer-reviewed publications. On this blog he shares notes from the intersection of biodiversity, data infrastructure, and bio-inspired innovation.",
    links: [
      { label: "personal site", href: "https://personal-website-chi-dusky.vercel.app/" },
    ],
  },
};

/** Look up an author; falls back to the SOS Foundation identity if unknown. */
export function getAuthor(id: string): Author {
  return AUTHORS[id] ?? AUTHORS["sos-foundation"];
}
