import type { FastAudioLookup } from "../anisongdb";
import type { AnimeSummary, Track } from "../types";
import type { RawAnime, RawImage, RawTheme, RawVideo } from "./raw-types";

const COVER_FACET = "LARGE_COVER";
const THEME_ORDER: Record<string, number> = { OP: 0, ED: 1 };

function pickImage({ nodes: images }: { nodes: RawImage[] }, preferred: string): string | null {
  if (!images.length) return null;
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
    name: anime.title.romaji,
    year: anime.year,
    season: anime.seasonLocalized,
    format: anime.formatLocalized,
    cover: pickImage(anime.images, COVER_FACET),
    synopsis: cleanSynopsis(anime.synopsis),
  };
}

export function malIdOf(anime: RawAnime): number | null {
  return anime.mal?.nodes[0]?.externalId ?? null;
}

export function anilistIdOf(anime: RawAnime): number | null {
  return anime.anilist?.nodes[0]?.externalId ?? null;
}

export function themeToTracks(theme: RawTheme, anime: RawAnime, fastAudio: FastAudioLookup): Track[] {
  const cover = pickImage(anime.images, COVER_FACET);
  const songTitle = theme.song?.title.romaji ?? null;
  const artists = theme.song?.performances.map((p) => p.artist.name.main).join(", ") || "Artista desconhecido";
  const fastAudioUrl = fastAudio({
    malId: malIdOf(anime),
    type: theme.type,
    sequence: theme.sequence ?? 1,
    title: songTitle,
  });

  return theme.animethemeentries.flatMap((entry) => {
    if (!entry.videos.nodes.length) return [];
    const video = bestVideo(entry.videos.nodes);
    const version = entry.version && entry.version > 1 ? ` v${entry.version}` : "";
    return {
      id: String(entry.id),
      label: `${theme.slug}${version}`,
      type: theme.type,
      title: songTitle || theme.slug,
      artists,
      animeName: anime.title.romaji,
      animeSlug: anime.slug,
      cover,
      episodes: entry.episodes,
      videoUrl: video.link,
      audioUrl: video.audio?.link ?? null,
      fastAudioUrl,
      spoiler: entry.spoiler,
    };
  });
}

export function animeToTracks(anime: RawAnime, fastAudio: FastAudioLookup): Track[] {
  return sortThemes(anime.animethemes ?? []).flatMap((theme) => themeToTracks(theme, anime, fastAudio));
}
