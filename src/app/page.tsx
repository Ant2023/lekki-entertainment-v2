import Link from "next/link";

import CountdownCard from "../components/countdownCard";
import FeaturedEventCard from "../components/FeaturedEventCard";
import GalleryWall from "../components/GalleryWall";
import Hero from "../components/EnhancedHero";
import Section from "../components/Section";
import { Card } from "../components/UI";
import { djamesDenverHighlights } from "../lib/highlights";
import { getSiteSettings } from "../sanity/lib/api";

export const revalidate = 30;

function LekkiPromo() {
  return (
    <div className="max-w-xl space-y-4 text-white">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
        {["Community", "Culture", "Late Nights"].map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="max-w-2xl text-2xl font-semibold leading-snug text-white sm:text-4xl">
          For the crowd, the culture, and the nights people talk about after.
        </h3>
        <p className="max-w-xl text-sm leading-6 text-white/72 sm:text-base">
          Lekki brings together music, energy, and a community that shows up for the full experience.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
        <Link
          href="/events"
          className="inline-flex items-center rounded-2xl bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-700"
        >
          See All Events
        </Link>
        <Link
          href="/subscribe"
          className="inline-flex items-center rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          Join Guestlist
        </Link>
      </div>

      <p className="max-w-xl text-sm leading-6 text-white/55 sm:text-base">
        Denver, Aurora, and Colorado Springs. Early drops, curated venues, and nights worth dressing up for.
      </p>
    </div>
  );
}

function HeroIntro() {
  return (
    <div className="max-w-xl space-y-4 text-white">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
        {["Afrobeats", "Nightlife", "Culture"].map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        <h1 className="max-w-2xl text-2xl font-semibold leading-snug text-white sm:text-4xl">
          Afrobeats nights, elevated.
        </h1>
        <p className="max-w-xl text-sm leading-6 text-white/72 sm:text-base">
          Lekki Entertainment presents refined nightlife experiences across Denver, Aurora, and Colorado Springs.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
        <Link
          href="/events"
          className="inline-flex items-center rounded-2xl bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-700"
        >
          Explore Events
        </Link>
        <Link
          href="/gallery"
          className="inline-flex items-center rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          View Highlights
        </Link>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const { featuredEvent, eventHighlights } = await getSiteSettings();
  const featuredLocation = [featuredEvent?.venue, featuredEvent?.city].filter(Boolean).join(" · ");
  const sanityHighlightPhotos = eventHighlights.galleryImages;
  const highlightPhotos = [
    ...sanityHighlightPhotos,
    ...djamesDenverHighlights.filter(
      (fallbackPhoto) => !sanityHighlightPhotos.some((photo) => photo.src === fallbackPhoto.src)
    ),
  ];

  return (
    <div className="bg-transparent">
      <Hero
        title="LEKKI Entertainment"
        subtitle="Premium Afrobeats, culture, and nightlife in Denver, Aurora, and Colorado Springs"
        images={[
          {
            src: "/images/hero-crowd.jpg",
            alt: "Packed Afrobeats crowd",
            content: <HeroIntro />,
            contentWrap: "none",
          },
          {
            src: "/images/denver-10.jpg",
            alt: "DJ in the booth",
            content: <LekkiPromo />,
            contentWrap: "glass",
          },
        ]}
        overlayOpacity={0.55}
        autoRotateMs={10000}
        event={
          featuredEvent
            ? {
                name: featuredEvent.title,
                dateISO: featuredEvent.date || new Date().toISOString(),
                location: featuredLocation,
                ticketUrl: featuredEvent.ticketUrl,
              }
            : null
        }
      />

      <Section>
        <div className="mb-6 flex items-end gap-4 border-b border-white/10 pb-4">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Curated Moment</p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Featured Event</h2>
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-white/15 to-transparent sm:block" />
        </div>
        <div className="grid">
          {featuredEvent ? (
            <FeaturedEventCard event={featuredEvent} />
          ) : (
            <Card className="card-glass p-6">
              <p className="text-sm text-lekki-subtext">Add a featured event in Sanity Studio to show it here.</p>
            </Card>
          )}
        </div>
      </Section>

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
          ].map((item, index) => (
            <Card key={index} className="card-glass p-6">
              <h3 className="font-semibold text-white">{item.h}</h3>
              <p className="mt-2 text-sm text-lekki-subtext">{item.p}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-6 flex items-end gap-4 border-b border-white/10 pb-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{eventHighlights.title}</h2>
            {eventHighlights.subtitle ? (
              <p className="text-sm text-lekki-subtext">{eventHighlights.subtitle}</p>
            ) : null}
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-white/15 to-transparent sm:block" />
        </div>
        <GalleryWall photos={highlightPhotos} />
      </Section>

      <Section id="subscribe" title="Get updates" subtitle="Join the list for early drops and discounts.">
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
              We will only email about events. Unsubscribe anytime.
            </p>
          </form>
        </Card>
      </Section>
    </div>
  );
}
