import EventDetailClient from "./EventDetailClient";
import { getEventBySlug } from "../../../sanity/lib/api";

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  return <EventDetailClient slug={params.slug} serverEvent={event} />;
}
