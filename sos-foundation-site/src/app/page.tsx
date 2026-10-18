import type { Metadata } from "next";
import AboutView from "@/components/about/AboutView";
import JsonLd from "@/components/seo/JsonLd";
import { ORG_ID, SITE_NAME, eventsJsonLd, faqJsonLd, keywords, webPageJsonLd } from "@/lib/seo";

const TITLE = "SOS Foundation — Sustainability of Sustainability";
const DESCRIPTION =
  "The Sustainability of Sustainability Foundation (SOS Foundation) is a 501(c)(3) nonprofit sustaining humanity's ability to learn from nature through research, education, bioinspiration, Nature Salon, and Digital Naturalism.";
const SHORT =
  "Sustaining humanity's ability to learn from nature through research, education, and open knowledge infrastructure.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: keywords("nonprofit", "Meaning Pattern Mechanism", "Internet of Bioinspiration", "Map of the Unknown", "nature digitization", "Ecotone", "兼容並續", "interdisciplinary sustainability forum"),
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: SHORT,
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [{ url: "/pics/Vision_bg.jpg", alt: "SOS Foundation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHORT,
    images: ["/pics/Vision_bg.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ path: "/", name: TITLE, description: DESCRIPTION, type: "AboutPage", about: { "@id": ORG_ID } }),
          faqJsonLd(),
          ...eventsJsonLd(),
        ]}
      />
      <AboutView />
    </>
  );
}
