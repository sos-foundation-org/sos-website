import { COLORS } from "@/lib/theme";

// ─── Blog categories ─────────────────────────────────────────────────────────
// The curated, designed-in-advance set of classification tags. Posts reference
// these by `id` in their `tags` field. To add a category later, append an entry
// here — order in this array is the order it appears in the filter bar.

export type Category = {
  /** Stable id used in Post.tags. */
  id: string;
  /** Display label. */
  label: string;
  /** Accent color (from the shared theme). */
  color: string;
  /** One-line description (used as a tooltip / for future category pages). */
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "announcements",
    label: "Announcements",
    color: COLORS.gold,
    description: "News and updates from the Foundation.",
  },
  {
    id: "field-notes",
    label: "Field Notes",
    color: COLORS.green,
    description: "Notes from research, fieldwork, and the lab.",
  },
  {
    id: "meaning",
    label: "Meaning",
    color: COLORS.art,
    description: "Art, design, and cultural language for sustainability.",
  },
  {
    id: "pattern",
    label: "Pattern",
    color: COLORS.data,
    description: "Digitization and the natural patterns we make computable.",
  },
  {
    id: "mechanism",
    label: "Mechanism",
    color: COLORS.mech,
    description: "Economic mechanisms and self-sustaining systems.",
  },
  {
    id: "research",
    label: "Research",
    color: COLORS.blue,
    description: "Science, methods, and findings from the Research Unit.",
  },
  {
    id: "education",
    label: "Education",
    color: COLORS.green,
    description: "Outreach, teaching, and public programs.",
  },
];

const BY_ID: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
);

/** Look up a category; unknown ids fall back to a neutral chip. */
export function getCategory(id: string): Category {
  return (
    BY_ID[id] ?? {
      id,
      label: id,
      color: COLORS.data,
      description: "",
    }
  );
}
