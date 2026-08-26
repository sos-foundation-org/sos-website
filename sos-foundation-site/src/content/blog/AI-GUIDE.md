# AI Quick Guide — Publishing a Blog Post

**Read this file instead of `README.md` when the task is "add a blog post".**
It is the complete, self-contained procedure. `README.md` is the long-form
human guide — only open it for something this file does not cover.

Repo root for all paths below: `sos-foundation-site/`

---

## 1. The whole job in five steps

```
1. Put images in       public/pics/
2. Create              src/content/blog/posts/<slug>.ts
3. (bilingual) create  src/content/blog/posts/<slug>.zh.ts
4. Register in         src/content/blog/index.ts     ← import + push to ALL_POSTS
5. Verify              npm run build
```

Nothing else needs editing. Do **not** touch `src/components/blog/*` — those
are renderers, not content.

---

## 2. Valid values (do not invent new ones without asking)

| Field | Valid values | Source of truth |
|---|---|---|
| `authorId` | `sos-foundation`, `wei-ping-chan`, `cong-liu` | `authors.ts` |
| `tags` | `announcements`, `field-notes`, `meaning`, `pattern`, `mechanism`, `policy`, `research`, `education` | `categories.ts` |
| `lang` | `en` (default), `zh-Hans` | `languages.ts` |

An id that is not in these lists does **not** crash the build — it silently
renders a fallback chip or the SOS Foundation author. Verify, don't assume.

Adding a category, author, or language is a one-entry data change in the file
named above. Ask the user first — it is a site-wide taxonomy decision.

---

## 3. Post skeleton (copy this)

```ts
import type { Post } from "../types";

export const post: Post = {
  slug:     "my-post",                    // = filename, kebab-case, unique
  title:    "My Post",
  excerpt:  "One or two sentences.",      // index card + SEO description
  cover:    "/pics/my-cover.jpg",         // hero + social share image
  coverAlt: "Description for screen readers",
  date:     "2026-08-27",                 // YYYY-MM-DD, drives sort order
  authorId: "cong-liu",
  tags:     ["research"],                 // 1-2 is the house style

  // Optional:
  // coverCredit:   "Photo: CCTV",        // visible credit under the hero
  // draft:         true,                 // hides from /blog, URL still works
  // accent:        "#3F8F6B",            // overrides the post accent color
  // lang:          "zh-Hans",            // TRANSLATIONS ONLY - see section 5
  // translationOf: "my-post",            // TRANSLATIONS ONLY - see section 5

  body: [ /* see section 4 */ ],
};
```

Then in `index.ts`:

```ts
import { post as myPost } from "./posts/my-post";

const ALL_POSTS: Post[] = [
  welcomeToTheSosBlog,
  myPost,          // order irrelevant, sorted by date
];
```

---

## 4. Every block type

```ts
{ type: "heading", text: "Section", level: 2 }        // 2 = major, 3 = sub
{ type: "paragraph", text: "Text with <strong>bold</strong> and <em>italic</em>." }
{ type: "image", src: "/pics/x.jpg", alt: "...", caption: "..." }
{ type: "gallery", images: [{ src: "/pics/a.jpg", alt: "..." }], caption: "..." }
{ type: "quote", text: "...", cite: "..." }
{ type: "divider" }
{ type: "video", src: "/video/x.mp4", poster: "/pics/p.jpg", loop: false }
{ type: "embed", provider: "youtube", id: "VIDEO_ID", caption: "..." }
```

`paragraph`, `heading`, and `quote` accept inline HTML — `<strong>`, `<em>`,
and `<a href>`. Nothing else does. An animated `.gif` goes in an `image` block.
External links need `target="_blank" rel="noopener noreferrer"`.

---

## 5. Bilingual posts

One **original** plus any number of **translations**. The original declares
nothing; each translation points back at it.

```ts
// posts/my-post.ts          - the original
slug: "my-post",
// (no lang, no translationOf)

// posts/my-post.zh.ts       - the translation
slug:          "my-post-zh",   // its own unique slug
lang:          "zh-Hans",
translationOf: "my-post",      // the ORIGINAL's slug, exactly
date:          "2026-08-27",   // keep identical to the original
```

Register **both** in `index.ts`. Keep `tags`, `authorId`, and `date` identical
across versions. Images are per-file, not shared — list them in each.

