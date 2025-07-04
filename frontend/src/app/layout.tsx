import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toast";
import RouteGuard from "@/components/RouteGuard";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "MetaWill",
  description:
    "MetaWill empowers you to make, prove, and fulfill personal commitments with on-chain USDC stakes, trusted validators, and transparent outcomes. Commit with confidence on metawill.my.id.",
  keywords: [
    "blockchain commitment",
    "on-chain pledge",
    "digital accountability",
    "USDC staking",
    "goal validation",
    "smart contract commitment",
    "web3 commitment",
    "MetaWill",
  ],
  authors: [{ name: "MetaWill Team" }],
  creator: "MetaWill",
  publisher: "MetaWill",
  metadataBase: new URL("https://metawill.my.id"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/metawillicon.ico",
    apple: "/metawillicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://metawill.my.id",
    title: "MetaWill | Blockchain Commitment Platform",
    description:
      "Make and track real commitments on-chain. Stake USDC, assign validators, and let MetaWill help you achieve your goals transparently.",
    siteName: "MetaWill",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MetaWill - Blockchain Commitment Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaWill | Blockchain Commitment Platform",
    description:
      "MetaWill lets you commit to your goals with USDC stakes, on-chain proof, and trusted validation. Start building better habits—publicly and transparently.",
    creator: "@metawill",
    images: ["/twitter-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <RouteGuard>{children}</RouteGuard>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
