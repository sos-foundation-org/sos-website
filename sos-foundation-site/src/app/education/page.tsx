import type { Metadata } from "next";
import EducationView from "@/components/education/EducationView";

export const metadata: Metadata = {
  title: "Education",
  description:
    "SOS Education — from classroom curiosity to real contribution. Five tracks connecting students and communities to real research through mentorship, AI skills, and open knowledge tools.",
  alternates: { canonical: "/education" },
  openGraph: {
    title: "SOS Education — From Learning to Real Contribution",
    description:
      "Five tracks connecting students and communities to real research through mentorship, AI skills, and open knowledge tools.",
    type: "website",
    url: "/education",
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
  return <EducationView />;
}
