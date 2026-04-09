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
  {
    slug: "nigerian-independence-denver-2025",
    title: "Nigerian Independence Celebration - Denver ft. DJames (UK)",
    date: "2025-10-01",
    venue: "Orchid Denver",
    city: "Denver, CO",
    description: "Thank you Denver. A packed night of Afrobeats with DJames and a full gallery recap.",
    coverImage: "/images/djames-denver/denver-1.jpg",
    photos: [
      { src: "/images/djames-denver/denver-1.jpg" },
      { src: "/images/djames-denver/denver-2.jpg" },
      { src: "/images/djames-denver/denver-3.jpg" },
    ],
  },
  {
    slug: "wande-coal-dj-spinal-live-denver-2024",
    title: "Wande Coal and DJ Spinal Live in Denver",
    date: "2024-10-01",
    venue: "Denver, CO",
    city: "Denver, CO",
    description: "Live moments from the Denver stop featuring Wande Coal and DJ Spinal.",
    coverImage: "/images/wande-coal-denver/IMG_0530.jpg",
    photos: [
      { src: "/images/wande-coal-denver/IMG_0530.jpg" },
      { src: "/images/wande-coal-denver/IMG_0532.jpg" },
      { src: "/images/wande-coal-denver/IMG_0533.jpg" },
      { src: "/images/wande-coal-denver/IMG_0535.jpg" },
      { src: "/images/wande-coal-denver/IMG_0536.jpg" },
      { src: "/images/wande-coal-denver/IMG_0537.jpg" },
      { src: "/images/wande-coal-denver/IMG_0538.jpg" },
      { src: "/images/wande-coal-denver/IMG_0539.jpg" },
      { src: "/images/wande-coal-denver/IMG_0541.jpg" },
      { src: "/images/wande-coal-denver/IMG_0542.jpg" },
      { src: "/images/wande-coal-denver/IMG_0543.jpg" },
      { src: "/images/wande-coal-denver/IMG_0544.jpg" },
      { src: "/images/wande-coal-denver/IMG_0545.jpg" },
      { src: "/images/wande-coal-denver/IMG_0546.jpg" },
      { src: "/images/wande-coal-denver/IMG_0547.jpg" },
      { src: "/images/wande-coal-denver/IMG_0548.jpg" },
      { src: "/images/wande-coal-denver/IMG_0549.jpg" },
      { src: "/images/wande-coal-denver/IMG_0550.jpg" },
    ],
  },
  {
    slug: "davido-afterparty-dj-ecool-2025",
    title: "Davido Afterparty Hosted by DJ Ecool",
    date: "2025-07-19",
    venue: "Denver, CO",
    city: "Denver, CO",
    description: "Late-night highlights from the Davido afterparty hosted by DJ Ecool.",
    coverImage: "/images/djames-denver/denver-7.jpg",
    photos: [
      { src: "/images/djames-denver/denver-7.jpg" },
      { src: "/images/djames-denver/denver-8.jpg" },
      { src: "/images/djames-denver/denver-9.jpg" },
    ],
  },
  {
    slug: "nigerian-independence-colorado-springs-2025",
    title: "Nigerian Independence Party - Colorado Springs (Part II)",
    date: "2025-10-04",
    venue: "Loggy B Owambe African Lounge",
    city: "Colorado Springs, CO",
    description:
      "Loggy B Promotion Party. 9PM-2AM. $15. For reservations: +1 (719) 216-8428 / 206-890-4428. 10 N Sierra Madre St.",
    coverImage: "/images/cos-flyer/flyer.jpg",
    ticketUrl: "https://event.getbookt.io/colorado-springs-nigerian-independence-party",
    photos: [],
  },
];
