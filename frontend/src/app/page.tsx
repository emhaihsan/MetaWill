import Elements from "@/components/elements";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Faq from "@/components/landing/faq";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Process from "@/components/landing/process";
import Why from "@/components/landing/why";
import CTA from "@/components/landing/cta";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "MetaWill | Secure Your Digital Legacy with Blockchain Technology",
  description:
    "MetaWill helps you secure your digital assets and ensure they're transferred to your loved ones when you're gone. Built on blockchain for maximum security and transparency.",
  keywords: [
    "digital legacy",
    "crypto inheritance",
    "blockchain will",
    "digital asset transfer",
    "estate planning",
    "web3 inheritance",
  ],
  openGraph: {
    title: "MetaWill | Secure Your Digital Legacy with Blockchain Technology",
    description:
      "MetaWill helps you secure your digital assets and ensure they're transferred to your loved ones when you're gone. Built on blockchain for maximum security and transparency.",
    url: "https://metawill.vercel.app",
    type: "website",
    images: [
      {
        url: "/home-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MetaWill - Digital Legacy Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaWill | Secure Your Digital Legacy with Blockchain Technology",
    description:
      "MetaWill helps you secure your digital assets and ensure they're transferred to your loved ones when you're gone. Built on blockchain for maximum security and transparency.",
    images: ["/home-twitter-image.jpg"],
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50 overflow-hidden">
      {/* Decorative elements */}
      <Elements />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Process />
        <Why />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
