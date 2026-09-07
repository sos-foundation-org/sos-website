import type { Metadata } from "next";
import ResearchView from "@/components/research/ResearchView";

export const metadata: Metadata = {
  title: "Research Unit",
  description:
    "The SOS Research Unit, co-directed by Cong Liu and Wei-Ping Chan, translates nature into adaptive futures through ecology, evolutionary biology, data science, and AI.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "SOS Research Unit — Translating Nature into Adaptive Futures",
    description:
      "Co-directed by Cong Liu & Wei-Ping Chan — bridging natural history and computational innovation.",
    type: "website",
    url: "/research",
    images: [{ url: "/pics/mountains.jpg", alt: "SOS Research Unit — mountain field sites" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOS Research Unit — Translating Nature into Adaptive Futures",
    description:
      "Co-directed by Cong Liu & Wei-Ping Chan — bridging natural history and computational innovation.",
    images: ["/pics/mountains.jpg"],
  },
};

export default function ResearchPage() {
  return <ResearchView />;
}
