import type { Metadata } from "next";
import { LikedPlaylist } from "@/components/liked/LikedPlaylist";

export const metadata: Metadata = { title: "Músicas curtidas" };

export default function LikedPage() {
  return <LikedPlaylist />;
}
