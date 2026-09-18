"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Instagram, Facebook } from "lucide-react";

const COLORS = {
  ink: "#1F2A33",
  bg: "#F5F7F6",
  blue: "#2F5D8A",
  green: "#3F8F6B",
  gold: "#E0B63E",
  art: "#5FA58B",
  data: "#2E9C9A",
  mech: "#C9A23A",
};

const NAV_LINKS = [
  { label: "About", href: "/" },
  { label: "Meaning", href: "/#about-meaning" },
  { label: "Pattern", href: "/#about-pattern" },
  { label: "Mechanism", href: "/#about-mechanism" },
  { label: "Work", href: "/#about-work" },
  { label: "Research", href: "/research" },
  { label: "Education", href: "/education" },
  { label: "Blog", href: "/blog" },
  { label: "Join", href: "/#about-involved" },
  { label: "Support", href: "/donate" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/sos-commons/", icon: Linkedin, color: "#0A66C2" },
  { label: "Instagram", href: "https://www.instagram.com/sustainability.dialogue/", icon: Instagram, color: "#E1306C" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61587085297510", icon: Facebook, color: "#1877F2" },
];

/**
 * Mobile navigation drawer — shown only below md breakpoint.
 * Include this in every page header alongside the desktop nav.
 *
 * Usage:
 *   <MobileNav currentPage="/about" />
 *
 * currentPage highlights the matching nav link.
 */
export default function MobileNav({ currentPage }: { currentPage?: string }) {
  const [open, setOpen] = useState(false);
  // The drawer is portaled to <body>: the headers use backdrop-filter, which
  // makes them the containing block for `position: fixed` children and would
  // clip the full-screen drawer to the header's ~64px height.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  // Close on route change (hash navigation)
  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative z-[60] p-2 rounded-xl transition-opacity hover:opacity-80"
        style={{ color: COLORS.ink }}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Overlay + drawer */}
      {mounted && createPortal(
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 z-[56] h-full w-72 overflow-y-auto"
              style={{ background: "#0a1e2e" }}
            >
              {/* Close button area */}
              <div className="flex justify-end p-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-xl text-white/60 hover:text-white transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav links */}
              <div className="px-6 pb-6 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = currentPage === link.href || currentPage === link.label.toLowerCase();
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-medium transition-colors"
                      style={{
                        color: isActive ? COLORS.gold : "rgba(245,247,246,0.8)",
                        background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                      }}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="mx-6 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

              {/* Social icons */}
              <div className="px-6 py-5 flex items-center gap-4">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-2 rounded-xl transition-opacity hover:opacity-80"
                    style={{ color: s.color }}
                  >
                    <s.icon size={20} />
                  </a>
                ))}
              </div>

              {/* Footer info */}
              <div className="px-6 pb-8">
                <div className="text-[10px] leading-relaxed" style={{ color: "rgba(245,247,246,0.25)" }}>
                  Sustainability of Sustainability Foundation &middot; 501(c)(3) Public Charity &middot; EIN 41-3097632 &middot; Since 2025
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>,
      document.body
      )}
    </div>
  );
}
