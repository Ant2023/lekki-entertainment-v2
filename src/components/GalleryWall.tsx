"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

type Photo = { src: string; alt?: string };

export default function GalleryWall({ photos }: { photos: Photo[] }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  if (photos.length === 0) {
    return (
      <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-400">
        No gallery images yet. Add them in Sanity Studio.
      </div>
    );
  }

  const [lead, second, third, ...rest] = photos;
  const cardOffsets = [
    "sm:translate-y-4",
    "sm:-translate-y-2",
    "sm:translate-y-6",
    "sm:translate-y-1",
    "sm:-translate-y-4",
    "sm:translate-y-3",
  ];
  const cardRotations = [
    "sm:-rotate-1",
    "sm:rotate-1",
    "sm:-rotate-2",
    "sm:rotate-2",
    "sm:-rotate-1",
    "sm:rotate-1",
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {lead ? (
          <div
            data-aos="fade-up"
            className="group relative min-h-[320px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900"
          >
            <Image
              src={lead.src}
              alt={lead.alt || "Highlight image"}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Denver Nights</p>
              <p className="mt-2 max-w-xl text-lg font-medium text-white sm:text-xl">
                DJames in Denver. A packed room, high energy, and moments worth revisiting.
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[second, third].filter(Boolean).map((photo, index) => (
            <div
              key={`${photo?.src}-${index}`}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className={`group relative min-h-[152px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900 transition duration-500 ${index === 0 ? "sm:-rotate-1" : "sm:rotate-1"}`}
            >
              <Image
                src={photo!.src}
                alt={photo!.alt || "Highlight image"}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      <div data-aos="fade-up" className="columns-2 gap-3 space-y-3 sm:columns-3 md:columns-4">
        {rest.map((photo, index) => (
          <div
            key={`${photo.src}-${index}`}
            data-aos="fade-up"
            data-aos-delay={index * 40}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 break-inside-avoid-column transition duration-500 ${cardOffsets[index % cardOffsets.length]} ${cardRotations[index % cardRotations.length]}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt || "Gallery image"}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-110"
              loading="lazy"
            />
            {photo.alt ? (
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/65 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="text-xs text-white/90">{photo.alt}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
