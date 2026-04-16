"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps content in the standard container + content-shell for all pages
 * EXCEPT /portal/* which handles its own full-screen layout.
 */
export function ContentWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/portal")) {
    return <>{children}</>;
  }
  return <main className="container content-shell">{children}</main>;
}
