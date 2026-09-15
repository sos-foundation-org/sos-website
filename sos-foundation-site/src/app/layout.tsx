import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
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
};


const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Sustainability of Sustainability Foundation",
  alternateName: "SOS Foundation",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/SOS-LOGO_v3-icon.svg`,
  sameAs: [
    "https://www.linkedin.com/company/sos-commons/",
    "https://www.instagram.com/sustainability.dialogue/",
    "https://www.facebook.com/profile.php?id=61587085297510",
  ],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SOS Foundation",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
