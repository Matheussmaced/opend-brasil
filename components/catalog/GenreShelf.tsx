import { getGenre } from "@/lib/animethemes/queries";
import { genreHref, type Category } from "@/lib/categories";
import { AnimeRow } from "../anime/AnimeRow";

const SHELF_SIZE = 20;

export async function GenreShelf({ genre }: { genre: Category }) {
  const { anime } = await getGenre(genre.value, { count: SHELF_SIZE, withThemes: false });
  return <AnimeRow eyebrow="Mais populares" kana={genre.kana} title={genre.label} href={genreHref(genre.slug)} anime={anime} />;
}
