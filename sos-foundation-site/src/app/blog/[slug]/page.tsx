import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getAuthor,
  getPostBySlug,
  getPostLang,
  getRelatedPosts,
  getTranslations,
  localizeAuthor,
} from "@/content/blog";
import { SITE_URL } from "@/lib/site";
import BlogPostView from "@/components/blog/BlogPostView";

type Params = { params: Promise<{ slug: string }> };

// Pre-render every post at build time — each translation is its own page, so
// every language version gets a real, shareable, indexable URL.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Per-post <title> and description / Open Graph.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const url = `/blog/${post.slug}`;

  // Tell search engines these URLs are translations of each other, so they
  // serve the right language instead of treating them as duplicate content.
  const languages = Object.fromEntries(
    getTranslations(post).map((t) => [getPostLang(t), `/blog/${t.slug}`]),
  );

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url, languages },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      locale: getPostLang(post),
      publishedTime: post.date,
      // Resolved to an absolute URL via metadataBase so platforms can scrape it.
      images: [{ url: post.cover, alt: post.coverAlt ?? post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthor(post.authorId);

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: author.name },
    datePublished: post.date,
    dateModified: post.date,
    image: `${SITE_URL}${post.cover}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "SOS Foundation",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo/SOS-LOGO_v3-icon.svg`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <BlogPostView
        post={post}
        author={localizeAuthor(author, getPostLang(post))}
        related={getRelatedPosts(slug, 3, getPostLang(post))}
        translations={getTranslations(post)}
      />
    </>
  );
}
