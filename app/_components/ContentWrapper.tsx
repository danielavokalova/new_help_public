"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";

export function ContentWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal");

  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="brand">✈️ New Help Portal</h1>
          <nav className="top-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/portal" className="nav-link">Portal</Link>
            <Link href="/getting-started" className="nav-link">Getting Started</Link>
            <Link href="/configuration" className="nav-link">Configuration</Link>
            <Link href="/operations" className="nav-link">Operations</Link>
            <Link href="/troubleshooting" className="nav-link">Troubleshooting</Link>
            <Link href="/release-notes" className="nav-link">Release Notes</Link>
          </nav>
        </div>
      </header>
      <main className="container content-shell">{children}</main>
    </>
  );
}
