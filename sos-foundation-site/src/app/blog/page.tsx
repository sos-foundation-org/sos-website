import type { Metadata } from "next";
import { getAllPosts } from "@/content/blog";
import BlogIndexView from "@/components/blog/BlogIndexView";

// Server component: owns metadata + data loading, delegates rendering to the
// client view (which adds the shared framer-motion animations).

const DESCRIPTION =
  "Field notes, project updates, and essays from the SOS Foundation — across Meaning, Pattern, and Mechanism.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "SOS Blog — Ideas, in public",
    description: DESCRIPTION,
    type: "website",
    url: "/blog",
    images: [{ url: "/pics/Nature_Salon.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOS Blog — Ideas, in public",
    description: DESCRIPTION,
    images: ["/pics/Nature_Salon.jpg"],
  },
};

export default function BlogPage() {
  return <BlogIndexView posts={getAllPosts()} />;
}
