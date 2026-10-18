import type { Metadata } from "next";
import ResearchView from "@/components/research/ResearchView";
import JsonLd from "@/components/seo/JsonLd";
import { ORG_ID, PERSON_REFS, SITE_NAME, keywords, webPageJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "The SOS Research Unit of the Sustainability of Sustainability Foundation, co-directed by Cong Liu and Wei-Ping Chan, translates nature into adaptive futures through ecology, evolutionary biology, biodiversity informatics, bioinspiration, data science, and AI.";

export const metadata: Metadata = {
  title: "Research Unit",
  description: DESCRIPTION,
  keywords: keywords("SOS Research Unit", "Internet of Bioinspiration", "IoBI", "Mountain Digital Twins", "Map of the Unknown", "nature digitization", "biodiversity informatics", "climate change biology", "Cong Liu", "Wei-Ping Chan"),
  alternates: { canonical: "/research" },
  openGraph: {
    title: "SOS Research Unit — Translating Nature into Adaptive Futures",
    description:
      "Co-directed by Cong Liu & Wei-Ping Chan — bridging natural history and computational innovation.",
    type: "website",
    url: "/research",
    siteName: SITE_NAME,
    locale: "en_US",
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
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/research",
            name: "SOS Research Unit",
            description: DESCRIPTION,
            about: { "@id": `${SITE_URL}/research#research-unit` },
          }),
          {
            "@context": "https://schema.org",
            "@type": "ResearchOrganization",
            "@id": `${SITE_URL}/research#research-unit`,
            name: "SOS Research Unit",
            url: `${SITE_URL}/research`,
            description: DESCRIPTION,
            parentOrganization: { "@id": ORG_ID },
            member: [PERSON_REFS.congLiu, PERSON_REFS.weiPingChan],
            knowsAbout: [
              "Nature digitization",
              "Bioinspiration",
              "Biodiversity informatics",
              "Climate change biology",
              "Conservation genomics",
              "Evolutionary morphology",
              "Machine learning for ecology",
            ],
            owns: [
              { "@type": "ResearchProject", name: "Internet of Bioinspiration (IoBI)", description: "Pipelines that translate natural systems into structured, computationally accessible data — large-scale digitization, imaging and spectral acquisition, and machine learning — supporting the discovery and prototyping of bioinspired materials and structures." },
              { "@type": "ResearchProject", name: "Mountain Digital Twins (MDT)", description: "A flagship SOS project creating integrated, multi-layer representations of mountain ecosystems by linking biotic and abiotic data, for long-term monitoring, research, and conservation." },
              { "@type": "WebApplication", name: "Map of the Unknown", alternateName: "Discovery Commons", url: "https://discovery-commons.vercel.app/", applicationCategory: "ResearchApplication", description: "An open research platform operated by the SOS Foundation: a shared map of what we do not yet understand, where a thoughtful question earns the same credit as a published result." },
            ],
          },
        ]}
      />
      <ResearchView />
    </>
  );
}
