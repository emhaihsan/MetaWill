"use client";

import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@/components/connect-button";
import { useAccount } from "wagmi";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ArrowRight, ArrowUpLeft } from "lucide-react";

const navLinks = [
  { href: "#how-it-works", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#why", label: "Why MetaWill" },
];

export default function Navbar() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isDashboardPage = pathname.startsWith("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navContent = (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
        >
          {link.label}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
        </Link>
      ))}
    </>
  );

  const getDashboardButton = () => {
    if (!isConnected) return null;

    if (pathname === "/") {
      return (
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex group border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 transition-all duration-300"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      );
    }

    if (isDashboardPage && pathname !== "/dashboard") {
      return (
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex group border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 transition-all duration-300"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowUpLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      );
    }

    return null;
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/80 border-b border-white/10 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/metawillicon.png"
            alt="MetaWill Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-white">MetaWill</span>
        </Link>

        {!isDashboardPage && (
          <nav className="hidden md:flex items-center gap-6">{navContent}</nav>
        )}

        <div className="flex items-center gap-3">
          {getDashboardButton()}
          <ConnectButton />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-gray-950/80 backdrop-blur-lg border-l-white/10 text-white"
              >
                <nav className="flex flex-col gap-6 text-lg mt-10">
                  {!isDashboardPage && navContent}
                  {isConnected && pathname === "/" && (
                    <Button
                      variant="outline"
                      className="w-full group border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 transition-all duration-300"
                      onClick={() => router.push("/dashboard")}
                    >
                      Dashboard
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  )}
                  {isDashboardPage && pathname !== "/dashboard" && (
                    <Button
                      variant="outline"
                      className="w-full group border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 transition-all duration-300"
                      onClick={() => router.push("/dashboard")}
                    >
                      <ArrowUpLeft className="mr-2 h-4 w-4" />
                      Back to Dashboard
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
