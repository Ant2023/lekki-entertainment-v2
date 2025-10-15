"use client";

import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import { events } from "@/data/events";
import EventCard from "@/components/EventCard";
import { Button, Card, Pill } from "@/components/UI";
import CountdownCard from "@/components/countdownCard";
import Hero from "@/components/EnhancedHero";
import AOS from "aos";
import "aos/dist/aos.css";
import GalleryWall from "@/components/GalleryWall";





export default function HomePage() {
  const featured = events?.[0];

return (
    <div className="bg-transparent">
      {/* HERO — minimal, brand-forward, NO TIMER */}
      <Hero
        title="LEKKI Entertainment"
        subtitle="Premium Afrobeats, culture, and nightlife · Denver · Aurora · Colorado Springs"
        images={[
          { src: "/images/hero-crowd.jpg", alt: "Packed Afrobeats crowd", showText: true },
          { src: "/images/hero.jpg", alt: "Lights + energy", showText: false },
          { src: "/images/hero-dj.jpg", alt: "DJ in the booth", showText: false },
        ]}
        overlayOpacity={0.55}
        event={{
          name: "Wedding After",
          dateISO: "2025-10-19T21:00:00-06:00",
          location: "3820 Hancock Expy, Colorado Springs, CO",
          ticketUrl: "/events/nigerian-independence-colorado-springs",
        }}
        ctas={[{ label: "Get Tickets", href: "/events" }]}
      />

      {/* …rest of your page (Countdown lives below, unchanged) */}
    {/* COUNTDOWN */}
    <Section title="Next Event">
      <div className="mx-auto max-w-3xl">
        <CountdownCard
          title="Wedding Afterparty· Colorado Springs"
          startsAt="2025-10-19T21:00:00-06:00"
          href="/events/nigerian-independence-colorado-springs"
        />
      </div>
    </Section>

      {/* FEATURED EVENT */}
      <Section title="Featured Event" subtitle="Don’t miss the next big night.">
        <div className="grid">
          {featured && (
            <EventCard e={{ ...featured, coverImage: "/images/hero-dj.jpg" }} />
          )}
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
            <Card key={i} className="card-glass p-6">
              <h3 className="font-semibold text-white">{x.h}</h3>
              <p className="mt-2 text-sm text-lekki-subtext">{x.p}</p>
            </Card>
          ))}
        </div>
      </Section>

{/* EVENT HIGHLIGHTS — photo wall with staggered fade-up */}
<Section title="Event Highlights" subtitle="Energy. Vibes. Afrobeats.">
  <GalleryWall events={events} />
</Section>

      {/* SUBSCRIBE */}
      <Section id="subscribe" title="Get updates" subtitle="Join the list for early drops & discounts.">
        <Card className="bg-lekki-panel/50 p-6 ring-1 ring-white/5">
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
