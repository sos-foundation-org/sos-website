import type { Metadata } from "next";
import EducationView from "@/components/education/EducationView";
import JsonLd from "@/components/seo/JsonLd";
import { ORG_ID, SITE_NAME, keywords, webPageJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "SOS Education, the sustainability education program of the SOS Foundation, takes students from classroom curiosity to real contribution through five tracks — Community & Communication, AI Skills, Digitize Nature, Mentored Research, and Real Contributions — and the Digital Naturalism program.";

export const metadata: Metadata = {
  title: "Education",
  description: DESCRIPTION,
  keywords: keywords("SOS Education", "science education", "AI skills", "mentored research", "digitize nature", "Darwin", "Wallace", "E. O. Wilson", "naturalist education"),
  alternates: { canonical: "/education" },
  openGraph: {
    title: "SOS Education — From Learning to Real Contribution",
    description:
      "Five tracks connecting students and communities to real research through mentorship, AI skills, and open knowledge tools.",
    type: "website",
    url: "/education",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [{ url: "/pics/edu_01.jpg", alt: "SOS Education" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOS Education — From Learning to Real Contribution",
    description:
      "Five tracks connecting students and communities to real research through mentorship, AI skills, and open knowledge tools.",
    images: ["/pics/edu_01.jpg"],
  },
};

export default function EducationPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/education",
            name: "SOS Education",
            description: DESCRIPTION,
            about: { "@id": `${SITE_URL}/education#sos-education` },
          }),
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "@id": `${SITE_URL}/education#sos-education`,
            name: "SOS Education",
            url: `${SITE_URL}/education`,
            slogan: "Education should not end with learning. It should lead to real contributions.",
            description: DESCRIPTION,
            parentOrganization: { "@id": ORG_ID },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "SOS Education tracks",
              itemListElement: [
                "Community & Communication",
                "AI Skills",
                "Digitize Nature",
                "Mentored Research",
                "Real Contributions",
              ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "EducationalOccupationalProgram", name, provider: { "@id": ORG_ID } } })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Course",
            "@id": `${SITE_URL}/education#digital-naturalism`,
            name: "Digital Naturalism",
            url: "https://www.digital-naturalism.com/",
            description:
              "Digital Naturalism is an SOS Education program that brings the age of exploration to life by following naturalists Charles Darwin, Alfred Russel Wallace, and Edward O. Wilson, then has students use modern tools to revisit their traces and digitize nature.",
            provider: { "@id": ORG_ID },
            about: ["Natural history", "Biodiversity", "Nature digitization", "Charles Darwin", "Alfred Russel Wallace", "Edward O. Wilson"],
          },
        ]}
      />
      <EducationView />
    </>
  );
}
