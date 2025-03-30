export default function Faq() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 relative">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to know about MetaWill and how it works.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
            <h3 className="text-xl font-bold">What is MetaWill?</h3>
            <p className="text-muted-foreground">
              MetaWill is a decentralized platform built on Linea blockchain
              technology that enables users to create and fulfill personal
              commitments with financial accountability. Users stake ETH on
              Linea as collateral for their promises.
            </p>
          </div>
          <div className="space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
            <h3 className="text-xl font-bold">
              How does the validation process work?
            </h3>
            <p className="text-muted-foreground">
              When you create a commitment, you assign a trusted validator who
              will verify whether you've completed your commitment. Both you and
              your validator must agree on the outcome for the stake to be
              returned.
            </p>
          </div>
          <div className="space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
            <h3 className="text-xl font-bold">
              What happens if I fail my commitment?
            </h3>
            <p className="text-muted-foreground">
              If you fail to fulfill your commitment, your staked ETH will be
              automatically donated to a predetermined charity address on the
              Linea network, creating a positive social impact from your
              unfulfilled promise.
            </p>
          </div>
          <div className="space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
            <h3 className="text-xl font-bold">Is MetaWill secure?</h3>
            <p className="text-muted-foreground">
              Yes, MetaWill uses smart contracts on the Linea blockchain to
              ensure security, transparency, and trustless execution of all
              commitments and financial transactions.
            </p>
          </div>
          <div className="space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
            <h3 className="text-xl font-bold">
              How much ETH do I need to stake?
            </h3>
            <p className="text-muted-foreground">
              You can set your own stake amount within the platform's minimum
              and maximum limits. The amount should be significant enough to
              motivate you to complete your commitment. All transactions are
              processed on the Linea network for lower gas fees.
            </p>
          </div>
          <div className="space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
            <h3 className="text-xl font-bold">
              Can I be a validator for someone else?
            </h3>
            <p className="text-muted-foreground">
              Yes, anyone with an Ethereum wallet can be designated as a
              validator. You'll receive notifications when someone selects you,
              and you'll be responsible for verifying their commitment
              completion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
