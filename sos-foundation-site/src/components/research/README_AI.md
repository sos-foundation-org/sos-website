# README_AI: Adding a member to the SOS Research Unit

Read this before adding (or updating) a person on the Research page
(`/research`). It lists every place that has to change, in order, so a new
member can be added in one pass. Last used for Qian Tang (2026-11-27,
commit `aaa048d`).

## 0. Ground rules

- **English only.** The Research, About, Home, Education and Donate pages
  have no Chinese version or language toggle. Only the blog is bilingual.
  Do not translate a bio; if Ping wants Chinese, that is a separate,
  site-wide project.
- **Text follows the member's own material** (usually a `*_bio_SOS.docx`).
  Do not rewrite the bio. Anything you had to write yourself (e.g. the
  `role` line) must be pointed out to Ping.
- **No em dashes (—)** in anything new. Use commas or split the sentence.
  En dashes in year ranges (`2011 – 2016`) are fine.
- **Never touch the original photo.** Work on a copy in the scratchpad.
- **Preview locally and wait for Ping's OK** before commit and push.
- No per-person metrics cards. The `metrics` field on `DIRECTORS` exists in
  the data but is not rendered; don't add metrics for scientists.

## 1. What to ask for / collect

| Needed | Usual source |
|---|---|
| Name, position, affiliation | bio docx |
| Bio (2–5 sentences) | bio docx, verbatim |
| Research focus tags (3–5) | bio docx |
| Links (website, Google Scholar, LinkedIn…) | bio docx |
| Education (degree, institution, years) | personal CV page |
| Publication count, citations | personal site "Scholarly metrics" or Google Scholar |
| 1–2 notable papers | personal CV page / Scholar |
| Portrait photo | Ping |

Google Scholar profile pages (`citations?user=…`) can be read without
login; Scholar author *search* redirects to a Google sign-in, so ask Ping
for the profile link instead.

## 2. Files that change

All in `sos-foundation-site/`:

| # | What | Where (search for) |
|---|---|---|
| 1 | Portrait | `public/pics/<First>-<Last>.jpg` (new file) |
| 2 | Member card | `src/components/research/ResearchView.tsx` → `const SCIENTISTS` (or `const DIRECTORS` for a co-director) |
| 3 | Scientists section subtitle | `ResearchView.tsx` → `Specialists who extend the unit` |
| 4 | Publication record | `ResearchView.tsx` → `const PUBLICATIONS` |
| 5 | Research theme contributions | `ResearchView.tsx` → `const THEMES` + the `Contributions` render block |
| 6 | Header totals | `ResearchView.tsx` → `Publications", "` (hero badges) |
| 7 | Same totals on the home page (`/`, rendered by `AboutView`) | `src/components/about/AboutView.tsx` → `publications,` |

Only touch these if the person is a **co-director** (scientists are not
listed there): `src/app/research/page.tsx` (metadata), `src/lib/seo.ts`
(Person schema), `src/lib/llms.ts`, `src/content/faq.ts`,
`HomeView.tsx`, `AboutView.tsx` team list, `src/content/blog/authors.ts`.

## 3. Step by step

### 3.1 Portrait

Cards crop to **3:4 with `object-top`**. Produce a 1200×1600 JPEG,
quality 84, ideally < 400 KB. Keep the face in the upper third, centered
horizontally. House style is an environmental / fieldwork portrait, not a
studio headshot. Look at the photo first and pick the crop box by eye.

```python
# python -I -X utf8 crop.py <src> <dst> <x0>
import sys
from PIL import Image, ImageOps
src, dst, x0 = sys.argv[1], sys.argv[2], int(sys.argv[3])
im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
w, h = im.size
cw = round(h * 3 / 4)                     # full height, 3:4 width (landscape source)
im = im.crop((x0, 0, x0 + cw, h)).resize((1200, 1600), Image.LANCZOS)
im.save(dst, quality=84, optimize=True, progressive=True)
```

If you **replace** an existing photo, give it a new filename: Next's image
optimizer caches by URL and will keep serving the old one.

### 3.2 Member card (`SCIENTISTS`)

Append one object; the layout stacks automatically. Template:

```ts
  {
    // Bio from <file>.docx (<date>). Education from <cv url>.
    name: "First Last",
    title: "Research Scientist, SOS Research Unit",   // keep exactly
    affiliation: "Position, Institution",
    role: "Field · Field",                           // short, " · " separated
    bio: "…verbatim from the docx…",
    themes: ["Tag", "Tag", "Tag"],
    education: [                                       // newest first; [] hides the block
      { degree: "Ph.D., …", institution: "University, City/Country", years: "2011 – 2016" },
    ],
    links: [                                           // first renders solid, rest outlined
      { label: "Personal Website", url: "https://…" },
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=…" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/…" },
    ],
    photo: "/pics/First-Last.jpg",
    photoAlt: "First Last",
    accentColor: COLORS.blue,                          // pick one not used by the previous card
  },
```

