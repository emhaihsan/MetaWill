"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";
import {
  ReactNode,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import {
  useMetaWillFactory,
  useUserCommitments,
  useValidatorCommitments,
  useMetaWillCommitment,
} from "@/hooks/useMetaWillContract";
import { useAccount } from "wagmi";
import { Address } from "viem";

// Buat tipe untuk konteks MetaWill
type MetaWillContextType = {
  // Factory functions
  userCommitments: Address[] | undefined;
  validatorCommitments: Address[] | undefined;
  isLoadingUserCommitments: boolean;
  isLoadingValidatorCommitments: boolean;
  refreshUserCommitments: () => Promise<void>;
  refreshValidatorCommitments: () => Promise<void>;
  createNewCommitment: (
    title: string,
    description: string,
    deadline: number,
    validator: Address,
    donationAddressIndex: number,
    stakeAmount: bigint
  ) => Promise<Address>;
  isCreatingCommitment: boolean;

  // Commitment functions (untuk commitment yang aktif)
  activeCommitmentAddress: Address | null;
  setActiveCommitmentAddress: (address: Address | null) => void;
  activeCommitmentDetails: any;
  isLoadingCommitmentDetails: boolean;
  refreshCommitmentDetails: () => Promise<void>;
  reportCommitmentSuccess: () => Promise<Address | undefined>;
  validateCommitmentCompletion: (
    isSuccessful: boolean
  ) => Promise<Address | undefined>;
  isReporting: boolean;
  isValidating: boolean;
};

// Buat konteks dengan nilai default
const MetaWillContext = createContext<MetaWillContextType | null>(null);

// Hook untuk menggunakan konteks
export const useMetaWill = () => {
  const context = useContext(MetaWillContext);
  if (!context) {
    throw new Error("useMetaWill must be used within a MetaWillProvider");
  }
  return context;
};

// Provider untuk MetaWill
function MetaWillProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
  const [activeCommitmentAddress, setActiveCommitmentAddress] =
    useState<Address | null>(null);

  // Factory hooks
  const { createNewCommitment, isCreating: isCreatingCommitment } =
    useMetaWillFactory();

  // User commitments
  const {
    commitments: userCommitments,
    isLoading: isLoadingUserCommitments,
    refetch: refetchUserCommitments,
  } = useUserCommitments(address);

  // Validator commitments
  const {
    commitments: validatorCommitments,
    isLoading: isLoadingValidatorCommitments,
    refetch: refetchValidatorCommitments,
  } = useValidatorCommitments(address);

  // Active commitment
  const {
    commitmentDetails: activeCommitmentDetails,
    isLoading: isLoadingCommitmentDetails,
    refetch: refetchCommitmentDetails,
    reportCommitmentSuccess,
    validateCommitmentCompletion,
    isReporting,
    isValidating,
  } = useMetaWillCommitment(activeCommitmentAddress || undefined);

  // Refresh functions
  const refreshUserCommitments = useCallback(async () => {
    await refetchUserCommitments();
  }, [refetchUserCommitments]);

  const refreshValidatorCommitments = useCallback(async () => {
    await refetchValidatorCommitments();
  }, [refetchValidatorCommitments]);

  const refreshCommitmentDetails = useCallback(async () => {
    await refetchCommitmentDetails();
  }, [refetchCommitmentDetails]);

  const value = {
    // Factory data
    userCommitments,
    validatorCommitments,
    isLoadingUserCommitments,
    isLoadingValidatorCommitments,
    refreshUserCommitments,
    refreshValidatorCommitments,
    createNewCommitment,
    isCreatingCommitment,

    // Active commitment data
    activeCommitmentAddress,
    setActiveCommitmentAddress,
    activeCommitmentDetails,
    isLoadingCommitmentDetails,
    refreshCommitmentDetails,
    reportCommitmentSuccess,
    validateCommitmentCompletion,
    isReporting,
    isValidating,
  };

  return (
    <MetaWillContext.Provider value={value}>
      {children}
    </MetaWillContext.Provider>
  );
}

// Provider utama yang menggabungkan semua provider
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MetaWillProvider>{children}</MetaWillProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
