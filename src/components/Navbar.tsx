"use client";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const menuId = useId();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll progress (0..100)
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-lekki-panel/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo + Title */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative inline-grid place-items-center transition-transform duration-200 group-hover:scale-105">
            <div className="absolute -inset-3 rounded-full bg-lekki-primary/20 blur-xl transition group-hover:bg-lekki-accent/30" />
            <Image
              src="/images/logo-lekki.png"
              alt="LEKKI Entertainment"
              width={56}
              height={36}
              className="relative rounded-full ring-1 ring-white/10"
            />
          </div>
          <span className="text-sm font-extrabold tracking-tight text-lekki-text sm:text-base">
            LEKKI{" "}
            <span className="text-lekki-primary transition-colors duration-200 group-hover:text-lekki-accent">
              Entertainment
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`u-underline-slide relative transition ${
                  active ? "font-semibold text-lekki-primary" : "text-lekki-subtext hover:text-lekki-accent"
                }`}
              >
                {l.label}
                {/* Active underline indicator */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-lekki-primary transition-transform duration-200 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="#subscribe"
            className="u-hover-lift rounded-full bg-lekki-primary px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-lekki-accent hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]"
          >
            Get Updates
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen((x) => !x)}
          className="inline-flex items-center justify-center rounded-md p-2 transition hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls={menuId}
        >
          <svg className="h-6 w-6 text-lekki-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Scroll progress bar */}
      <div className="relative h-[2px] w-full bg-transparent">
        <div
          className="h-[2px] bg-gradient-to-r from-lekki-primary via-fuchsia-500 to-lekki-accent transition-[width]"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      </div>

      {/* Click-away overlay (mobile only) */}
      {open && (
        <button
          aria-hidden
          className="fixed inset-0 z-40 block bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Dropdown Menu (animated) */}
      <div
        id={menuId}
        className={[
          "md:hidden border-t border-zinc-800 bg-lekki-panel/90 backdrop-blur-md",
          "overflow-hidden transition-all duration-300 ease-out",
          open ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="z-50 flex flex-col gap-2 px-4 py-3 text-sm">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`u-underline-slide relative rounded-md px-3 py-2 transition ${
                  active
                    ? "bg-white/5 font-semibold text-lekki-primary"
                    : "text-lekki-subtext hover:bg-white/5 hover:text-lekki-accent"
                }`}
              >
                {l.label}
                {/* Active underline indicator */}
                <span
                  className={`absolute -bottom-1 left-3 h-[2px] bg-lekki-primary transition-transform duration-200 ${
                    active ? "w-2/3" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="#subscribe"
            className="u-hover-lift rounded-md bg-lekki-primary px-3 py-2 text-center font-medium text-white transition-all duration-200 hover:bg-lekki-accent"
          >
            Get Updates
          </Link>
        </div>
      </div>
    </header>
  );
}
