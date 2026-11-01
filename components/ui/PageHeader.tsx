import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  gradient: string;
  kana?: string;
  meta?: ReactNode;
  artwork?: ReactNode;
};

export function PageHeader({ eyebrow, title, gradient, kana, meta, artwork }: PageHeaderProps) {
  return (
    <header className={`relative isolate overflow-hidden bg-linear-to-br ${gradient}`}>
      <div className="absolute inset-0 -z-10 bg-speedlines" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/40 to-transparent" />
      {kana && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-4 right-4 -z-10 font-display text-[6rem] leading-none whitespace-nowrap text-white/10 sm:text-[9rem]"
        >
          {kana}
        </span>
      )}
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-10 pb-8 sm:flex-row sm:pt-14 sm:items-end sm:px-8">
        {artwork}
        <div className="min-w-0">
          <p className="inline-block -skew-x-12 bg-ink-950 px-3 py-1 text-xs font-bold tracking-widest text-neon">
            <span className="inline-block skew-x-12">{eyebrow}</span>
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-wide wrap-break-word min-[400px]:text-4xl drop-shadow-[3px_3px_0_var(--color-ink-950)] sm:text-6xl">
            {title}
          </h1>
          {meta && <div className="mt-3 text-sm text-ink-300">{meta}</div>}
        </div>
      </div>
    </header>
  );
}
