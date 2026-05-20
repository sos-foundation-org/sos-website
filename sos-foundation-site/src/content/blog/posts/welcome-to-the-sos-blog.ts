import type { Post } from "../types";

// ─── Example post ────────────────────────────────────────────────────────────
// This file doubles as a living template. Copy it to publish a new article —
// see ../README.md for the 3-step guide.

export const post: Post = {
  slug: "welcome-to-the-sos-blog",
  title: "Welcome to the SOS Blog — where ideas grow in public",
  excerpt:
    "A home for field notes, project updates, and the questions we are still sitting with. Here is how this space works, and how we mix images, video, and writing into one story.",
  cover: "/pics/Nature_Salon.jpg",
  coverAlt: "An SOS Nature Salon gathering",
  date: "2026-05-19",
  authorId: "sos-foundation",
  // `tags` are category ids — see ../categories.ts for the full set.
  tags: ["announcements"],
  body: [
    {
      type: "paragraph",
      text: "Sustainability isn't self-sustaining. That single idea sits behind everything the SOS Foundation does — and it is also why we are starting this blog. Big ideas need somewhere to <strong>breathe between milestones</strong>: a place for half-formed thoughts, field notes, and progress that is real but not yet finished.",
    },
    {
      type: "paragraph",
      text: "This is that place. Expect updates from across our three divisions — <em>Meaning</em>, <em>Pattern</em>, and <em>Mechanism</em> — written by the people doing the work.",
    },
    { type: "heading", text: "What you'll find here", level: 2 },
    {
      type: "paragraph",
      text: "Three kinds of posts, roughly: <strong>field notes</strong> from research and exhibitions, <strong>project updates</strong> as initiatives move from prototype to practice, and <strong>essays</strong> that sit with a question longer than a headline allows.",
    },
    {
      type: "image",
      src: "/pics/borneo-2.jpg",
      alt: "Fieldwork in Borneo",
      caption: "Field notes won't always be tidy — and that's the point.",
    },
    {
      type: "quote",
      text: "We believe ideas grow stronger when they grow in public.",
      cite: "SOS Foundation",
    },
    { type: "heading", text: "Built for image, video, and animation", level: 2 },
    {
      type: "paragraph",
      text: "Every article is a sequence of <strong>blocks</strong>. A block can be a paragraph, a heading, an image, a gallery, a self-hosted video, or an embedded clip — so words and visuals interleave naturally instead of fighting for space.",
    },
    {
      type: "gallery",
      images: [
        { src: "/pics/digital_moths.png", alt: "Digitized moth specimens" },
        { src: "/pics/talk.png", alt: "A public talk" },
        { src: "/pics/education.jpg", alt: "Education and outreach" },
      ],
      caption: "A gallery block — drop in two or three images and they lay out automatically.",
    },
    {
      type: "paragraph",
      text: "For motion, you have options: a looping <em>.gif</em> in an image block for lightweight animations, a self-hosted <em>video</em> block for clips you control, or an <em>embed</em> block for YouTube and Vimeo. Mix them freely with text.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "More soon. If you'd like to contribute a piece, reach us through the <a href=\"/\">SOS Foundation</a> main site.",
    },
  ],
};
