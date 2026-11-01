export type Category = { slug: string; label: string; value: string; color: string };

export type CategoryKind = "genero" | "letra" | "formato";

export type ResolvedCategory = {
  kind: CategoryKind;
  value: string;
  title: string;
  eyebrow: string;
  color: string;
  tabKey?: string;
  letter?: string;
};

export const GENRES: Category[] = [
  { slug: "acao", label: "Ação", value: "Action", color: "from-red-600 to-orange-500" },
  { slug: "aventura", label: "Aventura", value: "Adventure", color: "from-emerald-600 to-lime-500" },
  { slug: "comedia", label: "Comédia", value: "Comedy", color: "from-amber-500 to-yellow-400" },
  { slug: "drama", label: "Drama", value: "Drama", color: "from-indigo-600 to-blue-400" },
  { slug: "fantasia", label: "Fantasia", value: "Fantasy", color: "from-violet-600 to-fuchsia-500" },
  { slug: "romance", label: "Romance", value: "Romance", color: "from-pink-600 to-rose-400" },
  { slug: "ficcao-cientifica", label: "Ficção científica", value: "Sci-Fi", color: "from-sky-600 to-cyan-400" },
  { slug: "misterio", label: "Mistério", value: "Mystery", color: "from-slate-600 to-zinc-400" },
  { slug: "terror", label: "Terror", value: "Horror", color: "from-zinc-800 to-red-800" },
  { slug: "esportes", label: "Esportes", value: "Sports", color: "from-orange-600 to-amber-400" },
  { slug: "mecha", label: "Mecha", value: "Mecha", color: "from-gray-600 to-sky-500" },
  { slug: "musica", label: "Música", value: "Music", color: "from-fuchsia-600 to-pink-400" },
  { slug: "slice-of-life", label: "Slice of Life", value: "Slice of Life", color: "from-teal-600 to-emerald-400" },
  { slug: "sobrenatural", label: "Sobrenatural", value: "Supernatural", color: "from-purple-700 to-indigo-500" },
  { slug: "psicologico", label: "Psicológico", value: "Psychological", color: "from-rose-800 to-purple-600" },
  { slug: "suspense", label: "Suspense", value: "Thriller", color: "from-stone-700 to-red-600" },
];

export const FORMATS: Category[] = [
  { slug: "series", label: "Séries de TV", value: "TV", color: "from-rose-600 to-orange-500" },
  { slug: "filmes", label: "Filmes", value: "Movie", color: "from-blue-700 to-violet-500" },
  { slug: "ova", label: "OVAs", value: "OVA", color: "from-emerald-700 to-teal-400" },
  { slug: "ona", label: "ONAs (web)", value: "ONA", color: "from-cyan-700 to-sky-400" },
  { slug: "especiais", label: "Especiais", value: "Special", color: "from-amber-600 to-pink-500" },
];

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const HOME_GENRES = ["acao", "aventura", "romance", "comedia", "fantasia", "esportes"];

export function findGenre(slug: string) {
  return GENRES.find((g) => g.slug === slug);
}

export function genreHref(slug: string) {
  return `/explorar/genero/${slug}`;
}

export function formatHref(slug: string) {
  return `/explorar/formato/${slug}`;
}

export function letterHref(letter: string) {
  return `/explorar/letra/${letter.toLowerCase()}`;
}

export function resolveCategory(kind: string, slug: string): ResolvedCategory | null {
  if (kind === "genero") {
    const genre = findGenre(slug);
    if (!genre) return null;
    return {
      kind, value: genre.value, title: genre.label, eyebrow: "Gênero · mais populares",
      color: genre.color, tabKey: genreHref(genre.slug),
    };
  }
  if (kind === "formato") {
    const format = FORMATS.find((f) => f.slug === slug);
    if (!format) return null;
    return {
      kind, value: format.value, title: format.label, eyebrow: "Formato · A–Z",
      color: format.color, tabKey: formatHref(format.slug),
    };
  }
  if (kind === "letra") {
    const letter = slug.toUpperCase();
    if (!LETTERS.includes(letter)) return null;
    return {
      kind, value: letter, title: `Animes com ${letter}`, eyebrow: "Catálogo A–Z",
      color: "from-rose-700 to-violet-600", letter,
    };
  }
  return null;
}
