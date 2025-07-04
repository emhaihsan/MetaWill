"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/connect-button";

export default function CTA() {
  const { isConnected } = useAccount();

  return (
    <section className="w-full py-20 md:py-32 bg-gray-950 relative overflow-hidden">
      {/* Background Visuals */}
      <div className="absolute inset-0 w-full h-full bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-orange-500/30 to-purple-500/30 rounded-full blur-[150px] animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl shadow-orange-500/10">
          <div className="inline-block rounded-full bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400 border border-orange-500/20 mb-6">
            Your Future is Verifiable
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
            Forge Your On-Chain Legacy
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Stop wishing, start doing. Turn your ambitions into immutable,
            on-chain achievements. The time to build your legacy of
            accountability is now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isConnected ? (
              <Button
                size="lg"
                className="group w-full sm:w-auto bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold text-lg shadow-[0_0_30px_rgba(246,133,27,0.4)] hover:shadow-[0_0_40px_rgba(246,133,27,0.6)] transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
                asChild
              >
                <Link href="/dashboard">
                  Launch App
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            ) : (
              <ConnectButton />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
