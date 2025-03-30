import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function Why() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 relative">
      <div className="absolute inset-0 bg-grid-[#F6851B]/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
      <div className="px-4 md:px-6 relative">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px] animate-float-delay">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F6851B]/30 to-transparent blur-2xl"></div>
              <div className="relative h-full w-full rounded-xl border border-[#F6851B]/30 bg-background/50 p-4 backdrop-blur-sm shadow-[0_0_30px_rgba(246,133,27,0.15)]">
                <div className="h-full w-full rounded-lg border border-[#F6851B]/20 bg-background/80 p-4 flex flex-col">
                  <div className="flex items-center space-x-2 mb-4">
                    <Globe className="h-5 w-5 text-[#F6851B]" />
                    <div className="h-2 w-20 rounded-full bg-[#F6851B]/30"></div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="h-2 w-full rounded-full bg-[#F6851B]/20"></div>
                    <div className="h-2 w-5/6 rounded-full bg-[#F6851B]/20"></div>
                    <div className="h-2 w-4/6 rounded-full bg-[#F6851B]/20"></div>
                    <div className="h-10 w-full rounded-md bg-[#F6851B]/10 mt-4"></div>
                    <div className="h-20 w-full rounded-md bg-[#F6851B]/10 mt-4"></div>
                    <div className="flex justify-end mt-4">
                      <div className="h-8 w-24 rounded-md bg-[#F6851B]/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Why Choose MetaWill?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                MetaWill combines the power of blockchain with personal
                accountability to help you achieve your goals.
              </p>
            </div>
            <ul className="grid gap-3">
              <li className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6851B]/20">
                  <CheckCircle className="h-4 w-4 text-[#F6851B]" />
                </div>
                <span>Transparent and immutable commitment tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6851B]/20">
                  <CheckCircle className="h-4 w-4 text-[#F6851B]" />
                </div>
                <span>Financial incentives to keep your promises</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6851B]/20">
                  <CheckCircle className="h-4 w-4 text-[#F6851B]" />
                </div>
                <span>Trustless verification through validator system</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6851B]/20">
                  <CheckCircle className="h-4 w-4 text-[#F6851B]" />
                </div>
                <span>Positive social impact through charity donations</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6851B]/20">
                  <CheckCircle className="h-4 w-4 text-[#F6851B]" />
                </div>
                <span>Decentralized platform with no central authority</span>
              </li>
            </ul>
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
        </div>
      </div>
    </section>
  );
}
