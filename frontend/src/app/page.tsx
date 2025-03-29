import Link from "next/link";
import Elements from "@/components/landing/elements";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import Faq from "@/components/landing/faq";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Process from "@/components/landing/process";
import Why from "@/components/landing/why";
import CTA from "@/components/landing/cta";

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
