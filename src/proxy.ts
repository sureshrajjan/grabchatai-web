import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Clerk session handling for every page and API route. Nothing is blocked here:
 * the site is public, and /api/checkout checks the signed-in user itself.
 */
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
