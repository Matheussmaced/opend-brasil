import Link from "next/link";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  kana?: string;
  eyebrow?: string;
  href?: string;
  actions?: ReactNode;
};

export function SectionHeading({ title, kana, eyebrow, href, actions }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-stretch gap-3">
        <span className="w-1.5 -skew-x-12 rounded-sm bg-linear-to-b from-sakura to-neon" />
        <div>
          {(eyebrow || kana) && (
            <p className="text-xs font-bold tracking-widest text-neon">
              {eyebrow}
              {kana && <span className="ml-2 text-sakura-soft/80">{kana}</span>}
            </p>
          )}
          <h2 className="font-display text-2xl tracking-wide">
            {href ? (
              <Link href={href} className="decoration-sakura decoration-2 underline-offset-4 hover:underline">
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
        </div>
      </div>
      {actions}
      {href && !actions && (
        <Link
          href={href}
          className="shrink-0 -skew-x-12 border-2 border-ink-700 px-3 py-1 text-xs font-bold text-ink-300 transition hover:border-neon hover:text-neon"
        >
          <span className="inline-block skew-x-12">Ver tudo →</span>
        </Link>
      )}
    </div>
  );
}
