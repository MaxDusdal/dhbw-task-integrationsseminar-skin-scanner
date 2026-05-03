"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Avatar button that opens a small dropdown menu for the signed-in user.
 *
 * - Reads the user's display name from the `dermasense_user` cookie on mount.
 * - Renders nothing when no cookie is present (unauthenticated state).
 * - The avatar shows up to two initials derived from the display name.
 * - The dropdown closes when the user clicks outside the component.
 */
export function UserMenu() {
  const router = useRouter();
  /** Display name parsed from the auth cookie; `null` while loading or when unauthenticated. */
  const [name, setName] = useState<string | null>(null);

  /** Controls dropdown visibility. */
  const [open, setOpen] = useState(false);

  /** Ref attached to the wrapper div so outside-click detection can exclude it. */
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse the display name from the auth cookie once on mount.
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)dermasense_user=([^;]+)/);
    if (match) setName(decodeURIComponent(match[1]));
  }, []);

  // Attach / detach a mousedown listener that closes the dropdown on outside clicks.
  // The listener is only active while the dropdown is open to minimise overhead.
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  /**
   * Signs the user out by expiring the auth cookie, then redirects to the
   * login page. `router.refresh()` ensures the server re-evaluates auth state
   * for the current route tree.
   */
  function signOut() {
    document.cookie = "dermasense_user=; path=/; max-age=0; SameSite=Lax";
    router.push("/login");
    router.refresh();
  }

  // Don't render the avatar while the cookie is being read or when unauthenticated.
  if (!name) return null;

  // Build initials: take the first character of each word, join, cap at 2, uppercase.
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold select-none hover:opacity-90 transition-opacity"
        aria-label="Benutzermenü"
        aria-expanded={open}
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg border bg-background shadow-lg py-1 z-50">
          <div className="px-3 py-2 border-b mb-1">
            <p className="text-sm font-medium truncate">{name}</p>
          </div>

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
            Dashboard
          </Link>


          <div className="border-t mt-1 pt-1">
            <button
              onClick={signOut}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Abmelden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
