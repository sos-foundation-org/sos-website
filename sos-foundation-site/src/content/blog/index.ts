import type { LangCode, Post } from "./types";
import { DEFAULT_LANG, LANGUAGES, sortByLanguageOrder, type Language } from "./languages";

// ─── Post registry ───────────────────────────────────────────────────────────
// To publish a new article: (1) create a file in ./posts/, (2) import it here,
// (3) add it to the POSTS array. Order doesn't matter — posts are sorted by
// date automatically. See ./README.md for the full guide, or ./AI-GUIDE.md for
// the same procedure as a compressed checklist.
//
// Translations are registered exactly like any other post. A translation is
// linked to its original by `translationOf`, not by where it sits in this list.

import { post as welcomeToTheSosBlog } from "./posts/welcome-to-the-sos-blog";
import { post as templateBilingual } from "./posts/_template-bilingual";
import { post as templateBilingualZh } from "./posts/_template-bilingual.zh";
import { post as antsBanned } from "./posts/should-buying-and-selling-ants-be-banned";
import { post as antsBannedZh } from "./posts/should-buying-and-selling-ants-be-banned.zh";

const ALL_POSTS: Post[] = [
  welcomeToTheSosBlog,
  // Bilingual reference pair — both are drafts, so they stay off /blog while
  // remaining previewable at /blog/template-bilingual. Delete these two lines
  // (and the files) once you have a real bilingual post of your own.
  templateBilingual,
  templateBilingualZh,
  antsBanned,
  antsBannedZh,
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

/**
 * Up to `limit` posts from OTHER translation groups, newest first — the
 * "More posts" strip. Prefers `lang`, so a reader on the Chinese version of an
 * article is offered Chinese versions of the others where they exist.
 */
export function getRelatedPosts(slug: string, limit = 2, lang?: LangCode): Post[] {
  const post = getPostBySlug(slug);
  const exclude = post ? getGroupId(post) : slug;
  return getPostsInLang(lang ?? (post ? getPostLang(post) : DEFAULT_LANG))
    .filter((p) => getGroupId(p) !== exclude)
    .slice(0, limit);
}

// ─── Languages & translation groups ──────────────────────────────────────────
// A post and its translations form a "translation group", keyed by the slug of
// the ORIGINAL. The original declares nothing; each translation points back at
// it with `translationOf`. Group members may be in any registered language —
// see ./languages.ts.

/** The language a post is written in ("en" unless it says otherwise). */
export function getPostLang(post: Post): LangCode {
  return post.lang ?? DEFAULT_LANG;
}

/** The id of a post's translation group — the original's slug. */
export function getGroupId(post: Post): string {
  return post.translationOf ?? post.slug;
}

/**
 * Every version of a post — the original plus its translations — in LANGUAGES
 * order. A post with no translations returns just itself.
 *
 * Drafts follow the post you are viewing: previewing a draft shows its draft
 * translations too (so you can check a bilingual pair before publishing),
 * while a published post never links out to an unpublished translation.
 */
export function getTranslations(post: Post): Post[] {
  const group = getGroupId(post);
  const pool = post.draft ? ALL_POSTS : POSTS;
  const members = pool.filter((p) => getGroupId(p) === group);
  return sortByLanguageOrder(members, getPostLang);
}

/**
 * One post per translation group, newest first — what the index renders.
 *
 * Picks the requested language, then falls back to the original, then to
 * whatever version exists. The fallback matters: it means an untranslated post
 * still shows up when the reader has picked another language, instead of the
 * blog looking empty.
 */
export function getPostsInLang(lang: LangCode): Post[] {
  const groups = new Map<string, Post[]>();
  for (const post of POSTS) {
    const id = getGroupId(post);
    groups.set(id, [...(groups.get(id) ?? []), post]);
  }

  const picked: Post[] = [];
  for (const members of groups.values()) {
    const match =
      members.find((p) => getPostLang(p) === lang) ??
      members.find((p) => getPostLang(p) === DEFAULT_LANG) ??
      sortByLanguageOrder(members, getPostLang)[0];
    if (match) picked.push(match);
  }
  return picked.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/**
 * Languages that at least one published post is written in, in LANGUAGES
 * order. Drives the index toggle, so a language with no posts yet never shows
 * up as a dead option.
 */
export function getLanguagesInUse(): Language[] {
  const used = new Set(POSTS.map(getPostLang));
  return LANGUAGES.filter((l) => used.has(l.code));
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

export { getAuthor, localizeAuthor } from "./authors";
export { DEFAULT_LANG, LANGUAGES, getLanguage } from "./languages";
export type { Language } from "./languages";
export { CATEGORIES, getCategory } from "./categories";
export type { Category } from "./categories";
export type { Post, Author, Block, LangCode } from "./types";
