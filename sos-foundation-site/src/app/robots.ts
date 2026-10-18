import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AI search and assistant crawlers are welcomed explicitly: SOS wants its
// research, education, and blog content to be found and cited by AI answers.
// /_next/ is NOT disallowed — crawlers that render pages need the JS/CSS.
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / AI Overviews, Apple Intelligence, others
  "Google-Extended",
  "Applebot-Extended",
  "Applebot",
  "Bingbot",
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "MistralAI-User",
  "cohere-ai",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
