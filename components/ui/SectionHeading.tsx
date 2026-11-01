import Link from "next/link";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  href?: string;
  actions?: ReactNode;
};

export function SectionHeading({ title, eyebrow, href, actions }: SectionHeadingProps) {
  return (
    <div className="mb-3 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-rose-400">{eyebrow}</p>}
        <h2 className="text-2xl font-bold">
          {href ? (
            <Link href={href} className="hover:underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
      </div>
      {actions}
      {href && !actions && (
        <Link href={href} className="shrink-0 text-sm font-semibold text-zinc-400 hover:text-white hover:underline">
          Mostrar tudo
        </Link>
      )}
    </div>
  );
}
