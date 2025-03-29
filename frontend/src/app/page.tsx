import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Shield,
  Wallet,
  Calendar,
  Users,
  Hexagon,
  Lock,
  Globe,
  List,
} from "lucide-react";
import { ConnectButton } from "@/components/connect-button";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50 overflow-hidden">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-pulse-slow absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#F6851B]/20 blur-3xl"></div>
        <div className="animate-pulse-slow absolute top-1/3 -left-20 h-60 w-60 rounded-full bg-[#F6851B]/20 blur-3xl"></div>
        <div className="animate-pulse-slow absolute bottom-1/4 right-1/4 h-60 w-60 rounded-full bg-[#F6851B]/20 blur-3xl"></div>

        <div className="absolute top-1/4 left-1/2 h-40 w-40 -translate-x-1/2 border border-[#F6851B]/30 opacity-40">
          <div className="absolute inset-0 animate-spin-slow border-t border-[#F6851B]"></div>
        </div>

        <div className="absolute bottom-20 left-20 h-20 w-20 animate-float">
          <Hexagon className="h-full w-full text-[#F6851B]/20" />
        </div>
        <div className="absolute top-40 right-20 h-16 w-16 animate-float-delay">
          <Hexagon className="h-full w-full text-[#F6851B]/20" />
        </div>

        <div className="absolute inset-0 bg-grid-[#F6851B]/5 opacity-30"></div>

        <div className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full border border-[#F6851B]/20 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 h-16 w-16 rounded-full border border-[#F6851B]/20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 h-12 w-12 rounded-full border border-[#F6851B]/20 animate-pulse-slow"></div>

        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F6851B]/30 to-transparent"></div>
        <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#F6851B]/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#F6851B]/30 to-transparent"></div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b border-[#F6851B]/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-[#F6851B]" />
              <span className="inline-block font-bold">MetaWill</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-[#F6851B]"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-[#F6851B]"
              >
                How It Works
              </Link>
              <Link
                href="#faq"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-[#F6851B]"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ConnectButton />
          </div>
        </div>
      </header>
      <main className="flex-1">
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
                    personal commitments through financial accountability. Stake
                    ETH on your promises and succeed—or donate to charity.
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
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 relative"
        >
          <div className="absolute inset-0 bg-grid-[#F6851B]/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#F6851B] px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Commitment Made Transparent
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  MetaWill leverages blockchain technology to create a
                  transparent, trustless system for personal accountability.
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
                    Stake ETH as collateral for your commitments. Get it back
                    when you succeed, or donate it to charity if you fail.
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
                    Assign trusted validators to verify your commitment
                    completion, ensuring accountability and fairness.
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
                    Connect your Ethereum wallet to access the platform and
                    manage your commitments.
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
                    Fulfill your commitment, get verified, and receive your
                    stake back—or donate it if you fail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 relative">
          <div className="absolute inset-0 bg-grid-[#F6851B]/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
          <div className="container px-4 md:px-6 relative">
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
                    <span>
                      Positive social impact through charity donations
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6851B]/20">
                      <CheckCircle className="h-4 w-4 text-[#F6851B]" />
                    </div>
                    <span>
                      Decentralized platform with no central authority
                    </span>
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
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
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
                  MetaWill is a decentralized platform built on blockchain
                  technology that enables users to create and fulfill personal
                  commitments with financial accountability. Users stake
                  Ethereum as collateral for their promises.
                </p>
              </div>
              <div className="space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold">
                  How does the validation process work?
                </h3>
                <p className="text-muted-foreground">
                  When you create a commitment, you assign a trusted validator
                  who will verify whether you've completed your commitment. Both
                  you and your validator must agree on the outcome for the stake
                  to be returned.
                </p>
              </div>
              <div className="space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold">
                  What happens if I fail my commitment?
                </h3>
                <p className="text-muted-foreground">
                  If you fail to fulfill your commitment, your staked ETH will
                  be automatically donated to a predetermined charity address,
                  creating a positive social impact from your unfulfilled
                  promise.
                </p>
              </div>
              <div className="space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold">Is MetaWill secure?</h3>
                <p className="text-muted-foreground">
                  Yes, MetaWill uses smart contracts on the Ethereum blockchain
                  to ensure security, transparency, and trustless execution of
                  all commitments and financial transactions.
                </p>
              </div>
              <div className="space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold">
                  How much ETH do I need to stake?
                </h3>
                <p className="text-muted-foreground">
                  You can set your own stake amount within the platform's
                  minimum and maximum limits. The amount should be significant
                  enough to motivate you to complete your commitment.
                </p>
              </div>
              <div className="space-y-4 rounded-xl border border-[#F6851B]/20 bg-background/50 p-6 transition-all hover:border-[#F6851B]/40 hover:shadow-lg hover:shadow-[#F6851B]/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold">
                  Can I be a validator for someone else?
                </h3>
                <p className="text-muted-foreground">
                  Yes, anyone with an Ethereum wallet can be designated as a
                  validator. You'll receive notifications when someone selects
                  you, and you'll be responsible for verifying their commitment
                  completion.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F6851B] text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Keep Your Promises?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join MetaWill today and transform your commitments with
                  blockchain-powered accountability.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="border-white/80 bg-white hover:bg-white/80 text-[#F6851B] font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  asChild
                >
                  <Link href="/whitepaper">Read Whitepaper</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-[#F6851B]/20 bg-background py-6 relative">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#F6851B]" />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} MetaWill. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
