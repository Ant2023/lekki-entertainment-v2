"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

type Photo = { src: string; alt?: string };
type EventLike = { photos?: Photo[] };

export default function GalleryWall({ events }: { events: EventLike[] }) {
  // Init AOS once, only when this component mounts
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  // Build photo list safely
  const photos = useMemo(
    () => (events?.flatMap(e => e?.photos || []) as Photo[]) || [],
    [events]
  );

  return (
    <div className="w-full">
      {/* tiny counter: remove if you don’t want it */}
      {/* <p className="mb-2 text-xs text-zinc-400">
        Loaded photos: <span className="text-white font-medium">{photos.length}</span>
      </p> */}

      <div
        data-aos="fade-up"
        className="columns-2 sm:columns-3 md:columns-4 gap-2 space-y-2"
      >
        {photos.slice(0, 20).map((p, i) => (
          <div
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 50}           // stagger
            className="relative overflow-hidden rounded-xl group cursor-pointer break-inside-avoid-column"
          >
            <Image
              src={p.src}
              alt={p.alt || "Event"}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover w-full h-auto transform transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
              {p.alt && <p className="text-xs text-white/90">{p.alt}</p>}
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-400">
          No photos found. Add <code>photos: {'{src, alt}'}</code> to your events in
          <code className="ml-1">/src/data/events</code> or check image paths.
        </div>
      )}
    </div>
  );
}
