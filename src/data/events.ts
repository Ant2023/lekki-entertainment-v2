export type EventPhoto = { src: string; alt?: string };
export type Event = {
  slug: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  description: string;
  coverImage: string;
  ticketUrl?: string;
  photos?: EventPhoto[];
};

export const events: Event[] = [
  // PAST — Denver (photos supplied)
  {
    slug: 'nigerian-independence-denver-2025',
    title: 'Nigerian Independence Celebration — Denver ft. DJames (UK)',
    date: '2025-10-01',
    venue: 'Orchid Denver',
    city: 'Denver, CO',
    description: 'Thank you Denver! A packed night of Afrobeats with DJames — highlights in the gallery.',
    coverImage: '/images/djames-denver/denver-1.jpg',
    photos: [
      { src: '/images/djames-denver/denver-1.jpg' },
      { src: '/images/djames-denver/denver-2.jpg' },
      { src: '/images/djames-denver/denver-3.jpg' },
      { src: '/images/djames-denver/denver-4.jpg' },
      { src: '/images/djames-denver/denver-5.jpg' },
      { src: '/images/djames-denver/denver-6.jpg' },
      { src: '/images/djames-denver/denver-7.jpg' },
      { src: '/images/djames-denver/denver-8.jpg' },
      { src: '/images/djames-denver/denver-9.jpg' },
    ],
  },

  // UPCOMING — Colorado Springs (flyer)
  {
    slug: 'nigerian-independence-colorado-springs-2025',
    title: 'Nigerian Independence Party — Colorado Springs (Part II)',
    date: '2025-10-04',
    venue: 'Loggy B Owambe African Lounge',
    city: 'Colorado Springs, CO',
    description: 'Loggy B Promotion Party • 9PM–2AM • $15 • For reservations: +1 (719) 216‑8428 / 206‑890‑4428 • 10 N Sierra Madre St.',
    coverImage: '/images/cos-flyer/flyer.jpg',
    ticketUrl: 'https://event.getbookt.io/colorado-springs-nigerian-independence-party',
    photos: [],
  },
];
