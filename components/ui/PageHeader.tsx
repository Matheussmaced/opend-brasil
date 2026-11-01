import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  gradient: string;
  meta?: ReactNode;
  artwork?: ReactNode;
};

export function PageHeader({ eyebrow, title, gradient, meta, artwork }: PageHeaderProps) {
  return (
    <header className={`flex flex-col gap-6 bg-linear-to-b px-4 pb-8 pt-12 sm:flex-row sm:items-end sm:px-8 ${gradient}`}>
      {artwork}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white/80">{eyebrow}</p>
        <h1 className="mt-1 text-4xl font-black tracking-tight drop-shadow sm:text-6xl">{title}</h1>
        {meta && <div className="mt-3 text-sm text-zinc-200">{meta}</div>}
      </div>
    </header>
  );
}
