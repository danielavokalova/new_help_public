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
    default: "GOL IBE Meetings Help",
    template: "%s | GOL IBE Meetings Help"
  },
  description:
    "Help portal for GOL IBE Meetings — guidance on meeting management, attendees, approvals, and configuration.",
  openGraph: {
    type: "website",
    siteName: "GOL IBE Meetings Help"
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
