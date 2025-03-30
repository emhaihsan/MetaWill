"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { ConnectButton } from "@/components/connect-button";
import { useAccount } from "wagmi";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to dashboard when connected
  useEffect(() => {
    if (isConnected && pathname !== "/dashboard") {
      // Only redirect if this is a connection event, not on initial load when already connected
      const isConnectionEvent =
        sessionStorage.getItem("connectionEvent") === "true";
      if (isConnectionEvent) {
        sessionStorage.removeItem("connectionEvent");
        router.push("/dashboard");
      }
    }
  }, [isConnected, router, pathname]);

  // Set connection event flag when connecting
  useEffect(() => {
    if (!isConnected) {
      sessionStorage.setItem("connectionEvent", "true");
    }
  }, [isConnected]);

  // Redirect away from dashboard if not connected
  useEffect(() => {
    if (!isConnected && pathname.startsWith("/dashboard")) {
      router.push("/");
    }
  }, [isConnected, pathname, router]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F6851B]/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-[#F6851B]" />
            <span className="inline-block font-bold">MetaWill</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isConnected && !pathname.startsWith("/dashboard") && (
            <Button
              variant="outline"
              size="sm"
              className="mr-2 border-[#F6851B]/20 text-[#F6851B] hover:bg-[#F6851B]/10"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </Button>
          )}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
