import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./user-menu";

/**
 * Top-of-page navigation bar, present on all non-bare routes via `Shell`.
 *
 * Layout (left → right):
 * 1. **Logo** — icon + wordmark, links to `/`.
 * 2. **Nav links** — hidden on mobile (`md:hidden`), visible from `md` breakpoint up.
 * 3. **Actions** — "Neue Analyse" CTA button + `UserMenu` avatar, always visible.
 *
 * The outer `<nav>` is full-width with a bottom border. The inner container is
 * max-width capped at `6xl` and horizontally padded to match the page grid.
 */
export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="text-xl font-bold">DermaSense</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/doctors"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dermatologen
              </Link>
              <Link
                href="/tips"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Hautschutz
              </Link>
              <Link
                href="/help"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Hilfe
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" asChild>
              <Link href="/camera">Neue Analyse</Link>
            </Button>
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
