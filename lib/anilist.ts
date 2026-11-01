const ENDPOINT = "https://graphql.anilist.co";
const REVALIDATE_SECONDS = 60 * 60 * 24;

const POPULAR_BY_GENRE = `
  query ($genre: String, $perPage: Int, $page: Int) {
    Page(perPage: $perPage, page: $page) {
      pageInfo { hasNextPage }
      media(genre: $genre, type: ANIME, isAdult: false, sort: POPULARITY_DESC) { id }
    }
  }
`;

type PopularResponse = {
  data: { Page: { pageInfo: { hasNextPage: boolean }; media: { id: number }[] } };
};

export async function getPopularIdsByGenre(genre: string, perPage: number, page: number) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query: POPULAR_BY_GENRE, variables: { genre, perPage, page } }),
    cache: "force-cache",
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`AniList respondeu ${res.status} ao buscar o gênero ${genre}`);

  const { data } = (await res.json()) as PopularResponse;
  return {
    ids: data.Page.media.map((m) => m.id),
    hasNext: data.Page.pageInfo.hasNextPage,
  };
}
