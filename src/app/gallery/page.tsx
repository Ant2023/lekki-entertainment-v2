import { Suspense } from "react";
import Link from "next/link";

import Section from "../../components/Section";
import { djamesDenverHighlights } from "../../lib/highlights";
import { formatDate } from "../../lib/date";
import { events as localEvents } from "../../data/events";
import { getEvents, getSiteSettings } from "../../sanity/lib/api";
import GalleryExperience from "./GalleryExperience";

export const revalidate = 30;

function GalleryExperienceFallback() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/55">
      Loading gallery...
    </div>
  );
}

function dedupeEventsBySlug<T extends { slug: string }>(events: T[]) {
  const bySlug = new Map<string, T>();

  for (const event of events) {
    if (!bySlug.has(event.slug)) {
      bySlug.set(event.slug, event);
    }
  }

  return Array.from(bySlug.values());
}

export default async function GalleryPage() {
  const [siteSettings, sanityEvents] = await Promise.all([getSiteSettings(), getEvents()]);
  const allEvents = dedupeEventsBySlug([...sanityEvents, ...localEvents]);
  const galleryEvents = allEvents
    .filter((event) => event.photos && event.photos.length > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const sanityHighlightPhotos = siteSettings.eventHighlights.galleryImages;
  const fallbackPhotos = [
    ...sanityHighlightPhotos,
    ...djamesDenverHighlights.filter(
      (fallbackPhoto) => !sanityHighlightPhotos.some((photo) => photo.src === fallbackPhoto.src)
    ),
  ];

  return (
    <Section
      title="Nightlife Gallery"
      subtitle="Organized by event, so every night keeps its own story."
      className="space-y-10 sm:space-y-12"
    >
      {galleryEvents.length ? (
        <div className="space-y-10">
          {galleryEvents.map((event) => (
            <section
              key={event.slug}
              id={event.slug}
              className="scroll-mt-28 space-y-5 border-t border-white/10 pt-6 first:border-t-0 first:pt-0"
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
                <div className="relative overflow-hidden border-b border-white/10">
                  <div
                    className="h-56 w-full bg-cover bg-center sm:h-72 lg:h-80"
                    style={{ backgroundImage: `linear-gradient(180deg, rgba(5,5,8,0.1) 0%, rgba(5,5,8,0.72) 100%), url("${event.coverImage}")` }}
                  />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-fuchsia-200/75">{event.city}</p>
                      <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {event.title}
                      </h2>
                      <p className="text-sm text-white/70">
                        {formatDate(event.date)}{event.venue ? ` · ${event.venue}` : ""}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-5 text-sm text-white/70">
                      <span>{event.photos?.length || 0} photos</span>
                      <Link
                        href={`/events/${event.slug}`}
                        className="font-medium text-white transition hover:text-fuchsia-300"
                      >
                        View Event
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <Suspense fallback={<GalleryExperienceFallback />}>
                    <GalleryExperience photos={event.photos || []} />
                  </Suspense>
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <Suspense fallback={<GalleryExperienceFallback />}>
            <GalleryExperience photos={fallbackPhotos} />
          </Suspense>
          <p className="text-sm text-white/55">
            Event-based galleries will appear here as photos are added to each event.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-sm text-white/55">
        <p>Catch the next night live.</p>
        <div className="flex flex-wrap gap-5">
          <Link href="/events" className="font-medium text-white transition hover:text-fuchsia-300">
            Explore Events
          </Link>
          <Link href="/subscribe" className="font-medium text-white transition hover:text-fuchsia-300">
            Join Guestlist
          </Link>
        </div>
      </div>
    </Section>
  );
}
