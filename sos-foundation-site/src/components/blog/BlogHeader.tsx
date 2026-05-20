import { ArrowRight } from "lucide-react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { COLORS } from "@/lib/theme";

// Sticky glass header — mirrors the home page header (same items, social
// icons, CTA) so the site feels unified across pages. From the blog the
// home-section links use `/#anchor` to jump back to the home page.
export default function BlogHeader() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: "rgba(245,247,246,0.72)",
        borderBottom: "1px solid rgba(31,42,51,0.08)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="h-9 w-9 rounded-2xl overflow-hidden hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo/SOS-LOGO_v3-icon.svg"
              alt="SOS Foundation Logo"
              className="h-full w-full object-cover"
            />
          </a>
          <div className="leading-tight">
            <div className="text-m font-semibold" style={{ color: COLORS.ink }}>
              Sustainability of Sustainability
            </div>
            <div className="text-s" style={{ color: "rgba(31,42,51,0.55)" }}>
              Meaning + Pattern + Mechanism → Continuity
            </div>
          </div>
        </div>

        {/* Site-wide nav — mirrors the home page */}
        <nav
          className="hidden md:flex items-center gap-3 text-sm tracking-tight"
          style={{ color: "rgba(31,42,51,0.75)" }}
        >
          <a href="/#meaning" className="text-m hover:opacity-80">Meaning</a>
          <a href="/#pattern" className="text-m hover:opacity-80">Pattern</a>
          <a href="/#mechanism" className="text-m hover:opacity-80">Mechanism</a>
          <a href="/#work" className="text-m hover:opacity-80">Work</a>
          <a href="/research" className="text-m hover:opacity-80">Research</a>
          <a href="/blog" className="text-m font-semibold" style={{ color: COLORS.blue }}>
            Blog
          </a>
          <a href="/#involved" className="text-m hover:opacity-80">Join</a>
        </nav>

        {/* Social icons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.linkedin.com/company/sos-commons/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SOS Foundation on LinkedIn"
            title="LinkedIn"
            className="p-2 rounded-xl transition-opacity hover:opacity-80"
            style={{ color: "#0A66C2" }}
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://www.instagram.com/sustainability.dialogue/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SOS Foundation on Instagram"
            title="Instagram"
            className="p-2 rounded-xl transition-opacity hover:opacity-80"
            style={{ color: "#E1306C" }}
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61587085297510"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SOS Foundation on Facebook"
            title="Facebook"
            className="p-2 rounded-xl transition-opacity hover:opacity-80"
            style={{ color: "#1877F2" }}
          >
            <Facebook size={18} />
          </a>
        </div>

        {/* CTA — mirrors home page "See work" button */}
        <div className="flex items-center gap-2">
          <a
            href="/#work"
            className="inline-flex items-center rounded-2xl px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85"
            style={{ background: COLORS.blue }}
          >
            See work <ArrowRight className="ml-2" size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
