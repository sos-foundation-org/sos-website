// ─── Search & AI-discoverability helpers ─────────────────────────────────────
// One place for the facts search engines and AI assistants use to describe SOS:
// shared keywords, the Organization entity, and schema.org JSON-LD builders.
// Pages reference the Organization by its @id instead of repeating it, so every
// page's structured data links back to one canonical entity.

import { SITE_URL } from "./site";
import { FAQS } from "@/content/faq";
import { EVENTS, NATURE_SALON } from "@/content/events";
import { getLanguagesInUse, type Post } from "@/content/blog";

export const SITE_NAME = "SOS Foundation";
export const ORG_NAME = "Sustainability of Sustainability Foundation";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_URL = `${SITE_URL}/logo/SOS-LOGO_v3-icon.svg`;
export const CONTACT_EMAIL = "sos.initiative.org@gmail.com";

export const SOCIAL_LINKS = [
  "https://www.linkedin.com/company/sos-commons/",
  "https://www.instagram.com/sustainability.dialogue/",
  "https://www.facebook.com/profile.php?id=61587085297510",
];

/** Site-wide keywords; pages append their own topic terms. */
export const BASE_KEYWORDS = [
  "Sustainability of Sustainability Foundation",
  "SOS Foundation",
  "SOS",
  "sustainability",
  "bioinspiration",
  "Nature Salon",
  "Digital Naturalism",
  "biodiversity",
  "sustainability education",
  "learning from nature",
  "501(c)(3) nonprofit",
];

export function keywords(...extra: string[]): string[] {
  return Array.from(new Set([...BASE_KEYWORDS, ...extra]));
}

/** Absolute URL for a site path ("/blog" → "https://…/blog"). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
}

const OG_LOCALES: Record<string, string> = { en: "en_US", "zh-Hans": "zh_CN", "zh-Hant": "zh_TW" };

/** BCP-47 language code → Open Graph locale ("zh-Hant" → "zh_TW"). */
export function ogLocale(lang: string): string {
  return OG_LOCALES[lang] ?? lang.replace("-", "_");
}

/**
 * A post's text as plain prose (headings, paragraphs, quotes; HTML stripped) —
 * used for schema.org articleBody and /llms-full.txt.
 */
export function postPlainText(post: Post): string {
  return post.body
    .flatMap((b) => {
      if (b.type === "heading") return [`${b.level === 3 ? "###" : "##"} ${b.text}`];
      if (b.type === "paragraph") return [b.text];
      if (b.type === "quote") return [`> ${b.text}${b.cite ? ` — ${b.cite}` : ""}`];
      return [];
    })
    .join("\n\n")
    .replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g, "$2 ($1)")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

// ─── Entities ────────────────────────────────────────────────────────────────

const PEOPLE = {
  congLiu: {
    "@type": "Person",
    "@id": `${SITE_URL}/research#cong-liu`,
    name: "Cong Liu",
    honorificPrefix: "Dr.",
    jobTitle: "Co-Director, SOS Research Unit",
    url: "https://personal-website-chi-dusky.vercel.app/",
    knowsAbout: ["Entomology", "Ant systematics", "Conservation genomics", "Biosecurity", "Machine learning"],
  },
  weiPingChan: {
    "@type": "Person",
    "@id": `${SITE_URL}/research#wei-ping-chan`,
    name: "Wei-Ping Chan",
    honorificPrefix: "Dr.",
    jobTitle: "Co-Director, SOS Research Unit",
    url: "https://wpchanwork.github.io/wei-ping_chan/home.html",
    alumniOf: { "@type": "CollegeOrUniversity", name: "Harvard University" },
    knowsAbout: ["Lepidoptera", "Nature digitization", "Climate change biology", "Bioinspiration", "Multispectral imaging"],
  },
  chengAnLee: { "@type": "Person", name: "Cheng-An Lee" },
} as const;

export const PERSON_REFS = PEOPLE;

