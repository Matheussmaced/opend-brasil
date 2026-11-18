import type { Metadata } from "next";
import { Suspense } from "react";
import { PlaylistSkeleton } from "@/components/playlist/PlaylistSkeleton";
import { PlaylistView } from "@/components/playlist/PlaylistView";

export const metadata: Metadata = { title: "Playlist" };

export default function PlaylistPage() {
  return (
    <Suspense fallback={<PlaylistSkeleton />}>
      <PlaylistView />
    </Suspense>
  );
}
