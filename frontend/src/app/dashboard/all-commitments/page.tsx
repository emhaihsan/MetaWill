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
import { contractConfig } from "@/lib/contract-config";
import { formatUnits } from "viem";
import { useChainId } from "wagmi";

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
  const [activeTab, setActiveTab] = useState("all");
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const chainId = useChainId();

  const { address } = useAccount();

  // Ambil semua komitmen dari blockchain
  useEffect(() => {
    const fetchAllCommitments = async () => {
      setIsLoading(true);

      try {
        // 1. Ambil total komitmen
        const totalResponse = await fetch(
          `/api/read-contract?address=${contractConfig[chainId].metaWillFactory.address}&functionName=getTotalCommitments`
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
            `/api/read-contract?address=${contractConfig[chainId].metaWillFactory.address}&functionName=allCommitments&args=${i}`
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
                  formatUnits(BigInt(commitmentData.stakeAmount), 6) + " USDC",
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
  }, [chainId]);

  // Filter komitmen untuk hanya menampilkan milik pengguna yang login
  const myCommitments = commitments.filter(
    (c) => c.creator.toLowerCase() === address?.toLowerCase()
  );

  // Kemudian, filter berdasarkan query pencarian dari komitmen milik pengguna
  const filteredCommitments = myCommitments.filter((commitment) =>
    commitment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter untuk tab: Active (hanya milik user)
  const activeCommitments = filteredCommitments.filter(
    (c) => c.status === CommitmentStatus.Active
  );

  // Filter untuk tab: Past (hanya milik user)
  const pastCommitments = filteredCommitments.filter(
    (c) => c.status !== CommitmentStatus.Active
  );

  // Semua komitmen milik pengguna adalah daftar yang sudah difilter
  const allUserCommitments = filteredCommitments;

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
  const sortedAllCommitments = sortCommitments(allUserCommitments);

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
    <Card className="bg-black/30 backdrop-blur-lg border border-white/10 p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-3/5" />
        <Skeleton className="h-5 w-1/5" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-8 w-1/4" />
      </div>
    </Card>
  );

  const getStatusBadge = (status: CommitmentStatus) => {
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
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const renderCommitmentList = (commitmentsToRender: Commitment[]) => {
    if (commitmentsToRender.length > 0) {
      return commitmentsToRender.map((commitment) => (
        <Card
          key={commitment.address}
          className="bg-black/30 backdrop-blur-lg border border-white/10 hover:border-orange-400/50 transition-colors duration-300 group"
        >
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <CardTitle className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                {commitment.title}
              </CardTitle>
              {getStatusBadge(commitment.status)}
            </div>
            <CardDescription className="text-gray-400 pt-1 line-clamp-2">
              {commitment.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm text-gray-400">
              <Wallet className="mr-2 h-4 w-4 text-orange-400/80" />
              Stake:{" "}
              <span className="font-mono text-white ml-2">
                {commitment.staked}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Calendar className="mr-2 h-4 w-4 text-orange-400/80" />
              Deadline:{" "}
              <span className="font-mono text-white ml-2">
                {formatDate(commitment.deadline)}
              </span>
            </div>
          </CardContent>
          <CardFooter className="border-t border-white/10 pt-4">
            <div className="flex w-full justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-orange-400 hover:text-orange-300 hover:bg-orange-400/10"
                asChild
              >
                <Link href={`/dashboard/commitment/${commitment.address}`}>
                  View Details <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ));
    } else {
      return (
        <div className="text-center py-16 col-span-full bg-black/20 rounded-lg">
          <div className="mx-auto w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
            <History className="h-8 w-8 text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Commitments Found
          </h3>
          <p className="text-gray-400 mb-6">
            There are no commitments matching your current filters.
          </p>
          <Button
            asChild
            className="group flex gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold shadow-[0_0_15px_rgba(246,133,27,0.3)] hover:shadow-[0_0_25px_rgba(246,133,27,0.5)] transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/dashboard/new-commitment">Create New Commitment</Link>
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black bg-[radial-gradient(ellipse_at_top,rgba(246,133,27,0.15)_0%,transparent_60%)] text-gray-100">
      <Elements />
      <Navbar />

      <main className="flex-1 container px-4 pb-8 pt-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Commitment Explorer
              </h1>
              <p className="text-gray-400 mt-2 max-w-2xl">
                Browse, search, and manage all commitments on the MetaWill
                platform.
              </p>
            </div>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList className="grid w-full grid-cols-3 md:w-auto bg-black/30 border border-white/10 p-1">
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
                >
                  Past
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
                >
                  All
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <Input
                  type="search"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 bg-black/30 border-white/20 placeholder:text-gray-500 focus:border-orange-400"
                />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-black/30 border-white/20 focus:border-orange-400">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/80 backdrop-blur-lg border-white/20 text-white">
                    <SelectItem value="deadline">Sort by Deadline</SelectItem>
                    <SelectItem value="amount">Sort by Amount</SelectItem>
                    <SelectItem value="created">Sort by Created</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="active">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <CommitmentSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderCommitmentList(sortedActiveCommitments)}
                </div>
              )}
            </TabsContent>
            <TabsContent value="past">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <CommitmentSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderCommitmentList(sortedPastCommitments)}
                </div>
              )}
            </TabsContent>
            <TabsContent value="all">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <CommitmentSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderCommitmentList(sortedAllCommitments)}
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
