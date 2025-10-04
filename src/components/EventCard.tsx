import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/date';
import { Button, Card, Pill } from './UI';

export default function EventCard({ e }: { e: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
        <div className="relative h-52 sm:h-full sm:col-span-1">
          <Image src={e.coverImage} alt={e.title} fill className="object-cover" />
        </div>
        <div className="sm:col-span-2 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Pill>{formatDate(e.date)}</Pill>
            <Pill className="bg-sky-50 text-sky-700">{e.city}</Pill>
          </div>
          <h3 className="text-lg font-bold tracking-tight">{e.title}</h3>
          <p className="mt-1 text-sm text-zinc-300 line-clamp-2">{e.description}</p>
          <div className="mt-4 flex items-center gap-3">
            <Button as={Link} href={`/events/${e.slug}`}>Details</Button>
            {e.ticketUrl && (
              <Button as={Link} href={e.ticketUrl} target="_blank" rel="noopener" className="bg-sky-600 text-white">Get Tickets</Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
