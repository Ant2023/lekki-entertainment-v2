import groq from "groq";

import { urlForImage } from "./image";
import { client } from "./client";
import type {
  SanityEventHighlights,
  SanityFeaturedEvent,
  SanityImageLike,
  SanitySiteSettings,
  SanityEvent,
} from "../types";

export type AppEventPhoto = {
  src: string;
  alt: string;
};

export type AppGalleryImage = {
  src: string;
  alt: string;
};

export type AppEvent = {
  slug: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  description: string;
  coverImage: string;
  ticketUrl?: string;
  photos?: AppEventPhoto[];
};

export type AppFeaturedEvent = {
  title: string;
  details?: string;
  buttonLabel: string;
  ticketUrl?: string;
  venue?: string;
  city?: string;
  date?: string;
  flyer: string;
};

export type AppSiteSettings = {
  featuredEvent: AppFeaturedEvent | null;
  eventHighlights: {
    title: string;
    subtitle?: string;
    galleryImages: AppGalleryImage[];
  };
};

function mapGalleryImage(image: SanityImageLike, fallbackAlt: string): AppGalleryImage | null {
  const src = urlForImage(image)?.width(1600).height(1200).fit("crop").url();
  if (!src) return null;

  return {
    src,
    alt: image.alt || fallbackAlt,
  };
}

export const EVENTS_QUERY = groq`
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    venue,
    city,
    description,
    ticketUrl,
    coverImage {
      ...,
      asset->
    },
    photos[] {
      ...,
      asset->
    }
  }
`;

function mapFeaturedEvent(featuredEvent?: SanityFeaturedEvent): AppFeaturedEvent | null {
  if (!featuredEvent?.title && !featuredEvent?.flyer) return null;

  return {
    title: featuredEvent.title || "Featured Event",
    details: featuredEvent.details,
    buttonLabel: featuredEvent.buttonLabel || "Get Tickets",
    ticketUrl: featuredEvent.ticketUrl,
    venue: featuredEvent.venue,
    city: featuredEvent.city,
    date: featuredEvent.date,
    flyer:
      urlForImage(featuredEvent.flyer)?.width(1600).height(2000).fit("crop").url() ||
      "/images/hero-dj.jpg",
  };
}

function mapEventHighlights(eventHighlights?: SanityEventHighlights, legacyGalleryImages?: SanityImageLike[]) {
  const galleryImages = (eventHighlights?.galleryImages || legacyGalleryImages || [])
    .map((image, index) => mapGalleryImage(image, `Gallery image ${index + 1}`))
    .filter((image): image is AppGalleryImage => Boolean(image));

  return {
    title: eventHighlights?.title || "Event Highlights",
    subtitle: eventHighlights?.subtitle,
    galleryImages,
  };
}

export function mapSiteSettings(siteSettings: SanitySiteSettings | null | undefined): AppSiteSettings {
  return {
    featuredEvent: mapFeaturedEvent(siteSettings?.featuredEvent),
    eventHighlights: mapEventHighlights(siteSettings?.eventHighlights, siteSettings?.galleryImages),
  };
}

function mapEvent(event: SanityEvent): AppEvent | null {
  const coverImage = urlForImage(event.coverImage)?.width(800).height(600).fit("crop").url();
  if (!coverImage) return null;

  const photos = event.photos
    ?.map((photo, index) => {
      const src = urlForImage(photo)?.width(1600).height(1200).fit("crop").url();
      if (!src) return null;
      return {
        src,
        alt: photo.alt || `Event photo ${index + 1}`,
      };
    })
    .filter((photo): photo is AppEventPhoto => Boolean(photo));

  return {
    slug: event.slug.current,
    title: event.title,
    date: event.date,
    venue: event.venue,
    city: event.city,
    description: event.description,
    coverImage,
    ticketUrl: event.ticketUrl,
    photos,
  };
}

export async function getEvents(): Promise<AppEvent[]> {
  try {
    const sanityEvents = await client.fetch<SanityEvent[]>(EVENTS_QUERY);
    return sanityEvents
      .map(mapEvent)
      .filter((event): event is AppEvent => Boolean(event));
  } catch (error) {
    console.error("Failed to load events from Sanity:", error);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<AppEvent | null> {
  try {
    const sanityEvent = await client.fetch<SanityEvent | null>(
      groq`*[_type == "event" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        date,
        venue,
        city,
        description,
        ticketUrl,
        coverImage {
          ...,
          asset->
        },
        photos[] {
          ...,
          asset->
        }
      }`,
      { slug }
    );
    return sanityEvent ? mapEvent(sanityEvent) : null;
  } catch (error) {
    console.error("Failed to load event from Sanity:", error);
    return null;
  }
}

export async function getSiteSettings(): Promise<AppSiteSettings> {
  try {
    const sanitySiteSettings = await client.fetch<SanitySiteSettings | null>(
      groq`*[_type == "siteSettings"][0] {
        featuredEvent {
          title,
          details,
          date,
          venue,
          city,
          buttonLabel,
          ticketUrl,
          flyer {
            ...,
            asset->
          }
        },
        eventHighlights {
          title,
          subtitle,
          galleryImages[] {
            ...,
            asset->
          }
        },
        galleryImages[] {
          ...,
          asset->
        }
      }`
    );
    return mapSiteSettings(sanitySiteSettings);
  } catch (error) {
    console.error("Failed to load site settings from Sanity:", error);
    return mapSiteSettings(null);
  }
}
