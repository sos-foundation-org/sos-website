import type { LangCode } from "./types";

// ─── Blog languages ──────────────────────────────────────────────────────────
// The registry of languages the blog can be read in. Same pattern as
// categories.ts and authors.ts: this is DATA, so adding a language never means
// touching a type or a component.
//
// To add one (say Traditional Chinese or Japanese):
//
//   1. Append an entry to LANGUAGES below.
//   2. Write the post file with `lang: "zh-Hant"` and
//      `translationOf: "<the-original-slug>"`.
//
// That's it — the toggle on the article page, the index switcher, and the
// `lang` attribute on the rendered article all pick it up automatically.

export type Language = {
  /** BCP-47 code. Must be unique. Used in Post.lang. */
  code: LangCode;
  /** Short label for the toggle button — keep it 2–4 characters. */
  label: string;
  /** Full name, used for tooltips and accessible labels. */
  name: string;
};

/**
 * The site's original language: what a post is assumed to be written in when
 * it declares no `lang`, and the fallback shown when a post has not been
 * translated into the language the reader picked.
 *
 * Changing this re-labels existing untagged posts, so if the Foundation ever
 * switches its primary language, tag the old posts explicitly first.
 */
export const DEFAULT_LANG: LangCode = "en";

/** Order here is the order the toggle renders them in. */
export const LANGUAGES: Language[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "zh-Hans", label: "简体", name: "简体中文 (Simplified Chinese)" },
  // { code: "zh-Hant", label: "繁體", name: "繁體中文 (Traditional Chinese)" },
  // { code: "ja",      label: "日本語", name: "日本語 (Japanese)" },
  // ↑ uncomment / append as the blog grows into more languages
];

const BY_CODE: Record<string, Language> = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l]),
);

/**
 * Look up a language. Unknown codes degrade gracefully into a usable label
 * rather than throwing, so a typo in a post file never breaks the build.
 */
export function getLanguage(code: LangCode): Language {
  return BY_CODE[code] ?? { code, label: code.toUpperCase(), name: code };
}

/** Sort codes into LANGUAGES order, so toggles are always consistent. */
export function sortByLanguageOrder<T>(
  items: T[],
  codeOf: (item: T) => LangCode,
): T[] {
  const order = new Map(LANGUAGES.map((l, i) => [l.code, i]));
  return [...items].sort(
    (a, b) =>
      (order.get(codeOf(a)) ?? Number.MAX_SAFE_INTEGER) -
      (order.get(codeOf(b)) ?? Number.MAX_SAFE_INTEGER),
  );
}
