import { FORMATS, formatHref, GENRES, genreHref, type Category } from "@/lib/categories";
import { getCurrentSeason, recentSeasons, seasonHref, seasonName, type Season } from "@/lib/seasons";
import { TileGrid, type Tile } from "./TileGrid";

const SEASON_STYLE: Record<Season, { kana: string; color: string }> = {
  Winter: { kana: "冬", color: "from-sky-500 to-indigo-700" },
  Spring: { kana: "春", color: "from-pink-400 to-rose-600" },
  Summer: { kana: "夏", color: "from-amber-400 to-orange-600" },
  Fall: { kana: "秋", color: "from-orange-600 to-red-800" },
};

function toTiles(categories: Category[], href: (slug: string) => string): Tile[] {
  return categories.map((c) => ({ href: href(c.slug), label: c.label, kana: c.kana, color: c.color }));
}

export function GenreTiles({ title = "Todos os gêneros" }: { title?: string }) {
  return <TileGrid title={title} kana="ジャンル" tiles={toTiles(GENRES, genreHref)} />;
}

export function FormatTiles() {
  return <TileGrid title="Por formato" kana="フォーマット" tiles={toTiles(FORMATS, formatHref)} />;
}

export async function SeasonTiles({ count = 8 }: { count?: number }) {
  const seasons = recentSeasons(await getCurrentSeason(), count);
  return (
    <TileGrid
      title="Navegar por temporada"
      kana="シーズン"
      tiles={seasons.map((s) => ({
        href: seasonHref(s),
        label: seasonName(s.season),
        badge: s.year,
        ...SEASON_STYLE[s.season],
      }))}
    />
  );
}
