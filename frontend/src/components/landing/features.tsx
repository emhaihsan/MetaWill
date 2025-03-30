import { Wallet, Users, Calendar } from "lucide-react";

export default function Features() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 relative"
    >
      <div className="absolute inset-0 bg-grid-[#F6851B]/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
      <div className="px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-[#F6851B] px-3 py-1 text-sm text-primary-foreground">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Commitment Made Transparent
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              MetaWill leverages blockchain technology to create a transparent,
              trustless system for personal accountability.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="group flex flex-col justify-center space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F6851B] text-primary-foreground shadow-[0_0_15px_rgba(246,133,27,0.3)]">
              <Wallet className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Financial Stakes</h3>
              <p className="text-muted-foreground">
                Stake ETH as collateral for your commitments. Get it back when
                you succeed, or donate it to charity if you fail.
              </p>
            </div>
          </div>
          <div className="group flex flex-col justify-center space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F6851B] text-primary-foreground shadow-[0_0_15px_rgba(246,133,27,0.3)]">
              <Users className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Trusted Validators</h3>
              <p className="text-muted-foreground">
                Assign trusted validators to verify your commitment completion,
                ensuring accountability and fairness.
              </p>
            </div>
          </div>
          <div className="group flex flex-col justify-center space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F6851B] text-primary-foreground shadow-[0_0_15px_rgba(246,133,27,0.3)]">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Custom Deadlines</h3>
              <p className="text-muted-foreground">
                Set your own timeframes for commitment completion with
                transparent tracking and reminders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
