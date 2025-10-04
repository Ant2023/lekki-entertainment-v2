"use client";
import Link from "next/link";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-lekki-panel/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-2 group">
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
          <span className="text-sm sm:text-base font-extrabold tracking-tight text-lekki-text">
            LEKKI{" "}
            <span className="text-lekki-primary group-hover:text-lekki-accent transition-colors duration-200">
              Entertainment
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`u-underline-slide transition ${
                pathname === l.href
                  ? "text-lekki-primary font-semibold"
                  : "text-lekki-subtext hover:text-lekki-accent"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Glow Button */}
          <Link
            href="#subscribe"
            className="u-hover-lift rounded-full bg-lekki-primary px-4 py-2 text-white text-sm font-semibold shadow-md transition-all duration-200 hover:bg-lekki-accent hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]"
          >
            Get Updates
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 transition"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 text-lekki-text"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-lekki-panel/90 backdrop-blur-md">
          <div className="flex flex-col gap-2 px-4 py-3 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 transition u-underline-slide ${
                  pathname === l.href
                    ? "text-lekki-primary font-semibold bg-white/5"
                    : "text-lekki-subtext hover:bg-white/5 hover:text-lekki-accent"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#subscribe"
              onClick={() => setOpen(false)}
              className="u-hover-lift rounded-md bg-lekki-primary px-3 py-2 text-center font-medium text-white hover:bg-lekki-accent transition-all duration-200"
            >
              Get Updates
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
