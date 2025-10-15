"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * HeroPro – a polished, no‑timer, swipeable hero.
 * - Fixed, consistent height on all screens (prevents “strip” thumbnails on mobile)
 * - Manual navigation (arrows + dots). No auto‑advance.
 * - Optional per‑slide captions (so image‑only slides don’t show text)
 * - Accessible: buttons are keyboard‑focusable, SR labels included
 * - Next/Image with fill + object-cover for crisp scaling
 */

export type HeroProProps = {
  title?: string;
  subtitle?: string;
  images: Array<{
    src: string;
    alt?: string;
    /** If true, show the text overlay on this slide; otherwise hide text. */
    showText?: boolean;
  }>;
  overlayOpacity?: number; // 0–1
  ctas?: Array<{ label: string; href: string }>; // optional primary/secondary
  event?: {
    name: string;
    dateISO: string;
    location?: string;
    ticketUrl?: string;
  } | null;
  className?: string;
};

export default function HeroPro({
  title = "LEKKI Entertainment",
  subtitle = "Premium Afrobeats, culture, and nightlife · Denver · Aurora · Colorado Springs",
  images,
  overlayOpacity = 0.55,
  ctas,
  event,
  className = "",
}: HeroProProps) {
  const [index, setIndex] = useState(0);
  const total = images?.length ?? 0;
  const trackRef = useRef<HTMLDivElement | null>(null);

  // AUTO SCROLL
useEffect(() => {
  if (total <= 1) return;
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % total);
  }, 5000); // 5 seconds per slide
  return () => clearInterval(interval);
}, [total]);


  // Clamp index if images array changes
  useEffect(() => {
    if (index >= total) setIndex(0);
  }, [total, index]);

  const goTo = useCallback((i: number) => {
    setIndex((prev) => {
      const next = (i + total) % total;
      // Smooth translate
      const track = trackRef.current;
      if (track) {
        const w = track.clientWidth;
        track.style.transform = `translateX(-${next * w}px)`;
      }
      return next;
    });
  }, [total]);

  const prev = useCallback(() => goTo(index - 1), [index, goTo]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);

  // Resize observer to keep translate in sync on viewport changes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(() => {
      const w = track.clientWidth;
      track.style.transform = `translateX(-${index * w}px)`;
    });
    ro.observe(track);
    return () => ro.disconnect();
  }, [index]);

  const overlayBg = useMemo(
    () => `rgba(0,0,0,${Math.max(0, Math.min(overlayOpacity, 1))})`,
    [overlayOpacity]
  );

  if (!images || images.length === 0) return null;

  return (
    <section
      className={
        "relative isolate w-full overflow-hidden rounded-none " +
        // Height rules: stable across breakpoints to avoid squished strips
        "h-[78vh] min-h-[560px] max-h-[920px] sm:h-[80vh] " +
        className
      }
      aria-roledescription="carousel"
      aria-label="Hero"
    >
      {/* Slides track */}
      <div className="absolute inset-0">
        <div
          ref={trackRef}
          className="h-full w-full flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="relative h-full w-full shrink-0 grow-0 basis-full">
              <Image
                src={img.src}
                alt={img.alt ?? "Hero image"}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* gradient top/bottom for legible overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    `linear-gradient(180deg, ${overlayBg} 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.25) 60%, ${overlayBg} 100%)`,
                }}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>

      {/* Copy overlay (only on slides with showText) */}
      {images[index]?.showText !== false && (
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4">
          <div className="w-full text-center sm:text-left">
            <p className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wider text-white/80 backdrop-blur">
              Afrobeats • Nightlife • Culture
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 max-w-2xl text-base text-white/80 sm:text-lg">
                {subtitle}
              </p>
            )}

            {/* Optional event microcard */}
            {event && (
              <div className="mt-5 inline-flex max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 shadow-lg backdrop-blur">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                  <strong className="font-semibold">{event.name}</strong>
                  <span className="opacity-80">• {formatDate(event.dateISO)}</span>
                  {event.location && (
                    <span className="opacity-80">• {event.location}</span>
                  )}
                </div>
                {event.ticketUrl && (
                  <Link
                    href={event.ticketUrl}
                    className="ml-auto inline-flex items-center rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
                  >
                    Details
                  </Link>
                )}
              </div>
            )}

            {/* CTAs */}
            {ctas && ctas.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {ctas.map((c, i) => (
                  <Link
                    key={i}
                    href={c.href}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/90 px-5 py-2 text-sm font-semibold text-black hover:bg-white"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 mx-auto flex max-w-6xl items-center justify-between px-4">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/40 px-2 py-1 backdrop-blur">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next slide"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </section>
  );
}

function formatDate(iso: string) {
  try {
    const dt = new Date(iso);
    return dt.toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
