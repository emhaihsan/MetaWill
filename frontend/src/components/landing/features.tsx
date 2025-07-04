import { Wallet, Users, ShieldCheck } from "lucide-react";

const featuresData = [
  {
    icon: Wallet,
    title: "Financial Stakes",
    description:
      "Stake assets as collateral. Get them back when you succeed, or have them sent to a cause you care about if you don't.",
  },
  {
    icon: Users,
    title: "Trusted Validators",
    description:
      "Assign a trusted friend, family member, or mentor to verify your commitment, ensuring fairness and accountability.",
  },
  {
    icon: ShieldCheck,
    title: "On-Chain Security",
    description:
      "Every commitment is a smart contract on the blockchain, providing unparalleled security and transparency.",
  },
];

export default function Features() {
  return (
    <section
      id="how-it-works"
      className="w-full py-20 md:py-32 bg-gray-950 relative"
    >
      {/* Background Glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-64 bg-orange-500/10 blur-[100px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
          <div className="inline-block rounded-full bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400 border border-orange-500/20">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Commitment Made Simple & Secure
          </h2>
          <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed">
            MetaWill leverages blockchain to create a transparent, trustless
            system for personal accountability in three easy steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-8 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 transition-all duration-300 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-transparent border-2 border-orange-500/30 group-hover:border-orange-500/60 transition-all duration-300">
                <feature.icon className="h-10 w-10 text-orange-400 group-hover:text-orange-300 transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
