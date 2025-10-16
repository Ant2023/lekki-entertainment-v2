"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ----------------------------- CONFIG HERE ----------------------------- */
const SOCIALS = [
  { href: "https://www.instagram.com/lekki.cos/", label: "Instagram", icon: InstagramIcon },
  { href: "https://tiktok.com/@lekkientertainment", label: "TikTok", icon: TikTokIcon },
  { href: "http://youtube.com/@LekkiRoomvybz", label: "YouTube", icon: YoutubeIcon },
  { href: "https://x.com/lekkientertain", label: "Twitter / X", icon: XIcon },
];

const QUICK_LINKS = [
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const CONTACT = {
  email: "hello@lekki.ent", // change to your real inbox
  location: "Denver • Dallas • Colorado Springs",
};
/* ---------------------------------------------------------------------- */

/** tiny class joiner (no dependency) */
function cx(...a: (string | false | null | undefined)[]) {
  return a.filter(Boolean).join(" ");
}

/** reveal when in view (respects reduced motion) */
function useReveal<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.disconnect();
          }
        }
      },
      { threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return { ref, visible };
}

export default function Footer() {
  const wrap = useReveal<HTMLDivElement>(true);

  return (
    <footer className="border-t border-white/10 bg-black/40 pt-10">
      {/* content */}
      <div
        ref={wrap.ref}
        className={cx(
          "mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-8 sm:flex-row sm:items-start sm:justify-between",
          "transition-all duration-500",
          wrap.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        {/* Brand blurb */}
        <div className="max-w-sm">
          <div className="text-lg font-extrabold tracking-tight text-white">
            LEKKI <span className="text-lekki-primary">Entertainment</span>
          </div>
          <p className="mt-2 text-sm text-white/70">
            Afrobeats • Amapiano • Lounge vibes — {CONTACT.location}
          </p>

          {/* Socials */}
          <div className="mt-4 flex items-center gap-4">
            {SOCIALS.map(({ href, label, icon: Icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cx(
                  "group inline-flex h-10 w-10 items-center justify-center rounded-full",
                  "bg-white/5 ring-1 ring-white/10 text-white/80",
                  "transition-all duration-200 hover:bg-white/10 hover:text-fuchsia-400 hover:shadow-[0_0_25px_rgba(217,70,239,0.25)]"
                )}
              >
                <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 group-hover:animate-pulse" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="u-underline-slide text-white/70 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div className="text-sm text-white/70">
          <div>
            Email:{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="u-underline-slide text-fuchsia-300 hover:text-fuchsia-200"
            >
              {CONTACT.email}
            </a>
          </div>
          <div className="mt-1">© {new Date().getFullYear()} Lekki Entertainment. All rights reserved.</div>
        </div>
      </div>

      {/* slim bottom bar */}
      <div className="h-px w-full bg-gradient-to-r from-lekki-primary via-fuchsia-500/50 to-lekki-accent/70" />
    </footer>
  );
}

/* ------------------------- Inline SVG icon components ------------------------- */
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.75-3.25a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.75 6.25Z" />
    </svg>
  );
}
function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 3h2.1a5.9 5.9 0 0 0 4 4v2.1a7.94 7.94 0 0 1-4-1.1v6.7A6.7 6.7 0 1 1 9.4 8.2V10a4.6 4.6 0 1 0 3.2 4.4V3Z" />
    </svg>
  );
}
function YoutubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 8.2v7.6c0 1.6-1.3 2.9-2.9 2.9H4.9A2.9 2.9 0 0 1 2 15.8V8.2A2.9 2.9 0 0 1 4.9 5.3h14.2A2.9 2.9 0 0 1 22 8.2ZM10 9.2v5.6l5-2.8-5-2.8Z" />
    </svg>
  );
}
function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M3 3h4.7l4.2 6 4.9-6H21l-7.3 8.9L21 21h-4.7l-4.4-6.2L6.6 21H3l7.6-9.2L3 3Z" />
    </svg>
  );
}
