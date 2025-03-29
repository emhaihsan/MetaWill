export default function Process() {
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 relative"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-[#F6851B] px-3 py-1 text-sm text-primary-foreground">
              Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How MetaWill Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A simple four-step process to create accountability for your
              personal commitments.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col justify-start space-y-4 relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6851B] text-primary-foreground relative z-10 shadow-[0_0_15px_rgba(246,133,27,0.3)]">
              <span className="text-xl font-bold">1</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Connect Wallet</h3>
              <p className="text-muted-foreground">
                Connect your Ethereum wallet to access the platform and manage
                your commitments.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start space-y-4 relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6851B] text-primary-foreground relative z-10 shadow-[0_0_15px_rgba(246,133,27,0.3)]">
              <span className="text-xl font-bold">2</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Create Commitment</h3>
              <p className="text-muted-foreground">
                Define your commitment, set a deadline, and stake ETH as
                collateral for your promise.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start space-y-4 relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6851B] text-primary-foreground relative z-10 shadow-[0_0_15px_rgba(246,133,27,0.3)]">
              <span className="text-xl font-bold">3</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Assign Validator</h3>
              <p className="text-muted-foreground">
                Choose a trusted validator who will verify whether you've
                completed your commitment.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6851B] text-primary-foreground relative z-10 shadow-[0_0_15px_rgba(246,133,27,0.3)]">
              <span className="text-xl font-bold">4</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Complete & Verify</h3>
              <p className="text-muted-foreground">
                Fulfill your commitment, get verified, and receive your stake
                back—or donate it if you fail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
