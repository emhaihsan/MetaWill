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
  title: "MetaWill | Digital Legacy Management Platform",
  description:
    "Secure your digital legacy with MetaWill - the platform that helps you manage and transfer your digital assets to your loved ones after you're gone.",
  keywords: [
    "digital legacy",
    "digital inheritance",
    "crypto will",
    "estate planning",
    "digital assets",
    "blockchain",
    "web3",
  ],
  authors: [{ name: "MetaWill Team" }],
  creator: "MetaWill",
  publisher: "MetaWill",
  metadataBase: new URL("https://metawill.vercel.app"),
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
    url: "https://metawill.vercel.app",
    title: "MetaWill | Digital Legacy Management Platform",
    description:
      "Secure your digital legacy with MetaWill - the platform that helps you manage and transfer your digital assets to your loved ones after you're gone.",
    siteName: "MetaWill",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MetaWill - Digital Legacy Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaWill | Digital Legacy Management Platform",
    description:
      "Secure your digital legacy with MetaWill - the platform that helps you manage and transfer your digital assets to your loved ones after you're gone.",
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
