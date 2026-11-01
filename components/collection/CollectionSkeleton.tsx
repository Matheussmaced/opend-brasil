import { AnimeGridSkeleton } from "../anime/AnimeGrid";
import { TrackListSkeleton } from "../track/TrackListSkeleton";
import { Skeleton } from "../ui/Skeleton";

export function CollectionSkeleton({ withTitle = false }: { withTitle?: boolean }) {
  return (
    <div className="space-y-8">
      {withTitle && <Skeleton className="h-12 w-72" />}
      <TrackListSkeleton rows={5} />
      <AnimeGridSkeleton count={6} />
    </div>
  );
}
