"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { COLORS, DARK_BG } from "@/lib/theme";
import { SITE_URL } from "@/lib/site";
import { formatDate, readingTime, getCategory } from "@/content/blog";
import { DEFAULT_LANG, getLanguage } from "@/content/blog/languages";
import type { Author, Post } from "@/content/blog/types";
import BlogHeader from "./BlogHeader";
import BlogFooter from "./BlogFooter";
import PostBody from "./PostBody";
import AuthorBio from "./AuthorBio";
import ShareBar from "./ShareBar";
import PostCard from "./PostCard";
import LanguageToggle from "./LanguageToggle";

// ─── Single article page ─────────────────────────────────────────────────────
// Dark site shell + a centered light "reading card" for the prose, so the
// article stays comfortable to read while matching the rest of the site.

export default function BlogPostView({
  post,
  author,
  related,
  translations = [],
}: {
  post: Post;
  author: Author;
  related: Post[];
  /**
   * Every published version of this article — the original plus translations,
   * in language-registry order. One entry (or none) means no toggle renders.
   */
  translations?: Post[];
}) {
  const accent = post.accent ?? COLORS.data;
  const shareUrl = `${SITE_URL}/blog/${post.slug}`;
  const postLang = post.lang ?? DEFAULT_LANG;

  // Each translation is its own URL, so the toggle navigates rather than
  // swapping content in place — translations stay shareable and indexable.
  const languages = translations.map((t) => getLanguage(t.lang ?? DEFAULT_LANG));
  const hrefByLang = new Map(
    translations.map((t) => [t.lang ?? DEFAULT_LANG, `/blog/${t.slug}`]),
  );

  return (
    <div className="min-h-screen" style={{ background: DARK_BG }}>
      {/* Background grid overlay */}
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
          {/* ── Title block ─────────────────────────────────────────────── */}
          <section className="mx-auto max-w-3xl px-5 pt-14 md:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-80"
                  style={{ color: accent }}
                >
                  <ArrowLeft size={14} /> All posts
                </a>

                <LanguageToggle
                  languages={languages}
                  active={postLang}
                  hrefFor={(code) => hrefByLang.get(code)}
                  accent={accent}
                  size="sm"
                />
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => {
                    const cat = getCategory(tag);
                    return (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ background: `${cat.color}1F`, color: cat.color }}
                      >
                        {cat.label}
                      </span>
                    );
                  })}
                </div>
              )}

              <h1
                lang={postLang}
                className="mt-4 text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-white"
              >
                {post.title}
              </h1>
              <p lang={postLang} className="mt-4 text-lg leading-relaxed text-white/55">
                {post.excerpt}
              </p>

              {/* Byline */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden shrink-0 bg-white/5">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-medium text-white">{author.name}</div>
                  <div className="text-xs text-white/45">
                    {formatDate(post.date)} · {readingTime(post)}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ── Cover image ─────────────────────────────────────────────── */}
          <section className="mx-auto max-w-5xl px-5 mt-8 md:mt-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="rounded-3xl overflow-hidden"
            >
              <img
                src={post.cover}
                alt={post.coverAlt ?? post.title}
                className="w-full max-h-[60vh] object-cover"
              />
            </motion.div>

            {/* Photo credit — only when the post declares one. */}
            {post.coverCredit && (
              <p
                lang={postLang}
                className="mt-3 text-xs text-white/40"
                dangerouslySetInnerHTML={{ __html: post.coverCredit }}
              />
            )}
          </section>

          {/* ── Reading card: article body + author bio ─────────────────── */}
          <section className="mx-auto max-w-3xl px-5 mt-8 md:mt-12">
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              lang={postLang}
              className="rounded-3xl border p-6 md:p-10"
              style={{
                borderColor: "rgba(31,42,51,0.10)",
                background: "rgba(245,247,246,0.96)",
              }}
            >
              <PostBody body={post.body} accent={accent} />
            </motion.article>

            {/* Share buttons */}
            <div className="mt-6">
              <ShareBar url={shareUrl} title={post.title} />
            </div>

            {/* End-of-post author bio */}
            <div className="mt-6">
              <AuthorBio author={author} accent={accent} />
            </div>
          </section>

          {/* ── More posts ──────────────────────────────────────────────── */}
          {related.length > 0 && (
            <section className="mx-auto max-w-6xl px-5 mt-20 md:mt-28">
              <div
                className="h-px w-full mb-12"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />
              <h2 className="text-xl font-semibold text-white">More posts</h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} requestedLang={postLang} />
                ))}
              </div>
            </section>
          )}

          <div className="pb-24 md:pb-32" />
        </main>

        <BlogFooter />
      </div>
    </div>
  );
}
