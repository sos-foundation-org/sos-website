import type { Author, LangCode } from "./types";

// ─── Authors ─────────────────────────────────────────────────────────────────
// Add a new contributor here, then reference their key from a post's `authorId`.
// The `bio` is the 4–5 sentence signature shown at the end of every post.
//
// An author writing in more than one language can add a `localized` block, so
// the byline on a translation reads in that language. See ./languages.ts for
// the language codes and ./README.md for the publishing guide.

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
    localized: {
      "zh-Hans": {
        name: "刘聪",
        role: "SOS 基金会研究组组长",
        bio: "刘聪是昆虫学家、人工智能科学家，也是 SOS 基金会的研究组组长。他研究蚂蚁系统分类、保护基因组学与生物安全，并把制药行业的机器学习方法带进生态学研究。他的野外工作横跨三大洲、超过十五年，发表同行评审论文 34 篇以上。在这个博客上，他分享来自生物多样性、数据基础设施与仿生创新交界处的观察。",
      },
    },
  },
};

/** Look up an author; falls back to the SOS Foundation identity if unknown. */
export function getAuthor(id: string): Author {
  return AUTHORS[id] ?? AUTHORS["sos-foundation"];
}

/**
 * The same author, with any overrides for `lang` applied. Fields the author
 * hasn't localized keep their original values, so a partial translation is
 * fine — localize the name and leave the bio, if that's all you have.
 */
export function localizeAuthor(author: Author, lang: LangCode): Author {
  const overrides = author.localized?.[lang];
  return overrides ? { ...author, ...overrides } : author;
}
