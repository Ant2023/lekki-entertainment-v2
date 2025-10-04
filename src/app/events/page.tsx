import Section from '@/components/Section';
import { events } from '@/data/events';
import EventCard from '@/components/EventCard';
import { isPast } from '@/lib/date';

export const dynamic = 'force-static';

export default function EventsPage() {
  const upcoming = events.filter((e) => !isPast(e.date));
  const past = events.filter((e) => isPast(e.date)).reverse();

  return (
    <div>
      <Section title="Upcoming Events" subtitle="Lock in your night.">
        <div className="grid gap-5">
          {upcoming.length ? upcoming.map((e) => <EventCard key={e.slug} e={e} />) : <p className="text-zinc-300">Stay tuned — new dates dropping soon.</p>}
        </div>
      </Section>
      <Section title="Past Events" subtitle="Photo recaps & memories.">
        <div className="grid gap-5">
          {past.length ? past.map((e) => <EventCard key={e.slug} e={e} />) : <p className="text-zinc-300">We’re just getting started.</p>}
        </div>
      </Section>
    </div>
  );
}
