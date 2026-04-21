import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { getSiteUrl } from "@/lib/site";
import { ContentWrapper } from "./_components/ContentWrapper";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="en" className={inter.variable}>
      <body>
        <ContentWrapper>{children}</ContentWrapper>
      </body>
    </html>
  );
}
