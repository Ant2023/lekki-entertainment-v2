import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import { events } from '@/data/events';
import { formatDate } from '@/lib/date';
import { Button, Card, Pill } from '@/components/UI';

export default function EventDetail({ params }: { params: { slug: string } }) {
  const e = events.find((x) => x.slug === params.slug);
  if (!e) return notFound();

  return (
    <div>
      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-zinc-800 shadow">
            <Image src={e.coverImage} alt={e.title} fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Pill>{formatDate(e.date)}</Pill>
              <Pill className="bg-sky-50 text-sky-700">{e.city}</Pill>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{e.title}</h1>
            <p className="mt-3 text-zinc-300">{e.description}</p>
            <p className="mt-2 text-sm text-zinc-400"><strong>Venue:</strong> {e.venue}</p>
            <div className="mt-5 flex gap-3">
              {e.ticketUrl && (
                <Button as={Link} href={e.ticketUrl} target="_blank" rel="noopener" className="bg-sky-600 text-white">Buy Tickets</Button>
              )}
              <Button as={Link} href="/events">Back to Events</Button>
            </div>
          </div>
        </div>
      </Section>

      {e.photos?.length ? (
        <Section title="Event Photos">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {e.photos.map((p, i) => (
              <div key={i} className="relative h-40 sm:h-60 rounded-xl overflow-hidden border border-zinc-800">
                <Image src={p.src} alt={p.alt || e.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
