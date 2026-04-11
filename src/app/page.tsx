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

type HeroSlideContentProps = {
  badges: string[];
  title: string;
  body: string;
  actions: Array<{
    label: string;
    href: string;
    variant: "primary" | "secondary";
  }>;
};

function CultureIntro() {
  return (
    <div className="bg-[#1b1724]">
      <Section className="pt-8 sm:pt-10">
        <div className="space-y-8 px-1 py-2">
          <div className="space-y-5 text-center sm:text-left">
            <div className="inline-flex items-center rounded-full bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/72">
              More Than A Night Out
            </div>
            <div className="space-y-4">
              <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight text-white sm:mx-0 sm:text-3xl">
                A Space for Culture
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-7 text-white/78 sm:mx-0 sm:text-lg">
                Lekki brings people together through music, style, and atmosphere that feels like home. Every event is
                designed to welcome the diaspora, celebrate culture with intention, and create the kind of nights people
                remember for how they felt, not just how they looked.
              </p>
              <div className="flex justify-center sm:justify-start">
                <Link
                  href="/about"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/18 bg-white/6 px-5 py-2 text-sm font-semibold text-white transition hover:border-[#d4af37]/35 hover:bg-white/10 hover:text-[#f2d17a]"
                >
                  Learn About Lekki
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function HeroSlideContent({ badges, title, body, actions }: HeroSlideContentProps) {
  return (
    <div className="relative max-w-2xl space-y-5 text-white">
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
        {badges.map((item) => (
          <span
            key={item}
            className="rounded-md bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="relative z-10 space-y-3">
        <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">{title}</h2>
        <p className="max-w-xl text-base leading-7 text-white/78 sm:text-lg">
          {body}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-3 sm:justify-start">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={
              action.variant === "primary"
                ? "inline-flex min-h-[48px] items-center justify-center rounded-md border border-[#d4af37]/45 bg-black/75 px-6 py-3 text-sm font-semibold text-[#f2d17a] shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition hover:border-[#e6c76a]/60 hover:bg-black/85 hover:text-[#f7df98]"
                : "inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/18 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#d4af37]/35 hover:bg-white/10 hover:text-[#f2d17a]"
            }
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function LekkiPromo() {
  return (
    <HeroSlideContent
      badges={["Community", "Culture", "Late Nights"]}
      title="For the culture."
      body="Lekki brings together music, energy, and a community that shows up for the full experience."
      actions={[
        { label: "See All Events", href: "/events", variant: "primary" },
        { label: "Join Guestlist", href: "/#subscribe", variant: "secondary" },
      ]}
    />
  );
}

function HeroIntro() {
  return (
    <HeroSlideContent
      badges={["Afrobeats", "Nightlife", "Culture"]}
      title="Welcome to Lekki."
      body="A place that presents refined nightlife experiences across Denver, Aurora, and Colorado Springs."
      actions={[
        { label: "Explore Events", href: "/events", variant: "primary" },
        { label: "View Highlights", href: "/gallery", variant: "secondary" },
      ]}
    />
  );
}

function CommunityEnergy() {
  return (
    <HeroSlideContent
      badges={["Denver", "Dance Floor", "Diaspora"]}
      title="Good people, full energy."
      body="Real moments from nights where the room moves together and the culture feels close."
      actions={[
        { label: "View Highlights", href: "/gallery", variant: "primary" },
        { label: "See Events", href: "/events", variant: "secondary" },
      ]}
    />
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
    <div className="bg-[#15111c]">
      <Hero
        title="LEKKI Entertainment"
        subtitle="Premium Afrobeats, culture, and nightlife in Denver, Aurora, and Colorado Springs"
        images={[
          {
            src: "/images/hero-image2.jpg",
            alt: "Packed Afrobeats crowd",
            content: <HeroIntro />,
            contentWrap: "none",
          },
          {
            src: "/images/djames-denver/denver-13.jpg",
            alt: "Lekki crowd celebrating on the dance floor",
            content: <CommunityEnergy />,
            contentWrap: "none",
          },
          {
            src: "/images/lekki-hero.jpg",
            alt: "Lekki hero atmosphere",
            content: <LekkiPromo />,
            contentWrap: "none",
          },
        ]}
        overlayOpacity={0.58}
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

      <div className="bg-[#20172c]">
        <Section>
          <div className="mb-6 flex items-end gap-4 border-b border-white/10 pb-4">
            <div className="space-y-2 text-center sm:text-left">
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
      </div>

      <div className="bg-[#171520]">
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
              <Card key={index} className="card-glass p-6 text-center sm:text-left">
                <h3 className="font-semibold text-white">{item.h}</h3>
                <p className="mt-2 text-sm text-lekki-subtext">{item.p}</p>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      <div className="bg-[#241834]">
        <Section>
          <div className="mb-6 flex items-end gap-4 border-b border-white/10 pb-4">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{eventHighlights.title}</h2>
              {eventHighlights.subtitle ? <p className="text-base leading-7 text-white/78 sm:text-lg">{eventHighlights.subtitle}</p> : null}
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
                      <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-white">{card.title}</h3>
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
      </div>

      <div className="bg-[#17121e]">
        <Section id="subscribe" title="Get updates" subtitle="Join the list for early drops and discounts." className="text-center sm:text-left">
          <Card className="bg-lekki-panel/50 p-6 text-left ring-1 ring-white/5">
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

      <div className="bg-[#15111c] px-4 pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-[0_18px_60px_rgba(0,0,0,0.32)]">
          <div className="relative aspect-square">
            <Image
              src="/images/wande-coal-denver/IMG_0549.jpg"
              alt="Guest enjoying a Lekki nightlife event"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
