import Link from "next/link";

import { Card, Pill } from "./UI";
import type { AppFeaturedEvent } from "../sanity/lib/api";

function formatDate(date?: string) {
  if (!date) return null;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function FeaturedEventCard({ event }: { event: AppFeaturedEvent }) {
  const formattedDate = formatDate(event.date);

  return (
    <Card className="overflow-hidden border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
      <div className="grid gap-0 lg:grid-cols-[minmax(320px,420px)_1fr]">
        <div className="relative min-h-[420px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${event.flyer})` }}
            aria-label={event.title}
            role="img"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          <div className="absolute left-5 top-5">
            <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/75 backdrop-blur">
              Featured
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between p-7 sm:p-10">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {formattedDate ? <Pill>{formattedDate}</Pill> : null}
              {event.city ? <Pill className="bg-white/10 text-white/80">{event.city}</Pill> : null}
              {event.venue ? <Pill className="bg-white/10 text-white/80">{event.venue}</Pill> : null}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">This Season</p>
                <h3 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                  {event.title}
                </h3>
              </div>

              {event.details ? (
                <p className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">{event.details}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
            {event.ticketUrl ? (
              <Link
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-[#e2c27a]/35 bg-gradient-to-r from-[#8f6a1f] via-[#b88a2b] to-[#d1a84b] px-6 py-3 text-sm font-semibold text-[#120d05] shadow-[0_14px_34px_rgba(184,138,43,0.28)] transition hover:from-[#9b7321] hover:via-[#c79732] hover:to-[#ddb85a]"
              >
                {event.buttonLabel}
              </Link>
            ) : null}

            <div className="text-sm text-white/45">
              {event.city || event.venue
                ? [event.city, event.venue].filter(Boolean).join(" · ")
                : "Curated by Lekki Entertainment"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
