"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DARK_BG } from "@/lib/theme";
import { CATEGORIES, getAuthor } from "@/content/blog";
import { HIGHLIGHT_SLUGS } from "@/content/blog/highlights";
import { DEFAULT_LANG } from "@/content/blog/languages";
import type { Language } from "@/content/blog/languages";
import type { LangCode, Post } from "@/content/blog/types";
import BlogHeader from "./BlogHeader";
import BlogFooter from "./BlogFooter";
import HighlightSlider from "./HighlightSlider";
import PostCard from "./PostCard";
import BlogFilters, { type FilterState } from "./BlogFilters";
import LanguageToggle from "./LanguageToggle";

// ─── Blog index ──────────────────────────────────────────────────────────────
// Client component: rotating highlight hero, a filter bar (by category /
// author / year+month), then the post grid.
//
// Language handling: the server hands us EVERY published post, translations
// included, and we collapse each translation group down to the one version
// matching the selected language. Language is deliberately kept out of
// FilterState so that "Clear filters" doesn't yank the reader back to English.

const EMPTY: FilterState = {
  category: null,
  authorId: null,
  year: null,
  month: null,
};

export default function BlogIndexView({
  posts,
  languages,
}: {
  /** One post per translation group, already resolved for `lang`. */
  posts: Post[];
  /** Languages with at least one published post — drives the toggle. */
  languages: Language[];
}) {
  const [filter, setFilter] = useState<FilterState>(EMPTY);
  const [lang, setLang] = useState<LangCode>(DEFAULT_LANG);
  const isFiltering =
    !!filter.category || !!filter.authorId || !!filter.year || !!filter.month;

  // ── Collapse translation groups to the selected language ─────────────────
  // Falls back to the original when a post has no version in `lang`, so an
  // untranslated article still appears rather than silently vanishing.
  const inLang = useMemo(() => {
    const groups = new Map<string, Post[]>();
    for (const post of posts) {
      const id = post.translationOf ?? post.slug;
      groups.set(id, [...(groups.get(id) ?? []), post]);
    }
    const picked: Post[] = [];
    for (const members of groups.values()) {
      const match =
        members.find((p) => (p.lang ?? DEFAULT_LANG) === lang) ??
        members.find((p) => (p.lang ?? DEFAULT_LANG) === DEFAULT_LANG) ??
        members[0];
      if (match) picked.push(match);
    }
    return picked.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [posts, lang]);

  // ── Curated highlights for the hero slider (falls back to latest) ─────────
  // Highlight slugs name the ORIGINAL post; we show whichever version of that
  // group matches the reader's language.
  const highlights = useMemo(() => {
    const byGroup = new Map(inLang.map((p) => [p.translationOf ?? p.slug, p]));
    const picked = HIGHLIGHT_SLUGS
      .map((slug) => byGroup.get(slug))
      .filter((p): p is Post => Boolean(p));
    if (picked.length > 0) return picked;
    return inLang[0] ? [inLang[0]] : [];
  }, [inLang]);

  // ── Filter facets derived from the posts ──────────────────────────────────
  const categories = useMemo(() => {
    const used = new Set(inLang.flatMap((p) => p.tags ?? []));
    return CATEGORIES.filter((c) => used.has(c.id));
  }, [inLang]);

  const authors = useMemo(() => {
    const ids = Array.from(new Set(inLang.map((p) => p.authorId)));
    return ids.map(getAuthor);
  }, [inLang]);

  const years = useMemo(
    () =>
      Array.from(new Set(inLang.map((p) => p.date.slice(0, 4))))
        .sort()
        .reverse(),
    [inLang],
  );

  // ── Apply filters ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return inLang.filter((p) => {
      if (filter.category && !(p.tags ?? []).includes(filter.category)) return false;
      if (filter.authorId && p.authorId !== filter.authorId) return false;
      if (filter.year && p.date.slice(0, 4) !== filter.year) return false;
      if (filter.month && p.date.slice(5, 7) !== filter.month) return false;
      return true;
    });
  }, [inLang, filter]);

  return (
    <div className="min-h-screen" style={{ background: DARK_BG }}>
      {/* Background grid overlay — identical to the other pages */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(31,42,51,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,42,51,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
        }}
      />

      <div className="relative z-10">
        <BlogHeader />

        <main>
          {/* ── Rotating highlight hero ─────────────────────────────────── */}
          <HighlightSlider posts={highlights} />

          {/* ── Filter bar ──────────────────────────────────────────────── */}
          <section id="posts" className="mx-auto max-w-6xl px-5 pt-16 md:pt-20 scroll-mt-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <BlogFilters
                categories={categories}
                authors={authors}
                years={years}
                state={filter}
                onChange={setFilter}
                resultCount={filtered.length}
                totalCount={inLang.length}
              />
            </motion.div>
          </section>

          {/* ── Section heading + language toggle ───────────────────────── */}
          <section className="mx-auto max-w-6xl px-5 pt-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  {isFiltering ? "Matching posts" : "All posts"}
                </h2>
                <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {isFiltering
                    ? `${filtered.length} of ${inLang.length} posts.`
                    : `${inLang.length} ${inLang.length === 1 ? "post" : "posts"} so far.`}
                </p>
              </div>
              <LanguageToggle
                languages={languages}
                active={lang}
                onSelect={setLang}
              />
            </div>
          </section>

          {/* ── Results ─────────────────────────────────────────────────── */}
          {filtered.length === 0 ? (
            <section className="mx-auto max-w-6xl px-5 pt-6 pb-28">
              <div
                className="rounded-3xl border p-10 text-center"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  background: "rgba(31,42,51,0.92)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {inLang.length === 0
                  ? "No posts yet — the first story is on its way."
                  : "No posts match these filters. Try clearing one."}
              </div>
            </section>
          ) : (
            <section className="mx-auto max-w-6xl px-5 pt-6 pb-28">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: (i % 3) * 0.06,
                    }}
                  >
                    <PostCard post={post} requestedLang={lang} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </main>

        <BlogFooter />
      </div>
    </div>
  );
}
