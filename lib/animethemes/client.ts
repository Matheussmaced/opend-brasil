import { SITE } from "../site";

const ENDPOINT = "https://graphql.animethemes.moe";
const HEADERS = { "Content-Type": "application/json", Accept: "application/json", "User-Agent": SITE.slug };
const REVALIDATE_SECONDS = 60 * 60 * 12;

export class ApiError extends Error {
  constructor(readonly status: number, detail: string) {
    super(`AnimeThemes respondeu ${status}: ${detail}`);
  }
}

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] };

export async function animeThemesQuery<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ query, variables }),
    cache: "force-cache",
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new ApiError(res.status, res.statusText);

  const { data, errors } = (await res.json()) as GraphQLResponse<T>;
  if (errors?.length || !data) throw new ApiError(res.status, errors?.[0]?.message ?? "resposta vazia");
  return data;
}
