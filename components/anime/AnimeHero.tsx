import Image from "next/image";
import Link from "next/link";
import { isSeason, seasonHref, seasonLabel } from "@/lib/seasons";
import type { AnimeDetail } from "@/lib/types";
import { Cover } from "../ui/Cover";

export function AnimeHero({ anime }: { anime: AnimeDetail }) {
  const openings = anime.tracks.filter((t) => t.type === "OP").length;
  const endings = anime.tracks.length - openings;
  const season = anime.year && isSeason(anime.season) ? { year: anime.year, season: anime.season } : null;

  return (
    <header className="relative isolate overflow-hidden border-b-2 border-ink-700">
      {anime.cover && (
        <Image src={anime.cover} alt="" fill sizes="64px" className="-z-20 scale-110 object-cover opacity-40 blur-2xl" />
      )}
      <div className="absolute inset-0 -z-10 bg-speedlines" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/60 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-8 pb-8 sm:flex-row sm:gap-8 sm:pt-14 sm:items-end sm:px-8">
        <Cover
          src={anime.cover}
          alt={anime.name}
          width={208}
          height={277}
          preload
          className="aspect-3/4 w-40 -rotate-2 rounded-xl border-4 border-white shadow-panel sm:w-52"
        />
        <div className="min-w-0">
          <p className="inline-block -skew-x-12 bg-sakura px-3 py-1 text-xs font-black tracking-widest text-ink-950">
            <span className="inline-block skew-x-12">{anime.format ?? "ANIME"} · アニメ</span>
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-wide wrap-break-word drop-shadow-[3px_3px_0_var(--color-ink-950)] sm:text-5xl lg:text-6xl">
            {anime.name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
            {season && (
              <Link
                href={seasonHref(season)}
                className="rounded-lg border-2 border-neon px-2.5 py-1 text-neon transition hover:bg-neon hover:text-ink-950"
              >
                {seasonLabel(season)}
              </Link>
            )}
            <Stat value={openings} label="aberturas" color="text-sakura" />
            <Stat value={endings} label="encerramentos" color="text-neon" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Stat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <span className="rounded-lg border-2 border-ink-700 bg-ink-950/60 px-2.5 py-1 text-ink-300">
      <span className={`font-display ${color}`}>{value}</span> {label}
    </span>
  );
}
