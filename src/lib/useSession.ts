"use client";

import { useEffect, useState } from "react";

export type ClientUser = { sub: string; email: string; name: string; picture?: string };
type State = { status: "loading" | "authenticated" | "unauthenticated"; user: ClientUser | null };

let cache: Promise<ClientUser | null> | null = null;

function loadSession() {
  cache ??= fetch("/api/auth/session", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : { user: null }))
    .then((d: { user: ClientUser | null }) => d.user)
    .catch(() => null);
  return cache;
}

/** Signed-in Google user (read from the httpOnly session cookie via /api/auth/session). */
export function useSession(): State {
  const [state, setState] = useState<State>({ status: "loading", user: null });
  useEffect(() => {
    let alive = true;
    loadSession().then((user) => {
      if (alive) setState({ status: user ? "authenticated" : "unauthenticated", user });
    });
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

export function signInUrl(next = "/pricing") {
  return `/signin?next=${encodeURIComponent(next)}`;
}
