"use client";

import Image from "next/image";
import Link from "next/link";

// If you're using the App Router, place this file at: app/about/page.tsx
// If you're on Pages Router, use: pages/about.tsx


export default function AboutPage() {
  const highlights = [
    {
      title: "Culture",
      desc: "Rooted in Afro excellence and global fusion.",
    },
    { title: "Vibe", desc: "Every night, every sound — crafted with soul." },
    {
      title: "Connection",
      desc: "Spaces where people meet, dance, and belong.",
    },
  ];

  const stats = [
    { label: "Cities", value: "2+" },
    { label: "Shows", value: "40+" },
    { label: "Guests Hosted", value: "10K+" },
  ];

  const socials = [
    { label: "Instagram", href: "https://instagram.com/lekkientertainment" },
    { label: "TikTok", href: "https://tiktok.com/@lekkientertainment" },
    { label: "Email", href: "mailto:info@lekkientertainment.com" },
  ];

  return (
    <main className="bg-black text-white">
      {/* ===== HERO ===== */}
      <section className="relative h-[68vh] min-h-[520px] w-full overflow-hidden">
        {/* Video Background (optional). Drop a file at /public/video/lekki-hero.mp4 */}
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60 hidden sm:block"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-dj.jpg"
        >
          <source src="/video/lekki-hero.mp4" type="video/mp4" />
        </video>

        {/* Fallback Image for mobile / no video */}
        <Image
          src="/images/hero-dj.jpg"
          alt="Lekki Entertainment — Nightlife energy"
          fill
          priority
          className="object-cover sm:opacity-0"
        />

        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />

        {/* Centered Copy */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-center px-6 text-center">
          <div className="[&_*]:select-none">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
              We Bring the Vibe
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
              Nights you’ll remember. Energy you’ll never forget.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                href="/events"
                className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
              >
                See Events
              </Link>
              <Link
                href="/gallery"
                className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>

        {/* Floating genre ticker */}
        <div className="pointer-events-none absolute bottom-3 left-0 right-0 mx-auto w-full">
          <div className="animate-marquee whitespace-nowrap text-xs sm:text-sm text-white/70">
            Afrobeats • Amapiano • Afro-house • Dancehall • Hip‑Hop • R&B • Soca • Highlife • Afrofusion • Afrotech • Afro-pop • — repeat —
          </div>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-wide text-cyan-300 uppercase">
            Our Story
          </h2>
          <p className="mt-6 text-gray-300 leading-relaxed text-lg">
            Born from the heartbeat of Afrobeats culture, Lekki Entertainment
            connects people through music, nightlife, and unforgettable experiences. What started in our cities grew into a movement — bridging African rhythms with global sounds and modern energy.
          </p>
          <p className="mt-5 text-gray-400 leading-relaxed">
            From Colorado to Dallas and beyond, our mission is simple: curate nights that feel like home to the diaspora — where everyone can dance, laugh, and belong. Lekki isn’t just an event; it’s a statement of culture, creativity, and connection.
          </p>
        </div>
      </section>

      {/* ===== HIGHLIGHTS ===== */}
      <section className="bg-[#0b0b0b] py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6 transition hover:border-white/20 hover:from-white/[0.06]"
            >
              <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                {h.title}
              </h3>
              <p className="text-gray-300">{h.desc}</p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS / TRUST ===== */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 p-6 text-center bg-white/[0.02]"
            >
              <div className="text-4xl font-bold tracking-tight">{s.value}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-white/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Partners / Logos row (optional) */}
        {/* <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-80">
          {/* Replace with real partner logos in /public/partners/*.png */}
         {/* {[1, 2, 3, 4].map((n) => (
            <div key={n} className="relative h-10 w-32">
              <Image
                src={`/partners/partner-${n}.png`}
                alt={`Partner ${n}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div> */}
      </section>

      {/* ===== QUOTE / TESTIMONIAL ===== */}
      <section className="bg-[#0b0b0b] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <blockquote className="text-2xl sm:text-3xl leading-relaxed text-white">
            “Every Lekki night feels like stepping into Lagos energy with a Colorado skyline — pure joy, no pretense.”
          </blockquote>
          <div className="mt-4 text-sm text-white/60">— Guest Review</div>
        </div>
      </section>

      {/* ===== TEAM (optional short blurb) ===== */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold">Who We Are</h3>
            <p className="mt-4 text-gray-300">
              Lekki Entertainment is a collective of curators, DJs, hosts, and designers bringing a modern African lens to nightlife. We obsess over the details — sound, lighting, flow — so the only thing you need to do is show up and enjoy.
            </p>
            <p className="mt-4 text-gray-400">
              Want to collaborate or book us for your city? Let’s talk.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
              >
                Contact Us
              </Link>
              <Link
                href="/bookings"
                className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition"
              >
                Booking & Collabs
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/images/hero-crowd.jpg"
              alt="Lekki Entertainment crowd"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-gradient-to-b from-[#0b0b0b] to-black py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h3 className="text-3xl font-semibold">Pull Up To The Next One</h3>
          <p className="mt-3 text-gray-300">
            Join the list for early access, drops, and city takeovers.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/events"
              className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Upcoming Events
            </Link>
            <a
              href="https://instagram.com/lekkientertainment"
              target="_blank"
              className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER SOCIALS ===== */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <p className="text-white/60">© {new Date().getFullYear()} Lekki Entertainment</p>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                className="hover:text-cyan-300 transition"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      {/* Local styles for the marquee animation */}
      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          animation: marquee 22s linear infinite;
          will-change: transform;
          padding-left: 100%;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </main>
  );
}
