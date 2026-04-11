"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Photo = {
  src: string;
  alt?: string;
};

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GalleryExperience({ photos }: { photos: Photo[] }) {
  const touchStartX = useRef<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const updateActiveIndex = useCallback((nextIndex: number | null | ((current: number | null) => number | null)) => {
    setActiveIndex((current) => (typeof nextIndex === "function" ? nextIndex(current) : nextIndex));
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        updateActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        updateActiveIndex((current) => {
          if (current === null) {
            return current;
          }

          return (current + 1) % photos.length;
        });
      }

      if (event.key === "ArrowLeft") {
        updateActiveIndex((current) => {
          if (current === null) {
            return current;
          }

          return (current - 1 + photos.length) % photos.length;
        });
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, photos.length, updateActiveIndex]);

  if (photos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/20 p-8 text-center text-zinc-300">
        Photos coming soon. New nightlife moments drop after every event.
      </div>
    );
  }

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;
  const activePhotoNumber = activeIndex !== null ? activeIndex + 1 : 0;

  const showPrevious = () => {
    updateActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return (current - 1 + photos.length) % photos.length;
    });
  };

  const showNext = () => {
    updateActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return (current + 1) % photos.length;
    });
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? null;

    if (touchEndX === null) {
      touchStartX.current = null;
      return;
    }

    const deltaX = touchEndX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 50) {
      return;
    }

    if (deltaX > 0) {
      showPrevious();
      return;
    }

    showNext();
  };

  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {photos.map((photo, index) => {
              return (
                <button
                  type="button"
                  key={`${photo.src}-${index}`}
                  onClick={() => updateActiveIndex(index)}
                  aria-label={`Open image: ${photo.alt || "Nightlife event photo"}`}
                  className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black/20 text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:rounded-2xl"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt || "Nightlife event photo"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition duration-500 group-hover:opacity-100">
                    <p className="text-sm text-white/85">{photo.alt || "Nightlife event photo"}</p>
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      {activePhoto && isMounted
        ? createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm animate-in fade-in duration-200 sm:p-4 lg:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt || "Gallery image viewer"}
          onClick={() => updateActiveIndex(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:scale-105 hover:bg-black/70"
            onClick={() => updateActiveIndex(null)}
            aria-label="Close image viewer"
          >
            <CloseIcon />
          </button>

          <button
            type="button"
            className="absolute left-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:scale-105 hover:bg-black/70"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </button>

          <div
            className="relative flex h-[calc(100vh-10rem)] w-full max-w-7xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute inset-0 rounded-3xl border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55)]" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <div
                className="h-full w-full bg-center bg-no-repeat"
                role="img"
                aria-label={activePhoto.alt || "Gallery image"}
                style={{
                  backgroundImage: `url("${activePhoto.src}")`,
                  backgroundSize: "contain",
                }}
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/55 px-4 py-3 text-white backdrop-blur lg:bottom-6 lg:left-6 lg:right-6">
              <p className="text-sm font-medium">{activePhoto.alt || "Nightlife event photo"}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">
                {activePhotoNumber} / {photos.length}
              </p>
            </div>
          </div>

          <div
            className="absolute bottom-4 left-1/2 flex w-[min(92vw,42rem)] -translate-x-1/2 gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-black/45 p-2 backdrop-blur lg:bottom-6"
            onClick={(event) => event.stopPropagation()}
          >
            {photos.map((photo, index) => (
              <button
                key={`${photo.src}-thumb-${index}`}
                type="button"
                onClick={() => updateActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition ${
                  index === activeIndex ? "border-[#f2d17a] ring-2 ring-[#d4af37]/45" : "border-white/10"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt || `Gallery thumbnail ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:scale-105 hover:bg-black/70"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </button>
        </div>
        , document.body)
        : null}
    </>
  );
}
