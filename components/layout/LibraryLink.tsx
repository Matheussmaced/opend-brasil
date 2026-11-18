import Link from "next/link";
import type { ReactNode } from "react";

type LibraryLinkProps = { href: string; title: string; subtitle: string; artwork: ReactNode };

export function LibraryLink({ href, title, subtitle, artwork }: LibraryLinkProps) {
  return (
    <Link
      href={href}
      className="group flex shrink-0 items-center gap-3 rounded-xl border-2 border-ink-700 bg-ink-800/60 p-2 transition hover:border-sakura"
    >
      <span className="shrink-0 transition group-hover:-rotate-6">{artwork}</span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold">{title}</span>
        <span className="block text-xs text-ink-300">{subtitle}</span>
      </span>
    </Link>
  );
}
