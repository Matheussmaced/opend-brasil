import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryNav } from "@/components/catalog/CategoryNav";
import { Pagination } from "@/components/catalog/Pagination";
import { CollectionSkeleton } from "@/components/collection/CollectionSkeleton";
import { CollectionView, collectionSummary } from "@/components/collection/CollectionView";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { getByFormat, getByLetter, getGenre, type CatalogPage } from "@/lib/animethemes/queries";
import { resolveCategory, type ResolvedCategory } from "@/lib/categories";

type Props = PageProps<"/explorar/[tipo]/[valor]">;

const LOADERS: Record<ResolvedCategory["kind"], (value: string, page: number) => Promise<CatalogPage>> = {
  genero: (value, page) => getGenre(value, { page }),
  letra: getByLetter,
  formato: getByFormat,
};

function parsePage(raw: string | string[] | undefined) {
  const value = Number(Array.isArray(raw) ? raw[0] : raw);
  return Number.isInteger(value) && value > 1 ? value : 1;
}

export async function generateMetadata({ params }: Props) {
  const { tipo, valor } = await params;
  return { title: resolveCategory(tipo, valor)?.title ?? "Categoria não encontrada" };
}

export default function ExplorePage(props: Props) {
  return (
    <Suspense fallback={<CollectionSkeleton withTitle />}>
      <ExploreContent {...props} />
    </Suspense>
  );
}

async function ExploreContent({ params, searchParams }: Props) {
  const { tipo, valor } = await params;
  const category = resolveCategory(tipo, valor);
  if (!category) notFound();

  const page = parsePage((await searchParams).pagina);

  return (
    <>
      <PageHeader eyebrow={category.eyebrow} title={category.title} kana={category.kana} gradient={category.color} />
      <PageContainer className="space-y-8 pt-6">
        <CategoryNav activeHref={category.tabKey} activeLetter={category.letter} />
        <Suspense key={page} fallback={<CollectionSkeleton />}>
          <CategoryResults category={category} page={page} basePath={`/explorar/${tipo}/${valor}`} />
        </Suspense>
      </PageContainer>
    </>
  );
}

type ResultsProps = { category: ResolvedCategory; page: number; basePath: string };

async function CategoryResults({ category, page, basePath }: ResultsProps) {
  const { anime, tracks, hasNext } = await LOADERS[category.kind](category.value, page);
  if (!anime.length) return <p className="py-12 text-center text-ink-300">Nenhum anime encontrado nesta página.</p>;

  return (
    <div className="space-y-10">
      <CollectionView anime={anime} tracks={tracks} summary={collectionSummary(anime, tracks)} />
      <Pagination basePath={basePath} page={page} hasNext={hasNext} />
    </div>
  );
}
