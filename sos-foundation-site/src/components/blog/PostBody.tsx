import { COLORS } from "@/lib/theme";
import type { Block } from "@/content/blog/types";

// ─── Article body renderer ───────────────────────────────────────────────────
// Turns an ordered list of content blocks into the article. Add support for a
// new block type here and in content/blog/types.ts — nothing else changes.

function Caption({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <figcaption
      className="mt-3 text-center text-sm leading-relaxed"
      style={{ color: "rgba(31,42,51,0.50)" }}
    >
      {text}
    </figcaption>
  );
}

function BlockView({ block, accent }: { block: Block; accent: string }) {
  switch (block.type) {
    case "heading":
      return block.level === 3 ? (
        <h3
          className="mt-9 text-xl font-semibold leading-snug"
          style={{ color: COLORS.ink }}
        >
          {block.text}
        </h3>
      ) : (
        <h2
          className="mt-11 text-2xl md:text-3xl font-semibold leading-snug"
          style={{ color: COLORS.ink }}
        >
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p
          className="mt-5 text-base md:text-lg leading-relaxed [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-2"
          style={{ color: "rgba(31,42,51,0.82)" }}
          // Authors may include inline <strong>/<em>/<a> in their own copy.
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );

    case "image":
      return (
        <figure className="mt-8">
          <img
            src={block.src}
            alt={block.alt ?? ""}
            className={`w-full ${block.rounded === false ? "" : "rounded-2xl"}`}
            loading="lazy"
            decoding="async"
          />
          <Caption text={block.caption} />
        </figure>
      );

    case "gallery":
      return (
        <figure className="mt-8">
          <div
            className={`grid gap-3 ${
              block.images.length >= 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"
            }`}
          >
            {block.images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt ?? ""}
                className="w-full rounded-xl aspect-[4/3] object-cover"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <Caption text={block.caption} />
        </figure>
      );

    case "video":
      return (
        <figure className="mt-8">
          <video
            src={block.src}
            poster={block.poster}
            controls={!block.loop}
            autoPlay={block.loop}
            loop={block.loop}
            muted={block.loop}
            playsInline
            className="w-full rounded-2xl"
          />
          <Caption text={block.caption} />
        </figure>
      );

    case "embed": {
      const src =
        block.provider === "youtube"
          ? `https://www.youtube.com/embed/${block.id}`
          : `https://player.vimeo.com/video/${block.id}`;
      return (
        <figure className="mt-8">
          <div className="relative w-full overflow-hidden rounded-2xl aspect-video">
            <iframe
              src={src}
              title="Embedded video"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <Caption text={block.caption} />
        </figure>
      );
    }

    case "quote":
      return (
        <blockquote
          className="mt-9 border-l-4 pl-5 py-1"
          style={{ borderColor: accent }}
        >
          <p
            className="text-xl md:text-2xl font-medium leading-snug"
            style={{ color: COLORS.ink }}
          >
            {block.text}
          </p>
          {block.cite && (
            <cite
              className="mt-2 block text-sm not-italic"
              style={{ color: "rgba(31,42,51,0.50)" }}
            >
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );

    case "divider":
      return (
        <hr
          className="mt-10 border-0 h-px"
          style={{ background: "rgba(31,42,51,0.12)" }}
        />
      );

    default:
      return null;
  }
}

export default function PostBody({
  body,
  accent = COLORS.data,
}: {
  body: Block[];
  accent?: string;
}) {
  return (
    <div>
      {body.map((block, i) => (
        <BlockView key={i} block={block} accent={accent} />
      ))}
    </div>
  );
}
