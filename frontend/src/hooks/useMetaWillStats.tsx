// /Users/emhaihsan/Documents/Github/hackathons/metawill/frontend/src/hooks/useMetaWillStats.ts
"use client";

import { useReadContract, useChainId } from "wagmi";
import { contractConfig } from "@/lib/contract-config";
import MetaWillFactoryABI from "@/abi/MetaWillFactory.json";
import MetaWillDonationABI from "@/abi/MetaWillDonation.json";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

export function useMetaWillStats() {
  const { address, isConnecting } = useAccount();
  const chainId = useChainId();
  const config = contractConfig[chainId];

  // Mendapatkan komitmen user
  const { data: userCommitments, isLoading: isUserQueryLoading } =
    useReadContract({
      address: config?.metaWillFactory.address,
      abi: config?.metaWillFactory.abi,
      functionName: "getUserCommitments",
      args: [address],
      query: {
        enabled: !!address && !!config,
      },
    });

  // Mendapatkan komitmen yang perlu divalidasi oleh user
  const { data: validatorCommitments, isLoading: isValidatorQueryLoading } =
    useReadContract({
      address: config?.metaWillFactory.address,
      abi: config?.metaWillFactory.abi,
      functionName: "getValidatorCommitments",
      args: [address],
      query: {
        enabled: !!address && !!config,
      },
    });

  // Mendapatkan total donasi dari user yang sedang login
  const { data: totalDonation1, isLoading: isLoadingDonation1 } =
    useReadContract({
      address: config?.donation.address1,
      abi: MetaWillDonationABI,
      functionName: "getDonorContribution",
      args: [address],
      query: { enabled: !!address && !!config },
    });

  const { data: totalDonation2, isLoading: isLoadingDonation2 } =
    useReadContract({
      address: config?.donation.address2,
      abi: MetaWillDonationABI,
      functionName: "getDonorContribution",
      args: [address],
      query: { enabled: !!address && !!config },
    });

  const { data: totalDonation3, isLoading: isLoadingDonation3 } =
    useReadContract({
      address: config?.donation.address3,
      abi: MetaWillDonationABI,
      functionName: "getDonorContribution",
      args: [address],
      query: { enabled: !!address && !!config },
    });

  const totalDonations =
    totalDonation1 !== undefined &&
    totalDonation2 !== undefined &&
    totalDonation3 !== undefined
      ? formatUnits(
          (totalDonation1 as bigint) +
            (totalDonation2 as bigint) +
            (totalDonation3 as bigint),
          6
        )
      : "0";

  const userCommitmentsArray = (userCommitments as any[]) || [];
  const validatorCommitmentsArray = (validatorCommitments as any[]) || [];

  return {
    userCommitments: userCommitmentsArray,
    userCommitmentsCount: userCommitmentsArray.length,
    isLoadingUserCommitments: isConnecting || isUserQueryLoading,
    validatorCommitments: validatorCommitmentsArray,
    validatorCommitmentsCount: validatorCommitmentsArray.length,
    isLoadingValidatorCommitments: isConnecting || isValidatorQueryLoading,
    totalDonations,
    isLoadingDonations:
      isLoadingDonation1 || isLoadingDonation2 || isLoadingDonation3,
  };
}
