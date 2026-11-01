import { SITE } from "@/lib/site";
import { LikedPlaylistLink } from "./LikedPlaylistLink";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function SidebarContent({ showLogo = true }: { showLogo?: boolean }) {
  return (
    <div className="relative flex h-full flex-col gap-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-speedlines opacity-40" />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-10 -left-2 font-display text-[6rem] leading-none text-white/4 [writing-mode:vertical-rl]"
      >
        {SITE.decoration}
      </span>

      {showLogo && (
        <div className="relative">
          <Logo />
        </div>
      )}

      <div className="relative">
        <NavLinks />
      </div>

      <section className="relative space-y-3">
        <h2 className="px-1 text-xs font-bold tracking-widest text-neon">
          SUA BIBLIOTECA <span className="ml-1 text-sakura-soft/70">ライブラリ</span>
        </h2>
        <LikedPlaylistLink />
      </section>

      <Credits />
    </div>
  );
}

function Credits() {
  return (
    <p className="relative mt-auto px-1 text-[11px] leading-relaxed text-ink-300">
      Aberturas e encerramentos de{" "}
      <a href="https://animethemes.moe" target="_blank" rel="noreferrer" className="text-neon hover:underline">
        AnimeThemes.moe
      </a>
      . Gêneros via{" "}
      <a href="https://anilist.co" target="_blank" rel="noreferrer" className="text-neon hover:underline">
        AniList
      </a>
      .
    </p>
  );
}
