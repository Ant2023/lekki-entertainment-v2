import { formatDate } from '../lib/date';
import { Button, Card, Pill } from './UI';

export default function EventCard({ e }: { e: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition">
      <div className="grid grid-cols-1 sm:grid-cols-[240px_minmax(0,1fr)] gap-0">
        <div className="relative h-56 sm:h-56 overflow-hidden bg-zinc-950">
          <img src={e.coverImage} alt={e.title} className="h-full w-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Pill>{formatDate(e.date)}</Pill>
            <Pill className="bg-sky-50 text-sky-700">{e.city}</Pill>
          </div>
          <h3 className="text-lg font-bold tracking-tight">{e.title}</h3>
          <p className="mt-1 text-sm text-zinc-300 line-clamp-3">{e.description}</p>
          <p className="mt-3 text-sm text-zinc-400">{e.venue}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {e.ticketUrl ? (
              <Button as="a" href={e.ticketUrl} target="_blank" rel="noopener" className="bg-sky-600 text-white">
                Get Tickets
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
