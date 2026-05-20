import { COLORS } from "@/lib/theme";

// Footer — matches the research page footer structure.
export default function BlogFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold" style={{ color: COLORS.bg }}>
            SOS Blog
          </div>
          <div className="mt-1 text-xs" style={{ color: "rgba(245,247,246,0.50)" }}>
            Sustainability of Sustainability Foundation
          </div>
        </div>
        <a
          href="/"
          className="text-xs hover:opacity-80 transition-opacity self-start md:self-auto"
          style={{ color: "rgba(245,247,246,0.50)" }}
        >
          ← Back to SOS Foundation
        </a>
        <div className="text-xs" style={{ color: "rgba(245,247,246,0.40)" }}>
          © {new Date().getFullYear()} SOS Initiative. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
