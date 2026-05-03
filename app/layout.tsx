import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/layout/shell";

// ── Font configuration ────────────────────────────────────────────────────────
// Load Geist Sans as the primary UI font and expose it as a CSS variable
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Load Geist Mono for code/monospaced contexts
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ── Page metadata ─────────────────────────────────────────────────────────────
// Used by Next.js to populate <title> and <meta name="description"> tags
export const metadata: Metadata = {
  title: "DermaSense - KI-gestützte Hautkrebs-Früherkennung",
  description: "Intelligente Hautanalyse mit KI-Technologie für bessere Früherkennung",
};

// ── Root layout ───────────────────────────────────────────────────────────────
// Wraps every page in the app. Applies global fonts, base styles, and the
// Shell component (navbar + footer). The `children` prop receives the active
// page's content at runtime.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
