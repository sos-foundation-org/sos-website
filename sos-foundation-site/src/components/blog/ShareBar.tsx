"use client";

import { useState } from "react";
import { Link2, Check, Facebook, Linkedin, Instagram } from "lucide-react";
import { COLORS } from "@/lib/theme";

// ─── Share buttons ───────────────────────────────────────────────────────────
// Copy link + share to Facebook / X / LinkedIn / Instagram. Facebook, X and
// LinkedIn open their official share intents in a popup; Instagram has no web
// share URL, so it copies the link (paste it into a story/post/DM).

// X (Twitter) has no current lucide icon — inline the brand glyph.
function XGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function popup(url: string) {
  window.open(url, "_blank", "noopener,noreferrer,width=600,height=560");
}

export default function ShareBar({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  // Transient confirmation message after a copy action.
  const [notice, setNotice] = useState<string | null>(null);

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2400);
  }

  async function copy(message: string) {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers / non-secure contexts.
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    flash(message);
  }

  const e = encodeURIComponent;
  const buttons = [
    {
      key: "copy",
      label: "Copy link",
      brand: COLORS.blue,
      icon: notice ? <Check size={18} /> : <Link2 size={18} />,
      onClick: () => copy("Link copied to clipboard"),
    },
    {
      key: "facebook",
      label: "Share on Facebook",
      brand: "#1877F2",
      icon: <Facebook size={18} />,
      onClick: () => popup(`https://www.facebook.com/sharer/sharer.php?u=${e(url)}`),
    },
    {
      key: "x",
      label: "Share on X",
      brand: "#FFFFFF",
      icon: <XGlyph size={16} />,
      onClick: () => popup(`https://twitter.com/intent/tweet?url=${e(url)}&text=${e(title)}`),
    },
    {
      key: "linkedin",
      label: "Share on LinkedIn",
      brand: "#0A66C2",
      icon: <Linkedin size={18} />,
      onClick: () => popup(`https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`),
    },
    {
      key: "instagram",
      label: "Copy link for Instagram",
      brand: "#E1306C",
      icon: <Instagram size={18} />,
      onClick: () => copy("Link copied — paste it into Instagram to share"),
    },
  ];

  return (
    <div
      className="rounded-3xl border p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        background: "rgba(31,42,51,0.92)",
      }}
    >
      <div className="flex-1">
        <div className="text-sm font-semibold text-white">Share this post</div>
        <div className="mt-0.5 text-xs h-4" style={{ color: notice ? COLORS.data : "rgba(255,255,255,0.45)" }}>
          {notice ?? "Copy the link or send it straight to social media."}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {buttons.map((b) => (
          <button
            key={b.key}
            type="button"
            onClick={b.onClick}
            aria-label={b.label}
            title={b.label}
            className="group h-10 w-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.75)",
            }}
            onMouseEnter={(ev) => {
              ev.currentTarget.style.color = b.brand;
              ev.currentTarget.style.borderColor = b.brand;
            }}
            onMouseLeave={(ev) => {
              ev.currentTarget.style.color = "rgba(255,255,255,0.75)";
              ev.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            {b.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
