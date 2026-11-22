/**
 * Clerk components follow the site's theme tokens (globals.css), so they flip
 * with data-theme="dark" just like the rest of the site.
 */
export const clerkAppearance = {
  cssLayerName: "clerk",
  variables: {
    colorPrimary: "#ff6b3f",
    colorPrimaryForeground: "#ffffff",
    colorBackground: "var(--surface)",
    colorForeground: "var(--slate-900)",
    colorMutedForeground: "var(--slate-500)",
    colorMuted: "var(--slate-100)",
    colorInput: "var(--surface)",
    colorInputForeground: "var(--slate-900)",
    colorBorder: "var(--slate-300)",
    colorNeutral: "var(--slate-900)",
    colorRing: "#ff6b3f",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    borderRadius: "0.75rem",
  },
};
