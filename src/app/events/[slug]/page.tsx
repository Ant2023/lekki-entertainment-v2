import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Section from "../../../components/Section";
import { getEventBySlug } from "../../../sanity/lib/api";
import { formatDate } from "../../../lib/date";
import { Button, Pill } from "../../../components/UI";

export default async function EventDetail({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) return notFound();

  return (
    <div>
      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-2xl border border-zinc-800 shadow sm:h-96">
            <Image src={event.coverImage} alt={event.title} fill className="object-cover" />
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Pill>{formatDate(event.date)}</Pill>
              <Pill className="bg-sky-50 text-sky-700">{event.city}</Pill>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{event.title}</h1>
            <p className="mt-3 text-zinc-300">{event.description}</p>
            <p className="mt-2 text-sm text-zinc-400">
              <strong>Venue:</strong> {event.venue}
            </p>
            <div className="mt-5 flex gap-3">
              {event.ticketUrl ? (
                <Button as={Link} href={event.ticketUrl} target="_blank" rel="noopener" className="bg-sky-600 text-white">
                  Buy Tickets
                </Button>
              ) : null}
              <Button as={Link} href="/events">
                Back to Events
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {event.photos?.length ? (
        <Section title="Event Photos">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {event.photos.map((photo, index) => (
              <div key={`${photo.src}-${index}`} className="relative h-40 overflow-hidden rounded-xl border border-zinc-800 sm:h-60">
                <Image src={photo.src} alt={photo.alt || event.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
