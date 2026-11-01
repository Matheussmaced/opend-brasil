import Link from "next/link";
import { LETTERS, letterHref } from "@/lib/categories";

export function LetterBar({ active }: { active?: string }) {
  return (
    <nav aria-label="Animes por letra" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
      {LETTERS.map((letter) => (
        <Link
          key={letter}
          href={letterHref(letter)}
          aria-current={letter === active ? "page" : undefined}
          className="grid size-9 shrink-0 place-items-center sm:size-8 rounded-lg border-2 border-ink-700 bg-ink-900/80 font-display text-sm text-ink-300 transition hover:-translate-y-0.5 hover:border-neon hover:text-neon aria-[current=page]:border-sun aria-[current=page]:bg-sun aria-[current=page]:text-ink-950"
        >
          {letter}
        </Link>
      ))}
    </nav>
  );
}
