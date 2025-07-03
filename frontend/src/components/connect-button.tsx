"use client";

import { Button } from "@/components/ui/button";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { Wallet } from "lucide-react";
import { base, baseSepolia } from "wagmi/chains";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy } from "lucide-react";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const handleConnect = () => {
    // Set connection event flag before connecting
    sessionStorage.setItem("connectionEvent", "true");

    const connector = connectors.find((c) => c.name === "MetaMask");
    if (connector) {
      connect({ connector });
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getNetworkName = (id: number) => {
    switch (id) {
      case base.id:
        return "Base";
      case baseSepolia.id:
        return "Base Sepolia";
      default:
        return "Unknown Network";
    }
  };

  return (
    <>
      {isConnected && address ? (
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="hidden sm:flex text-[#F6851B] border-[#F6851B]/20 hover:bg-[#F6851B]/10"
              >
                {getNetworkName(chainId)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => switchChain({ chainId: base.id })}
              >
                Base Mainnet
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => switchChain({ chainId: baseSepolia.id })}
              >
                Base Sepolia (Testnet)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="flex gap-2 bg-[#F6851B] hover:bg-[#F6851B]/90 text-white"
              >
                <Wallet className="h-4 w-4" /> {formatAddress(address)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-4 py-3">
                <div className="mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(address);
                    }}
                    className="flex items-center gap-2 text-[#F6851B] hover:text-[#F6851B]/80"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Full Address</span>
                  </button>
                </div>
              </div>
              <DropdownMenuItem
                onClick={() => disconnect()}
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button
          size="sm"
          className="flex gap-2 bg-[#F6851B] hover:bg-[#F6851B]/90 text-white"
          onClick={handleConnect}
        >
          <Wallet className="h-4 w-4" /> Connect Wallet
        </Button>
      )}
    </>
  );
}
