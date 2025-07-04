"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAccount } from "wagmi";

export default function Hero() {
  const { isConnected } = useAccount();

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
      {/* Background Aurora Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-tr from-orange-500/40 to-purple-500/20 rounded-full blur-[150px] animate-pulse-slow"></div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Mascot */}
          <div className="flex items-center justify-center animate-fade-in-up">
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] animate-float">
              {/* Glowing Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-ping-slow"></div>
              <div className="absolute inset-4 rounded-full border-2 border-orange-500/20 animate-ping-slower"></div>
              <Image
                src="/mascott.png"
                alt="MetaWill Mascot"
                layout="fill"
                objectFit="contain"
                className="drop-shadow-[0_10px_30px_rgba(246,133,27,0.4)]"
                priority
              />
            </div>
          </div>

          {/* Right side - Content Panel */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 p-8 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl shadow-orange-500/10 animate-fade-in-up animation-delay-300">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Secure Your Promises on the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mt-2">
                Blockchain
              </span>
            </h1>
            <p className="max-w-xl text-lg text-gray-300">
              MetaWill transforms your commitments into unbreakable, transparent
              agreements with USDC stakes. Your word is your bond, secured by
              smart contracts.
            </p>
            <div className="flex flex-col gap-4 min-[400px]:flex-row mt-8 animate-fade-in-up animation-delay-400">
              {isConnected && (
                <Button
                  size="lg"
                  className="bg-[#F6851B] hover:bg-[#F6851B]/90 text-black shadow-[0_0_20px_rgba(246,133,27,0.4)]"
                  asChild
                >
                  <Link href="/dashboard">Launch The App</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
