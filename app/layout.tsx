import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { PlayerBar } from "@/components/player/PlayerBar";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Animes Ceará — aberturas e encerramentos de anime",
    template: "%s · Animes Ceará",
  },
  description:
    "Ouça e assista às aberturas (OP) e encerramentos (ED) dos seus animes favoritos. Dados e vídeos do AnimeThemes.moe.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full scheme-dark antialiased`}>
      <body className="h-full overflow-hidden bg-black font-sans text-white">
        <PlayerProvider>
          <div className="flex h-[calc(100dvh-var(--spacing-player))] gap-2 p-2">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <MobileNav />
              <main className="relative min-h-0 flex-1 overflow-y-auto rounded-lg bg-zinc-900">{children}</main>
            </div>
          </div>
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  );
}
