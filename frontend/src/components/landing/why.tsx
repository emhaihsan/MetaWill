import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function Why() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 relative">
      <div className="absolute inset-0 bg-grid-[#F6851B]/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-12 lg:gap-16">
          {/* Left side - Content */}
          <div className="w-full md:w-6/12 flex flex-col justify-center space-y-6 pl-10">
            <div className="space-y-5">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Why Choose MetaWill?
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
                MetaWill combines the power of blockchain with personal
                accountability to help you achieve your goals.
              </p>
            </div>
            <ul className="grid gap-4 pt-2">
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6851B]/20">
                  <CheckCircle className="h-4 w-4 text-[#F6851B]" />
                </div>
                <span>Transparent and immutable commitment tracking</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6851B]/20">
                  <CheckCircle className="h-4 w-4 text-[#F6851B]" />
                </div>
                <span>Financial incentives to keep your promises</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6851B]/20">
                  <CheckCircle className="h-4 w-4 text-[#F6851B]" />
                </div>
                <span>Trustless verification through validator system</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6851B]/20">
                  <CheckCircle className="h-4 w-4 text-[#F6851B]" />
                </div>
                <span>Positive social impact through charity donations</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6851B]/20">
                  <CheckCircle className="h-4 w-4 text-[#F6851B]" />
                </div>
                <span>Decentralized platform with no central authority</span>
              </li>
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
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

          {/* Right side - Mascot */}
          <div className="w-full md:w-6/12 flex items-center justify-center mb-10 md:mb-0 order-first md:order-last">
            <div className="relative h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px] animate-float-delay">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F6851B]/30 to-transparent blur-2xl"></div>
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src="/mascott2.png"
                  alt="MetaWill Mascot 2"
                  width={450}
                  height={450}
                  className="object-contain max-h-full max-w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
