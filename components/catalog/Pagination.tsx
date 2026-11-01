import { PillLink } from "../ui/PillLink";

type PaginationProps = { basePath: string; page: number; hasNext: boolean };

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?pagina=${page}`;
}

export function Pagination({ basePath, page, hasNext }: PaginationProps) {
  return (
    <nav aria-label="Paginação" className="flex items-center justify-center gap-3">
      {page > 1 && (
        <PillLink variant="outline" href={pageHref(basePath, page - 1)}>
          ← Anterior
        </PillLink>
      )}
      <span className="text-sm text-zinc-400">Página {page}</span>
      {hasNext && <PillLink href={pageHref(basePath, page + 1)}>Próxima →</PillLink>}
    </nav>
  );
}
