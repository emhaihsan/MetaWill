import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { List } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
      <div className="container px-4 md:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-[#F6851B]/30 bg-background/50 px-3 py-1 text-sm text-[#F6851B] backdrop-blur-sm shadow-[0_0_15px_rgba(246,133,27,0.2)]">
                <Lock className="mr-1 h-3 w-3" /> Powered by Blockchain
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Keep Your Promises with{" "}
                <span className="text-[#F6851B] animate-text-gradient bg-gradient-to-r from-[#F6851B] via-[#F6851B]/70 to-[#F6851B] bg-clip-text text-transparent">
                  Blockchain
                </span>{" "}
                Accountability
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                MetaWill is a decentralized platform that helps you fulfill
                personal commitments through financial accountability. Stake ETH
                on your promises and succeed—or donate to charity.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
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
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px] animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F6851B]/30 to-transparent blur-2xl"></div>
              <div className="relative h-full w-full rounded-xl border border-[#F6851B]/30 bg-background/50 p-4 backdrop-blur-sm shadow-[0_0_30px_rgba(246,133,27,0.15)]">
                <div className="absolute top-0 left-0 right-0 h-10 rounded-t-xl bg-gradient-to-r from-[#F6851B]/20 to-[#F6851B]/10 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-[#F6851B]/40"></div>
                    <div className="h-3 w-3 rounded-full bg-[#F6851B]/30"></div>
                    <div className="h-3 w-3 rounded-full bg-[#F6851B]/20"></div>
                  </div>
                </div>
                <div className="mt-10 h-[calc(100%-2.5rem)] overflow-hidden rounded-md border border-[#F6851B]/20 bg-background/80">
                  <List className="h-full w-full text-[#F6851B]/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
