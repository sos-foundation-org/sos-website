import type { Post } from "../types";

// ─── Bilingual template — the ORIGINAL ───────────────────────────────────────
// Copy this file (and its translation, _template-bilingual.zh.ts) to start a
// post that ships in more than one language.
//
//   1. cp _template-bilingual.ts     posts/<your-slug>.ts
//   2. cp _template-bilingual.zh.ts  posts/<your-slug>.zh.ts
//   3. In the translation, set `translationOf: "<your-slug>"`.
//   4. Register BOTH in ../index.ts.
//   5. Delete `draft: true` from both when you're ready to publish.
//
// The original declares no `lang` — it inherits DEFAULT_LANG from
// ../languages.ts. Only translations name their language.

export const post: Post = {
  slug: "template-bilingual",
  title: "A bilingual post template",
  excerpt:
    "One or two sentences. Shown on the index card, the hero slider, and as the SEO description.",
  cover: "/pics/mountains.jpg",
  coverAlt: "Describe the cover image for screen readers",
  date: "2026-08-27",
  authorId: "sos-foundation",
  tags: ["announcements"],
  draft: true, // ← remove to publish

  // No `lang` and no `translationOf`: this is the original. Every translation
  // points back at this post's slug.

  body: [
    {
      type: "paragraph",
      text: "Open with the hook. Inline HTML works here — <strong>bold</strong>, <em>italic</em>, and <a href=\"/research\">links</a>.",
    },
    { type: "heading", text: "A section", level: 2 },
    {
      type: "paragraph",
      text: "Two to five sentences per paragraph reads best. Break longer thoughts into separate paragraph blocks.",
    },
    {
      type: "image",
      src: "/pics/borneo-2.jpg",
      alt: "Alt text describing the image",
      caption: "A short caption almost always adds value.",
    },
    {
      type: "gallery",
      images: [
        { src: "/pics/digital_moths.jpg", alt: "First image" },
        { src: "/pics/talk.jpg", alt: "Second image" },
      ],
      caption: "Two or three images that belong together.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "Close cleanly — one short closing thought.",
    },
  ],
};
