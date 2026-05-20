import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getAuthor,
  getPostBySlug,
  getRelatedPosts,
} from "@/content/blog";
import BlogPostView from "@/components/blog/BlogPostView";

type Params = { params: Promise<{ slug: string }> };

// Pre-render every post at build time.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Per-post <title> and description / Open Graph.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
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

  return (
    <BlogPostView
      post={post}
      author={getAuthor(post.authorId)}
      related={getRelatedPosts(slug, 3)}
    />
  );
}
