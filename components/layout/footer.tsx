import Link from "next/link";
import { Separator } from "@/components/ui/separator";

/**
 * Site-wide footer, present on all non-bare routes via `Shell`.
 *
 * Layout:
 * - **Top section:** a four-column responsive grid (single column on mobile,
 *   four columns from `md` up) containing the brand block and three link columns.
 * - **Divider:** a full-width `Separator` between the link grid and the bottom bar.
 * - **Bottom bar:** copyright notice on the left, address + contact on the right
 *   (stacked on mobile, inline from `md` up).
 *
 * Column breakdown:
 * 1. **Brand** — logo icon, wordmark, and one-line product description.
 * 2. **Produkt** — user-facing product pages (Dashboard, Premium, Dermatologen-Finder).
 * 3. **Unternehmen** — company and content pages (Über uns, Tipps, Hilfe).
 * 4. **Rechtliches** — legal pages (Datenschutz, AGB).
 */
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
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
              <span className="text-lg font-bold">DermaSense</span>
            </div>
            <p className="text-sm text-muted-foreground">
              KI-gestützte Hautkrebs-Früherkennung für ein gesünderes Leben.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Produkt</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/premium"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Premium
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dermatologen-Finder
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Unternehmen</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/tips"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hautschutz-Tipps
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hilfe & FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Rechtliches</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 DermaSense GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Augustaanlage 32, 68165 Mannheim</span>
            <span>•</span>
            <a
              href="mailto:info@dermasense.de"
              className="hover:text-foreground transition-colors"
            >
              info@dermasense.de
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
