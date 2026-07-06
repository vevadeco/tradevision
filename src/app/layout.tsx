import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkAppProvider } from "@/components/auth/ClerkAppProvider";
import { GameProvider } from "@/context/GameContext";
import { Navbar } from "@/components/layout/Navbar";
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
  title: "TradeVision — Crypto Trading Academy",
  description:
    "Master BTC/ETH futures and spot trading with MEXC chart data, case studies, and scored tutorials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkAppProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
          <GameProvider>
            <Navbar />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
              {children}
            </main>
            <footer className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-600">
              TradeVision — Educational purposes only. Not financial advice.
              <p className="mt-2">
                Made by the fine folks at{" "}
                <a
                  href="https://www.vevade.com"
                  className="underline hover:text-zinc-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VevadeCo
                </a>
              </p>
            </footer>
          </GameProvider>
        </body>
      </html>
    </ClerkAppProvider>
  );
}
