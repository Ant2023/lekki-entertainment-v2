export type SanityImageLike = {
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
  alt?: string;
};

export type SanityEvent = {
  _id: string;
  _type: "event";
  title: string;
  slug: {
    current: string;
  };
  date: string;
  venue: string;
  city: string;
  description: string;
  ticketUrl?: string;
  coverImage: SanityImageLike;
  photos?: SanityImageLike[];
};

export type SanityFeaturedEvent = {
  title?: string;
  details?: string;
  buttonLabel?: string;
  ticketUrl?: string;
  venue?: string;
  city?: string;
  date?: string;
  flyer?: SanityImageLike;
};

export type SanityEventHighlights = {
  title?: string;
  subtitle?: string;
  galleryImages?: SanityImageLike[];
};

export type SanitySiteSettings = {
  _id: string;
  featuredEvent?: SanityFeaturedEvent;
  eventHighlights?: SanityEventHighlights;
  galleryImages?: SanityImageLike[];
};
