import type { Metadata } from "next";
import { getAllPosts, getLanguagesInUse } from "@/content/blog";
import BlogIndexView from "@/components/blog/BlogIndexView";
import JsonLd from "@/components/seo/JsonLd";
import { ORG_ID, SITE_NAME, WEBSITE_ID, keywords } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

// Server component: owns metadata + data loading, delegates rendering to the
// client view (which adds the shared framer-motion animations).

const DESCRIPTION =
  "Field notes, project updates, and essays from the Sustainability of Sustainability Foundation (SOS Foundation) on sustainability, biodiversity, bioinspiration, Digital Naturalism, and education — across Meaning, Pattern, and Mechanism.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  keywords: keywords("SOS blog", "field notes", "ant trade", "AI and learning"),
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "SOS Blog — Ideas, in public",
    description: DESCRIPTION,
    type: "website",
    url: "/blog",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [{ url: "/pics/Nature_Salon.jpg", alt: "SOS Blog — Ideas, in public" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOS Blog — Ideas, in public",
    description: DESCRIPTION,
    images: ["/pics/Nature_Salon.jpg"],
  },
};

export default function BlogPage() {
  // Hand over every published post — translations included. The client view
  // collapses each translation group down to the reader's chosen language.
  const posts = getAllPosts();
  const jsonLdBlog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "SOS Blog",
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${p.slug}#article`,
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      inLanguage: p.lang ?? "en",
    })),
  };

  return (
    <>
      <JsonLd data={jsonLdBlog} />
      <BlogIndexView posts={posts} languages={getLanguagesInUse()} />
    </>
  );
}
