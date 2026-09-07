import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { COLORS } from "@/lib/theme";
import { formatDate, readingTime, getAuthor, getCategory, localizeAuthor } from "@/content/blog";
import { DEFAULT_LANG, getLanguage } from "@/content/blog/languages";
import type { LangCode, Post } from "@/content/blog/types";

// A single post preview used on the blog index and the "More posts" strip.
export default function PostCard({
  post,
  requestedLang,
}: {
  post: Post;
  /**
   * The language the reader asked for. When this post isn't available in it,
   * the card is badged with the language it IS in — so a card that stays in
   * English while the toggle says 简体 explains itself instead of looking broken.
   */
  requestedLang?: LangCode;
}) {
  const accent = post.accent ?? COLORS.data;
  const postLang = post.lang ?? DEFAULT_LANG;
  const author = localizeAuthor(getAuthor(post.authorId), postLang);
  const langBadge =
    requestedLang && requestedLang !== postLang ? getLanguage(postLang) : null;

  return (
    <a
      href={`/blog/${post.slug}`}
      className="group rounded-3xl overflow-hidden border flex flex-col transition-all hover:-translate-y-1"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      {/* Cover */}
      <div className="relative aspect-[16/9] overflow-hidden shrink-0">
        <Image
          src={post.cover}
          alt={post.coverAlt ?? post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,24,36,0.05) 0%, rgba(8,24,36,0.70) 100%)",
          }}
        />
        {langBadge && (
          <span
            className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-semibold"
            style={{
              background: "rgba(8,24,36,0.80)",
              color: "rgba(255,255,255,0.70)",
              backdropFilter: "blur(4px)",
            }}
            title={`Only available in ${langBadge.name}`}
          >
            {langBadge.label}
          </span>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => {
              const cat = getCategory(tag);
              return (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                  style={{
                    background: "rgba(8,24,36,0.80)",
                    color: cat.color,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {cat.label}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="p-5 flex flex-col gap-3 flex-1"
        style={{ background: "rgba(31,42,51,0.92)" }}
      >
        <div className="flex items-center gap-2 text-[11px] text-white/45">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{readingTime(post)}</span>
        </div>

        <h3 className="text-lg font-semibold leading-snug text-white">
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/55 flex-1">
          {post.excerpt}
        </p>

        {/* Byline */}
        <div
          className="mt-1 pt-4 border-t flex items-center justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-7 w-7 rounded-full overflow-hidden shrink-0 bg-white/5">
              <Image
                src={author.avatar}
                alt={author.name}
                width={28}
                height={28}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs text-white/65 truncate">{author.name}</span>
          </div>
          <span
            className="inline-flex items-center gap-1 text-xs font-medium shrink-0"
            style={{ color: accent }}
          >
            Read <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}
