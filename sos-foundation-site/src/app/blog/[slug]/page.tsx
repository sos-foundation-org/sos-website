import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getAuthor,
  getCategory,
  getPostBySlug,
  getPostLang,
  getRelatedPosts,
  getTranslations,
  localizeAuthor,
} from "@/content/blog";
import { SITE_URL } from "@/lib/site";
import { ORG_ID, SITE_NAME, absoluteUrl, breadcrumbJsonLd, keywords, ogLocale, postPlainText } from "@/lib/seo";
import type { Post } from "@/content/blog";
import BlogPostView from "@/components/blog/BlogPostView";
import JsonLd from "@/components/seo/JsonLd";

/** Category labels for a post — reused as meta keywords and schema keywords. */
function postKeywords(post: Post): string[] {
  return (post.tags ?? []).map((t) => getCategory(t).label);
}

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
    keywords: keywords(...postKeywords(post)),
    authors: [{ name: getAuthor(post.authorId).name }],
    alternates: { canonical: url, languages },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      siteName: SITE_NAME,
      locale: ogLocale(getPostLang(post)),
      alternateLocale: getTranslations(post).filter((t) => t.slug !== post.slug).map((t) => ogLocale(getPostLang(t))),
      publishedTime: post.date,
      authors: [getAuthor(post.authorId).name],
      tags: postKeywords(post),
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

  const url = `${SITE_URL}/blog/${post.slug}`;
  const lang = getPostLang(post);
  const original = post.translationOf ? getPostBySlug(post.translationOf) : undefined;
  // Org-authored posts credit the Organization entity itself, not a "Person".
  const authorLd =
    post.authorId === "sos-foundation"
      ? { "@id": ORG_ID }
      : {
          "@type": "Person",
          name: author.name,
          jobTitle: author.role,
          ...(author.links?.[0] ? { url: absoluteUrl(author.links[0].href) } : {}),
          worksFor: { "@id": ORG_ID },
        };

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    inLanguage: lang,
    author: authorLd,
    datePublished: post.date,
    dateModified: post.date,
    image: absoluteUrl(post.cover),
    keywords: postKeywords(post).join(", "),
    articleSection: postKeywords(post)[0],
    articleBody: postPlainText(post),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, name: "SOS Blog" },
    publisher: { "@id": ORG_ID },
    ...(original ? { translationOfWork: { "@id": `${SITE_URL}/blog/${original.slug}#article` } } : {}),
    ...(!post.translationOf
      ? {
          workTranslation: getTranslations(post)
            .filter((t) => t.slug !== post.slug)
            .map((t) => ({ "@id": `${SITE_URL}/blog/${t.slug}#article` })),
        }
      : {}),
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLdArticle,
          breadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "Blog", url: `${SITE_URL}/blog` },
            { name: post.title, url },
          ]),
        ]}
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
