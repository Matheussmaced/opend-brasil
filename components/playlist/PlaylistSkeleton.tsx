import { TrackListSkeleton } from "../track/TrackListSkeleton";
import { PageContainer } from "../ui/PageContainer";
import { Skeleton } from "../ui/Skeleton";

export function PlaylistSkeleton() {
  return (
    <PageContainer className="pt-14">
      <div className="flex items-end gap-6">
        <Skeleton className="size-32 rounded-2xl sm:size-44" />
        <Skeleton className="h-12 w-72" />
      </div>
      <div className="mt-10">
        <TrackListSkeleton />
      </div>
    </PageContainer>
  );
}
