import type { AnimeSummary, Track } from "../types";
import type { RawAnime, RawImage, RawTheme, RawVideo } from "./raw-types";

const THEME_ORDER: Record<string, number> = { OP: 0, ED: 1 };

function pickImage(images: RawImage[] | undefined, preferred: string): string | null {
  if (!images?.length) return null;
  return images.find((i) => i.facet === preferred)?.link ?? images[0].link;
}

function cleanSynopsis(text: string | null): string | null {
  if (!text) return null;
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function bestVideo(videos: RawVideo[]): RawVideo {
  return [...videos].sort(
    (a, b) => Number(b.nc) - Number(a.nc) || (b.resolution ?? 0) - (a.resolution ?? 0),
  )[0];
}

function sortThemes(themes: RawTheme[]): RawTheme[] {
  const rank = (type: string) => THEME_ORDER[type] ?? 2;
  return [...themes].sort((a, b) => rank(a.type) - rank(b.type) || (a.sequence ?? 0) - (b.sequence ?? 0));
}

export function toSummary(anime: RawAnime): AnimeSummary {
  return {
    id: anime.id,
    slug: anime.slug,
    name: anime.name,
    year: anime.year,
    season: anime.season,
    format: anime.media_format,
    cover: pickImage(anime.images, "Large Cover"),
    synopsis: cleanSynopsis(anime.synopsis),
  };
}

export function themeToTracks(theme: RawTheme, anime: RawAnime): Track[] {
  const cover = pickImage(anime.images, "Large Cover");
  const artists = theme.song?.artists?.map((a) => a.name).join(", ") || "Artista desconhecido";

  return (theme.animethemeentries ?? []).flatMap((entry) => {
    if (!entry.videos?.length) return [];
    const video = bestVideo(entry.videos);
    const version = entry.version && entry.version > 1 ? ` v${entry.version}` : "";
    return {
      id: String(entry.id),
      label: `${theme.slug}${version}`,
      type: theme.type,
      title: theme.song?.title || theme.slug,
      artists,
      animeName: anime.name,
      animeSlug: anime.slug,
      cover,
      episodes: entry.episodes,
      videoUrl: video.link,
      audioUrl: video.audio?.link ?? null,
      spoiler: entry.spoiler,
    };
  });
}

export function animeToTracks(anime: RawAnime): Track[] {
  return sortThemes(anime.animethemes ?? []).flatMap((theme) => themeToTracks(theme, anime));
}
