import Image from "next/image";
import Link from "next/link";
import { isSeason, seasonHref, seasonLabel } from "@/lib/seasons";
import type { AnimeDetail } from "@/lib/types";
import { Cover } from "../ui/Cover";

export function AnimeHero({ anime }: { anime: AnimeDetail }) {
  const openings = anime.tracks.filter((t) => t.type === "OP").length;
  const endings = anime.tracks.length - openings;

  return (
    <header className="relative isolate overflow-hidden px-4 pt-16 pb-6 sm:px-8">
      {anime.cover && (
        <Image src={anime.cover} alt="" fill sizes="64px" className="-z-10 scale-110 object-cover opacity-30 blur-2xl" />
      )}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-zinc-900" />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
        <Cover
          src={anime.cover}
          alt={anime.name}
          width={208}
          height={277}
          preload
          className="aspect-3/4 w-40 rounded-md shadow-2xl sm:w-52"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold">{anime.format ?? "Anime"}</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">{anime.name}</h1>
          <p className="mt-3 text-sm text-zinc-300">
            {anime.year && isSeason(anime.season) && (
              <>
                <Link
                  href={seasonHref({ year: anime.year, season: anime.season })}
                  className="font-semibold hover:underline"
                >
                  {seasonLabel({ year: anime.year, season: anime.season })}
                </Link>
                {" · "}
              </>
            )}
            {openings} aberturas, {endings} encerramentos
          </p>
        </div>
      </div>
    </header>
  );
}
