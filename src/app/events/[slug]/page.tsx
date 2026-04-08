"use client";

import EventDetailClient from "./EventDetailClient";

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  return <EventDetailClient slug={params.slug} serverEvent={null} />;
}
