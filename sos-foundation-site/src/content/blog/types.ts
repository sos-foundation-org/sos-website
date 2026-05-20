// ─── Blog content model ──────────────────────────────────────────────────────
// Everything the blog renders is described by these types. Publishing a new
// article means creating one typed `Post` object — no JSX required.
// See ./README.md for a step-by-step publishing guide.

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
  /** Ordered article content. */
  body: Block[];
};
