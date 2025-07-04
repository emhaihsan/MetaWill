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
        <div className="flex items-center gap-2 p-1.5 bg-black/30 backdrop-blur-lg rounded-xl border border-white/10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex text-orange-400 hover:bg-white/5 hover:text-orange-300"
              >
                {getNetworkName(chainId)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-gray-900 border-white/10 text-white"
            >
              <DropdownMenuItem
                onClick={() => switchChain({ chainId: base.id })}
                className="focus:bg-white/10 focus:text-orange-400"
              >
                Base Mainnet
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => switchChain({ chainId: baseSepolia.id })}
                className="focus:bg-white/10 focus:text-orange-400"
              >
                Base Sepolia (Testnet)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="flex gap-2 bg-white/5 hover:bg-white/10 text-white"
              >
                <Wallet className="h-4 w-4 text-orange-400" />{" "}
                {formatAddress(address)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-gray-900 border-white/10 text-white"
            >
              <div className="px-2 py-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(address);
                  }}
                  className="w-full text-left flex items-center gap-2 text-gray-300 hover:text-orange-400 p-2 rounded-md transition-colors duration-200 hover:bg-white/5"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy Address</span>
                </button>
              </div>
              <DropdownMenuItem
                onClick={() => disconnect()}
                className="text-red-500 focus:text-red-400 focus:bg-red-500/10"
              >
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button
          size="lg"
          className="group flex gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold shadow-[0_0_20px_rgba(246,133,27,0.4)] hover:shadow-[0_0_30px_rgba(246,133,27,0.6)] transition-all duration-300 transform hover:scale-105"
          onClick={handleConnect}
        >
          <Wallet className="h-5 w-5" /> Connect Wallet
        </Button>
      )}
    </>
  );
}
