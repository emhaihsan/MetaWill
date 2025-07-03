const processSteps = [
  {
    title: "Create Your Will",
    description:
      "Define your commitment, set a clear goal, and determine the stake. This is your promise, recorded on the blockchain.",
  },
  {
    title: "Assign a Validator",
    description:
      "Choose someone you trust—a friend, mentor, or family member—to verify that you've completed your commitment.",
  },
  {
    title: "Fulfill Your Promise",
    description:
      "Work towards your goal. Your validator can track your progress, keeping you motivated and accountable every step of the way.",
  },
  {
    title: "Claim Your Success",
    description:
      "Once your validator confirms completion, your staked assets are returned. Your success is now a permanent, verifiable record.",
  },
];

export default function Process() {
  return (
    <section id="process" className="w-full py-20 md:py-32 bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
          <div className="inline-block rounded-full bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400 border border-orange-500/20">
            The Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            A Journey in Four Steps
          </h2>
          <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed">
            From a simple promise to a verifiable achievement on the blockchain,
            here’s how your journey with MetaWill unfolds.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto mt-12">
          {/* The glowing vertical line */}
          <div className="absolute left-1/2 -ml-1 w-2 h-full bg-gradient-to-b from-orange-500/0 via-orange-500/50 to-orange-500/0"></div>

          {processSteps.map((step, index) => (
            <div
              key={index}
              className={`mb-12 flex items-center w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                <div
                  className={`p-6 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl shadow-orange-500/5 transition-all duration-300 hover:border-orange-500/40 hover:shadow-orange-500/10 ${
                    index % 2 === 0 ? "text-right" : "text-left"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-orange-400 mb-2">
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
              {/* The glowing node on the timeline */}
              <div className="absolute left-1/2 -ml-4 h-8 w-8 rounded-full bg-gray-900 border-4 border-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(246,133,27,0.7)] animate-pulse-slow">
                <div className="h-2 w-2 rounded-full bg-orange-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
