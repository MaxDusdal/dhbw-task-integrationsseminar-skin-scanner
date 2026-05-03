"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

/**
 * Routes that should render without the shared chrome (Navbar + Footer).
 * Add any full-screen or auth-only paths here to opt them out of the shell.
 */
const BARE_ROUTES = ["/login"];

/**
 * Top-level layout wrapper that conditionally renders the shared page chrome.
 *
 * - **Bare routes** (listed in `BARE_ROUTES`): renders `children` directly,
 *   with no Navbar or Footer, allowing full-screen layouts like login pages.
 * - **All other routes**: wraps `children` in a full-height flex column with
 *   a sticky-ready Navbar at the top, a `flex-1` main area that grows to fill
 *   available space, and a Footer pinned to the bottom.
 *
 * @param children - The active page's content, supplied by the Next.js layout tree.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.includes(pathname);

  if (bare) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
