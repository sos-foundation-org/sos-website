# SOS Blog — Author & Maintenance Guide

This is the only document you need to publish, edit, or maintain the blog.
The blog is **content-driven**: every article is a typed data object, so you
never have to touch React/JSX to publish.

---

## Table of contents

1. [Quick start (publish in 3 steps)](#quick-start-publish-in-3-steps)
2. [Where things live](#where-things-live)
3. [Writing a post](#writing-a-post)
4. [Content blocks reference](#content-blocks-reference)
5. [Working with media (images, video, animation)](#working-with-media)
6. [Layout patterns — how to compose a post](#layout-patterns)
7. [Categories (tags)](#categories-tags)
8. [Authors](#authors)
9. [Highlights (the rotating hero slider)](#highlights-the-rotating-hero-slider)
10. [Drafts](#drafts)
11. [Sharing & link previews (SEO / Open Graph)](#sharing--link-previews)
12. [Troubleshooting](#troubleshooting)

---

## Quick start (publish in 3 steps)

```text
1. Copy   posts/welcome-to-the-sos-blog.ts → posts/<your-slug>.ts
2. Edit   the exported `post` object (metadata + body blocks)
3. Add    `import { post as <name> } from "./posts/<your-slug>";`
          to index.ts and append <name> to ALL_POSTS
```

That's it. The post appears at `/blog` and `/blog/<slug>`. Run `npm run dev`
and refresh.

---

## Where things live

```
src/
├── app/
│   └── blog/
│       ├── page.tsx              ← /blog (index)
│       └── [slug]/page.tsx       ← /blog/<slug> (one post)
├── components/blog/              ← rendering (don't edit unless changing UI)
│   ├── HighlightSlider.tsx       ← rotating hero
│   ├── BlogFilters.tsx           ← category / author / date filter bar
│   ├── PostCard.tsx              ← preview card on the index
│   ├── PostBody.tsx              ← block renderer
│   ├── AuthorBio.tsx             ← end-of-post bio card
│   └── ShareBar.tsx              ← share buttons
└── content/blog/                 ← ★ EDIT FILES HERE ★
    ├── types.ts                  ← data model (read-only reference)
    ├── index.ts                  ← post registry + helpers
    ├── categories.ts             ← classification tags
    ├── authors.ts                ← contributors
    ├── highlights.ts             ← which posts appear in the hero slider
    ├── posts/                    ← one file per post
    │   └── welcome-to-the-sos-blog.ts
    └── README.md                 ← this file

public/                           ← static assets (referenced by /pics/..., /video/...)
├── pics/                         ← put new images here
└── video/                        ← put new video files here (create as needed)
```

---

## Writing a post

### 1. Create the file

Filename = slug + `.ts`. Use kebab-case.

```text
posts/digitizing-the-mountains.ts   ✓
posts/Field Notes 1.ts              ✗
```

### 2. Fill in the metadata

```ts
import type { Post } from "../types";

export const post: Post = {
  slug:     "digitizing-the-mountains",   // URL: /blog/digitizing-the-mountains
  title:    "Digitizing the Mountains",
  excerpt:  "A one- or two-sentence summary. Also used as the meta description.",
  cover:    "/pics/mountains.jpg",        // hero image — see Working with media
  coverAlt: "View from a forested ridge",  // optional, recommended for accessibility
  date:     "2026-06-01",                  // ISO format: YYYY-MM-DD
  authorId: "wei-ping-chan",               // a key from authors.ts
  tags:     ["pattern", "field-notes"],   // category ids — see categories.ts
  // draft:  true,                          // optional — hides from the index
  // accent: "#3F8F6B",                     // optional override accent color
  body: [
    /* content blocks — see next section */
  ],
};
```

### 3. Register it

In `index.ts`:

```ts
import { post as digitizingTheMountains } from "./posts/digitizing-the-mountains";

const ALL_POSTS: Post[] = [
  welcomeToTheSosBlog,
  digitizingTheMountains,    // ← order doesn't matter; sorted by date
];
```

### Metadata field reference

| Field      | Required | Notes                                                                 |
|------------|----------|-----------------------------------------------------------------------|
| `slug`     | yes      | kebab-case, unique. Becomes the URL.                                  |
| `title`    | yes      | Plain text. Shows in nav title, hero, share previews.                 |
| `excerpt`  | yes      | 1–2 sentences. Shown on cards, slider, and as SEO description.        |
| `cover`    | yes      | Path under `/public`, e.g. `/pics/foo.jpg`. Used as hero + OG image.  |
| `coverAlt` | no       | Alt text for the cover (accessibility, screen readers).               |
| `date`     | yes      | ISO `YYYY-MM-DD`. Drives sort order and the year/month filter.        |
| `authorId` | yes      | Must match a key in `authors.ts`.                                     |
| `tags`     | no       | Array of category ids (see `categories.ts`). Drives the topic filter. |
| `draft`    | no       | `true` hides from the index but `/blog/<slug>` still works for preview.|
| `accent`   | no       | A hex color that overrides the default accent on this post.           |
| `body`     | yes      | Ordered list of content blocks.                                       |

---

## Content blocks reference

The `body` is an ordered list. Interleave block types freely — that is what
makes mixed image/video/animation + text layouts easy.

### `heading`

```ts
{ type: "heading", text: "A new section", level: 2 }   // big heading
{ type: "heading", text: "A sub-heading",  level: 3 }   // smaller
```

Use `level: 2` to start a major section, `level: 3` for sub-sections under it.

### `paragraph`

```ts
{
  type: "paragraph",
  text: "Body text. You can include inline HTML for emphasis: " +
        "<strong>bold</strong>, <em>italic</em>, and " +
        "<a href=\"https://example.com\">links</a>.",
}
```

**Tip:** keep paragraphs to 2–5 sentences. Break long thoughts into multiple
paragraph blocks rather than one wall of text.

### `image`

```ts
{
  type: "image",
  src: "/pics/borneo-2.jpg",
  alt: "Field site canopy in Borneo",
  caption: "Where the trail starts. Day 1, 06:00.",   // optional
}
```

For a **lightweight animation**, use an animated `.gif` in an image block —
they auto-play and need no controls.

### `gallery`

```ts
{
  type: "gallery",
  images: [
    { src: "/pics/a.jpg", alt: "..." },
    { src: "/pics/b.jpg", alt: "..." },
    { src: "/pics/c.jpg", alt: "..." },   // 2 or 3 looks best
  ],
  caption: "Three frames from the same morning.",
}
```

Use galleries when 2–3 images belong together; use multiple single `image`
blocks if they are independent and should be discussed between them.

### `video` (self-hosted)

```ts
{
  type: "video",
  src: "/video/install-walkthrough.mp4",
  poster: "/pics/install-cover.jpg",   // optional thumbnail before play
  caption: "Walkthrough of the installation.",
}
```

For a **silent looping animation** (e.g. a short B-roll, no controls):

```ts
{
  type: "video",
  src: "/video/butterfly-loop.webm",
  loop: true,    // autoplays muted, no controls, loops forever
}
```

### `embed` (YouTube / Vimeo)

```ts
{ type: "embed", provider: "youtube", id: "dQw4w9WgXcQ", caption: "..." }
{ type: "embed", provider: "vimeo",   id: "76979871"   }
```

`id` is just the video id (the part after `v=` for YouTube, the number for
Vimeo). The renderer handles the player URL.

### `quote`

```ts
{
  type: "quote",
  text: "A short, quotable sentence that earns its space.",
  cite: "Optional attribution",
}
```

### `divider`

```ts
{ type: "divider" }
```

A thin horizontal rule. Use sparingly — between major shifts in topic.

---

## Working with media

### Where files go

- Images: drop them into `public/pics/` — reference as `/pics/file.jpg`
- Videos: create `public/video/` if needed — reference as `/video/file.mp4`
- **Always** use absolute paths starting with `/`. Do not use relative `../`.

### Recommended formats & sizes

| Use                    | Format        | Size guidance                                  |
|------------------------|---------------|------------------------------------------------|
| Cover image            | JPG (or PNG)  | 1600–2400 px wide, ≤ 500 KB. 16:9 reads best.  |
| In-body image          | JPG (or PNG)  | 1200–1800 px wide, ≤ 300 KB.                   |
| Lightweight animation  | GIF           | ≤ 2 MB. Anything bigger → use a looping video. |
| Self-hosted video      | MP4 (H.264) or WebM | ≤ 8 MB if possible. Use a poster image.     |
| Hero/slider backgrounds | JPG          | 2000+ px wide. They're shown full-bleed.       |

Compress JPGs before committing (e.g. with Squoosh, TinyJPG, or ImageMagick).
Large files = slow page loads.

### Cover image — pick well

The cover does double duty:
1. Hero image at the top of the article (large, top of the post).
2. Open Graph image when the post is shared on Facebook / LinkedIn / X.

Choose an image that reads at both **small** (thumbnail in a social feed) and
**large** (60–70 vh hero). Faces and text near the center work best — corners
get cropped on some platforms.

### Animation: GIF vs looping video

| Use a GIF when…                              | Use a looping video when…                  |
|----------------------------------------------|--------------------------------------------|
| The clip is short (< 3 s) and low-detail.    | The clip is longer, or has fine detail.    |
| You want it dead-simple — no encoding.       | File size matters (video is 5–10× smaller).|
| It's a tiny diagram/UI loop.                 | It's nature footage or a longer process.   |

For looping video, set `loop: true` on the `video` block — it plays muted,
without controls, on a loop. Encode at a reasonable bitrate (1–2 Mbps).

---

## Layout patterns

Some compositions that read well:

### A. "Field notes" — short, image-heavy

```ts
body: [
  { type: "paragraph", text: "..." },         // set the scene, 1 paragraph
  { type: "image", src: "/pics/x.jpg", caption: "..." },
  { type: "paragraph", text: "..." },
  { type: "image", src: "/pics/y.jpg", caption: "..." },
  { type: "paragraph", text: "..." },
]
```

### B. "Essay" — text-led, with breathing room

```ts
body: [
  { type: "paragraph", text: "..." },
  { type: "paragraph", text: "..." },
  { type: "heading", text: "Section 1", level: 2 },
  { type: "paragraph", text: "..." },
  { type: "image", src: "/pics/x.jpg", caption: "..." },
  { type: "paragraph", text: "..." },
  { type: "quote", text: "...", cite: "..." },
  { type: "heading", text: "Section 2", level: 2 },
  { type: "paragraph", text: "..." },
]
```

### C. "Walkthrough" — video-led

```ts
body: [
  { type: "paragraph", text: "Quick framing — what this clip shows." },
  { type: "video", src: "/video/walkthrough.mp4", poster: "/pics/p.jpg" },
  { type: "heading", text: "What you just saw", level: 2 },
  { type: "paragraph", text: "..." },
  { type: "gallery", images: [/* stills */] },
]
```

### General tips

- **Lead with the hook.** First paragraph earns the next.
- **One idea per heading.** If a section runs > 4 paragraphs, split it.
- **Caption images.** A short caption almost always adds value.
- **Mix media.** Long stretches of any single block type get monotonous.
- **End cleanly.** A short closing paragraph or a `divider` then one line.

---

## Categories (tags)

Posts reference categories by **id** in their `tags` field. The curated set
lives in [`categories.ts`](./categories.ts):

| id              | Label              | When to use                                              |
|-----------------|--------------------|----------------------------------------------------------|
| `announcements` | Announcements      | Foundation news, launches, public statements.            |
| `field-notes`   | Field Notes        | From the field, the lab, or a working session.           |
| `meaning`       | Meaning            | Art, design, exhibitions, cultural language.             |
| `pattern`       | Pattern            | Digitization, datasets, computational nature.            |
| `mechanism`     | Mechanism          | Economic systems, incentives, prototypes.                |
| `research`      | Research           | Scientific work and methods from the Research Unit.      |
| `education`     | Education          | Outreach, teaching, public programs.                     |

Each post should usually have **1–2** categories.

**Adding a new category later:** append an entry to the `CATEGORIES` array in
`categories.ts` — give it `id`, `label`, `color`, `description`. The filter
bar picks it up automatically.

---

## Authors

Authors are defined once in [`authors.ts`](./authors.ts):

```ts
"your-id": {
  id:     "your-id",
  name:   "Your Name",
  role:   "Short role, e.g. Research Director, SOS",
  avatar: "/pics/your-photo.jpg",       // square photo, ≥ 256 px
  bio:    "4–5 sentence signature shown at the end of every post you write.",
  links:  [{ label: "personal site", href: "https://..." }],
},
```

Then set `authorId: "your-id"` on your posts. The avatar appears on the post
card, in the article byline, and as the big end-of-post bio.

---

## Highlights (the rotating hero slider)

The top of `/blog` shows a rotating slider — manually curated. Edit
[`highlights.ts`](./highlights.ts):

```ts
export const HIGHLIGHT_SLUGS: string[] = [
  "welcome-to-the-sos-blog",
  "digitizing-the-mountains",
  // …
];
```

Rules of thumb:

- **2–4 highlights** is the sweet spot.
- **Order matters** — index 0 shows first.
- Empty list → the latest post is shown as a static hero (no rotation).
- 1 slug → static hero, no auto-rotation.
- 2+ slugs → auto-advances every 6 seconds with arrows + dots, pauses on
  hover. Adjust the timer with `HIGHLIGHT_ROTATION_MS` in the same file.

Make sure each highlighted post has a **strong cover image** — it fills the
hero full-bleed.

---

## Drafts

Set `draft: true` on a post to hide it from `/blog` (the index, the slider,
the filters). The post page itself at `/blog/<slug>` still renders, so you
can share a preview link with collaborators before going public.

When the draft is ready: remove `draft: true` (or set it to `false`).

---

## Sharing & link previews

Each post page renders **share buttons** below the article: copy link,
Facebook, X, LinkedIn, and Instagram.

For the post's **cover image to appear** when a link is shared (Open Graph /
Twitter card preview), the site needs its real domain. Set the
`NEXT_PUBLIC_SITE_URL` env var to the production origin — see
[`src/lib/site.ts`](../../lib/site.ts).

Local dev:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://www.your-domain.org
```

Production: set the same variable in your host (Vercel, etc.).

---

## Troubleshooting

**My post doesn't show up on `/blog`.**
- Did you add it to `ALL_POSTS` in `index.ts`?
- Is `draft: true` set? Remove it.
- Is the file in `posts/`?
- Restart `npm run dev` once if you only changed `index.ts`.

**The cover image is broken / not loading.**
- Files must be in `public/`. A path like `/pics/x.jpg` maps to
  `public/pics/x.jpg`.
- Filenames are case-sensitive in production. `Photo.JPG` ≠ `photo.jpg`.

**A video won't play.**
- Self-hosted: check the file is in `public/video/` and the MIME type is mp4
  or webm. Try `loop: true` only on muted/looping clips.
- Embed: confirm the `id` is just the id, not the full URL.

**Build fails with a TypeScript error about my post.**
- Check that `tags` are valid category ids (lowercase, hyphenated).
- Check `authorId` matches a key in `authors.ts`.
- Check `date` is `YYYY-MM-DD` with quotes.

**Share image isn't showing on Facebook / LinkedIn.**
- Set `NEXT_PUBLIC_SITE_URL` (see [Sharing & link previews](#sharing--link-previews)).
- Facebook caches aggressively — use their
  [Sharing Debugger](https://developers.facebook.com/tools/debug/) to scrape
  fresh after a deploy.

---

That's the whole guide. If something is missing, please add it back here so
the next person doesn't have to ask.
