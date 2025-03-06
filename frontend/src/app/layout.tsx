import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4f46e5" },
    { media: "(prefers-color-scheme: dark)", color: "#818cf8" },
  ],
};

export const metadata: Metadata = {
  title: "iPROMISE | Web3 Commitment Platform",
  description: "Transform personal commitments into positive impact. Stake ETH, fulfill your promises, or support charities through our transparent blockchain platform.",
  keywords: [
    "Web3", 
    "Blockchain", 
    "Ethereum", 
    "Commitment Platform", 
    "Personal Accountability", 
    "Charity", 
    "Smart Contracts", 
    "Decentralized", 
    "Staking", 
    "Goal Setting"
  ],
  authors: [{ name: "iPROMISE Team" }],
  creator: "iPROMISE",
  publisher: "iPROMISE",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  category: "Web3 Application",
  applicationName: "iPROMISE",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ipromise.network",
    title: "iPROMISE | Transform Commitments Into Impact",
    description: "The Web3 platform that helps you achieve your goals through financial accountability and charitable giving.",
    siteName: "iPROMISE",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "iPROMISE Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iPROMISE | Web3 Commitment Platform",
    description: "Achieve your goals with blockchain-powered accountability.",
    images: ["/twitter-image.svg"],
    creator: "@iPROMISE_network",
    site: "@iPROMISE_network",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-72x72.svg", sizes: "72x72", type: "image/svg+xml" },
      { url: "/icons/icon-96x96.svg", sizes: "96x96", type: "image/svg+xml" },
      { url: "/icons/icon-144x144.svg", sizes: "144x144", type: "image/svg+xml" },
      { url: "/icons/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icons/icon-384x384.svg", sizes: "384x384", type: "image/svg+xml" },
      { url: "/icons/icon-512x512.svg", sizes: "512x512", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/icons/apple-touch-icon.svg", type: "image/svg+xml" }
    ],
    other: [
      { url: "/icons/apple-touch-icon.svg", type: "image/svg+xml", rel: "apple-touch-icon" }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "iPROMISE"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
