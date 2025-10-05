"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, Ticket, Play, Instagram, Music2, Youtube } from "lucide-react";

/**
 * Enhanced, drop-in Hero section for Lekki Entertainment
 * - Dark loungy vibe with soft grain & gradient overlay
 * - Background image slideshow (no external carousel lib)
 * - Slide-down entrance animation for headline block
 * - Event pill with date/location + live countdown
 * - Primary CTA: Get Tickets; Secondary: View Events
 * - Social links row (Instagram, TikTok, YouTube)
 * - Bottom scroll cue
 *
 * Usage example (in a page or layout):
 * <Hero
 *   title={"International Nightlife & Entertainment"}
 *   subtitle={"Premium Afro experiences · Dallas · Denver · Colorado Springs"}
 *   backgroundImages={["/images/hero-dj.jpg", "/images/hero-crowd.jpg", "/images/hero-dance.jpg"]}
 *   event={{
 *     name: "Nigerian Independence Celebration · Colorado Springs",
 *     dateISO: "2025-10-05T20:00:00-06:00",
 *     location: "Colorado Springs, CO",
 *     ticketUrl: "https://event.getbookt.io/colorado-springs-nigerian-independence-party"
 *   }}
 *   ctas={{
 *     primary: { label: "Get Tickets", href: "/events" },
 *     secondary: { label: "See All Events", href: "/events" }
 *   }}
 *   socials={{
 *     instagram: "https://instagram.com/internationalnightlifeandent",
 *     tiktok: "https://tiktok.com/@yourhandle",
 *     youtube: "https://youtube.com/@yourchannel"
 *   }}
 * />
 */

export type HeroProps = {
  title: string;
  subtitle?: string;
  backgroundImages: string[]; // absolute or public/ paths
  overlayOpacity?: number; // 0–1
  slideIntervalMs?: number; // default 5000
  event?: {
    name: string;
    dateISO?: string; // ISO string; if provided, countdown shows
    location?: string;
    ticketUrl?: string;
  };
  ctas?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  socials?: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
};

export default function Hero({
  title,
  subtitle,
  backgroundImages,
  overlayOpacity = 0.55,
  slideIntervalMs = 5000,
  event,
  ctas,
  socials,
}: HeroProps) {
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // rotate background
    if (backgroundImages.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % backgroundImages.length), slideIntervalMs);
    return () => clearInterval(id);
  }, [backgroundImages.length, slideIntervalMs]);

  useEffect(() => {
    if (!event?.dateISO) return;
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, [event?.dateISO]);

  const countdown = useMemo(() => {
    if (!event?.dateISO || !now) return null;
    const target = new Date(event.dateISO).getTime();
    const diff = target - now.getTime();
    if (diff <= 0) return { live: true, text: "Happening now" } as const;
    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return { live: false, text: `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}` } as const;
  }, [event?.dateISO, now]);

  return (
    <section className="relative isolate">
      {/* Background slideshow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[index]}
              alt="Event background"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* soft film grain via radial gradient & overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(1200px 600px at 20% 10%, rgba(0,0,0,0.45), transparent), radial-gradient(1000px 500px at 80% 90%, rgba(0,0,0,0.5), transparent)",
              }}
            />
            <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:py-28 lg:py-36">
        {/* Socials top-right */}
        <div className="absolute right-4 top-4 flex items-center gap-3 text-white/80">
          {socials?.instagram && (
            <Link href={socials.instagram} aria-label="Instagram" className="hover:text-white transition">
              <Instagram className="h-5 w-5" />
            </Link>
          )}
          {socials?.tiktok && (
            <Link href={socials.tiktok} aria-label="TikTok" className="hover:text-white transition">
              <Music2 className="h-5 w-5" />
            </Link>
          )}
          {socials?.youtube && (
            <Link href={socials.youtube} aria-label="YouTube" className="hover:text-white transition">
              <Youtube className="h-5 w-5" />
            </Link>
          )}
        </div>

        {/* Headline block with slide-down entrance */}
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {event && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15 backdrop-blur">
              <CalendarDays className="h-4 w-4 text-white/85" />
              <span className="text-sm text-white/90">{event.name}</span>
            </div>
          )}

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
          )}

          {/* Event meta + countdown */}
          {(event?.location || countdown) && (
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/85">
              {event?.location && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-white/15">
                  <MapPin className="h-4 w-4" /> {event.location}
                </span>
              )}
              {countdown && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2.5 py-1 ring-1 ring-emerald-300/30 text-emerald-50">
                  <Play className="h-4 w-4" /> {countdown.text}
                </span>
              )}
            </div>
          )}

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {ctas?.primary && (
              <Link
                href={event?.ticketUrl || ctas.primary.href}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-5 py-3 font-medium text-gray-900 shadow-lg shadow-black/20 transition hover:bg-white"
              >
                <Ticket className="h-5 w-5" /> {ctas.primary.label}
              </Link>
            )}
            {ctas?.secondary && (
              <Link
                href={ctas.secondary.href}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-medium text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/15"
              >
                {ctas.secondary.label}
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient divider & scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <div className="animate-bounce text-white/70">Scroll</div>
      </div>
    </section>
  );
}
