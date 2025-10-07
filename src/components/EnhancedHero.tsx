"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket } from "lucide-react";

export type HeroProps = {
  title: string;
  subtitle?: string;
  backgroundImages: string[];
  overlayOpacity?: number;          // 0–1 (default 0.6)
  slideIntervalMs?: number;         // default 6000
  event?: {
    name: string;
    dateISO?: string;
    location?: string;
    ticketUrl?: string;
  };
  ctas?: {
    primary?: { label: string; href: string };
  };
};

export default function Hero({
  title,
  subtitle,
  backgroundImages,
  overlayOpacity = 0.6,
  slideIntervalMs = 6000,
  event,
  ctas,
}: HeroProps) {
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  // slideshow
  useEffect(() => {
    if (backgroundImages.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % backgroundImages.length), slideIntervalMs);
    return () => clearInterval(id);
  }, [backgroundImages.length, slideIntervalMs]);

  // countdown
  useEffect(() => {
    if (!event?.dateISO) return;
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [event?.dateISO]);

  const countdown = useMemo(() => {
    if (!event?.dateISO || !now) return null;
    const target = new Date(event.dateISO).getTime();
    const diff = target - now.getTime();
    if (diff <= 0) return "Happening now";
    const s = Math.floor(diff / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${d}d ${h}:${m}:${sec}`;
  }, [event?.dateISO, now]);

  return (
    <section className="relative isolate">
      {/* Background */}
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
              alt="Background"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* vignette + overlay */}
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

      {/* Content (clean mobile view) */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28 lg:py-36">
        <motion.div
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Title / tagline */}
          <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg">
              {subtitle}
            </p>
          )}

          {/* Simple Upcoming line */}
          {event && (
            <p className="mt-3 text-sm text-white/75">
              <span className="font-medium">Upcoming:</span> {event.name}
              {event.location ? ` • ${event.location}` : ""}
              {countdown ? ` • ${countdown}` : ""}
            </p>
          )}

          {/* Single CTA */}
          {ctas?.primary && (
            <div className="mt-6">
              <Link
                href={event?.ticketUrl || ctas.primary.href}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-5 py-3 font-medium text-gray-900 shadow-lg shadow-black/20 transition hover:bg-white"
              >
                <Ticket className="h-5 w-5" />
                {ctas.primary.label}
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
    </section>
  );
}
