type Nodes<T> = { nodes: T[] };

export type RawImage = { facet: string; link: string };

export type RawVideo = {
  link: string;
  resolution: number | null;
  nc: boolean;
  audio: { link: string } | null;
};

export type RawEntry = {
  id: number;
  version: number | null;
  episodes: string | null;
  spoiler: boolean;
  videos: Nodes<RawVideo>;
};

export type RawTheme = {
  type: string;
  sequence: number | null;
  slug: string;
  song: { title: { romaji: string | null }; performances: { artist: { name: { main: string } } }[] } | null;
  animethemeentries: RawEntry[];
  anime?: RawAnime;
};

export type RawAnime = {
  id: number;
  slug: string;
  title: { romaji: string };
  year: number | null;
  seasonLocalized: string | null;
  formatLocalized: string | null;
  synopsis: string | null;
  images: Nodes<RawImage>;
  mal?: Nodes<{ externalId: number | null }>;
  anilist?: Nodes<{ externalId: number | null }>;
  animethemes?: RawTheme[];
  series?: Nodes<{ slug: string }>;
};
