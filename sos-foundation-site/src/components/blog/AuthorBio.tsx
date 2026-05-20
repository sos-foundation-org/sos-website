import { ExternalLink } from "lucide-react";
import { COLORS } from "@/lib/theme";
import type { Author } from "@/content/blog/types";

// End-of-post author card: avatar, name, role, signature bio, and links.
export default function AuthorBio({
  author,
  accent = COLORS.data,
}: {
  author: Author;
  accent?: string;
}) {
  return (
    <div
      className="rounded-3xl border p-6 md:p-8 flex flex-col sm:flex-row gap-5"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        background: "rgba(31,42,51,0.92)",
      }}
    >
      {/* Avatar */}
      <div
        className="h-16 w-16 rounded-full overflow-hidden shrink-0 ring-2"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <img
          src={author.avatar}
          alt={author.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Identity + signature bio */}
      <div className="flex-1">
        <div
          className="text-[10px] font-medium tracking-wide uppercase"
          style={{ color: accent }}
        >
          Written by
        </div>
        <div className="mt-1 text-lg font-semibold text-white">{author.name}</div>
        <div className="text-xs text-white/50">{author.role}</div>

        <p className="mt-3 text-sm leading-relaxed text-white/65">{author.bio}</p>

        {author.links && author.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {author.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-white/70 transition-opacity hover:opacity-80"
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {link.label}
                {link.href.startsWith("http") && <ExternalLink size={11} />}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
