/**
 * Small inline icon set (stroke icons, 24px grid). Hand-written so the site
 * doesn't depend on a UI/icon library.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  Puzzle: (p: IconProps) => (
    <Base {...p}>
      <path d="M14 4a2 2 0 1 0-4 0v1H6a1 1 0 0 0-1 1v4h1a2 2 0 1 1 0 4H5v4a1 1 0 0 0 1 1h4v-1a2 2 0 1 1 4 0v1h4a1 1 0 0 0 1-1v-4h-1a2 2 0 1 1 0-4h1V6a1 1 0 0 0-1-1h-4z" />
    </Base>
  ),
  Download: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" />
    </Base>
  ),
  FileText: (p: IconProps) => (
    <Base {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </Base>
  ),
  Folder: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </Base>
  ),
  Search: (p: IconProps) => (
    <Base {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </Base>
  ),
  Sparkles: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </Base>
  ),
  Check: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Base>
  ),
  ArrowRight: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12h14m-6-6l6 6-6 6" />
    </Base>
  ),
  Menu: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  ),
  Close: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  ),
  Cursor: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 3l14 7-6 2-2 6z" />
    </Base>
  ),
  Layers: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </Base>
  ),
  Compass: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </Base>
  ),
  Lock: (p: IconProps) => (
    <Base {...p}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
    </Base>
  ),
  Palette: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.1-4-7.5-9-7.5z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10" cy="7.5" r="1" />
      <circle cx="14.5" cy="7.5" r="1" />
    </Base>
  ),
  Infinity: (p: IconProps) => (
    <Base {...p}>
      <path d="M8 8c-2.2 0-4 1.8-4 4s1.8 4 4 4c4 0 4-8 8-8 2.2 0 4 1.8 4 4s-1.8 4-4 4c-4 0-4-8-8-8z" />
    </Base>
  ),
  Bookmark: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 4h12v17l-6-4-6 4z" />
    </Base>
  ),
  Upload: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 20V9m0 0l-4 4m4-4l4 4M5 4h14" />
    </Base>
  ),
  Mail: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Base>
  ),
  Book: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19V5M8 7h7" />
    </Base>
  ),
  CheckCircle: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </Base>
  ),
  Notion: (p: IconProps) => (
    <Base {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 16V8l6 8V8" />
    </Base>
  ),
};
