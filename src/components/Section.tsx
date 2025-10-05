"use client";
import { useEffect, useRef, useState } from "react";

// tiny class joiner (replaces 'clsx')
function cx(...a: (string | false | null | undefined)[]) {
  return a.filter(Boolean).join(" ");
}

type Props = {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
};

/** Small, dependency-free reveal on scroll (respects reduced motion) */
function useReveal<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.14 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return { ref, visible };
}

export default function Section({ id, title, subtitle, className, children }: Props) {
  const head = useReveal<HTMLDivElement>(true);
  const body = useReveal<HTMLDivElement>(true);

  return (
    <section id={id} className={cx("mx-auto max-w-6xl px-4 py-10 sm:py-12", className)}>
      {(title || subtitle) && (
        <div
          ref={head.ref}
          className={cx(
            "mb-6 transition-all duration-500",
            head.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
        >
          {title && <h2 className="text-xl font-semibold text-white/90 sm:text-2xl">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-lekki-subtext">{subtitle}</p>}
        </div>
      )}

      <div
        ref={body.ref}
        className={cx(
          "transition-all duration-500 delay-100",
          body.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        {children}
      </div>
    </section>
  );
}
