export type RawImage = { facet: string; link: string };

export type RawVideo = {
  id: number;
  link: string;
  resolution: number | null;
  nc: boolean;
  audio?: { link: string } | null;
};

export type RawEntry = {
  id: number;
  version: number | null;
  episodes: string | null;
  nsfw: boolean;
  spoiler: boolean;
  videos?: RawVideo[];
};

export type RawTheme = {
  id: number;
  type: string;
  sequence: number | null;
  slug: string;
  song?: { title: string | null; artists?: { name: string }[] } | null;
  animethemeentries?: RawEntry[];
  anime?: RawAnime;
};

export type RawAnime = {
  id: number;
  slug: string;
  name: string;
  year: number | null;
  season: string | null;
  media_format: string | null;
  synopsis: string | null;
  images?: RawImage[];
  animethemes?: RawTheme[];
  resources?: { site: string; external_id: number | null }[];
  series?: { slug: string; name: string }[];
};
