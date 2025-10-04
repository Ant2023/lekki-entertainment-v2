import CountdownCard from "@/components/CountdownCard";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import { events } from "@/data/events";
import EventCard from "@/components/EventCard";
import { Button, Card, Pill } from "@/components/UI";

export default function HomePage() {
  const featured = events[0];

  return (
    <div className="bg-transparent">
      {/* HERO */}
      <div className="border-b border-white/5 bg-transparent">
        <div className="mx-auto grid max-w-6xl px-4 py-12 sm:grid-cols-2 sm:gap-8 sm:py-18">
          {/* Left: copy */}
          <div className="fade-in text-center sm:text-left">
            <div className="mb-4 flex justify-center sm:justify-start">
              <div className="relative inline-grid place-items-center">
                <div className="absolute -inset-6 rounded-full bg-lekki-primary/10 blur-2xl" />
                <Image
                  src="/images/logo.jpg"
                  alt="LEKKI"
                  width={80}
                  height={80}
                  className="relative rounded-full ring-1 ring-white/10"
                />
              </div>
            </div>

            <Pill className="mb-3 bg-white/5 text-lekki-subtext ring-1 ring-white/10">
              Premium Afro Nightlife
            </Pill>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-lekki-text">
              LEKKI Entertainment
            </h1>

            <p className="mt-3 text-lekki-subtext">
              Curating unforgettable Afro beats, culture, and nightlife
              experiences. Stay in the loop for upcoming shows and exclusive
              events.
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Button
                as={Link}
                href="/events"
                className="bg-lekki-primary hover:bg-lekki-accent shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_8px_32px_0_rgba(124,58,237,.35)] transition"
              >
                See Events
              </Button>
              <Button
                as={Link}
                href="#subscribe"
                className="bg-white/10 text-white hover:bg-white/15"
              >
                Get Updates
              </Button>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative mt-8 sm:mt-0 overflow-hidden rounded-3xl border border-zinc-800 shadow-soft">
            <div className="relative w-full aspect-[16/9] sm:aspect-auto sm:h-full">
              <Image
                src="/images/hero.jpg"
                alt="Afro nightlife crowd"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* COUNTDOWN */}
      <Section title="Next Event">
        <div className="max-w-3xl mx-auto">
          <CountdownCard
            title="Afrobeats Night: DJAMES Live"
            startsAt="2025-10-04T22:00:00-06:00"
            href="/events/djames-colorado-springs"
          />
        </div>
      </Section>

      {/* FEATURED EVENT */}
      <Section title="Featured Event" subtitle="Don’t miss the next big night.">
        <div className="grid">
          <EventCard e={{ ...featured, coverImage: "/images/hero-dj.jpg" }} />
        </div>
      </Section>

      {/* VALUE PROPS */}
      <Section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              h: "Global Vibes",
              p: "UK to US headliners, diaspora energy, unforgettable nights.",
            },
            {
              h: "Curated Venues",
              p: "Premium locations selected for sound, safety, and style.",
            },
            {
              h: "Easy Tickets",
              p: "Buy securely on our ticket partner, straight from each event.",
            },
          ].map((x, i) => (
            <Card key={i} className="p-6 card-glass">
              <h3 className="font-semibold text-white">{x.h}</h3>
              <p className="mt-2 text-sm text-lekki-subtext">{x.p}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* EVENT HIGHLIGHTS STRIP */}
      <Section title="Event Highlights" subtitle="A quick taste from recent nights.">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {events
            .flatMap((e) => e.photos || [])
            .slice(0, 12)
            .map((p, i) => (
              <div
                key={i}
                className="relative h-28 sm:h-32 overflow-hidden rounded-lg border border-zinc-800"
              >
                <Image src={p.src} alt={p.alt || "Event"} fill className="object-cover" />
              </div>
            ))}
        </div>
      </Section>

      {/* SUBSCRIBE */}
      <Section id="subscribe" title="Get updates" subtitle="Join the list for early drops & discounts.">
        <Card className="p-6 bg-lekki-panel/50 ring-1 ring-white/5">
          <form
            action="https://formspree.io/f/your-id"
            method="POST"
            className="grid gap-3 sm:grid-cols-[1fr_auto]"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-lekki-primary"
            />
            <button className="rounded-xl bg-lekki-primary px-4 py-2 font-semibold text-white hover:bg-lekki-accent">
              Subscribe
            </button>
            <p className="text-xs text-zinc-400 sm:col-span-2">
              We’ll only email about events. Unsubscribe anytime.
            </p>
          </form>
        </Card>
      </Section>
    </div>
  );
}
