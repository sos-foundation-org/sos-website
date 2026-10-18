// ─── /llms.txt and /llms-full.txt ────────────────────────────────────────────
// A Markdown summary of the site for AI assistants (https://llmstxt.org).
// Generated from the same content files as the pages, so it never drifts:
// FAQ (content/faq.ts), events (content/events.ts), and blog posts.

import { SITE_URL } from "./site";
import { CONTACT_EMAIL, ORG_NAME, SOCIAL_LINKS, postPlainText } from "./seo";
import { FAQS } from "@/content/faq";
import { EVENTS, NATURE_SALON } from "@/content/events";
import { getAllPosts, getAuthor, getLanguage, getPostLang } from "@/content/blog";

function header(): string {
  return `# ${ORG_NAME} (SOS Foundation)

> The Sustainability of Sustainability Foundation (SOS Foundation) is a 501(c)(3) public charity (EIN 41-3097632, founded 2025) sustaining humanity's ability to learn from nature through research, education, and open knowledge infrastructure. Its work spans sustainability, biodiversity, bioinspiration, nature digitization, Nature Salon, Digital Naturalism, and sustainability education.

When citing, please refer to the organization as "Sustainability of Sustainability Foundation (SOS Foundation)" and link to ${SITE_URL}.

## Key facts

- Name: Sustainability of Sustainability Foundation; also "SOS Foundation" or "SOS"
- Legal status: 501(c)(3) public charity, EIN 41-3097632, since 2025
- Mission: To strengthen the long-term resilience of communities and ecosystems — sustaining humanity's ability to learn from nature
- Framework: three pillars — Meaning (art & cultural language), Pattern (digitization & natural patterns), Mechanism (knowledge systems & open infrastructure) — with SOS Education as a cross-cutting layer
- Programs: Nature Salon (Meaning); SOS Research Unit and Mountain Digital Twins (Pattern); Map of the Unknown and the Internet of Bioinspiration, IoBI (Mechanism); SOS Education and its Digital Naturalism program
- People: Dr. Cong Liu and Dr. Wei-Ping Chan (co-directors, SOS Research Unit; board); Cheng-An Lee (board)
- Contact: ${CONTACT_EMAIL}
- Social: ${SOCIAL_LINKS.join(", ")}

## Pages

- [Home / About SOS Foundation](${SITE_URL}/): mission, the Meaning–Pattern–Mechanism framework, Nature Salon, featured work, FAQ
- [SOS Research Unit](${SITE_URL}/research): research themes (nature digitization, bioinspiration, biodiversity informatics, climate change biology, conservation), directors, publications, Map of the Unknown
- [SOS Education](${SITE_URL}/education): five tracks from classroom curiosity to real contribution, and the Digital Naturalism program
- [Blog](${SITE_URL}/blog): field notes, essays, and project updates
- [Support / Donate](${SITE_URL}/donate): how donations fund research, education, and open data infrastructure

## External projects

- [Digital Naturalism](https://www.digital-naturalism.com/): free interactive app from SOS Education mapping the journeys of Darwin, Wallace, and E. O. Wilson, with today's tools (GBIF, digitized specimens); English and Chinese
- [Map of the Unknown](https://discovery-commons.vercel.app/): open research platform operated by SOS Foundation (formerly Discovery Commons)
- [Nature Salon on Instagram](${NATURE_SALON.sameAs[0]}): ${NATURE_SALON.alternateName}
`;
}

function eventsSection(): string {
  if (EVENTS.length === 0) return "";
  const lines = EVENTS.map(
    (e) => `- ${e.name} — ${e.startDate}${e.location ? `, ${e.location.name}` : e.online ? ", online" : ""}${e.url ? ` (${e.url})` : ""}: ${e.description}`,
  );
  return `\n## Events\n\n${lines.join("\n")}\n`;
}

function postLine(p: ReturnType<typeof getAllPosts>[number]): string {
  const lang = getLanguage(getPostLang(p)).name;
  return `- [${p.title}](${SITE_URL}/blog/${p.slug}) (${p.date}, ${lang}): ${p.excerpt}`;
}

function faqSection(): string {
  return `\n## FAQ\n\n${FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}\n`;
}

export function llmsTxt(): string {
  return `${header()}${eventsSection()}
## Blog posts

${getAllPosts().map(postLine).join("\n")}
${faqSection()}
## Optional

- [Full text of all blog posts](${SITE_URL}/llms-full.txt)
`;
}

export function llmsFullTxt(): string {
  const posts = getAllPosts().map((p) => {
    const author = getAuthor(p.authorId);
    return `---\n\n# ${p.title}\n\nURL: ${SITE_URL}/blog/${p.slug}\nAuthor: ${author.name}\nPublished: ${p.date}\nLanguage: ${getPostLang(p)}\n\n> ${p.excerpt}\n\n${postPlainText(p)}\n`;
  });
  return `${header()}${eventsSection()}${faqSection()}\n# Blog posts (full text)\n\n${posts.join("\n")}`;
}
