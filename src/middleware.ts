import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * This is created to protect the routes that we want to protect or basically is only be showned to authenticated users
 */

const isProtectedRoute = createRouteMatcher(["/studio(.*)"]);
//this (.*) helps to protect the subroute if we have for the protected page. eg : protected/subroute

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
