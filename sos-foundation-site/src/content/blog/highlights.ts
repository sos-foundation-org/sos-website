// ─── Highlighted posts (hero slider) ─────────────────────────────────────────
// The rotating hero at the top of /blog reads from this list. Add the slugs
// of the posts you want to feature, in the order you want them to appear.
//
//   - Empty list → the latest post is shown automatically (no rotation).
//   - 1 slug    → that post is shown as a static hero.
//   - 2+ slugs  → auto-rotating slider with arrows + dots, pause on hover.
//
// Recommended: 2 to 4 highlights at a time. Reorder, swap, or clear out at
// any time — no other files need to change.

export const HIGHLIGHT_SLUGS: string[] = [
  "welcome-to-the-sos-blog",
];

/** How often the slider auto-advances, in milliseconds. */
export const HIGHLIGHT_ROTATION_MS = 6000;
