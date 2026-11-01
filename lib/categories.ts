export type Category = { slug: string; label: string; kana: string; value: string; color: string };

export type CategoryKind = "genero" | "letra" | "formato";

export type ResolvedCategory = {
  kind: CategoryKind;
  value: string;
  title: string;
  eyebrow: string;
  color: string;
  kana: string;
  tabKey?: string;
  letter?: string;
};

export const GENRES: Category[] = [
  { slug: "acao", label: "Ação", kana: "アクション", value: "Action", color: "from-red-600 to-orange-500" },
  { slug: "aventura", label: "Aventura", kana: "アドベンチャー", value: "Adventure", color: "from-emerald-600 to-lime-500" },
  { slug: "comedia", label: "Comédia", kana: "コメディ", value: "Comedy", color: "from-amber-500 to-yellow-400" },
  { slug: "drama", label: "Drama", kana: "ドラマ", value: "Drama", color: "from-indigo-600 to-blue-400" },
  { slug: "fantasia", label: "Fantasia", kana: "ファンタジー", value: "Fantasy", color: "from-violet-600 to-fuchsia-500" },
  { slug: "romance", label: "Romance", kana: "ロマンス", value: "Romance", color: "from-pink-600 to-rose-400" },
  { slug: "ficcao-cientifica", label: "Ficção científica", kana: "エスエフ", value: "Sci-Fi", color: "from-sky-600 to-cyan-400" },
  { slug: "misterio", label: "Mistério", kana: "ミステリー", value: "Mystery", color: "from-slate-600 to-zinc-400" },
  { slug: "terror", label: "Terror", kana: "ホラー", value: "Horror", color: "from-zinc-800 to-red-800" },
  { slug: "esportes", label: "Esportes", kana: "スポーツ", value: "Sports", color: "from-orange-600 to-amber-400" },
  { slug: "mecha", label: "Mecha", kana: "メカ", value: "Mecha", color: "from-gray-600 to-sky-500" },
  { slug: "musica", label: "Música", kana: "ミュージック", value: "Music", color: "from-fuchsia-600 to-pink-400" },
  { slug: "slice-of-life", label: "Slice of Life", kana: "日常", value: "Slice of Life", color: "from-teal-600 to-emerald-400" },
  { slug: "sobrenatural", label: "Sobrenatural", kana: "超常", value: "Supernatural", color: "from-purple-700 to-indigo-500" },
  { slug: "psicologico", label: "Psicológico", kana: "心理", value: "Psychological", color: "from-rose-800 to-purple-600" },
  { slug: "suspense", label: "Suspense", kana: "サスペンス", value: "Thriller", color: "from-stone-700 to-red-600" },
];

export const FORMATS: Category[] = [
  { slug: "series", label: "Séries de TV", kana: "テレビ", value: "TV", color: "from-rose-600 to-orange-500" },
  { slug: "filmes", label: "Filmes", kana: "映画", value: "Movie", color: "from-blue-700 to-violet-500" },
  { slug: "ova", label: "OVAs", kana: "オーブイエー", value: "OVA", color: "from-emerald-700 to-teal-400" },
  { slug: "ona", label: "ONAs (web)", kana: "ウェブ", value: "ONA", color: "from-cyan-700 to-sky-400" },
  { slug: "especiais", label: "Especiais", kana: "スペシャル", value: "Special", color: "from-amber-600 to-pink-500" },
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
      color: genre.color, kana: genre.kana, tabKey: genreHref(genre.slug),
    };
  }
  if (kind === "formato") {
    const format = FORMATS.find((f) => f.slug === slug);
    if (!format) return null;
    return {
      kind, value: format.value, title: format.label, eyebrow: "Formato · A–Z",
      color: format.color, kana: format.kana, tabKey: formatHref(format.slug),
    };
  }
  if (kind === "letra") {
    const letter = slug.toUpperCase();
    if (!LETTERS.includes(letter)) return null;
    return {
      kind, value: letter, title: `Animes com ${letter}`, eyebrow: "Catálogo A–Z",
      color: "from-sakura to-ink-700", kana: "あいうえお", letter,
    };
  }
  return null;
}
