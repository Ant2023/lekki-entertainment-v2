'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const links = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-zinc-950/70 border-b border-zinc-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/images/logo.jpg" alt="LEKKI Entertainment" width={36} height={36} className="rounded-full ring-1 ring-white/10 group-hover:ring-sky-400/40 transition" />
          <span className="text-sm sm:text-base font-extrabold tracking-tight text-white">LEKKI <span className="text-sky-400">Entertainment</span></span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`hover:text-sky-400 transition ${pathname === l.href ? 'text-sky-400 font-semibold' : 'text-zinc-300'}`}>
              {l.label}
            </Link>
          ))}
          <Link
            href="#subscribe"
            className="rounded-full bg-sky-600 px-4 py-2 text-white text-sm font-semibold shadow hover:opacity-90"
          >
            Get Updates
          </Link>
        </nav>
      </div>
    </header>
  );
}
