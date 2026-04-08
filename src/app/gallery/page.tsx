import Image from "next/image";

import Section from "../../components/Section";
import { djamesDenverHighlights } from "../../lib/highlights";
import { getSiteSettings } from "../../sanity/lib/api";

export const revalidate = 30;

export default async function GalleryPage() {
  const { eventHighlights } = await getSiteSettings();
  const sanityHighlightPhotos = eventHighlights.galleryImages;
  const photos = [
    ...sanityHighlightPhotos,
    ...djamesDenverHighlights.filter(
      (fallbackPhoto) => !sanityHighlightPhotos.some((photo) => photo.src === fallbackPhoto.src)
    ),
  ];

  return (
    <Section title="Gallery" subtitle="Highlights from recent events.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {photos.length ? (
          photos.map((photo, index) => (
            <div key={`${photo.src}-${index}`} className="relative h-40 overflow-hidden rounded-xl border border-zinc-800 sm:h-48">
              <Image src={photo.src} alt={photo.alt || "Event photo"} fill className="object-cover" />
            </div>
          ))
        ) : (
          <p className="text-zinc-300">Photos coming soon.</p>
        )}
      </div>
    </Section>
  );
}
