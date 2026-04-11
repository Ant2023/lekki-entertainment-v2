"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type HeroProProps = {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  images: Array<{
    src: string;
    alt?: string;
    showText?: boolean;
    title?: string;
    subtitle?: string;
    eyebrow?: string;
    content?: ReactNode;
    contentWrap?: "glass" | "light" | "none";
    objectPosition?: string;
  }>;
  overlayOpacity?: number;
  ctas?: Array<{ label: string; href: string }>;
  event?:
    | {
        name: string;
        dateISO: string;
        location?: string;
        ticketUrl?: string;
      }
    | null;
  className?: string;
  autoRotateMs?: number;
};

export default function HeroPro({
  title = "LEKKI Entertainment",
  subtitle = "Premium Afrobeats, culture, and nightlife in Denver, Aurora, and Colorado Springs",
  eyebrow,
  images,
  overlayOpacity = 0.55,
  ctas,
  event,
  className = "",
  autoRotateMs = 9000,
}: HeroProProps) {
  const [index, setIndex] = useState(0);
  const total = images?.length ?? 0;
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (total <= 1 || !autoRotateMs) return;

    let id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, autoRotateMs);

    const onVis = () => {
      if (document.hidden) {
        clearInterval(id);
      } else {
        id = window.setInterval(() => setIndex((i) => (i + 1) % total), autoRotateMs);
      }
    };

    document.addEventListener("visibilitychange", onVis);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [total, autoRotateMs]);

  useEffect(() => {
    if (index >= total) setIndex(0);
  }, [total, index]);

  const goTo = useCallback(
    (i: number) => {
      if (!total) return;
      setIndex(((i % total) + total) % total);
    },
    [total]
  );

  const prev = useCallback(() => goTo(index - 1), [index, goTo]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);

  const overlayBg = useMemo(
    () => `rgba(0,0,0,${Math.max(0, Math.min(overlayOpacity, 1))})`,
    [overlayOpacity]
  );

  if (!images || images.length === 0) return null;

  const translateStyle = { transform: `translateX(-${index * 100}%)` };

  return (
    <section
      className={
        "relative isolate w-full overflow-hidden rounded-none " +
        "h-[78vh] min-h-[560px] max-h-[920px] sm:h-[80vh] " +
        className
      }
      aria-roledescription="carousel"
      aria-label="Hero"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={trackRef}
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={translateStyle}
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
                style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, ${overlayBg} 0%, rgba(0,0,0,0.3) 34%, rgba(0,0,0,0.36) 64%, ${overlayBg} 100%)`,
                }}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-10">
        <div className="flex h-full w-full transition-transform duration-500 ease-out" style={translateStyle}>
          {images.map((img, i) => {
            const defaultOverlay = img.content == null && img.showText !== false;

            return (
              <div key={i} className="relative h-full w-full shrink-0 grow-0 basis-full">
                <div className="mx-auto flex h-full max-w-6xl items-center px-4">
                  <div className="w-full text-center sm:text-left pointer-events-auto">
                    {img.content ? (
                      img.contentWrap === "none" ? (
                        <>{img.content}</>
                      ) : img.contentWrap === "light" ? (
                        <div className="mx-auto max-w-3xl rounded-2xl bg-white/85 p-5 shadow-xl backdrop-blur md:p-6">
                          {img.content}
                        </div>
                      ) : (
                        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/35 p-5 text-white shadow-xl backdrop-blur md:p-6">
                          {img.content}
                        </div>
                      )
                    ) : defaultOverlay ? (
                      <>
                        <p className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wider text-white/80 backdrop-blur">
                          {img.eyebrow ?? eyebrow ?? "Afrobeats • Nightlife • Culture"}
                        </p>
                        <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-5xl">
                          {img.title ?? title}
                        </h1>
                        {(img.subtitle ?? subtitle) ? (
                          <p className="mt-3 max-w-2xl text-base text-white/80 sm:text-lg">
                            {img.subtitle ?? subtitle}
                          </p>
                        ) : null}

                        {event ? (
                          <div className="mt-5 inline-flex max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 shadow-lg backdrop-blur">
                            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                              <strong className="font-semibold">{event.name}</strong>
                              <span className="opacity-80">• {formatDate(event.dateISO)}</span>
                              {event.location ? <span className="opacity-80">• {event.location}</span> : null}
                            </div>
                            {event.ticketUrl ? (
                              <Link
                                href={event.ticketUrl}
                                className="ml-auto inline-flex items-center rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
                              >
                                Details
                              </Link>
                            ) : null}
                          </div>
                        ) : null}

                        {ctas && ctas.length > 0 ? (
                          <div className="mt-6 flex flex-wrap items-center gap-3">
                            {ctas.map((cta, j) => (
                              <Link
                                key={j}
                                href={cta.href}
                                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/90 px-5 py-2 text-sm font-semibold text-black hover:bg-white"
                              >
                                {cta.label}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 mx-auto flex max-w-6xl justify-center px-4">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 backdrop-blur">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
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
