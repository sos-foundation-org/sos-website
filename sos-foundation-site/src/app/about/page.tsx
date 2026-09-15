import type { Metadata } from "next";
import AboutView from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "About SOS Foundation — a 501(c)(3) nonprofit sustaining humanity's ability to learn from nature through research, education, and open knowledge infrastructure.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About SOS Foundation",
    description:
      "Sustaining humanity's ability to learn from nature through research, education, and open knowledge infrastructure.",
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SOS Foundation",
    description:
      "Sustaining humanity's ability to learn from nature through research, education, and open knowledge infrastructure.",
  },
};

export default function AboutPage() {
  return <AboutView />;
}
