import Link from "next/link";
import { LETTERS, letterHref } from "@/lib/categories";

export function LetterBar({ active }: { active?: string }) {
  return (
    <nav aria-label="Animes por letra" className="flex flex-wrap gap-1">
      {LETTERS.map((letter) => (
        <Link
          key={letter}
          href={letterHref(letter)}
          aria-current={letter === active ? "page" : undefined}
          className="grid size-8 place-items-center rounded-md bg-white/5 text-sm font-bold text-zinc-300 transition hover:bg-white/15 hover:text-white aria-[current=page]:bg-rose-500 aria-[current=page]:text-black"
        >
          {letter}
        </Link>
      ))}
    </nav>
  );
}
