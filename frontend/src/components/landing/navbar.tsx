import Link from "next/link";
import { Shield } from "lucide-react";
import { ConnectButton } from "@/components/connect-button";

export default function Navbar() {
  return (
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
  );
}
