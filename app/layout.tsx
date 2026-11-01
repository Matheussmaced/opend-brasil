import type { Metadata } from "next";
import { Dela_Gothic_One, Geist, Geist_Mono } from "next/font/google";
import { preconnect } from "react-dom";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { PlayerBar } from "@/components/player/PlayerBar";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { SITE } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const delaGothic = Dela_Gothic_One({
  variable: "--font-dela-gothic",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
};

const MEDIA_ORIGINS = ["https://a.animethemes.moe", "https://v.animethemes.moe"];

export default function RootLayout({ children }: LayoutProps<"/">) {
  MEDIA_ORIGINS.forEach((origin) => preconnect(origin));
  const fonts = `${geistSans.variable} ${geistMono.variable} ${delaGothic.variable}`;

  return (
    <html lang="pt-BR" className={`${fonts} h-full scheme-dark antialiased`}>
      <body className="flex h-dvh overflow-hidden bg-ink-950 font-sans text-white selection:bg-sakura selection:text-ink-950">
        <PlayerProvider>
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <MobileNav />
            <main className="relative min-h-0 flex-1 overflow-y-auto bg-halftone pb-player">{children}</main>
          </div>
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  );
}
