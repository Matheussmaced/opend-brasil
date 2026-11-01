import Link from "next/link";
import { SITE } from "@/lib/site";

export function Logo() {
  return (
    <Link href="/" aria-label={`${SITE.name} — início`} className="group flex min-w-0 items-center gap-3">
      <span className="grid size-10 shrink-0 rotate-45 place-items-center rounded-lg bg-linear-to-br from-sakura to-neon shadow-[0_0_20px_-4px_var(--color-sakura)] transition duration-500 group-hover:rotate-[225deg]">
        <span className="-rotate-45 font-display text-sm tracking-tighter text-ink-950">{SITE.mark}</span>
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-display text-lg tracking-wide">{SITE.name}</span>
        <span className="block truncate text-[10px] tracking-[0.2em] text-sakura-soft">OP &amp; ED · アニソン</span>
      </span>
    </Link>
  );
}
