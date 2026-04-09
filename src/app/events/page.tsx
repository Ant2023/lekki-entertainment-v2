import Section from "../../components/Section";
import { getEvents } from "../../sanity/lib/api";
import EventCard from "../../components/EventCard";
import { isPast } from "../../lib/date";
import { events as localEvents } from "../../data/events";

export const revalidate = 30;

function dedupeEventsBySlug<T extends { slug: string }>(events: T[]) {
  const bySlug = new Map<string, T>();

  for (const event of events) {
    if (!bySlug.has(event.slug)) {
      bySlug.set(event.slug, event);
    }
  }

  return Array.from(bySlug.values());
}

export default async function EventsPage() {
  const sanityEvents = await getEvents();
  const allEvents = dedupeEventsBySlug([...sanityEvents, ...localEvents]);

  const upcoming = allEvents
    .filter((event) => !isPast(event.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = allEvents
    .filter((event) => isPast(event.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <Section title="Upcoming Events" subtitle="Lock in your night.">
        <div className="grid gap-5">
          {upcoming.length ? (
            upcoming.map((event) => <EventCard key={event.slug} e={event} />)
          ) : (
            <p className="text-zinc-300">Stay tuned. New dates dropping soon.</p>
          )}
        </div>
      </Section>

      <Section title="Past Events" subtitle="Photo recaps and memories.">
        <div className="grid gap-5">
          {past.length ? (
            past.map((event) => <EventCard key={event.slug} e={event} />)
          ) : (
            <p className="text-zinc-300">We are just getting started.</p>
          )}
        </div>
      </Section>
    </div>
  );
}
