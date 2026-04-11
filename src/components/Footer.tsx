"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

const SOCIALS = [
  { href: "https://www.instagram.com/lekki.cos/", label: "Instagram", icon: InstagramIcon },
  { href: "https://tiktok.com/@lekkientertainment", label: "TikTok", icon: TikTokIcon },
  { href: "http://youtube.com/@LekkiRoomvybz", label: "YouTube", icon: YoutubeIcon },
  { href: "https://x.com/lekkientertain", label: "X", icon: XIcon },
];

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function useReveal<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return { ref, visible };
}

export default function Footer() {
  const wrap = useReveal<HTMLDivElement>(true);

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/30">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%)] opacity-60" />

      <div
        ref={wrap.ref}
        className={cx(
          "relative mx-auto max-w-6xl px-4 py-12 transition-all duration-700 sm:py-16",
          wrap.visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] px-6 py-10 text-center shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:px-8 lg:text-left">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:gap-16">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">Lekki Entertainment</p>
                <h2 className="mx-auto max-w-xl text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[2rem] lg:mx-0">
                  Refined nights, curated with intention.
                </h2>
                <p className="mx-auto max-w-lg text-sm leading-7 text-white/58 sm:text-[15px] lg:mx-0">
                  Event culture shaped with a cleaner standard for atmosphere, community, and presentation.
                </p>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">Navigation</p>
                <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="u-underline-slide text-sm text-white/65 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">Connect</p>
                <a
                  href="mailto:hello@lekki.ent"
                  className="inline-block text-sm text-white/72 transition hover:text-white"
                >
                  Info@lekki.entertainment.com
                </a>
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  {SOCIALS.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-white/85 transition hover:border-white/20 hover:bg-white/[0.1] hover:text-white"
                    >
                      <Icon className="h-[18px] w-[18px] flex-none transition-transform duration-200 group-hover:scale-105" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.2em] text-white/34 sm:flex-row sm:justify-between sm:text-left">
            <p>Colorado Springs, Denver, Boulder</p>
            <p>Copyright {new Date().getFullYear()} Lekki Entertainment</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

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
