import Link from "next/link";
import { LikedPlaylistLink } from "./LikedPlaylistLink";
import { NavLinks } from "./NavLinks";

export function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col gap-2 max-md:hidden">
      <nav className="rounded-lg bg-zinc-900 p-3">
        <Link href="/" className="mb-3 flex items-center gap-2 px-3 pt-1 text-lg font-black tracking-tight">
          <span className="grid size-7 place-items-center rounded-full bg-rose-500 text-xs text-black">OP</span>
          Animes Ceará
        </Link>
        <NavLinks variant="sidebar" />
      </nav>

      <section className="flex min-h-0 flex-1 flex-col rounded-lg bg-zinc-900 p-3">
        <h2 className="px-3 py-2 text-sm font-semibold text-zinc-300">Sua biblioteca</h2>
        <LikedPlaylistLink />
        <Credits />
      </section>
    </aside>
  );
}

function Credits() {
  return (
    <p className="mt-auto px-3 pt-4 text-[11px] leading-relaxed text-zinc-500">
      Aberturas e encerramentos fornecidos por{" "}
      <a href="https://animethemes.moe" target="_blank" rel="noreferrer" className="underline hover:text-zinc-300">
        AnimeThemes.moe
      </a>
      . Gêneros via{" "}
      <a href="https://anilist.co" target="_blank" rel="noreferrer" className="underline hover:text-zinc-300">
        AniList
      </a>
      .
    </p>
  );
}
