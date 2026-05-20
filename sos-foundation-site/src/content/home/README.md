# Home Page — Maintenance Guide

The home page's content-driven sections live here. Edit data, not JSX.

## "What is taking shape?" (Work section)

The three feature cards + bottom row on the home page read from
[`work.ts`](./work.ts). Everything you would normally need to change is in the
`WORK` object near the bottom of that file.

### Swap a card's photo

```ts
{
  id: "system-prototype-talk",
  // …
  media: {
    kind: "image",
    src: "/pics/your-new-photo.jpg",     // ← change this
    alt: "Brief description",
  },
  caption: "Caption shown bottom-left",
}
```

Put the new image into `public/pics/` first, then reference it with an
absolute path that starts with `/`.

### Swap a card's 3D embed / iframe

```ts
{
  // …
  media: {
    kind: "iframe",
    src: "https://www.kiriengine.app/share/3dgsEmbed/<id>?…",
    title: "Short title used for a11y",
  },
  topBadge: "3D Interactive   drag / zoom / explore",
}
```

### Reorder the top row

The `cards` array order = the on-page order, left to right. Just shuffle the
entries.

### Add a fourth card

Add another entry to `cards`. The grid is `md:grid-cols-3`, so a fourth card
will wrap onto a new row. If you'd rather keep three columns and rotate which
three are visible, comment out the one you want to hide.

### Edit the heading / subtitle

Change `WORK.title` and `WORK.subtitle` directly.

### Change the bottom-row text card

`WORK.signal` is the text-only card on the bottom-left:

```ts
signal: {
  heading: "Signals across the loop",
  body: "Short paragraph text.",
}
```

### Change the spotlight image (bottom-right)

`WORK.spotlight` is the wide image card on the bottom-right. Same shape as a
top-row card — typically with `aspect: "aspect-[16/10]"`.

### Card fields, in full

| Field      | Required | Notes                                                     |
|------------|----------|-----------------------------------------------------------|
| `id`       | yes      | Unique stable id (used as React key).                     |
| `tone`     | yes      | `meaning` / `pattern` / `mechanism` / `neutral` — accent. |
| `aspect`   | yes      | Tailwind aspect util, e.g. `aspect-[4/5]`, `aspect-[16/10]`. |
| `media`    | yes      | `{ kind: "image", … }` or `{ kind: "iframe", … }`.        |
| `topBadge` | no       | Pill in the top-left corner of the card.                  |
| `caption`  | no       | Chip in the bottom-left of the card.                      |
| `label`    | no       | Placeholder text (visible only if media fails to load).   |

### Media tips

- **Images:** drop into `public/pics/`. JPG or PNG. ~1200–1800 px wide,
  compress to ≤ 300 KB.
- **3D embeds:** use the share link's `embed` URL, not the page URL.
- **Aspect ratios:** the three top cards look best at `aspect-[4/5]`. The
  bottom-right spotlight looks best at `aspect-[16/10]`.

That's it — save the file and refresh.
