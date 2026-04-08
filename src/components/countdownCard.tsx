"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function useCountdown(targetIso: string) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const target = useMemo(() => new Date(targetIso), [targetIso]);
  const diff = Math.max(0, target.getTime() - now.getTime());

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    isOver: diff <= 0,
    target,
  };
}

type Props = {
  title: string;
  startsAt: string;
  href?: string;
  buttonLabel?: string;
  className?: string;
  onReachedZero?: () => void;
};

export default function CountdownCard({
  title,
  startsAt,
  href,
  buttonLabel = "Get Tickets",
  className = "",
  onReachedZero,
}: Props) {
  const { days, hours, minutes, seconds, isOver, target } = useCountdown(startsAt);

  if (process.env.NODE_ENV !== "production") {
    console.assert(!Number.isNaN(target.getTime()), "[CountdownCard] startsAt must be a valid ISO datetime");
    console.assert(typeof title === "string" && title.length > 0, "[CountdownCard] title is required");
  }

  useEffect(() => {
    if (isOver && onReachedZero) onReachedZero();
  }, [isOver, onReachedZero]);

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur ${className}`}>
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">Next Up: {title}</h3>
          {href ? (
            <Link href={href} className="text-sm text-fuchsia-300 underline underline-offset-4 hover:text-fuchsia-200">
              View details
            </Link>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 p-4 text-white">
        {isOver ? (
          <div className="text-lg">We&apos;re live! Doors are open.</div>
        ) : (
          <div className="flex items-center gap-3">
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Mins", value: minutes },
              { label: "Secs", value: seconds },
            ].map(({ label, value }) => (
              <div key={label} className="min-w-[72px] rounded-xl border border-white/10 bg-black/30 p-3 text-center">
                <div className="text-2xl font-semibold tabular-nums">{String(value).padStart(2, "0")}</div>
                <div className="text-xs text-white/70">{label}</div>
              </div>
            ))}
          </div>
        )}

        {href ? (
          <div className="ml-auto">
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-500"
            >
              {buttonLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