/** The SOS Foundation itself — emitted once, site-wide, from the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["NGO", "EducationalOrganization"],
    "@id": ORG_ID,
    name: ORG_NAME,
    alternateName: ["SOS Foundation", "SOS", "Sustainability of Sustainability"],
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO_URL },
    image: `${SITE_URL}/pics/Vision_bg.jpg`,
    slogan: "Sustaining humanity's ability to learn from nature",
    description:
      "The Sustainability of Sustainability Foundation (SOS Foundation) is a 501(c)(3) public charity sustaining humanity's ability to learn from nature through research, education, and open knowledge infrastructure. Its work spans three pillars — Meaning (Nature Salon), Pattern (SOS Research Unit, Mountain Digital Twins), and Mechanism (Map of the Unknown, Internet of Bioinspiration) — connected by SOS Education, including the Digital Naturalism program.",
    foundingDate: "2025",
    nonprofitStatus: "Nonprofit501c3",
    taxID: "41-3097632",
    email: CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "general inquiries",
      email: CONTACT_EMAIL,
      url: "https://forms.gle/kzxSKDewYjhxLeyBA",
    },
    sameAs: SOCIAL_LINKS,
    knowsAbout: [
      "Sustainability",
      "Bioinspiration",
      "Biomimicry",
      "Biodiversity",
      "Nature digitization",
      "Biodiversity informatics",
      "Climate change biology",
      "Evolutionary biology",
      "Entomology",
      "Sustainability education",
      "Science education",
      "Artificial intelligence in ecology",
      "Open data",
    ],
    member: [PEOPLE.congLiu, PEOPLE.weiPingChan, PEOPLE.chengAnLee],
    subOrganization: [
      {
        "@type": "ResearchOrganization",
        "@id": `${SITE_URL}/research#research-unit`,
        name: "SOS Research Unit",
        url: `${SITE_URL}/research`,
        description:
          "Research unit of the SOS Foundation, co-directed by Dr. Cong Liu and Dr. Wei-Ping Chan, translating nature into adaptive futures through ecology, evolutionary biology, data science, and AI.",
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/education#sos-education`,
        name: "SOS Education",
        url: `${SITE_URL}/education`,
        description:
          "Education program of the SOS Foundation connecting students and communities to real research through five tracks: Community & Communication, AI Skills, Digitize Nature, Mentored Research, and Real Contributions.",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: ORG_NAME,
    url: SITE_URL,
    inLanguage: getLanguagesInUse().map((l) => l.code),
    publisher: { "@id": ORG_ID },
  };
}

/** WebPage + breadcrumb for a top-level page. */
export function webPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  type?: string;
  about?: unknown;
}) {
  const url = absoluteUrl(opts.path);
  const crumbs = [{ name: "Home", url: SITE_URL }];
  if (opts.path !== "/") crumbs.push({ name: opts.name, url });
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    ...(opts.about ? { about: opts.about } : {}),
    breadcrumb: breadcrumbJsonLd(crumbs, false),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[], withContext = true) {
  return {
    ...(withContext ? { "@context": "https://schema.org" } : {}),
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Nature Salon series plus any confirmed events from content/events.ts. */
export function eventsJsonLd() {
  const seriesId = `${SITE_URL}/#nature-salon`;
  const series = {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    "@id": seriesId,
    name: NATURE_SALON.name,
    alternateName: NATURE_SALON.alternateName,
    description: NATURE_SALON.description,
    image: absoluteUrl(NATURE_SALON.image),
    sameAs: NATURE_SALON.sameAs,
    organizer: { "@id": ORG_ID },
    audience: { "@type": "Audience", audienceType: "Artists, scientists, and entrepreneurs" },
  };

  const events = EVENTS.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.name,
    description: e.description,
    startDate: e.startDate,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: e.online
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    location: e.online
      ? { "@type": "VirtualLocation", url: e.url }
      : { "@type": "Place", name: e.location?.name, address: e.location?.address },
    ...(e.image ? { image: absoluteUrl(e.image) } : {}),
    ...(e.url ? { url: e.url } : {}),
    organizer: { "@id": ORG_ID },
    ...(e.series === "nature-salon" ? { superEvent: { "@id": seriesId } } : {}),
  }));

  return [series, ...events];
}
