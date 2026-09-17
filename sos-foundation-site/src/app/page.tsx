import type { Metadata } from "next";
import AboutView from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: { absolute: "SOS Foundation — Sustainability of Sustainability" },
  description:
    "SOS Foundation is a 501(c)(3) nonprofit sustaining humanity's ability to learn from nature through research, education, and open knowledge infrastructure.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SOS Foundation — Sustainability of Sustainability",
    description:
      "Sustaining humanity's ability to learn from nature through research, education, and open knowledge infrastructure.",
    type: "website",
    url: "/",
    images: [{ url: "/pics/Vision_bg.jpg", alt: "SOS Foundation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOS Foundation — Sustainability of Sustainability",
    description:
      "Sustaining humanity's ability to learn from nature through research, education, and open knowledge infrastructure.",
    images: ["/pics/Vision_bg.jpg"],
  },
};

export default function HomePage() {
  return <AboutView />;
}
