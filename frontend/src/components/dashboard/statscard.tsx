// /Users/emhaihsan/Documents/Github/hackathons/metawill/frontend/src/components/dashboard/statscard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMetaWillStats } from "@/hooks/useMetaWillStats";
import { formatEther } from "viem";
import { useEffect, useState } from "react";

export default function StatsCard() {
  const {
    userCommitments,
    userCommitmentsCount,
    validatorCommitments,
    validatorCommitmentsCount,
    totalDonatedFormatted,
    isLoading,
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
          // Gunakan wagmi untuk mendapatkan detail komitmen
          const result = await fetch(
            `/api/commitment-details?address=${commitmentAddress}`
          );
          const data = await result.json();

          if (data) {
            // Tambahkan stake amount ke total
            totalStakedAmount += BigInt(data.stakeAmount || 0);

            // Hitung success rate
            if (data.status === 1) {
              // CompletedSuccess
              successCount++;
              completedCount++;
            } else if (data.status === 2) {
              // CompletedFailure
              completedCount++;
            }
          }
        } catch (error) {
          console.error("Error fetching commitment details:", error);
        }
      }

      // Format total staked
      setTotalStaked(formatEther(totalStakedAmount));

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

  // Data untuk statscard
  const stats = [
    {
      name: "Total User Commitment",
      value: isLoading ? "Loading..." : userCommitmentsCount.toString(),
      change: "",
      changeType: "neutral",
    },
    {
      name: "Total Validation",
      value: isLoading ? "Loading..." : validatorCommitmentsCount.toString(),
      change: "",
      changeType: "neutral",
    },
    {
      name: "Total Donated",
      value: isLoading ? "Loading..." : `${totalDonatedFormatted} ETH`,
      change: "",
      changeType: "neutral",
    },
    {
      name: "Success Rate",
      value: isLoadingDetails ? "Loading..." : successRate,
      change: "",
      changeType: "neutral",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border border-primary/10 bg-background/50 backdrop-blur-sm"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div
                className={`text-sm ${
                  stat.changeType === "positive"
                    ? "text-green-500"
                    : stat.changeType === "negative"
                    ? "text-red-500"
                    : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
