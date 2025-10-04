import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold">LEKKI Entertainment</p>
            <p className="text-zinc-400 text-sm">Curating Afro beats, culture & premium nightlife experiences.</p>
          </div>
          <div className="text-sm flex items-center gap-4 text-zinc-300">
            <Link href="/events" className="hover:text-sky-400">Events</Link>
            <Link href="/gallery" className="hover:text-sky-400">Gallery</Link>
            <a href="#subscribe" className="hover:text-sky-400">Subscribe</a>
          </div>
        </div>
        <p className="mt-6 text-xs text-zinc-500">© {new Date().getFullYear()} LEKKI Entertainment. All rights reserved.</p>
      </div>
    </footer>
  );
}
