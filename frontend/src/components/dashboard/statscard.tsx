// /Users/emhaihsan/Documents/Github/hackathons/metawill/frontend/src/components/dashboard/statscard.tsx
"use client";

import { useMetaWillStats } from "@/hooks/useMetaWillStats";
import { formatUnits } from "viem";
import { useEffect, useState } from "react";
import { Users, CheckCircle, DollarSign, TrendingUp } from "lucide-react";

export default function StatsCard() {
  const {
    userCommitments,
    userCommitmentsCount,
    validatorCommitmentsCount,
    totalDonations,
    isLoadingUserCommitments,
    isLoadingValidatorCommitments,
    isLoadingDonations,
  } = useMetaWillStats();

  const [totalStaked, setTotalStaked] = useState("0");
  const [successRate, setSuccessRate] = useState("0%");
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  // Mendapatkan detail dari setiap komitmen user untuk menghitung total staked dan success rate
  useEffect(() => {
    async function fetchCommitmentDetails() {
      if (!userCommitments || userCommitments.length === 0) {
        setIsLoadingDetails(false);
        return;
      }

      let totalStakedAmount = BigInt(0);
      let successCount = 0;
      let completedCount = 0;

      for (const commitmentAddress of userCommitments) {
        try {
          // Gunakan API untuk mendapatkan detail komitmen yang terbaru
          const result = await fetch(
            `/api/commitment-details?address=${commitmentAddress}&timestamp=${Date.now()}`
          );
          const data = await result.json();

          if (data && data.commitment) {
            // Tambahkan stake amount ke total
            totalStakedAmount += BigInt(data.commitment.stakeAmount || 0);

            // Hitung success rate
            if (Number(data.commitment.status) === 1) {
              // CompletedSuccess
              successCount++;
              completedCount++;
            } else if (Number(data.commitment.status) === 2) {
              // CompletedFailure
              completedCount++;
            }
          }
        } catch (error) {
          console.error("Error fetching commitment details:", error);
        }
      }

      // Format total staked
      setTotalStaked(formatUnits(totalStakedAmount, 6));

      // Hitung success rate
      if (completedCount > 0) {
        const rate = Math.round((successCount / completedCount) * 100);
        setSuccessRate(`${rate}%`);
      } else {
        setSuccessRate("0%");
      }

      setIsLoadingDetails(false);
    }

    if (userCommitments && userCommitments.length > 0) {
      fetchCommitmentDetails();
    } else {
      setIsLoadingDetails(false);
    }
  }, [userCommitments]);

  const isLoading =
    isLoadingUserCommitments ||
    isLoadingValidatorCommitments ||
    isLoadingDonations;

  // Data untuk statscard
  const stats = [
    {
      name: "My Commitments",
      value: isLoading ? "..." : userCommitmentsCount.toString(),
      icon: <Users className="h-5 w-5 text-orange-400" />,
    },
    {
      name: "My Validations",
      value: isLoading ? "..." : validatorCommitmentsCount.toString(),
      icon: <CheckCircle className="h-5 w-5 text-orange-400" />,
    },
    {
      name: "Total Donated",
      value: isLoading ? "..." : `${totalDonations ?? 0}`,
      icon: <DollarSign className="h-5 w-5 text-orange-400" />,
    },
    {
      name: "Success Rate",
      value: isLoadingDetails ? "..." : successRate,
      icon: <TrendingUp className="h-5 w-5 text-orange-400" />,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-6 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg shadow-orange-500/5 transition-all duration-300 hover:border-orange-400/50 hover:shadow-orange-400/20 ${
            isLoading || (stat.name === "Success Rate" && isLoadingDetails)
              ? "animate-pulse"
              : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-400">{stat.name}</p>
            {stat.icon}
          </div>
          <div className="mt-2">
            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
