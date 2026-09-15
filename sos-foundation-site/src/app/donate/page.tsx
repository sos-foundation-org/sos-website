import type { Metadata } from "next";
import DonateView from "@/components/donate/DonateView";

export const metadata: Metadata = {
  title: "Support SOS Foundation",
  description:
    "Support the SOS Foundation — a 501(c)(3) nonprofit sustaining humanity's ability to learn from nature. Every contribution helps fund research, education, and open data infrastructure.",
  alternates: { canonical: "/donate" },
  openGraph: {
    title: "Support SOS Foundation",
    description:
      "Every contribution helps sustain humanity's ability to learn from nature.",
    type: "website",
    url: "/donate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support SOS Foundation",
    description:
      "Every contribution helps sustain humanity's ability to learn from nature.",
  },
};

export default function DonatePage() {
  return <DonateView />;
}
