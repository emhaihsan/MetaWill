"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useMetaWillStats } from "./useMetaWillStats";
import { formatEther } from "viem";

// Tipe data untuk komitmen
export type Commitment = {
  address: string;
  title: string;
  description: string;
  staked: string;
  deadline: string;
  validator: string;
  creator: string;
  status: "active" | "completed" | "failed";
  creatorReportedSuccess: boolean;
  validatorConfirmed: boolean;
  validatorReportedSuccess: boolean;
};

export function useCommitments() {
  const { address } = useAccount();
  const {
    userCommitments,
    validatorCommitments,
    isLoadingUserCommitments,
    isLoadingValidatorCommitments,
  } = useMetaWillStats();

  const [activeCommitments, setActiveCommitments] = useState<Commitment[]>([]);
  const [pastCommitments, setPastCommitments] = useState<Commitment[]>([]);
  const [validationRequests, setValidationRequests] = useState<Commitment[]>(
    []
  );
  const [isLoadingCommitments, setIsLoadingCommitments] = useState(true);

  useEffect(() => {
    async function fetchCommitmentDetails() {
      if (isLoadingUserCommitments || isLoadingValidatorCommitments || !address)
        return;

      setIsLoadingCommitments(true);

      // Fetch user commitments details
      const activeComms: Commitment[] = [];
      const pastComms: Commitment[] = [];

      if (userCommitments && userCommitments.length > 0) {
        for (const commitmentAddress of userCommitments) {
          try {
            // Fetch commitment details using contract calls
            const details = await fetchCommitmentDetail(commitmentAddress);

            if (details) {
              // Sort into active or past commitments
              if (details.status === "active") {
                activeComms.push(details);
              } else {
                pastComms.push(details);
              }
            }
          } catch (error) {
            console.error("Error fetching commitment details:", error);
          }
        }
      }

      // Fetch validation requests
      const validationReqs: Commitment[] = [];

      if (validatorCommitments && validatorCommitments.length > 0) {
        for (const commitmentAddress of validatorCommitments) {
          try {
            // Fetch commitment details using contract calls
            const details = await fetchCommitmentDetail(commitmentAddress);

            if (details && details.status === "active") {
              validationReqs.push(details);
            }
          } catch (error) {
            console.error("Error fetching validation request details:", error);
          }
        }
      }

      setActiveCommitments(activeComms);
      setPastCommitments(pastComms);
      setValidationRequests(validationReqs);
      setIsLoadingCommitments(false);
    }

    fetchCommitmentDetails();
  }, [
    userCommitments,
    validatorCommitments,
    isLoadingUserCommitments,
    isLoadingValidatorCommitments,
    address,
  ]);

  // Helper function to fetch commitment details
  async function fetchCommitmentDetail(
    commitmentAddress: string
  ): Promise<Commitment | null> {
    try {
      // Fetch basic details
      const titleResult = await readContractData(commitmentAddress, "title");
      const descriptionResult = await readContractData(
        commitmentAddress,
        "description"
      );
      const stakeAmountResult = await readContractData(
        commitmentAddress,
        "stakeAmount"
      );
      const deadlineResult = await readContractData(
        commitmentAddress,
        "deadline"
      );
      const validatorResult = await readContractData(
        commitmentAddress,
        "validator"
      );
      const creatorResult = await readContractData(
        commitmentAddress,
        "creator"
      );
      const statusResult = await readContractData(commitmentAddress, "status");
      const creatorReportedSuccessResult = await readContractData(
        commitmentAddress,
        "creatorReportedSuccess"
      );
      const validatorConfirmedResult = await readContractData(
        commitmentAddress,
        "validatorConfirmed"
      );
      const validatorReportedSuccessResult = await readContractData(
        commitmentAddress,
        "validatorReportedSuccess"
      );

      // Map status number to string
      let statusString: "active" | "completed" | "failed";
      switch (Number(statusResult)) {
        case 0:
          statusString = "active";
          break;
        case 1:
          statusString = "completed";
          break;
        case 2:
          statusString = "failed";
          break;
        default:
          statusString = "active";
      }

      return {
        address: commitmentAddress,
        title: String(titleResult),
        description: String(descriptionResult),
        staked: `${formatEther(BigInt(String(stakeAmountResult)))} ETH`,
        deadline: new Date(Number(deadlineResult) * 1000).toLocaleDateString(),
        validator: `${String(validatorResult).slice(0, 6)}...${String(
          validatorResult
        ).slice(-4)}`,
        creator: `${String(creatorResult).slice(0, 6)}...${String(
          creatorResult
        ).slice(-4)}`,
        status: statusString,
        creatorReportedSuccess: Boolean(creatorReportedSuccessResult),
        validatorConfirmed: Boolean(validatorConfirmedResult),
        validatorReportedSuccess: Boolean(validatorReportedSuccessResult),
      };
    } catch (error) {
      console.error(
        `Error fetching commitment details for ${commitmentAddress}:`,
        error
      );
      return null;
    }
  }

  // Helper function to read contract data
  async function readContractData(address: string, functionName: string) {
    try {
      const result = await fetch(
        `/api/read-contract?address=${address}&functionName=${functionName}`
      );
      const data = await result.json();
      return data.result;
    } catch (error) {
      console.error(`Error reading contract data for ${functionName}:`, error);
      throw error;
    }
  }

  return {
    activeCommitments,
    pastCommitments,
    validationRequests,
    isLoadingUserCommitments,
    isLoadingValidatorCommitments,
  };
}
