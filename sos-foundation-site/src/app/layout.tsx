import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { BASE_KEYWORDS, ORG_NAME, SITE_NAME, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase lets Next resolve relative OG/Twitter image paths (e.g.
  // "/pics/cover.jpg") to absolute URLs so social platforms can scrape them.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sustainability of Sustainability",
    template: "%s — SOS",
  },
  description: "Sustaining humanity's ability to learn from nature — through research, education, and open knowledge infrastructure. A 501(c)(3) nonprofit.",
  applicationName: SITE_NAME,
  keywords: BASE_KEYWORDS,
  authors: [{ name: ORG_NAME, url: SITE_URL }],
  creator: ORG_NAME,
  publisher: ORG_NAME,
  category: "nonprofit",
  alternates: { types: { "text/plain": "/llms.txt" } },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Pages that set their own openGraph replace this object entirely, so they
  // repeat siteName/locale — this default covers pages that don't.
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/pics/Vision_bg.jpg", alt: ORG_NAME }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
