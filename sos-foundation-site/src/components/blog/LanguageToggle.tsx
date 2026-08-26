import { COLORS } from "@/lib/theme";
import type { Language } from "@/content/blog/languages";
import type { LangCode } from "@/content/blog/types";

// ─── Language toggle ─────────────────────────────────────────────────────────
// One segmented control, two modes:
//
//   • `onSelect`  — switches language in place (blog index; client state).
//   • `hrefFor`   — renders links (article page; each language is its own URL,
//                   which keeps translations separately shareable + indexable).
//
// Options come from the language registry, so this never needs editing when a
// language is added. Renders nothing when there is only one language to offer.

export default function LanguageToggle({
  languages,
  active,
  onSelect,
  hrefFor,
  accent = COLORS.data,
  size = "md",
}: {
  languages: Language[];
  active: LangCode;
  onSelect?: (code: LangCode) => void;
  hrefFor?: (code: LangCode) => string | undefined;
  accent?: string;
  size?: "sm" | "md";
}) {
  if (languages.length < 2) return null;

  const pad = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs";

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border p-1"
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)",
      }}
      role="group"
      aria-label="Choose a language"
    >
      {languages.map((lang) => {
        const isActive = lang.code === active;
        const style = isActive
          ? { background: accent, color: "#FFFFFF" }
          : { color: "rgba(255,255,255,0.55)" };
        const className = `rounded-full font-medium transition-all ${pad} ${
          isActive ? "" : "hover:text-white hover:bg-white/5"
        }`;

        // Link mode: a language with no translation yet has no URL to go to,
        // so it renders as a disabled-looking span instead of a dead link.
        if (hrefFor) {
          const href = hrefFor(lang.code);
          if (!href) {
            return (
              <span
                key={lang.code}
                className={`rounded-full font-medium ${pad} cursor-not-allowed`}
                style={{ color: "rgba(255,255,255,0.22)" }}
                title={`Not available in ${lang.name} yet`}
              >
                {lang.label}
              </span>
            );
          }
          return (
            <a
              key={lang.code}
              href={href}
              className={className}
              style={style}
              title={lang.name}
              aria-current={isActive ? "true" : undefined}
            >
              {lang.label}
            </a>
          );
        }

        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => onSelect?.(lang.code)}
            className={`${className} cursor-pointer`}
            style={style}
            title={lang.name}
            aria-pressed={isActive}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
