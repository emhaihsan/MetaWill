import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    // <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F6851B] text-primary-foreground relative overflow-hidden">
    //   <div className="absolute inset-0">
    //     <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
    //     <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
    //     <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    //   </div>
    //   <div className="container px-4 md:px-6 relative">
    //     <div className="flex flex-col items-center justify-center space-y-4 text-center">
    //       <div className="space-y-2">
    //         <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
    //           Ready to Keep Your Promises?
    //         </h2>
    //         <p className="mx-auto max-w-[700px] md:text-xl">
    //           Join MetaWill today and transform your commitments with
    //           blockchain-powered accountability.
    //         </p>
    //       </div>
    //       <div className="flex flex-col gap-2 min-[400px]:flex-row">
    //         <Button
    //           size="lg"
    //           variant="secondary"
    //           className="border-white/80 bg-white hover:bg-white/80 text-[#F6851B] font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)]"
    //           asChild
    //         >
    //           <Link href="/whitepaper">Read Whitepaper</Link>
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F6851B] text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl animate-fade-up">
              Your Commitments, Made Unbreakable
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl/relaxed animate-fade-up animate-delay-100">
              Harness the power of blockchain to turn your promises into
              actions. With MetaWill, your word becomes your bond.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row animate-fade-up animate-delay-300">
            <Button
              size="lg"
              variant="secondary"
              className="border-white/80 bg-white hover:bg-white/90 text-[#F6851B] font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
              asChild
            >
              <Link href="/whitepaper">Read Whitepaper</Link>
            </Button>
          </div>
          <div className="text-xs text-white/60 mt-4 animate-fade-up animate-delay-500">
            Secure • Transparent • Empowering
          </div>
        </div>
      </div>
    </section>
  );
}
