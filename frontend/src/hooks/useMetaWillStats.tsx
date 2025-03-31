// /Users/emhaihsan/Documents/Github/hackathons/metawill/frontend/src/hooks/useMetaWillStats.ts
"use client";

import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESSES } from "@/lib/contract-config";
import MetaWillFactoryABI from "@/abi/MetaWillFactory.json";
import MetaWillDonationABI from "@/abi/MetaWillDonation.json";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

export function useMetaWillStats() {
  const { address } = useAccount();

  // Mendapatkan total komitmen dari factory
  const { data: totalCommitments, isLoading: isLoadingTotalCommitments } =
    useReadContract({
      address: CONTRACT_ADDRESSES.FACTORY,
      abi: MetaWillFactoryABI,
      functionName: "getTotalCommitments",
    });

  // Mendapatkan komitmen user
  const { data: userCommitments, isLoading: isLoadingUserCommitments } =
    useReadContract({
      address: CONTRACT_ADDRESSES.FACTORY,
      abi: MetaWillFactoryABI,
      functionName: "getUserCommitments",
      args: [address],
      query: {
        enabled: !!address,
      },
    });

  // Mendapatkan total donasi dari ketiga kontrak donasi
  const { data: totalDonation1, isLoading: isLoadingDonation1 } =
    useReadContract({
      address: CONTRACT_ADDRESSES.DONATION_1,
      abi: MetaWillDonationABI,
      functionName: "getTotalDonations",
    });

  const { data: totalDonation2, isLoading: isLoadingDonation2 } =
    useReadContract({
      address: CONTRACT_ADDRESSES.DONATION_2,
      abi: MetaWillDonationABI,
      functionName: "getTotalDonations",
    });

  const { data: totalDonation3, isLoading: isLoadingDonation3 } =
    useReadContract({
      address: CONTRACT_ADDRESSES.DONATION_3,
      abi: MetaWillDonationABI,
      functionName: "getTotalDonations",
    });

  // Menghitung total donasi dari semua kontrak donasi
  const totalDonated =
    (totalDonation1 ? BigInt(totalDonation1.toString()) : BigInt(0)) +
    (totalDonation2 ? BigInt(totalDonation2.toString()) : BigInt(0)) +
    (totalDonation3 ? BigInt(totalDonation3.toString()) : BigInt(0));

  // Mendapatkan total stake dari user commitments (perlu query setiap komitmen)
  // Ini akan diimplementasikan di komponen statscard

  return {
    totalCommitments: totalCommitments ? Number(totalCommitments) : 0,
    userCommitments: (userCommitments as `0x${string}`[]) || [],
    totalDonated,
    totalDonatedFormatted: formatEther(totalDonated),
    isLoading:
      isLoadingTotalCommitments ||
      isLoadingUserCommitments ||
      isLoadingDonation1 ||
      isLoadingDonation2 ||
      isLoadingDonation3,
  };
}
