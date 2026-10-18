import type { Metadata } from "next";
import DonateView from "@/components/donate/DonateView";
import JsonLd from "@/components/seo/JsonLd";
import { ORG_ID, SITE_NAME, keywords, webPageJsonLd } from "@/lib/seo";

const DESCRIPTION =
  "Support the Sustainability of Sustainability Foundation (SOS Foundation), a 501(c)(3) nonprofit (EIN 41-3097632) sustaining humanity's ability to learn from nature. Donations fund research, sustainability education, and open data infrastructure.";

export const metadata: Metadata = {
  title: "Support SOS Foundation",
  description: DESCRIPTION,
  keywords: keywords("donate", "tax-deductible donation", "support biodiversity research"),
  alternates: { canonical: "/donate" },
  openGraph: {
    title: "Support SOS Foundation",
    description:
      "Every contribution helps sustain humanity's ability to learn from nature.",
    type: "website",
    url: "/donate",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support SOS Foundation",
    description:
      "Every contribution helps sustain humanity's ability to learn from nature.",
  },
};

export default function DonatePage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: "/donate",
          name: "Support SOS Foundation",
          description: DESCRIPTION,
          about: { "@id": ORG_ID },
        })}
      />
      <DonateView />
    </>
  );
}
