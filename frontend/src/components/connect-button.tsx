"use client";

import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Wallet } from "lucide-react";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    const connector = connectors.find((c) => c.name === "MetaMask");
    if (connector) {
      connect({ connector });
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      {isConnected && address ? (
        <Button size="sm" className="flex gap-2" onClick={() => disconnect()}>
          <Wallet className="h-4 w-4" /> {formatAddress(address)}
        </Button>
      ) : (
        <Button size="sm" className="flex gap-2" onClick={handleConnect}>
          <Wallet className="h-4 w-4" /> Connect Wallet
        </Button>
      )}
    </>
  );
}
