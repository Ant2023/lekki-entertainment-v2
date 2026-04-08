"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Section from "../../../components/Section";
import { Button, Pill } from "../../../components/UI";
import { formatDate } from "../../../lib/date";
import { Event } from "../../../data/events";

interface Props {
  slug: string;
  serverEvent: Event | null;
}

export default function EventDetailClient({ slug, serverEvent }: Props) {
  const [event, setEvent] = useState<Event | null>(serverEvent);
  const [loading, setLoading] = useState(!serverEvent);

  useEffect(() => {
    if (serverEvent) return;
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("lekki-events");
    if (stored) {
      try {
        const parsed: Event[] = JSON.parse(stored);
        const found = parsed.find((item) => item.slug === slug) ?? null;
        setEvent(found);
      } catch {
        setEvent(null);
      }
    } else {
      setEvent(null);
    }
    setLoading(false);
  }, [serverEvent, slug]);

  if (loading) {
    return (
      <Section title="Loading event...">
        <p className="text-zinc-400">Fetching details from your browser storage.</p>
      </Section>
    );
  }

  if (!event) {
    return (
      <Section title="Event not found">
        <p className="text-zinc-400">This event doesn’t exist in the CMS or browser storage.</p>
        <Button as={Link} href="/events" className="mt-5 bg-sky-600 text-white">
          Back to events
        </Button>
      </Section>
    );
  }

  return (
    <div>
      <Section title={event.title} subtitle="Event details & tickets">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-2xl border border-zinc-800 shadow sm:h-96">
            <img src={event.coverImage} alt={event.title} className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Pill>{formatDate(event.date)}</Pill>
              <Pill className="bg-sky-50 text-sky-700">{event.city}</Pill>
            </div>
            <p className="mt-3 text-zinc-300">{event.description}</p>
            <p className="mt-3 text-sm text-zinc-400">
              <strong>Venue:</strong> {event.venue}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {event.ticketUrl ? (
                <Button as="a" href={event.ticketUrl} target="_blank" rel="noopener" className="bg-sky-600 text-white">
                  Buy tickets
                </Button>
              ) : null}
              <Button as={Link} href="/events">
                Back to events
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
