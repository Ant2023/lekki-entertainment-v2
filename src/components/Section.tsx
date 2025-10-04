import React from 'react';
export default function Section({ id, title, subtitle, children }: { id?: string; title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="fade-in mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {title && (
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{title}</h2>
          {subtitle && <p className="mt-2 text-zinc-300">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
