export type Track = {
  id: string;
  label: string;
  type: string;
  title: string;
  artists: string;
  animeName: string;
  animeSlug: string;
  cover: string | null;
  episodes: string | null;
  videoUrl: string;
  audioUrl: string | null;
  spoiler: boolean;
};

export type AnimeSummary = {
  id: number;
  slug: string;
  name: string;
  year: number | null;
  season: string | null;
  format: string | null;
  cover: string | null;
  synopsis: string | null;
};

export type AnimeDetail = AnimeSummary & { tracks: Track[] };
