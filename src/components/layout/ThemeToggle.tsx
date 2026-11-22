"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "theme";

/** Runs in <head> before paint: light by default, dark only if the visitor chose it. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}")==="dark"?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
  listeners.forEach((l) => l());
}

/** Sun / moon pill, like the one in the extension header. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);

  const item = (value: Theme, label: string, icon: React.ReactNode) => (
    <button
      type="button"
      onClick={() => setTheme(value)}
      aria-label={label}
      aria-pressed={theme === value}
      className={`flex h-6 w-6 items-center justify-center rounded-full transition ${
        theme === value ? "bg-surface text-brand-600 shadow-sm ring-1 ring-slate-200" : "text-slate-400 hover:text-slate-700"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div className={`flex items-center gap-0.5 rounded-full bg-slate-100 p-0.5 ring-1 ring-slate-200 ${className}`}>
      {item(
        "light",
        "Light theme",
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>,
      )}
      {item(
        "dark",
        "Dark theme",
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
        </svg>,
      )}
    </div>
  );
}