Ping did not want a "CV" link button; stick to website / Scholar /
LinkedIn unless asked. In URLs write `&`, not `&amp;` (docx XML escapes it).

Accent colors in use: Liu `COLORS.data`, Chan `COLORS.art`,
Lee `COLORS.green`, Tang `COLORS.blue`. Options in `const COLORS` at the
top of the file.

### 3.3 Scientists subtitle

The paragraph under the "Research Scientists" heading names the fields the
scientists cover. Extend it so the new person's field is included.

### 3.4 Publication record (`PUBLICATIONS`)

- Grouped by year, newest year first. Add the paper to its year group.
- `id` is the **displayed number** (1, 2, 3…). After inserting, renumber
  every later entry so the sequence stays continuous and unique.
- Authors in the short house form: `"Tang Q, et al."`; set `bold` to the
  member's name as written (`"Tang Q"`). All members' names are bold
  (the caption says "Research Unit members appear in bold").
- The collapsed view shows only journals in `HIGHLIGHT_JOURNALS`
  (Nature, Science, Nature Methods, PNAS, Communications Biology). Other
  journals appear only after "Show full list". Don't add journals to that
  set unless Ping asks.
- Pick 1–2 papers per person: first-author, and preferably related to an
  SOS theme.

`FEATURED_PUBS` (the six image cards at the top) is directors' flagship
work only; don't add to it unless asked (it needs a 16:9 image).

### 3.5 Theme contributions (`THEMES`)

Each theme card has a "Contributions" list with one line per person,
keyed by surname: `liu`, `chan`, `tang`, `lee`.

1. Add `<surname>: "Short description (Journal abbrev, Year)"` to the
   theme(s) the paper fits. Only add where it genuinely fits; it's fine to
   skip if nothing does.
2. If the surname key is new, also add a render block next to the others
   (search `theme.lee &&`), copying it and changing the key, label and
   color (use the person's `accentColor`).
3. If a theme description is too narrow for the new work, broaden it
   minimally (e.g. theme 03 went from "Insects" to "Insects and other
   invertebrates"), and tell Ping.

Current contributions: 03 Conservation (Liu, Chan, Tang),
05 Mountains (Chan, Lee), 06 Biosecurity (Liu, Tang).

### 3.6 Header totals (Research hero + About)

The hero badges and the About page show the **sum over all members**,
rounded down to a "+" figure (65+, 1,500+, 2,200+…). Update both places together.

| Member | Publications | Citations | Source |
|---|---|---|---|
| Cong Liu | 34+ | 836+ | Google Scholar screenshots, 2026-11-27 (top 20 papers; the rest each ≤ 17) |
| Wei-Ping Chan | 6+ | 630 | Google Scholar screenshot, 2026-11-27 (top 10 papers) |
| Qian Tang | 20+ | 640+ | qt37t247.github.io/cv |
| Wen-Chien Lee | 8 | 136 | Google Scholar screenshot, 2026-11-27 |
| **Total** | **68 → "65+"** | **2,242 → "2,200+"** | |

Add the new person's row, re-sum, round down (65+, 1,500+, 2,000+…).
Update this table in the same commit.

## 4. Verify, report, ship

1. `npx tsc --noEmit`
2. Preview: `preview_start` with `sos-dev` (port 3000), open `/research`,
   screenshot the new card (desktop and mobile, 375 px), the theme
   card(s), and the publication list (click "Show full list").
   If the browser pane is unavailable, `curl -s localhost:3000/research |
   grep …` confirms server-rendered text (the full publication list is
   not in the initial HTML).
3. Report to Ping: photo crop, every field you wrote yourself, papers and
   themes chosen, new totals. Wait for the OK.
4. `npm run build`, then commit (`feat(research): add <Name> to the
   Research Unit`) and push to `main`; Vercel deploys automatically.

## 5. Checklist

- [ ] Photo cropped 3:4, 1200×1600, in `public/pics/`, original untouched
- [ ] Card added to `SCIENTISTS` (bio verbatim, no em dash)
- [ ] Scientists subtitle covers the new field
- [ ] Paper(s) in `PUBLICATIONS`, ids renumbered, name bold
- [ ] Theme contribution(s) + render block if new surname key
- [ ] Hero badges and About totals updated; table in §3.6 updated
- [ ] tsc + preview screenshots sent; Ping confirmed
- [ ] Build, commit, push
