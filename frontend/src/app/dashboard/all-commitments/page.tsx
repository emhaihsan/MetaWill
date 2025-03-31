"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  ChevronRight,
  ArrowUpLeft,
  ArrowUpRight,
  History,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Elements from "@/components/elements";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useAccount } from "wagmi";
import { CONTRACT_ADDRESSES } from "@/lib/contract-config";
import { formatEther } from "viem";

// Enum untuk status komitmen
enum CommitmentStatus {
  Active,
  CompletedSuccess,
  CompletedFailure,
}

// Tipe data untuk komitmen
interface Commitment {
  address: string;
  title: string;
  description: string;
  staked: string;
  deadline: number;
  validator: string;
  status: CommitmentStatus;
  createdAt: number;
  creator: string;
  creatorReportedSuccess?: boolean;
  validatorConfirmed?: boolean;
  validatorReportedSuccess?: boolean;
}

export default function AllCommitmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [activeTab, setActiveTab] = useState("active");
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { address } = useAccount();

  // Ambil semua komitmen dari blockchain
  useEffect(() => {
    const fetchAllCommitments = async () => {
      setIsLoading(true);

      try {
        // 1. Ambil total komitmen
        const totalResponse = await fetch(
          `/api/read-contract?address=${CONTRACT_ADDRESSES.FACTORY}&functionName=getTotalCommitments`
        );
        const totalData = await totalResponse.json();

        if (!totalData.result) {
          setIsLoading(false);
          return;
        }

        const total = Number(totalData.result);
        const commitmentAddresses: string[] = [];

        // 2. Ambil semua alamat komitmen
        for (let i = 0; i < total; i++) {
          const result = await fetch(
            `/api/read-contract?address=${CONTRACT_ADDRESSES.FACTORY}&functionName=allCommitments&args=${i}`
          );
          const data = await result.json();
          if (data.result) {
            commitmentAddresses.push(data.result);
          }
        }

        // 3. Ambil detail untuk setiap komitmen
        const commitmentDetails: Commitment[] = [];

        for (const commitmentAddress of commitmentAddresses) {
          try {
            // Fetch commitment details using API
            const result = await fetch(
              `/api/commitment-details?address=${commitmentAddress}`
            );
            const data = await result.json();

            if (data.commitment) {
              const commitmentData = data.commitment;
              commitmentDetails.push({
                address: commitmentAddress,
                title: commitmentData.title,
                description: commitmentData.description,
                staked:
                  formatEther(BigInt(commitmentData.stakeAmount)) + " ETH",
                deadline: Number(commitmentData.deadline),
                validator: commitmentData.validator,
                status: Number(commitmentData.status),
                createdAt: Date.now() / 1000 - 86400, // Perkiraan, karena tidak ada data createdAt
                creator: commitmentData.creator,
                creatorReportedSuccess: commitmentData.creatorReportedSuccess,
                validatorConfirmed: commitmentData.validatorConfirmed,
                validatorReportedSuccess:
                  commitmentData.validatorReportedSuccess,
              });
            }
          } catch (error) {
            console.error(
              `Error fetching details for ${commitmentAddress}:`,
              error
            );
          }
        }

        setCommitments(commitmentDetails);
      } catch (error) {
        console.error("Error fetching commitments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCommitments();
  }, []);

  // Check for URL parameters to set the active tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam && ["active", "past", "all"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  // Filter komitmen berdasarkan search query dan status
  const filteredCommitments = commitments.filter(
    (commitment) =>
      commitment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      commitment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCommitments = filteredCommitments.filter(
    (commitment) => commitment.status === CommitmentStatus.Active
  );

  const pastCommitments = filteredCommitments.filter(
    (commitment) => commitment.status !== CommitmentStatus.Active
  );

  // Sort komitmen berdasarkan selected sort option
  const sortCommitments = (commitments: Commitment[]) => {
    switch (sortBy) {
      case "deadline":
        return [...commitments].sort((a, b) => a.deadline - b.deadline);
      case "amount":
        return [...commitments].sort(
          (a, b) => parseFloat(a.staked) - parseFloat(b.staked)
        );
      case "created":
        return [...commitments].sort((a, b) => a.createdAt - b.createdAt);
      default:
        return commitments;
    }
  };

  const sortedActiveCommitments = sortCommitments(activeCommitments);
  const sortedPastCommitments = sortCommitments(pastCommitments);
  const sortedAllCommitments = sortCommitments(filteredCommitments);

  // Format tanggal dari timestamp
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Komponen loading skeleton
  const CommitmentSkeleton = () => (
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

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50">
      {/* Decorative elements */}
      <Elements />
      <Navbar />

      <main className="flex-1 py-8 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">All Commitments</h1>
              <p className="text-muted-foreground mt-1">
                Browse and manage all commitments on the platform
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/dashboard">
                  <ArrowUpLeft className="h-4 w-4" /> Back to Dashboard
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard/new-commitment">Create Commitment</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Search commitments..."
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

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-primary/10"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-primary/10"
              >
                Past
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary/10"
              >
                All
              </TabsTrigger>
            </TabsList>

            {/* Active Commitments Tab */}
            <TabsContent value="active" className="space-y-4">
              {isLoading ? (
                // Tampilkan skeleton saat loading
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <CommitmentSkeleton key={`active-skeleton-${index}`} />
                  ))
              ) : sortedActiveCommitments.length > 0 ? (
                sortedActiveCommitments.map((commitment) => (
                  <Card
                    key={commitment.address}
                    className="border border-primary/10 bg-background/50 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{commitment.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {commitment.description}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-primary/20 text-primary"
                        >
                          {commitment.staked}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          Deadline: {formatDate(commitment.deadline)}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-2 h-4 w-4" />
                          Validator: {commitment.validator.slice(0, 6)}...
                          {commitment.validator.slice(-4)}
                        </div>
                        {commitment.creatorReportedSuccess &&
                          !commitment.validatorConfirmed && (
                            <div className="flex items-center text-sm text-amber-500">
                              <ArrowUpRight className="mr-2 h-4 w-4" />
                              Waiting for validator confirmation
                            </div>
                          )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-primary/10 bg-muted/30">
                      <div className="flex w-full justify-between">
                        {commitment.creator === address && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-muted-foreground hover:text-primary"
                            asChild
                          >
                            <Link
                              href={`/dashboard/commitment/${commitment.address}`}
                            >
                              Report Completion
                            </Link>
                          </Button>
                        )}
                        {commitment.creator !== address && (
                          <div></div> // Placeholder untuk alignment
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          asChild
                        >
                          <Link
                            href={`/dashboard/commitment/${commitment.address}`}
                          >
                            <span>View Details</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No active commitments found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any active commitments matching your search.
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/new-commitment">
                      Create New Commitment
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Past Commitments Tab */}
            <TabsContent value="past" className="space-y-4">
              {isLoading ? (
                // Tampilkan skeleton saat loading
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <CommitmentSkeleton key={`past-skeleton-${index}`} />
                  ))
              ) : sortedPastCommitments.length > 0 ? (
                sortedPastCommitments.map((commitment) => (
                  <Card
                    key={commitment.address}
                    className={`border border-primary/10 bg-background/50 backdrop-blur-sm overflow-hidden ${
                      commitment.status === CommitmentStatus.CompletedSuccess
                        ? "border-green-500/30"
                        : "border-red-500/30"
                    }`}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 ${
                        commitment.status === CommitmentStatus.CompletedSuccess
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle>{commitment.title}</CardTitle>
                            {commitment.status ===
                            CommitmentStatus.CompletedSuccess ? (
                              <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                Completed
                              </Badge>
                            ) : (
                              <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                                Failed
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="mt-1">
                            {commitment.description}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-primary/20 text-primary"
                        >
                          {commitment.staked}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          Deadline: {formatDate(commitment.deadline)}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-2 h-4 w-4" />
                          Validator: {commitment.validator.slice(0, 6)}...
                          {commitment.validator.slice(-4)}
                        </div>
                        {commitment.status ===
                          CommitmentStatus.CompletedFailure && (
                          <div className="flex items-center text-sm text-red-500">
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Donated to charity
                          </div>
                        )}
                      </div>
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
                            href={`/dashboard/commitment/${commitment.address}`}
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
                    No past commitments found
                  </h3>
                  <p className="text-muted-foreground">
                    You don't have any past commitments matching your search.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* All Commitments Tab */}
            <TabsContent value="all" className="space-y-4">
              {isLoading ? (
                // Tampilkan skeleton saat loading
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <CommitmentSkeleton key={`all-skeleton-${index}`} />
                  ))
              ) : sortedAllCommitments.length > 0 ? (
                sortedAllCommitments.map((commitment) => (
                  <Card
                    key={commitment.address}
                    className={`border border-primary/10 bg-background/50 backdrop-blur-sm overflow-hidden ${
                      commitment.status === CommitmentStatus.Active
                        ? ""
                        : commitment.status ===
                          CommitmentStatus.CompletedSuccess
                        ? "border-green-500/30"
                        : "border-red-500/30"
                    }`}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 ${
                        commitment.status === CommitmentStatus.Active
                          ? "bg-primary"
                          : commitment.status ===
                            CommitmentStatus.CompletedSuccess
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle>{commitment.title}</CardTitle>
                            {commitment.status !== CommitmentStatus.Active && (
                              <Badge
                                className={
                                  commitment.status ===
                                  CommitmentStatus.CompletedSuccess
                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                    : "bg-red-500/10 text-red-500 border-red-500/20"
                                }
                              >
                                {commitment.status ===
                                CommitmentStatus.CompletedSuccess
                                  ? "Completed"
                                  : "Failed"}
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="mt-1">
                            {commitment.description}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-primary/20 text-primary"
                        >
                          {commitment.staked}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          Deadline: {formatDate(commitment.deadline)}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-2 h-4 w-4" />
                          Validator: {commitment.validator.slice(0, 6)}...
                          {commitment.validator.slice(-4)}
                        </div>
                        {commitment.status ===
                          CommitmentStatus.CompletedFailure && (
                          <div className="flex items-center text-sm text-red-500">
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Donated to charity
                          </div>
                        )}
                        {commitment.status === CommitmentStatus.Active &&
                          commitment.creatorReportedSuccess &&
                          !commitment.validatorConfirmed && (
                            <div className="flex items-center text-sm text-amber-500">
                              <ArrowUpRight className="mr-2 h-4 w-4" />
                              Waiting for validator confirmation
                            </div>
                          )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-primary/10 bg-muted/30">
                      <div className="flex w-full justify-between">
                        {commitment.status === CommitmentStatus.Active &&
                          commitment.creator === address && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-muted-foreground hover:text-primary"
                              asChild
                            >
                              <Link
                                href={`/dashboard/commitment/${commitment.address}`}
                              >
                                Report Completion
                              </Link>
                            </Button>
                          )}
                        {(commitment.status !== CommitmentStatus.Active ||
                          commitment.creator !== address) && (
                          <div></div> // Placeholder untuk alignment
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-primary"
                          asChild
                        >
                          <Link
                            href={`/dashboard/commitment/${commitment.address}`}
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
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No commitments found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    There are no commitments matching your search.
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/new-commitment">
                      Create New Commitment
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
