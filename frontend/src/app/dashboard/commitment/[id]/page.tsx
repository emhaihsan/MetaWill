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
import { formatEther } from "viem";

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
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Active
          </Badge>
        );
      case CommitmentStatus.CompletedSuccess:
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Completed Successfully
          </Badge>
        );
      case CommitmentStatus.CompletedFailure:
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Failed
          </Badge>
        );
      case CommitmentStatus.Disputed:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Disputed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleReportCompletion = async (success: boolean) => {
    if (!commitment) return;

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
    if (!commitment) return;

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

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading commitment details...</p>
      </div>
    );
  }

  if (!commitment) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 px-8 py-8">
          <div className="flex flex-col items-center justify-center h-full">
            <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Commitment Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The commitment you're looking for doesn't exist or has been
              removed.
            </p>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowUpLeft className="mr-2 h-4 w-4" />
                Return to Dashboard
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50">
      <Elements />
      <Navbar />

      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Commitment Details</h1>
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard">
                <ArrowUpLeft className="h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{commitment.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {commitment.description}
                  </CardDescription>
                </div>
                <div>{getStatusBadge(Number(commitment.status))}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Staked Amount
                      </p>
                      <p className="font-medium">
                        {formatEther(BigInt(commitment.stakeAmount))} ETH
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="font-medium">
                        {formatDate(commitment.deadline)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Validator</p>
                      <p className="font-medium">{`${commitment.validator.substring(
                        0,
                        6
                      )}...${commitment.validator.substring(38)}`}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Creator</p>
                      <p className="font-medium">{`${commitment.creator.substring(
                        0,
                        6
                      )}...${commitment.creator.substring(38)}`}</p>
                    </div>
                  </div>
                  {Number(commitment.status) === CommitmentStatus.Active && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Time Remaining
                        </p>
                        <p className="font-medium">{timeLeft}</p>
                      </div>
                    </div>
                  )}

                  {/* Status indicators */}
                  {commitment.creatorReportedSuccess && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium text-green-500">
                          Creator reported success
                        </p>
                      </div>
                    </div>
                  )}

                  {commitment.validatorConfirmed && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-blue-500">
                          Validator{" "}
                          {commitment.validatorReportedSuccess
                            ? "confirmed success"
                            : "reported failure"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              {Number(commitment.status) === CommitmentStatus.Active ? (
                <>
                  <Button variant="outline" asChild>
                    <Link
                      href={`https://explorer.sepolia.linea.build/address/${commitment.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on Explorer
                    </Link>
                  </Button>

                  {/* Creator actions */}
                  {isCreator && !commitment.creatorReportedSuccess && (
                    <div className="flex gap-2">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleReportCompletion(true)}
                        disabled={isReportingCompletion}
                      >
                        Confirm Success
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleReportCompletion(false)}
                        disabled={isReportingCompletion}
                      >
                        Confirm Failure
                      </Button>
                    </div>
                  )}

                  {/* Validator actions */}
                  {isValidator &&
                    commitment.creatorReportedSuccess &&
                    !commitment.validatorConfirmed && (
                      <div className="flex gap-2">
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleValidateCompletion(true)}
                          disabled={isValidatingCompletion}
                        >
                          Confirm Success
                        </Button>
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleValidateCompletion(false)}
                          disabled={isValidatingCompletion}
                        >
                          Report Failure
                        </Button>
                      </div>
                    )}

                  {/* Status messages */}
                  {isCreator &&
                    commitment.creatorReportedSuccess &&
                    !commitment.validatorConfirmed && (
                      <div className="flex items-center gap-2 text-yellow-600">
                        <Clock className="h-5 w-5" />
                        <span>Waiting for validator confirmation</span>
                      </div>
                    )}
                </>
              ) : Number(commitment.status) ===
                CommitmentStatus.CompletedSuccess ? (
                <>
                  <Button variant="outline" asChild>
                    <Link
                      href={`https://explorer.sepolia.linea.build/address/${commitment.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on Explorer
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Successfully Completed</span>
                  </div>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link
                      href={`https://explorer.sepolia.linea.build/address/${commitment.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on Explorer
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    <span>Commitment Failed</span>
                  </div>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
