import Image from "next/image";
import Link from "next/link";

import FeaturedEventCard from "../components/FeaturedEventCard";
import Hero from "../components/EnhancedHero";
import Section from "../components/Section";
import { Card } from "../components/UI";
import { formatDate } from "../lib/date";
import { events as localEvents } from "../data/events";
import { getSiteSettings } from "../sanity/lib/api";

export const revalidate = 30;

type HighlightCard = {
  slug: string;
  title: string;
  date: string;
  city: string;
  imageSrc: string;
  imageAlt: string;
};

function CultureIntro() {
  return (
    <Section className="pt-8 sm:pt-10">
      <div className="space-y-8 px-1 py-2">
        <div className="space-y-5">
          <div className="inline-flex items-center rounded-full bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/72">
            More Than A Night Out
          </div>
          <div className="space-y-4">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              A Space for Culture
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-white/68 sm:text-[15px]">
              Lekki brings people together through music, style, and atmosphere that feels like home. Every event is
              designed to welcome the diaspora, celebrate culture with intention, and create the kind of nights people
              remember for how they felt, not just how they looked.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function LekkiPromo() {
  return (
    <div className="relative max-w-xl space-y-4 text-white">
      <div className="pointer-events-none absolute -right-3 -top-2 sm:-right-8 sm:-top-10" aria-hidden>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#d4af37]/18 blur-3xl" />
          <Image
            src="/images/logo-luxury.jpg"
            alt="Lekki Luxury logo"
            width={280}
            height={280}
            className="relative h-auto w-[128px] object-contain opacity-55 mix-blend-screen drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:w-[190px] sm:opacity-45"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
        {["Community", "Culture", "Late Nights"].map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="relative z-10 space-y-3">
        <h3 className="max-w-2xl text-2xl font-semibold leading-snug text-white sm:text-4xl">
          For the culture.
        </h3>
        <p className="max-w-xl text-sm leading-6 text-white/72 sm:text-base">
          Lekki brings together music, energy, and a community that shows up for the full experience.
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-3 sm:justify-start">
        <Link
          href="/events"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-[#d4af37]/45 bg-black/75 px-6 py-3 text-sm font-semibold text-[#f2d17a] shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition hover:border-[#e6c76a]/60 hover:bg-black/85 hover:text-[#f7df98]"
        >
          See All Events
        </Link>
        <Link
          href="/#subscribe"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/18 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#d4af37]/35 hover:bg-white/10 hover:text-[#f2d17a]"
        >
          Join Guestlist
        </Link>
      </div>
    </div>
  );
}

function HeroIntro() {
  return (
    <div className="relative max-w-xl space-y-4 text-white">
      <div className="pointer-events-none absolute -right-3 -top-2 sm:-right-8 sm:-top-10" aria-hidden>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#d4af37]/18 blur-3xl" />
          <Image
            src="/images/logo-luxury.jpg"
            alt="Lekki Luxury logo"
            width={280}
            height={280}
            className="relative h-auto w-[128px] object-contain opacity-55 mix-blend-screen drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:w-[190px] sm:opacity-45"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
        {["Afrobeats", "Nightlife", "Culture"].map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="relative z-10 space-y-3">
        <h1 className="max-w-2xl text-2xl font-semibold leading-snug text-white sm:text-4xl">
          Afrobeats nights, elevated.
        </h1>
        <p className="max-w-xl text-sm leading-6 text-white/72 sm:text-base">
          Lekki Entertainment presents refined nightlife experiences across Denver, Aurora, and Colorado Springs.
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-3 sm:justify-start">
        <Link
          href="/events"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-[#d4af37]/45 bg-black/75 px-6 py-3 text-sm font-semibold text-[#f2d17a] shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition hover:border-[#e6c76a]/60 hover:bg-black/85 hover:text-[#f7df98]"
        >
          Explore Events
        </Link>
        <Link
          href="/gallery"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/18 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#d4af37]/35 hover:bg-white/10 hover:text-[#f2d17a]"
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
  const highlightCards: HighlightCard[] = localEvents
    .filter((event) => event.photos && event.photos.length > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((event) => ({
      slug: event.slug,
      title: event.title,
      date: event.date,
      city: event.city,
      imageSrc: event.photos?.[0]?.src || event.coverImage,
      imageAlt: event.photos?.[0]?.alt || `${event.title} gallery preview`,
    }))
    .slice(0, 3);

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
            src: "/images/lekki-hero.jpg",
            alt: "Lekki hero atmosphere",
            content: <LekkiPromo />,
            contentWrap: "none",
          },
        ]}
        overlayOpacity={0.66}
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

      <CultureIntro />

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

        {highlightCards.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {highlightCards.map((card, index) => (
              <Link
                key={card.slug}
                href={`/gallery#${card.slug}`}
                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 space-y-2 p-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">{card.city}</p>
                    <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/72">{formatDate(card.date)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="card-glass p-6">
            <p className="text-sm text-lekki-subtext">
              Add event photos in Sanity Studio to show clickable event galleries here.
            </p>
          </Card>
        )}
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
            <button className="rounded-xl border border-[#e2c27a]/35 bg-gradient-to-r from-[#8f6a1f] via-[#b88a2b] to-[#d1a84b] px-4 py-2 font-semibold text-[#120d05] shadow-[0_12px_30px_rgba(184,138,43,0.24)] transition hover:from-[#9b7321] hover:via-[#c79732] hover:to-[#ddb85a]">
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
