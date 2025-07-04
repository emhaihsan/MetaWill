"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Scale, DatabaseZap, HeartHandshake } from "lucide-react";

const whyData = [
  {
    icon: ShieldCheck,
    title: "Unyielding Security",
    description:
      "Built on the blockchain, your commitments are immutable, transparent, and free from any single point of failure.",
  },
  {
    icon: Scale,
    title: "Provable Fairness",
    description:
      "A trustless validator system ensures that outcomes are based on real-world results, not on biased intermediaries.",
  },
  {
    icon: DatabaseZap,
    title: "On-Chain Legacy",
    description:
      "Every successful commitment becomes a permanent, verifiable part of your on-chain identity, building a legacy of accountability.",
  },
  {
    icon: HeartHandshake,
    title: "Aligned Incentives",
    description:
      "With your own assets at stake, your motivation is intrinsically linked to your success, creating powerful self-incentives.",
  },
];

export default function Why() {
  return (
    <section
      id="why"
      className="w-full py-20 md:py-32 bg-gray-950 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -left-1/4 top-1/4 w-1/2 h-1/2 bg-orange-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>
      <div className="absolute -right-1/4 bottom-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[150px] animate-pulse-slower"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center space-y-6 p-8 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl shadow-orange-500/10 animate-fade-in-up animation-delay-300">
            <div className="inline-block rounded-full bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400 border border-orange-500/20 self-start">
              The MetaWill Difference
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
              More Than Just a Promise
            </h2>
            <p className="text-gray-300 md:text-xl/relaxed max-w-xl">
              We transform personal goals into verifiable assets, building a new
              foundation for trust and accountability.
            </p>
            <div className="grid gap-6 pt-4">
              {whyData.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <item.icon className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Mascot */}
          <div className="flex items-center justify-center animate-fade-in-up">
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] animate-float">
              <div className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-ping-slow"></div>
              <div className="absolute inset-4 rounded-full border-2 border-orange-500/20 animate-ping-slower"></div>
              <Image
                src="/mascott2.png"
                alt="MetaWill Mascot 2"
                layout="fill"
                objectFit="contain"
                className="drop-shadow-[0_10px_30px_rgba(246,133,27,0.4)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
