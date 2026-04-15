import type { ReactNode } from "react";
import Link from "next/link";
import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "New Help Portal",
    template: "%s | New Help Portal"
  },
  description:
    "New Help Portal for GOL IBE guidance, onboarding, and troubleshooting.",
  openGraph: {
    type: "website",
    siteName: "New Help Portal"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container">
            <h1 className="brand">✈️ New Help Portal</h1>
            <nav className="top-nav">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/getting-started" className="nav-link">Getting Started</Link>
              <Link href="/configuration" className="nav-link">Configuration</Link>
              <Link href="/operations" className="nav-link">Operations</Link>
              <Link href="/troubleshooting" className="nav-link">Troubleshooting</Link>
              <Link href="/release-notes" className="nav-link">Release Notes</Link>
            </nav>
          </div>
        </header>
        <main className="container content-shell">{children}</main>
      </body>
    </html>
  );
}
