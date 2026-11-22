"use client";

import { useUser } from "@clerk/nextjs";

export type ClientUser = { id: string; email: string; name: string; picture?: string };
type State = { status: "loading" | "authenticated" | "unauthenticated"; user: ClientUser | null };

/** The signed-in Clerk user, narrowed to what the site shows. */
export function useAccount(): State {
  const { isLoaded, user } = useUser();
  if (!isLoaded) return { status: "loading", user: null };
  if (!user) return { status: "unauthenticated", user: null };
  const email = user.primaryEmailAddress?.emailAddress ?? "";
  return {
    status: "authenticated",
    user: {
      id: user.id,
      email,
      name: user.fullName || user.firstName || email.split("@")[0] || "Account",
      picture: user.hasImage ? user.imageUrl : undefined,
    },
  };
}

export function signInUrl(next = "/pricing") {
  return `/signin?redirect_url=${encodeURIComponent(next)}`;
}
