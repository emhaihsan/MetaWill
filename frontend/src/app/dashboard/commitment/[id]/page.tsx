"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowUpLeft,
  Calendar,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  ExternalLink,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { useAccount, useWriteContract } from "wagmi";

import Elements from "@/components/elements";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { MetaWillCommitmentABI } from "@/abi/MetaWillCommitment";
import { formatUnits } from "viem";
import { Skeleton } from "@/components/ui/skeleton";

enum CommitmentStatus {
  Active,
  CompletedSuccess,
  CompletedFailure,
  Disputed,
}

interface CommitmentDetails {
  address: string;
  creator: string;
  validator: string;
  title: string;
  description: string;
  deadline: number;
  stakeAmount: string;
  status: number;
  creatorReportedSuccess: boolean;
  validatorConfirmed: boolean;
  validatorReportedSuccess: boolean;
}

export default function CommitmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { address } = useAccount();
  const [commitment, setCommitment] = useState<CommitmentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [isValidator, setIsValidator] = useState(false);

  // Contract write untuk reportCompletion
  const {
    writeContractAsync: reportCompletionAsync,
    isPending: isReportingCompletion,
  } = useWriteContract();

  // Contract write untuk validateCompletion
  const {
    writeContractAsync: validateCompletionAsync,
    isPending: isValidatingCompletion,
  } = useWriteContract();

  useEffect(() => {
    const fetchCommitmentDetails = async () => {
      try {
        setLoading(true);

        // Fetch commitment details from API
        const response = await fetch(`/api/commitment-details?address=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch commitment details");
        }

        const data = await response.json();
        setCommitment({
          address: id,
          ...data.commitment,
        });

        // Check if user is creator or validator
        if (address) {
          setIsCreator(
            address.toLowerCase() === data.commitment.creator.toLowerCase()
          );
          setIsValidator(
            address.toLowerCase() === data.commitment.validator.toLowerCase()
          );
        }

        // Calculate time left if it's an active commitment
        if (Number(data.commitment.status) === CommitmentStatus.Active) {
          const deadline = new Date(Number(data.commitment.deadline) * 1000);
          const now = new Date();
          const diffTime = deadline.getTime() - now.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays > 0) {
            setTimeLeft(`${diffDays} days left`);
          } else {
            setTimeLeft("Deadline passed");
          }
        }
      } catch (error) {
        console.error("Error fetching commitment details:", error);
        toast.error("Error", {
          description: "Failed to fetch commitment details",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCommitmentDetails();
  }, [id, address]);

  const getStatusBadge = (status: number) => {
    switch (status) {
      case CommitmentStatus.Active:
        return (
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">
            Active
          </Badge>
        );
      case CommitmentStatus.CompletedSuccess:
        return (
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
            Success
          </Badge>
        );
      case CommitmentStatus.CompletedFailure:
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
            Failed
          </Badge>
        );
      case CommitmentStatus.Disputed:
        return (
          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
            Disputed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleReportCompletion = async (success: boolean) => {
    try {
      await reportCompletionAsync({
        address: id as `0x${string}`,
        abi: MetaWillCommitmentABI,
        functionName: "reportCompletion",
        args: [success],
      });

      toast.success("Transaction Submitted", {
        description: `You have reported the commitment as ${
          success ? "completed" : "failed"
        }.`,
      });
    } catch (error) {
      console.error("Error reporting completion:", error);
      toast.error("Error", {
        description: "Failed to report completion status",
      });
    }
  };

  const handleValidateCompletion = async (success: boolean) => {
    try {
      await validateCompletionAsync({
        address: id as `0x${string}`,
        abi: MetaWillCommitmentABI,
        functionName: "validateCompletion",
        args: [success],
      });

      toast.success("Transaction Submitted", {
        description: `You have validated the commitment as ${
          success ? "completed" : "failed"
        }.`,
      });
    } catch (error) {
      console.error("Error validating completion:", error);
      toast.error("Error", {
        description: "Failed to validate completion status",
      });
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-black bg-[radial-gradient(ellipse_at_top,rgba(246,133,27,0.15)_0%,transparent_60%)] text-gray-100">
        <Elements />
        <Navbar />
        <main className="flex-1 container px-4 pb-8 pt-28">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-1/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-8 pt-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-32" />
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!commitment) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <p>Commitment not found.</p>
        <Link
          href="/dashboard"
          className="mt-4 text-orange-400 hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black bg-[radial-gradient(ellipse_at_top,rgba(246,133,27,0.15)_0%,transparent_60%)] text-gray-100">
      <Elements />
      <Navbar />
      <main className="flex-1 container px-4 pb-8 pt-28">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-white tracking-tight truncate">
                {commitment.title}
              </h1>
              <p className="text-gray-400 mt-2 max-w-2xl truncate">
                {commitment.description}
              </p>
            </div>
          </div>

          <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Commitment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
              <div className="flex items-center justify-between border-b border-white/10 py-3">
                <span className="text-gray-400">Status</span>
                {getStatusBadge(commitment.status)}
              </div>
              <div className="flex items-center justify-between border-b border-white/10 py-3">
                <span className="text-gray-400">Time Left</span>
                <span className="font-medium text-white">{timeLeft}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 py-3">
                <span className="text-gray-400">Stake Amount</span>
                <span className="font-mono font-bold text-lg text-orange-400">
                  {formatUnits(BigInt(commitment.stakeAmount), 6)} USDC
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 py-3">
                <span className="text-gray-400">Deadline</span>
                <span className="font-medium text-white">
                  {formatDate(commitment.deadline)}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/10 py-3 md:col-span-2">
                <span className="text-gray-400">Creator</span>
                <span className="font-mono text-sm text-white break-all">
                  {commitment.creator}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/10 py-3 md:col-span-2">
                <span className="text-gray-400">Validator</span>
                <span className="font-mono text-sm text-white break-all">
                  {commitment.validator}
                </span>
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
              {Number(commitment.status) === CommitmentStatus.Active ? (
                <>
                  <Button
                    variant="outline"
                    className="border-white/20 hover:bg-white/10 hover:text-white gap-2"
                    asChild
                  >
                    <Link
                      href={`https://sepolia.basescan.org/address/${commitment.address}`}
                      target="_blank"
                    >
                      <ExternalLink className="h-4 w-4" /> View on Explorer
                    </Link>
                  </Button>

                  {/* Creator actions */}
                  {isCreator && !commitment.creatorReportedSuccess && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleReportCompletion(true)}
                        disabled={isReportingCompletion}
                        className="group flex gap-2 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
                      >
                        Confirm Success
                      </Button>
                      <Button
                        onClick={() => handleReportCompletion(false)}
                        disabled={isReportingCompletion}
                        className="group flex gap-2 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
                      >
                        Report Failure
                      </Button>
                    </div>
                  )}

                  {/* Validator actions */}
                  {isValidator &&
                    commitment.creatorReportedSuccess &&
                    !commitment.validatorConfirmed && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleValidateCompletion(true)}
                          disabled={isValidatingCompletion}
                          className="group flex gap-2 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
                        >
                          Confirm Success
                        </Button>
                        <Button
                          onClick={() => handleValidateCompletion(false)}
                          disabled={isValidatingCompletion}
                          className="group flex gap-2 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
                        >
                          Report Failure
                        </Button>
                      </div>
                    )}

                  {/* Status messages */}
                  {isCreator &&
                    commitment.creatorReportedSuccess &&
                    !commitment.validatorConfirmed && (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Clock className="h-5 w-5" />
                        <span>Waiting for validator confirmation...</span>
                      </div>
                    )}
                </>
              ) : Number(commitment.status) ===
                CommitmentStatus.CompletedSuccess ? (
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span>Successfully Completed</span>
                  </div>
                  <Button
                    variant="outline"
                    className="border-white/20 hover:bg-white/10 hover:text-white gap-2"
                    asChild
                  >
                    <Link
                      href={`https://sepolia.basescan.org/address/${commitment.address}`}
                      target="_blank"
                    >
                      <ExternalLink className="h-4 w-4" /> View on Explorer
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="h-5 w-5" />
                    <span>Commitment Failed</span>
                  </div>
                  <Button
                    variant="outline"
                    className="border-white/20 hover:bg-white/10 hover:text-white gap-2"
                    asChild
                  >
                    <Link
                      href={`https://sepolia.basescan.org/address/${commitment.address}`}
                      target="_blank"
                    >
                      <ExternalLink className="h-4 w-4" /> View on Explorer
                    </Link>
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
