"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { getLevel, getLevelProgress, getXpToNextLevel } from "@/lib/scoring";
import { BADGES } from "@/lib/scoring";
import { useGame } from "@/context/GameContext";

export function ScorePanel() {
  const { progress, hydrated, isSignedIn, isSaving } = useGame();

  if (!hydrated) {
    return <div className="h-10 w-32 animate-pulse rounded-lg bg-zinc-800" />;
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <SignInButton mode="modal">
          <button
            type="button"
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500"
          >
            Sign Up
          </button>
        </SignUpButton>
      </div>
    );
  }

  const level = getLevel(progress.xp);
  const levelPct = Math.round(getLevelProgress(progress.xp) * 100);
  const xpNext = getXpToNextLevel(progress.xp);

  return (
    <div className="flex items-center gap-3">
      {isSaving && (
        <span className="hidden text-[10px] text-zinc-500 sm:inline">Saving…</span>
      )}
      <div className="hidden sm:flex flex-col items-end gap-0.5">
        <span className="text-xs text-zinc-400">
          Level {level} · {progress.xp} XP
        </span>
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${levelPct}%` }}
          />
        </div>
        <span className="text-[10px] text-zinc-500">{xpNext} XP to next</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-1.5">
        <span className="text-lg">⭐</span>
        <div>
          <p className="text-sm font-semibold text-amber-400">
            {progress.totalScore.toLocaleString()}
          </p>
          <p className="text-[10px] text-zinc-500">Score</p>
        </div>
      </div>
      {progress.badges.length > 0 && (
        <div className="hidden md:flex gap-1">
          {progress.badges.slice(-3).map((id) => {
            const badge = BADGES.find((b) => b.id === id);
            return badge ? (
              <span key={id} className="text-lg" title={badge.name}>
                {badge.icon}
              </span>
            ) : null;
          })}
        </div>
      )}
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-9 h-9 ring-2 ring-emerald-800",
          },
        }}
      />
    </div>
  );
}

export function Navbar() {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/learn", label: "Learn" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/tutorials", label: "Tutorials" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">📈</span>
          <span className="text-lg font-bold tracking-tight text-white">
            Trade<span className="text-emerald-400">Vision</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <ScorePanel />
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-zinc-800/50 px-4 py-2 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-md px-3 py-1 text-xs text-zinc-400 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
