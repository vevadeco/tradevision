import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

export function isClerkConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() &&
      process.env.CLERK_SECRET_KEY?.trim()
  );
}

/** Passthrough when Clerk env vars are missing (avoids MIDDLEWARE_INVOCATION_FAILED on Vercel). */
function passthroughMiddleware(_request: NextRequest) {
  return NextResponse.next();
}

/**
 * All app routes are public; auth is enforced in /api/progress and via UI sign-in.
 * Keeps middleware minimal to avoid edge runtime failures.
 */
const clerkHandler = clerkMiddleware();

export default isClerkConfigured() ? clerkHandler : passthroughMiddleware;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
