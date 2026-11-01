import { FORMATS, formatHref, GENRES, genreHref } from "@/lib/categories";
import { getCurrentSeason, recentSeasons, seasonHref, seasonName } from "@/lib/seasons";
import { TileGrid } from "./TileGrid";

const SEASON_COLORS = [
  "from-rose-600 to-orange-500",
  "from-violet-600 to-fuchsia-500",
  "from-sky-600 to-cyan-400",
  "from-emerald-600 to-lime-500",
];

export function GenreTiles({ title = "Todos os gêneros" }: { title?: string }) {
  return (
    <TileGrid
      title={title}
      tiles={GENRES.map((g) => ({ href: genreHref(g.slug), label: g.label, color: g.color }))}
    />
  );
}

export function FormatTiles() {
  return (
    <TileGrid
      title="Por formato"
      tiles={FORMATS.map((f) => ({ href: formatHref(f.slug), label: f.label, color: f.color }))}
    />
  );
}

export async function SeasonTiles({ count = 8 }: { count?: number }) {
  const seasons = recentSeasons(await getCurrentSeason(), count);
  return (
    <TileGrid
      title="Navegar por temporada"
      tiles={seasons.map((s, i) => ({
        href: seasonHref(s),
        label: seasonName(s.season),
        color: SEASON_COLORS[i % SEASON_COLORS.length],
        badge: s.year,
      }))}
    />
  );
}
