import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-12 lg:gap-16">
          {/* Left side - Mascot */}
          <div className="w-full md:w-5/12 flex items-center justify-center mb-10 md:mb-0">
            <div className="relative h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F6851B]/30 to-transparent blur-2xl"></div>
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src="/mascott.png"
                  alt="MetaWill Mascot"
                  width={500}
                  height={500}
                  className="object-contain max-h-full max-w-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-7/12 flex flex-col justify-center md:justify-start md:pt-12 space-y-6">
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full border border-[#F6851B]/30 bg-background/50 px-3 py-1 text-sm text-[#F6851B] backdrop-blur-sm shadow-[0_0_15px_rgba(246,133,27,0.2)]">
                <Lock className="mr-1 h-3 w-3" /> Powered by Blockchain
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl/none">
                Keep Your Promises with{" "}
                <span className="text-[#F6851B] animate-text-gradient bg-gradient-to-r from-[#F6851B] via-[#F6851B]/70 to-[#F6851B] bg-clip-text text-transparent">
                  Blockchain
                </span>{" "}
                Accountability
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
                MetaWill is a decentralized platform that helps you fulfill
                personal commitments through financial accountability. Stake
                USDC on your promises and succeed—or donate to charity.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-2">
              <Button
                size="lg"
                variant="outline"
                className="border-[#F6851B]/30 hover:bg-[#F6851B]/10 text-[#F6851B] hover:border-[#F6851B] shadow-[0_0_10px_rgba(246,133,27,0.1)]"
                asChild
              >
                <Link href="/whitepaper">Read Whitepaper</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
