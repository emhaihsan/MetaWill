"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is MetaWill?",
    answer:
      "MetaWill is a decentralized platform built on blockchain technology that enables users to create and fulfill personal commitments with financial accountability. You stake USDC as collateral for your promises, creating a verifiable on-chain legacy of your achievements.",
  },
  {
    question: "How does the validation process work?",
    answer:
      "When you create a commitment, you assign a trusted validator. The validator's role is to confirm whether you've successfully completed your commitment based on pre-agreed criteria. All validation and outcomes are enforced programmatically by smart contracts.",
  },
  {
    question: "What happens if I fail my commitment?",
    answer:
      "If you fail to fulfill your commitment, your staked USDC is automatically transferred to a pre-determined recipient, such as a charity. This ensures real-world consequences and social good from your effort.",
  },
  {
    question: "Is MetaWill secure?",
    answer:
      "Yes. MetaWill uses audited smart contracts on secure blockchains to ensure maximum security, transparency, and trustless execution of all commitments and USDC transactions. Your commitments are as secure as the blockchain itself.",
  },
  {
    question: "What can I use as a stake?",
    answer:
      "You must use USDC (a stablecoin) as your stake. The amount is set by you, but should be meaningful enough to motivate you to complete your commitment.",
  },
  {
    question: "Can I be a validator for someone else?",
    answer:
      "Yes, anyone with a compatible wallet can be designated as a validator. Validators are responsible for impartially verifying the commitment's completion.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="w-full py-20 md:py-32 bg-gray-950 relative">
      <div className="absolute inset-0 w-full h-full bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-full bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400 border border-orange-500/20">
            Have Questions?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed">
            Everything you need to know about building your on-chain legacy with
            MetaWill.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg shadow-orange-500/5 transition-all hover:border-white/20"
              >
                <AccordionTrigger className="p-6 text-lg font-medium text-white text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
