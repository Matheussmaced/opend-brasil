import { PillLink } from "../ui/PillLink";

export function HomeHero() {
  return (
    <header className="relative isolate overflow-hidden rounded-3xl border-2 border-ink-700 bg-linear-to-br from-ink-700 via-ink-800 to-ink-950 px-5 py-8 sm:px-10 sm:py-14">
      <div className="absolute inset-0 -z-10 bg-speedlines" />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 -right-4 -z-10 font-display text-[7rem] leading-none text-sakura/15 sm:text-[11rem]"
      >
        アニソン
      </span>
      <span aria-hidden className="absolute top-6 right-10 size-4 animate-float rotate-45 bg-sun max-sm:hidden" />
      <span
        aria-hidden
        className="absolute right-32 bottom-8 size-3 animate-float rotate-45 bg-neon [animation-delay:1s] max-sm:hidden"
      />

      <p className="inline-block -skew-x-12 bg-sakura px-3 py-1 text-xs font-black tracking-widest text-ink-950">
        <span className="inline-block skew-x-12">OP · ED · 主題歌</span>
      </p>
      <h1 className="mt-4 max-w-2xl font-display text-3xl leading-tight min-[400px]:text-4xl tracking-wide drop-shadow-[3px_3px_0_var(--color-ink-950)] sm:text-6xl">
        Aberturas <span className="text-sakura">&amp;</span> encerramentos
      </h1>
      <p className="mt-3 max-w-xl text-ink-300">
        Ouça como playlist ou assista ao clipe das OPs e EDs dos seus animes favoritos.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <PillLink href="/search">Buscar anime</PillLink>
        <PillLink href="/curtidas" variant="outline">
          Minhas curtidas
        </PillLink>
      </div>
    </header>
  );
}
