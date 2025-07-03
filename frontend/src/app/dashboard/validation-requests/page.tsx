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
    <Card className="border border-primary/10 bg-background/50 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary/30"></div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-40" />
        </div>
      </CardContent>
      <CardFooter className="border-t border-primary/10 bg-muted/30">
        <div className="flex w-full justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardFooter>
    </Card>
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
    if (!selectedRequest) return;

    // TODO: Implement blockchain transaction to confirm validation
    console.log(
      `${dialogAction === "approve" ? "Approved" : "Rejected"} request ${
        selectedRequest.address
      } with feedback: ${feedbackText}`
    );

    // Reset state
    setSelectedRequest(null);
    setFeedbackText("");
    setDialogAction(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50">
      {/* Decorative elements */}
      <Elements />
      <Navbar />

      <main className="flex-1 py-8 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Validation Requests</h1>
              <p className="text-muted-foreground mt-1">
                Review and validate commitment completions
              </p>
            </div>
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard">
                <ArrowUpLeft className="h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">Sort by Deadline</SelectItem>
                <SelectItem value="amount">Sort by Amount</SelectItem>
                <SelectItem value="created">Sort by Created Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-primary/10"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-primary/10"
              >
                Completed
              </TabsTrigger>
            </TabsList>

            {/* Pending Requests Tab */}
            <TabsContent value="pending" className="space-y-4">
              {isLoading ? (
                // Tampilkan skeleton saat loading
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <ValidationRequestSkeleton
                      key={`pending-skeleton-${index}`}
                    />
                  ))
              ) : sortedPendingRequests.length > 0 ? (
                sortedPendingRequests.map((request) => (
                  <Card
                    key={request.address}
                    className="border border-primary/10 bg-background/50 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-500/70"></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{request.title}</CardTitle>
                          <CardDescription>
                            By {request.creator}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        >
                          Pending Validation
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {request.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center text-sm">
                          <Wallet className="mr-2 h-4 w-4 text-primary" />
                          Staked: {request.staked}
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          Deadline:{" "}
                          {new Date(
                            request.deadline * 1000
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-primary/10 bg-muted/30">
                      <div className="flex w-full justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 border-red-500/20 hover:bg-red-500/10"
                          onClick={() => handleReject(request)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-500 border-green-500/20 hover:bg-green-500/10"
                          onClick={() => handleApprove(request)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No pending validation requests
                  </h3>
                  <p className="text-muted-foreground">
                    You don't have any pending requests to validate at the
                    moment.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Completed Requests Tab */}
            <TabsContent value="completed" className="space-y-4">
              {isLoading ? (
                // Tampilkan skeleton saat loading
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <ValidationRequestSkeleton
                      key={`completed-skeleton-${index}`}
                    />
                  ))
              ) : sortedCompletedRequests.length > 0 ? (
                sortedCompletedRequests.map((request) => (
                  <Card
                    key={request.address}
                    className="border border-primary/10 bg-background/50 backdrop-blur-sm overflow-hidden"
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 ${
                        request.validatorReportedSuccess
                          ? "bg-green-500/70"
                          : "bg-red-500/70"
                      }`}
                    ></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{request.title}</CardTitle>
                          <CardDescription>
                            By {request.creator}
                          </CardDescription>
                        </div>
                        {request.validatorReportedSuccess ? (
                          <Badge
                            variant="outline"
                            className="bg-green-500/10 text-green-500 border-green-500/20"
                          >
                            Approved
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-red-500/10 text-red-500 border-red-500/20"
                          >
                            Rejected
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {request.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm">
                          <Wallet className="mr-2 h-4 w-4 text-primary" />
                          Staked: {request.staked}
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          Completed:{" "}
                          {request.completedAt
                            ? new Date(
                                request.completedAt * 1000
                              ).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                      {request.feedback && (
                        <Alert
                          className={`${
                            request.validatorReportedSuccess
                              ? "bg-green-500/5 text-green-500 border-green-500/20"
                              : "bg-red-500/5 text-red-500 border-red-500/20"
                          }`}
                        >
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Feedback</AlertTitle>
                          <AlertDescription>
                            {request.feedback}
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                    <CardFooter className="border-t border-primary/10 bg-muted/30">
                      <div className="flex w-full justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-primary"
                          asChild
                        >
                          <Link
                            href={`/dashboard/commitment/${request.address}`}
                          >
                            View Details <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <History className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No completed validations
                  </h3>
                  <p className="text-muted-foreground">
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === "approve" ? "Approve" : "Reject"} Commitment
            </DialogTitle>
            <DialogDescription>
              {dialogAction === "approve"
                ? "Confirm that this commitment has been completed successfully."
                : "Explain why this commitment has not been completed successfully."}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Commitment Details</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.title}
                  </p>
                </div>

                <Textarea
                  placeholder="Add your feedback here..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
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
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
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
