import type { Metadata } from "next";
import HomeView from "@/components/home/HomeView";

export const metadata: Metadata = {
  title: { absolute: "SOS Foundation — Sustainability of Sustainability" },
  description:
    "SOS Foundation connects Meaning, Pattern, and Mechanism to build continuity where sustainability sustains itself. Core projects: MDT, IoBI, SOS Education.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SOS Foundation — Sustainability of Sustainability",
    description:
      "Building continuity where sustainability sustains itself.",
    type: "website",
    url: "/",
    images: [{ url: "/pics/Vision_bg.jpg", alt: "SOS Foundation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOS Foundation — Sustainability of Sustainability",
    description:
      "Building continuity where sustainability sustains itself.",
    images: ["/pics/Vision_bg.jpg"],
  },
};

export default function HomePage() {
  return <HomeView />;
}
