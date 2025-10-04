import React from 'react';

export function Button({ as: As = 'a', className = '', children, ...props }: any) {
  return (
    <As
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition ${className}`}
      {...props}
    >
      {children}
    </As>
  );
}

export function Pill({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-200 ${className}`}>{children}</span>;
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-zinc-800 bg-zinc-900 shadow-sm ${className}`}>{children}</div>;
}
