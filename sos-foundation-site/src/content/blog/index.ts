import type { Post } from "./types";

// ─── Post registry ───────────────────────────────────────────────────────────
// To publish a new article: (1) create a file in ./posts/, (2) import it here,
// (3) add it to the POSTS array. Order doesn't matter — posts are sorted by
// date automatically. See ./README.md for the full guide.

import { post as welcomeToTheSosBlog } from "./posts/welcome-to-the-sos-blog";

const ALL_POSTS: Post[] = [
  welcomeToTheSosBlog,
  // ↑ add new posts here
];

// Public, draft-filtered, newest-first.
export const POSTS: Post[] = ALL_POSTS.filter((p) => !p.draft).sort(
  (a, b) => +new Date(b.date) - +new Date(a.date),
);

/** Every published post, newest first. */
export function getAllPosts(): Post[] {
  return POSTS;
}

/** A single post by slug (drafts included, so direct links still preview). */
export function getPostBySlug(slug: string): Post | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

/** Up to `limit` posts other than `slug`, newest first — used for "More posts". */
export function getRelatedPosts(slug: string, limit = 2): Post[] {
  return POSTS.filter((p) => p.slug !== slug).slice(0, limit);
}

// ─── Display helpers ─────────────────────────────────────────────────────────

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Format an ISO date ("2026-05-19") as "May 19, 2026" — timezone-safe. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** Rough reading-time estimate from the post body (~200 wpm). */
export function readingTime(post: Post): string {
  const words = post.body.reduce((n, b) => {
    if (b.type === "paragraph" || b.type === "heading" || b.type === "quote") {
      const plain = b.text.replace(/<[^>]+>/g, " ");
      return n + plain.split(/\s+/).filter(Boolean).length;
    }
    return n;
  }, 0);
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

// ─── Filter facets ───────────────────────────────────────────────────────────
// Helpers that power the blog index's filter bar (by category / author / date).

import { CATEGORIES, type Category } from "./categories";
import { getAuthor } from "./authors";
import type { Author } from "./types";

/** Categories actually used by at least one post, in CATEGORIES order. */
export function getCategoriesInUse(): Category[] {
  const used = new Set(POSTS.flatMap((p) => p.tags ?? []));
  return CATEGORIES.filter((c) => used.has(c.id));
}

/** Authors who have published at least one post. */
export function getAuthorsInUse(): Author[] {
  const ids = Array.from(new Set(POSTS.map((p) => p.authorId)));
  return ids.map(getAuthor);
}

/** Years that have at least one post, newest first (e.g. ["2026", "2025"]). */
export function getYearsInUse(): string[] {
  return Array.from(new Set(POSTS.map((p) => p.date.slice(0, 4)))).sort().reverse();
}

export { getAuthor } from "./authors";
export { CATEGORIES, getCategory } from "./categories";
export type { Category } from "./categories";
export type { Post, Author, Block } from "./types";
