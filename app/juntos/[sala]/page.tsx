import type { Metadata } from "next";
import { Suspense } from "react";
import { JoinRoom } from "@/components/together/JoinRoom";

export const metadata: Metadata = { title: "Ouvir junto" };

export default function JoinRoomPage() {
  return (
    <Suspense>
      <JoinRoom />
    </Suspense>
  );
}
