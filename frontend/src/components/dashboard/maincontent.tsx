"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  History,
  Wallet,
  CheckCircle,
  Users,
  ArrowUpRight,
  XCircle,
  ChevronRight,
  Calendar,
  AlertTriangle,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCommitments } from "@/hooks/useCommitments";
import { Skeleton } from "@/components/ui/skeleton";

// Helper function to format address
const formatAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;

// Helper function for status badge
const getStatusBadge = (status: number | string) => {
  switch (status) {
    case 0:
    case "active":
      return (
        <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">
          Active
        </Badge>
      );
    case 1:
    case "success":
    case "completed":
      return (
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
          Success
        </Badge>
      );
    case 2:
    case "failed":
      return (
        <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
          Failed
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function MainContent() {
  const [activeTab, setActiveTab] = useState("active");
  const {
    activeCommitments,
    pastCommitments,
    validationRequests,
    isLoadingUserCommitments,
    isLoadingValidatorCommitments,
  } = useCommitments();

  // Tentukan status loading berdasarkan tab yang aktif
  const isLoading =
    activeTab === "validation"
      ? isLoadingValidatorCommitments
      : isLoadingUserCommitments;

  // Komponen loading skeleton
  const CommitmentSkeleton = () => (
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
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
        <Skeleton className="h-9 w-32 bg-gray-700" />
      </div>
    </div>
  );

  const EmptyState = ({
    message,
    showButton = false,
  }: {
    message: string;
    showButton?: boolean;
  }) => (
    <div className="text-center p-12 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10">
      <p className="text-gray-400">{message}</p>
      {showButton && (
        <Button
          asChild
          className="mt-4 group flex gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold shadow-[0_0_15px_rgba(246,133,27,0.3)] hover:shadow-[0_0_25px_rgba(246,133,27,0.5)] transition-all duration-300 transform hover:scale-105"
        >
          <Link href="/dashboard/new-commitment">
            <Plus className="h-4 w-4" /> Create Commitment
          </Link>
        </Button>
      )}
    </div>
  );

  const renderCommitmentCard = (commitment: any, isPast = false) => {
    const cardStatus = commitment.status;

    const cardBorderColor = (() => {
      switch (cardStatus) {
        case 1:
        case "success":
        case "completed":
          return "border-green-500/30 hover:border-green-500/60";
        case 2:
        case "failed":
          return "border-red-500/30 hover:border-red-500/60";
        default:
          return "border-orange-500/30 hover:border-orange-500/60";
      }
    })();

    const cardHeaderColor = (() => {
      switch (cardStatus) {
        case 1:
        case "success":
        case "completed":
          return "bg-green-500";
        case 2:
        case "failed":
          return "bg-red-500";
        default:
          return "bg-orange-500";
      }
    })();

    return (
      <div
        key={commitment.address}
        className={`relative overflow-hidden p-6 bg-black/30 backdrop-blur-lg rounded-2xl border ${cardBorderColor} transition-all duration-300 shadow-lg shadow-black/20`}
      >
        <div
          className={`absolute top-0 left-0 h-1 w-full ${cardHeaderColor}`}
        ></div>
        <CardHeader className="p-0 mb-4 mt-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-white">
                {commitment.title}
              </CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                {commitment.description}
              </CardDescription>
            </div>
            {getStatusBadge(cardStatus)}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 text-sm">
            <div className="flex items-center text-gray-400">
              <Wallet className="mr-2 h-4 w-4 text-orange-400" />
              Stake:{" "}
              <span className="font-mono ml-1.5 text-white">
                {commitment.staked}
              </span>
            </div>
            <div className="flex items-center text-gray-400">
              <Calendar className="mr-2 h-4 w-4 text-orange-400" />
              Deadline:{" "}
              <span className="font-mono ml-1.5 text-white">
                {commitment.deadline}
              </span>
            </div>
            <div className="flex items-center text-gray-400">
              <Users className="mr-2 h-4 w-4 text-orange-400" />
              Validator:{" "}
              <span className="font-mono ml-1.5 text-white">
                {formatAddress(commitment.validator)}
              </span>
            </div>
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
              <Link href={`/dashboard/commitment/${commitment.address}`}>
                View Details <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </div>
    );
  };

  return (
    <div>
      <Tabs
        defaultValue="active"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-8 p-1.5 bg-black/30 backdrop-blur-lg rounded-xl border border-white/10">
          <TabsTrigger
            value="active"
            className="text-gray-400 hover:text-white data-[state=active]:bg-orange-500 data-[state=active]:text-black data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
          >
            <Clock className="mr-2 h-4 w-4" /> Active
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="text-gray-400 hover:text-white data-[state=active]:bg-orange-500 data-[state=active]:text-black data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
          >
            <History className="mr-2 h-4 w-4" /> Past
          </TabsTrigger>
          <TabsTrigger
            value="validation"
            className="text-gray-400 hover:text-white data-[state=active]:bg-orange-500 data-[state=active]:text-black data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Validation
          </TabsTrigger>
        </TabsList>

        {/* Active Commitments Tab */}
        <TabsContent value="active" className="space-y-6">
          {isLoading ? (
            Array(2)
              .fill(0)
              .map((_, index) => <CommitmentSkeleton key={index} />)
          ) : activeCommitments.length === 0 ? (
            <EmptyState message="You have no active commitments." showButton />
          ) : (
            activeCommitments.map((c) => renderCommitmentCard(c))
          )}
        </TabsContent>

        {/* Past Commitments Tab */}
        <TabsContent value="past" className="space-y-6">
          {isLoading ? (
            Array(2)
              .fill(0)
              .map((_, index) => <CommitmentSkeleton key={index} />)
          ) : pastCommitments.length === 0 ? (
            <EmptyState message="You have no past commitments." />
          ) : (
            pastCommitments.map((c) => renderCommitmentCard(c, true))
          )}
        </TabsContent>

        {/* Validation Requests Tab */}
        <TabsContent value="validation" className="space-y-6">
          {isLoading ? (
            Array(2)
              .fill(0)
              .map((_, index) => <CommitmentSkeleton key={index} />)
          ) : validationRequests.length === 0 ? (
            <EmptyState message="There are no validation requests for you." />
          ) : (
            validationRequests.map((request) => (
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
                      Pending Validation
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
                        {request.deadline}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Users className="mr-2 h-4 w-4 text-amber-400" />
                      Creator:{" "}
                      <span className="font-mono ml-1.5 text-white">
                        {formatAddress(request.creator)}
                      </span>
                    </div>
                    {request.creatorReportedSuccess && (
                      <div className="flex items-center text-sm text-amber-400 mt-3 p-2 bg-amber-500/10 rounded-lg">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Creator has reported successful completion.
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-0 mt-6 pt-4 border-t border-white/10">
                  <div className="flex w-full justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
                      asChild
                    >
                      <Link href={`/dashboard/commitment/${request.address}`}>
                        Validate Now <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
