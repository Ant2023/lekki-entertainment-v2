"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

/** ✅ Minimal, dependency-free countdown hook */
function useCountdown(targetIso: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const target = useMemo(() => new Date(targetIso), [targetIso]);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  const seconds = Math.floor((diff / 1_000) % 60);

  return { days, hours, minutes, seconds, isOver: diff <= 0, target, now };
}

type Props = {
  title: string;
  /** ISO string w/ timezone, e.g. "2025-10-04T22:00:00-06:00" */
  startsAt: string;
  href: string; // external ticket link or internal /events/[slug]
  className?: string;
  onReachedZero?: () => void; // optional behavior at 0
};

export default function CountdownCard({
  title,
  startsAt,
  href,
  className = "",
  onReachedZero,
}: Props) {
  const { days, hours, minutes, seconds, isOver, target } = useCountdown(startsAt);

  // ---- dev “tests” / sanity checks (no external test runner needed) ----
  if (process.env.NODE_ENV !== "production") {
    console.assert(!Number.isNaN(target.getTime()), "[CountdownCard] startsAt must be a valid ISO datetime");
    console.assert(typeof href === "string" && href.length > 0, "[CountdownCard] href is required");
    console.assert(typeof title === "string" && title.length > 0, "[CountdownCard] title is required");
  }

  useEffect(() => {
    if (isOver && onReachedZero) onReachedZero();
  }, [isOver, onReachedZero]);

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur ${className}`}>
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-lg font-semibold">Next Up: {title}</h3>
          <Link href={href} className="text-sm text-fuchsia-300 underline underline-offset-4 hover:text-fuchsia-200">
            View details →
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 p-4 text-white">
        {isOver ? (
          <div className="text-lg">We’re live! Doors are open 🎉</div>
        ) : (
          <div className="flex items-center gap-3">
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Mins", value: minutes },
              { label: "Secs", value: seconds },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="min-w-[72px] rounded-xl border border-white/10 bg-black/30 p-3 text-center"
              >
                <div className="text-2xl font-semibold tabular-nums">{String(value).padStart(2, "0")}</div>
                <div className="text-xs text-white/70">{label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="ml-auto">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-xl bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-500 border border-white/10"
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}
