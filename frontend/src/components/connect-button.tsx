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
import { linea, lineaSepolia } from "wagmi/chains";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      case linea.id:
        return "Linea";
      case lineaSepolia.id:
        return "Linea Sepolia";
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
              <Button variant="outline" size="sm" className="hidden sm:flex">
                {getNetworkName(chainId)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => switchChain({ chainId: linea.id })}
              >
                Linea Mainnet
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => switchChain({ chainId: lineaSepolia.id })}
              >
                Linea Sepolia (Testnet)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="flex gap-2" onClick={() => disconnect()}>
            <Wallet className="h-4 w-4" /> {formatAddress(address)}
          </Button>
        </div>
      ) : (
        <Button size="sm" className="flex gap-2" onClick={handleConnect}>
          <Wallet className="h-4 w-4" /> Connect Wallet
        </Button>
      )}
    </>
  );
}
