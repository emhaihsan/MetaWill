"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Wallet,
  Calendar,
  Search,
  Filter,
  ChevronRight,
  CheckCircle,
  User,
  XCircle,
  Clock,
  AlertCircle,
  ArrowUpLeft,
  History,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Elements from "@/components/elements";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useAccount } from "wagmi";
import { contractConfig } from "@/lib/contract-config";
import { formatUnits } from "viem";
import { Skeleton } from "@/components/ui/skeleton";
import { useChainId } from "wagmi";

// Enum untuk status komitmen
enum CommitmentStatus {
  Active = 0,
  CompletedSuccess = 1,
  CompletedFailure = 2,
}

// Interface untuk data komitmen
interface ValidationRequest {
  address: string;
  title: string;
  description: string;
  staked: string;
  deadline: number;
  status: number;
  createdAt: number;
  creator: string;
  creatorReportedSuccess: boolean;
  validatorConfirmed: boolean;
  validatorReportedSuccess: boolean;
  completedAt?: number;
  feedback?: string;
}

export default function ValidationRequestsPage() {
  const { address } = useAccount();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [selectedRequest, setSelectedRequest] =
    useState<ValidationRequest | null>(null);
  const chainId = useChainId();
  const [feedbackText, setFeedbackText] = useState("");
  const [dialogAction, setDialogAction] = useState<"approve" | "reject" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState<ValidationRequest[]>(
    []
  );
  const [completedRequests, setCompletedRequests] = useState<
    ValidationRequest[]
  >([]);

  // Komponen skeleton untuk loading state
  const ValidationRequestSkeleton = () => (
    <div className="p-6 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 animate-pulse">
      <div className="flex items-start justify-between">
        <div>
          <Skeleton className="h-6 w-48 mb-2 bg-gray-700" />
          <Skeleton className="h-4 w-64 bg-gray-700" />
        </div>
        <Skeleton className="h-6 w-20 bg-gray-700" />
      </div>
      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-40 bg-gray-700" />
        <Skeleton className="h-4 w-36 bg-gray-700" />
      </div>
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 bg-gray-700" />
          <Skeleton className="h-9 w-20 bg-gray-700" />
        </div>
        <Skeleton className="h-9 w-24 bg-gray-700" />
      </div>
    </div>
  );

  // Ambil semua komitmen yang perlu divalidasi dari blockchain
  useEffect(() => {
    const fetchValidationRequests = async () => {
      if (!address) return;

      setIsLoading(true);

      try {
        // 1. Ambil komitmen yang perlu divalidasi oleh user
        const validatorResponse = await fetch(
          `/api/read-contract?address=${contractConfig[chainId].metaWillFactory.address}&functionName=getValidatorCommitments&args=${address}`
        );
        const validatorData = await validatorResponse.json();

        if (!validatorData.result || !Array.isArray(validatorData.result)) {
          setIsLoading(false);
          return;
        }

        const commitmentAddresses = validatorData.result;
        const pendingRequestsData: ValidationRequest[] = [];
        const completedRequestsData: ValidationRequest[] = [];

        // 2. Ambil detail untuk setiap komitmen
        for (const commitmentAddress of commitmentAddresses) {
          try {
            // Fetch commitment details using API
            const result = await fetch(
              `/api/commitment-details?address=${commitmentAddress}`
            );
            const data = await result.json();

            if (data.commitment) {
              const commitmentData = data.commitment;
              const request: ValidationRequest = {
                address: commitmentAddress,
                title: commitmentData.title,
                description: commitmentData.description,
                staked:
                  formatUnits(BigInt(commitmentData.stakeAmount), 6) + " USDC",
                deadline: Number(commitmentData.deadline),
                status: Number(commitmentData.status),
                createdAt: Date.now() / 1000 - 86400, // Perkiraan, karena tidak ada data createdAt
                creator: commitmentData.creator,
                creatorReportedSuccess: commitmentData.creatorReportedSuccess,
                validatorConfirmed: commitmentData.validatorConfirmed,
                validatorReportedSuccess:
                  commitmentData.validatorReportedSuccess,
              };

              // Pisahkan antara pending dan completed requests
              if (!commitmentData.validatorConfirmed) {
                // Semua komitmen yang belum dikonfirmasi validator masuk kategori pending
                pendingRequestsData.push(request);
              } else {
                // Tambahkan data tambahan untuk completed requests
                request.completedAt = Date.now() / 1000 - 43200; // Perkiraan 12 jam yang lalu
                request.feedback = commitmentData.validatorReportedSuccess
                  ? "Commitment completed successfully and validated."
                  : "Commitment was not completed successfully.";
                completedRequestsData.push(request);
              }
            }
          } catch (error) {
            console.error(
              `Error fetching details for ${commitmentAddress}:`,
              error
            );
          }
        }

        setPendingRequests(pendingRequestsData);
        setCompletedRequests(completedRequestsData);
      } catch (error) {
        console.error("Error fetching validation requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchValidationRequests();
  }, [address]);

  // Filter requests based on search query
  const filteredPendingRequests = pendingRequests.filter(
    (request) =>
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedRequests = completedRequests.filter(
    (request) =>
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort requests based on selected sort option
  const sortRequests = (requests: ValidationRequest[]) => {
    switch (sortBy) {
      case "deadline":
        return [...requests].sort((a, b) => a.deadline - b.deadline);
      case "amount":
        return [...requests].sort(
          (a, b) =>
            Number.parseFloat(a.staked.split(" ")[0]) -
            Number.parseFloat(b.staked.split(" ")[0])
        );
      case "created":
        return [...requests].sort((a, b) => a.createdAt - b.createdAt);
      default:
        return requests;
    }
  };

  const sortedPendingRequests = sortRequests(filteredPendingRequests);
  const sortedCompletedRequests = sortRequests(filteredCompletedRequests);

  const handleApprove = (request: ValidationRequest) => {
    setSelectedRequest(request);
    setDialogAction("approve");
  };

  const handleReject = (request: ValidationRequest) => {
    setSelectedRequest(request);
    setDialogAction("reject");
  };

  const handleSubmitFeedback = async () => {
    if (!selectedRequest || !dialogAction) return;
    console.log("Feedback submitted:", {
      ...selectedRequest,
      feedback: feedbackText,
      status:
        dialogAction === "approve" ? "CompletedSuccess" : "CompletedFailure",
    });
    // Reset state
    setSelectedRequest(null);
    setFeedbackText("");
    setDialogAction(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-black bg-[radial-gradient(ellipse_at_top,rgba(246,133,27,0.15)_0%,transparent_60%)] text-gray-100">
      <Elements />
      <Navbar />

      <main className="flex-1 px-8 pb-8 pt-28">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="p-6 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Validation Requests
                  </h1>
                  <p className="text-gray-400">
                    Approve or reject commitment outcomes.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search by title, creator..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full bg-black/20 border-white/10 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-black/20 border-white/10 rounded-lg focus:ring-orange-500 focus:border-orange-500">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/80 backdrop-blur-lg border-white/20 text-gray-200">
                    <SelectItem
                      value="deadline"
                      className="focus:bg-orange-500/20"
                    >
                      Deadline
                    </SelectItem>
                    <SelectItem
                      value="amount"
                      className="focus:bg-orange-500/20"
                    >
                      Amount
                    </SelectItem>
                    <SelectItem
                      value="created"
                      className="focus:bg-orange-500/20"
                    >
                      Created Date
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/30 border border-white/10 p-1 mb-6">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
              >
                <Clock className="mr-2 h-4 w-4" /> Pending
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Completed
              </TabsTrigger>
            </TabsList>

            {/* Pending Tab */}
            <TabsContent value="pending">
              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <ValidationRequestSkeleton key={`pending-skel-${i}`} />
                  ))}
                </div>
              ) : sortedPendingRequests.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sortedPendingRequests.map((request) => (
                    <div
                      key={request.address}
                      className="relative p-6 bg-black/30 backdrop-blur-lg rounded-2xl border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 shadow-lg shadow-black/20"
                    >
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg font-bold text-white">
                              {request.title}
                            </CardTitle>
                            <CardDescription className="text-gray-400 mt-1">
                              {request.description}
                            </CardDescription>
                          </div>
                          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                            Pending
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center text-gray-400">
                            <Wallet className="mr-2 h-4 w-4 text-amber-400" />
                            Stake:{" "}
                            <span className="font-mono ml-1.5 text-white">
                              {request.staked}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Calendar className="mr-2 h-4 w-4 text-amber-400" />
                            Deadline:{" "}
                            <span className="font-mono ml-1.5 text-white">
                              {new Date(
                                request.deadline * 1000
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-400">
                            <User className="mr-2 h-4 w-4 text-amber-400" />
                            Creator:{" "}
                            <span className="font-mono ml-1.5 text-white">
                              {request.creator}
                            </span>
                          </div>
                          {request.creatorReportedSuccess && (
                            <Alert className="mt-4 bg-amber-500/10 border-amber-500/20 text-amber-300">
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>
                                Creator has reported completion!
                              </AlertTitle>
                            </Alert>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="p-0 mt-6 pt-4 border-t border-white/10">
                        <div className="flex w-full justify-between items-center">
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleApprove(request)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-3 py-1"
                            >
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleReject(request)}
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-1"
                            >
                              Reject
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-orange-400 hover:bg-orange-500/10 hover:text-orange-300"
                            asChild
                          >
                            <Link
                              href={`/dashboard/commitment/${request.address}`}
                            >
                              Details <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardFooter>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-12 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10">
                  <div className="mx-auto w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No Pending Requests
                  </h3>
                  <p className="text-gray-400">
                    You have no pending validation requests at the moment.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Completed Tab */}
            <TabsContent value="completed">
              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <ValidationRequestSkeleton key={`completed-skel-${i}`} />
                  ))}
                </div>
              ) : sortedCompletedRequests.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sortedCompletedRequests.map((request) => {
                    const isSuccess =
                      request.status === CommitmentStatus.CompletedSuccess;
                    const borderColor = isSuccess
                      ? "border-green-500/30 hover:border-green-500/60"
                      : "border-red-500/30 hover:border-red-500/60";
                    const badgeClass = isSuccess
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20";
                    const iconColor = isSuccess
                      ? "text-green-400"
                      : "text-red-400";

                    return (
                      <div
                        key={request.address}
                        className={`relative p-6 bg-black/30 backdrop-blur-lg rounded-2xl border ${borderColor} transition-all duration-300 shadow-lg shadow-black/20`}
                      >
                        <CardHeader className="p-0 mb-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg font-bold text-white">
                                {request.title}
                              </CardTitle>
                              <CardDescription className="text-gray-400 mt-1">
                                {request.description}
                              </CardDescription>
                            </div>
                            <Badge className={badgeClass}>
                              {isSuccess ? "Approved" : "Rejected"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="space-y-3 text-sm">
                            <div className={`flex items-center ${iconColor}`}>
                              <Wallet className="mr-2 h-4 w-4" />
                              Stake:{" "}
                              <span className="font-mono ml-1.5 text-white">
                                {request.staked}
                              </span>
                            </div>
                            <div className={`flex items-center ${iconColor}`}>
                              <User className="mr-2 h-4 w-4" />
                              Creator:{" "}
                              <span className="font-mono text-sm ml-1.5 text-white">
                                {request.creator}
                              </span>
                            </div>
                            {request.feedback && (
                              <Alert className="mt-4 bg-white/5 border-white/10 text-gray-300">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Your Feedback</AlertTitle>
                                <AlertDescription>
                                  {request.feedback}
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="p-0 mt-6 pt-4 border-t border-white/10">
                          <div className="flex w-full justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-orange-400 hover:bg-orange-500/10 hover:text-orange-300"
                              asChild
                            >
                              <Link
                                href={`/dashboard/commitment/${request.address}`}
                              >
                                View Details{" "}
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </CardFooter>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-12 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10">
                  <div className="mx-auto w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                    <History className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No Completed Validations
                  </h3>
                  <p className="text-gray-400">
                    You haven't completed any validation requests yet.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      {/* Feedback Dialog */}
      <Dialog
        open={!!selectedRequest && !!dialogAction}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedRequest(null);
            setFeedbackText("");
            setDialogAction(null);
          }
        }}
      >
        <DialogContent className="bg-black/50 backdrop-blur-xl border border-white/10 text-gray-200">
          <DialogHeader>
            <DialogTitle className="text-white">
              {dialogAction === "approve" ? "Approve" : "Reject"} Commitment
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {dialogAction === "approve"
                ? "Confirm that this commitment has been completed successfully."
                : "Explain why this commitment has not been completed successfully."}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white">Commitment Details</h4>
                  <p className="text-sm text-gray-400">
                    {selectedRequest.title}
                  </p>
                </div>

                <Textarea
                  placeholder="Add your feedback here..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="min-h-[100px] bg-black/20 border-white/10 text-gray-200 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    setSelectedRequest(null);
                    setFeedbackText("");
                    setDialogAction(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitFeedback}
                  className={
                    dialogAction === "approve"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }
                >
                  {dialogAction === "approve" ? "Approve" : "Reject"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
