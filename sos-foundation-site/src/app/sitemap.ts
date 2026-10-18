import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllPosts, getPostLang, getTranslations } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    // hreflang alternates, so each language version is indexed as a translation.
    alternates: {
      languages: Object.fromEntries(
        getTranslations(post).map((t) => [getPostLang(t), `${SITE_URL}/blog/${t.slug}`]),
      ),
    },
  }));

  const latestPost = getAllPosts()[0]?.date;
  const blogUpdated = latestPost ? new Date(latestPost) : new Date();

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/research`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/education`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: blogUpdated, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/donate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...posts,
  ];
}
