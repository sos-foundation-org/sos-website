// ─── Blog content model ──────────────────────────────────────────────────────
// Everything the blog renders is described by these types. Publishing a new
// article means creating one typed `Post` object — no JSX required.
// See ./README.md for a step-by-step publishing guide.

/**
 * A BCP-47 language code — "en", "zh-Hans", "zh-Hant", "ja", "es", …
 *
 * Deliberately a plain string rather than a fixed union: the set of languages
 * the blog supports lives in ./languages.ts, so adding one is a data change,
 * never a type change. Register the code there and every UI surface (toggle,
 * filter, lang attribute) picks it up automatically.
 */
export type LangCode = string;

/** A person who can author posts (shown in the byline + end-of-post bio). */
export type Author = {
  /** Stable id referenced by Post.authorId. */
  id: string;
  /** Display name. */
  name: string;
  /** Short role / title shown under the name. */
  role: string;
  /** Path to a square avatar image in /public (e.g. "/pics/Cong.jpg"). */
  avatar: string;
  /** 4–5 sentence signature bio shown at the end of each post. */
  bio: string;
  /** Optional external links (personal site, social, etc.). */
  links?: { label: string; href: string }[];
  /**
   * Per-language overrides for the byline and bio, keyed by a language code
   * from ./languages.ts. Anything omitted falls back to the fields above, so a
   * translation can localize just the name and leave the bio in English.
   *
   *   localized: { "zh-Hans": { name: "刘聪", role: "SOS 基金会研究组组长" } }
   */
  localized?: Record<LangCode, Partial<Pick<Author, "name" | "role" | "bio">>>;
};

/**
 * A single piece of article content. Posts are an ordered list of blocks,
 * which is what makes mixed image / video / animation + text layouts easy:
 * just interleave the block types you need.
 */
export type Block =
  /** Section heading. level 2 = large, level 3 = sub-heading. */
  | { type: "heading"; text: string; level?: 2 | 3 }
  /** A paragraph. `text` may contain inline HTML: <strong>, <em>, <a href>. */
  | { type: "paragraph"; text: string }
  /** A single image. Use a .gif here for lightweight animations. */
  | { type: "image"; src: string; alt?: string; caption?: string; rounded?: boolean }
  /** A self-hosted video file from /public (mp4 / webm). */
  | {
      type: "video";
      src: string;
      poster?: string;
      caption?: string;
      /** Silent looping clip (animation mode) — autoplays, no controls. */
      loop?: boolean;
    }
  /** An embedded video from YouTube or Vimeo (pass just the video id). */
  | { type: "embed"; provider: "youtube" | "vimeo"; id: string; caption?: string }
  /** A 2–3 column image grid. */
  | { type: "gallery"; images: { src: string; alt?: string }[]; caption?: string }
  /** A pull quote. */
  | { type: "quote"; text: string; cite?: string }
  /** A thin horizontal rule for separating sections. */
  | { type: "divider" };

/** A complete blog article. */
export type Post = {
  /** URL slug — the article lives at /blog/<slug>. Keep it kebab-case. */
  slug: string;
  /** Headline. */
  title: string;
  /** 1–2 sentence summary shown on cards and used as the meta description. */
  excerpt: string;
  /** Hero / cover image path in /public. */
  cover: string;
  coverAlt?: string;
  /**
   * Visible credit line under the cover — for photos you did not take.
   * Plain text or inline HTML (e.g. a link to the source).
   */
  coverCredit?: string;
  /** Publish date as an ISO string: "YYYY-MM-DD". */
  date: string;
  /** Author id — must match a key in AUTHORS (see ./authors.ts). */
  authorId: string;
  /** Optional topic tags shown as pills. */
  tags?: string[];
  /** Set true to hide the post from the index (e.g. work in progress). */
  draft?: boolean;
  /** Optional accent color (defaults to the SOS data teal). */
  accent?: string;
  /**
   * Language this post is written in — a code registered in ./languages.ts.
   * Omitted means DEFAULT_LANG (the site's original language).
   */
  lang?: LangCode;
  /**
   * Set on a TRANSLATION only: the slug of the ORIGINAL post it translates.
   * The original itself leaves this blank — it is what every translation
   * points at, whatever language it happens to be written in.
   *
   * An original plus its translations form one "translation group": they share
   * a single card on the index and cross-link from the article page. A group
   * can hold any number of languages.
   */
  translationOf?: string;
  /** Ordered article content. */
  body: Block[];
};
