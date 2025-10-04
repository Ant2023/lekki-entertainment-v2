import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/Section';
import { events } from '@/data/events';
import EventCard from '@/components/EventCard';
import { Button, Card, Pill } from '@/components/UI';

export default function HomePage() {
  const featured = events[0];
  return (
    <div>
      {/* HERO */}
      <div className="hero-gradient border-b border-zinc-800">
        <div className="mx-auto grid max-w-6xl px-4 py-14 sm:grid-cols-2 sm:gap-8 sm:py-20">
          <div className="fade-in">
            <div className="mb-4">
              <Image src="/images/logo.jpg" alt="Lekki Groove Room" width={80} height={80} className="neon rounded-full mx-auto" />
            </div>
            <Pill className="mb-3">Premium Afro Nightlife</Pill>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              LEKKI Entertainment
            </h1>
            <p className="mt-3 text-zinc-300">
              Curating unforgettable Afro beats, culture, and nightlife experiences. Stay in the loop for upcoming shows
              and exclusive events.
            </p>
            <div className="mt-6 flex gap-3">
              <Button as={Link} href="/events" className="bg-sky-600 text-white">See Events</Button>
              <Button as={Link} href="#subscribe">Get Updates</Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-0 h-64 sm:h-auto rounded-3xl overflow-hidden border border-zinc-800 shadow">
            <Image src="/images/hero.jpg" alt="Hero" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* FEATURED EVENT */}
      <Section title="Featured Event" subtitle="Don’t miss the next big night.">
        <div className="grid">
          <EventCard e={featured} />
        </div>
      </Section>

      {/* VALUE PROPS */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[{
            h:'Global Vibes', p:'UK to US headliners, diaspora energy, unforgettable nights.'
          },{
            h:'Curated Venues', p:'Premium locations selected for sound, safety, and style.'
          },{
            h:'Easy Tickets', p:'Buy securely on our ticket partner, straight from each event.'
          }].map((x,i)=> (
            <Card key={i} className="p-6">
              <h3 className="font-semibold text-white">{x.h}</h3>
              <p className="mt-2 text-sm text-zinc-300">{x.p}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* EVENT HIGHLIGHTS STRIP */}
      <Section title="Event Highlights" subtitle="A quick taste from recent nights.">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {events.flatMap(e => e.photos || []).slice(0,12).map((p,i)=> (
            <div key={i} className="relative h-28 sm:h-32 rounded-lg overflow-hidden border border-zinc-800">
              <Image src={p.src} alt={p.alt || 'Event'} fill className="object-cover" />
            </div>
          ))}
        </div>
      </Section>

      {/* SUBSCRIBE */}
      <Section id="subscribe" title="Get updates" subtitle="Join the list for early drops & discounts.">
        <Card className="p-6">
          <form action="https://formspree.io/f/your-id" method="POST" className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <input type="email" name="email" required placeholder="you@example.com" className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <button className="rounded-xl bg-sky-600 px-4 py-2 text-white font-semibold">Subscribe</button>
            <p className="sm:col-span-2 text-xs text-zinc-400">We’ll only email about events. Unsubscribe anytime.</p>
          </form>
        </Card>
      </Section>
    </div>
  );
}
