"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

export function ClerkAppProvider({ children }: { children: ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();

  if (!publishableKey) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      {children}
    </ClerkProvider>
  );
}

export function useClerkEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim());
}
