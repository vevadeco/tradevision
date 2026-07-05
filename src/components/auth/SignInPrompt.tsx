"use client";

import Link from "next/link";
import { useGame } from "@/context/GameContext";

export function SignInPrompt({ action = "save your progress" }: { action?: string }) {
  const { isSignedIn } = useGame();

  if (isSignedIn) return null;

  return (
    <div className="rounded-lg border border-emerald-800/40 bg-emerald-950/20 px-4 py-3 text-sm text-emerald-200">
      <Link href="/sign-in" className="font-medium underline hover:text-emerald-100">
        Sign in
      </Link>{" "}
      to {action}. Progress is stored per account, not in your browser.
    </div>
  );
}

export function SignInCTA({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-8 text-center">
      <p className="text-lg font-medium text-white">Your personal learning hub</p>
      <p className="mt-2 text-sm text-zinc-400">{message}</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/sign-in"
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}

export function AuthGate({
  children,
  message = "Sign in to track your learning progress on the dashboard.",
}: {
  children: React.ReactNode;
  message?: string;
}) {
  const { isSignedIn, hydrated } = useGame();

  if (!hydrated) {
    return (
      <div className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/40 h-32" />
    );
  }

  if (!isSignedIn) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-8 text-center">
        <p className="text-lg font-medium text-white">Your personal learning hub</p>
        <p className="mt-2 text-sm text-zinc-400">{message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/sign-in"
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
