// ─── Site-wide constants ─────────────────────────────────────────────────────

/**
 * Production origin of the site, with NO trailing slash.
 *
 * Used for canonical URLs, social share links, and — importantly — resolving
 * Open Graph / Twitter card images to absolute URLs so that Facebook,
 * LinkedIn, X, etc. can scrape the post's cover image when a link is shared.
 *
 * ⚠️  Set NEXT_PUBLIC_SITE_URL to the real domain (in .env / the host's env
 *     settings). The fallback below is only a placeholder for local dev.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sos-foundation.org"
).replace(/\/+$/, "");