You get automatically: one card on `/blog` (not two), an `EN | 简体` toggle on
the article page, `hreflang` metadata, and a correct `lang` attribute.

**Localized bylines:** if the author has a `localized` block in `authors.ts`,
the translation's byline renders in that language with no extra work.
`cong-liu` already has `zh-Hans`. To add one for another author, see
`authors.ts`.

---

## 6. Images

| Use | Format | Size |
|---|---|---|
| Cover | JPG | 1600-2400 px wide, under 500 KB, 16:9 reads best |
| In-body | JPG | 1200-1800 px wide, under 300 KB |
| Animation | GIF | under 2 MB, else use a looping video |
| Video | MP4 / WebM | under 8 MB, give it a `poster` |

- Files go in `public/pics/`; reference as `/pics/name.jpg` — absolute, leading slash.
- **Filenames are case-sensitive in production.** `Photo.JPG` is not `photo.jpg`.
- Name files descriptively in kebab-case: `ant-trade-customs.jpg`.
- Compress before committing. To convert and resize with Python + Pillow:

```python
from PIL import Image
im = Image.open("src.png")
if im.mode in ("RGBA", "LA", "P"):          # flatten transparency onto white
    bg = Image.new("RGB", im.size, (255, 255, 255))
    im = im.convert("RGBA")
    bg.paste(im, mask=im.split()[-1])
    im = bg
im.save("out.jpg", "JPEG", quality=88, optimize=True, progressive=True)
```

**Third-party photos need a credit.** Use `coverCredit` for the hero, or the
block's `caption` for in-body images. Ask the user for the source — never
invent one.

---

## 7. Source documents (.docx)

When the copy arrives as a Word file, **extract programmatically**. Retyping
loses text and introduces errors.

```bash
unzip -o -q post.docx          # gives word/document.xml and word/media/
```

- Paragraph text and styles: parse `word/document.xml` — elements `w:p`,
  `w:pStyle`, `w:b` (bold), `w:i` (italic).
- **Hyperlink URLs live in `word/_rels/document.xml.rels`**, not in the text.
  Extract them and re-attach to the right anchor text.
- Embedded images sit in `word/media/` and are usually **higher resolution**
  than any copy supplied alongside the document. Prefer them.
- Preserve headings and paragraph breaks exactly. Typography is the site's job,
  not the manuscript's.
- Flag apparent typos to the user; do not silently rewrite the author's prose.

---

## 8. Optional: feature it in the hero slider

`highlights.ts`:

```ts
export const HIGHLIGHT_SLUGS: string[] = [
  "my-post",     // the ORIGINAL's slug; the slider picks the right language
];
```

2-4 entries is the sweet spot. Needs a strong cover image — it is shown
full-bleed.

---

## 9. Verify before reporting done

```bash
npm run build            # must list the new /blog/<slug> route(s)
npx tsc --noEmit         # must be silent
```

Then confirm against the rendered HTML in `.next/server/app/blog/`:

```bash
grep -o 'href="/blog/[a-z-]*"' .next/server/app/blog.html | sort -u
grep -o '<link rel="alternate"[^>]*>' .next/server/app/blog/<slug>.html
```

Expected: **one** card per translation group on the index, and `hreflang` links
on each bilingual article.

ESLint reports pre-existing `no-html-link-for-pages` and `no-img-element`
problems site-wide. Those are not yours — only care about new ones.

---

## 10. Failure modes that actually cost time

| Symptom | Cause |
|---|---|
| Post missing from `/blog` | Not added to `ALL_POSTS`, or `draft: true` is set |
| Language toggle absent | `translationOf` does not match the original's `slug` exactly |
| Toggle absent on a draft | One version is a draft and the other is not — make both drafts |
| Tag chip shows a raw id | `tags` value is not in `categories.ts` |
| Byline shows "SOS Foundation" | `authorId` is not in `authors.ts` |
| Image 404s in production only | Filename case mismatch |
| Chinese text mangled | Write files as UTF-8; do not pipe CJK through a cp1252 console |

---

## Keep this file current

If you add a category, author, or language, update the tables in section 2.
If you add a `Post` or `Block` field, update section 3 or 4. A stale guide
costs more time than no guide.
