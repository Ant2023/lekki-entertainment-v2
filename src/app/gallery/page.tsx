import Image from 'next/image';
import Section from '@/components/Section';
import { events } from '@/data/events';

export const dynamic = 'force-static';

export default function GalleryPage() {
  const photos = events.flatMap((e) => e.photos || []);
  return (
    <Section title="Gallery" subtitle="Highlights from recent events.">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {photos.length ? (
          photos.map((p, i) => (
            <div key={i} className="relative h-40 sm:h-48 rounded-xl overflow-hidden border border-zinc-800">
              <Image src={p.src} alt={p.alt || 'Event photo'} fill className="object-cover" />
            </div>
          ))
        ) : (
          <p className="text-zinc-300">Photos coming soon.</p>
        )}
      </div>
    </Section>
  );
}
