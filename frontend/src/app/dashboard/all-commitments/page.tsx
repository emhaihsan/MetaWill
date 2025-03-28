"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  ArrowLeft,
  Calendar,
  Users,
  Search,
  Filter,
  ChevronRight,
  ArrowUpRight,
  Hexagon,
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

export default function AllCommitmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    // Check for URL parameters to set the active tab
    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get("tab");
    if (tabParam && ["active", "past", "all"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  // Mock data for the commitments
  const activeCommitments = [
    {
      id: "1",
      title: "Complete 30 days of coding",
      description: "Code for at least 1 hour every day for 30 days",
      staked: "0.5 ETH",
      deadline: "May 15, 2025",
      validator: "0x8912...45ab",
      status: "in-progress",
      createdAt: "April 15, 2025",
    },
    {
      id: "2",
      title: "Finish blockchain certification",
      description: "Complete all modules and pass the final exam",
      staked: "0.75 ETH",
      deadline: "June 2, 2025",
      validator: "0x3421...87cd",
      status: "in-progress",
      createdAt: "May 2, 2025",
    },
    {
      id: "3",
      title: "Launch NFT collection",
      description: "Create and launch a collection of 10 NFTs",
      staked: "1.2 ETH",
      deadline: "July 10, 2025",
      validator: "0x6789...12ef",
      status: "in-progress",
      createdAt: "June 10, 2025",
    },
    {
      id: "9",
      title: "Complete Web3 course",
      description: "Finish all modules of the advanced Web3 development course",
      staked: "0.8 ETH",
      deadline: "August 20, 2025",
      validator: "0x1234...56gh",
      status: "in-progress",
      createdAt: "July 20, 2025",
    },
    {
      id: "10",
      title: "Build a DAO prototype",
      description:
        "Create a working prototype of a decentralized autonomous organization",
      staked: "1.5 ETH",
      deadline: "September 15, 2025",
      validator: "0x7890...12ij",
      status: "in-progress",
      createdAt: "August 15, 2025",
    },
  ];

  const pastCommitments = [
    {
      id: "4",
      title: "Learn Solidity basics",
      description: "Complete the beginner Solidity course",
      staked: "0.3 ETH",
      deadline: "March 1, 2025",
      validator: "0x2345...67ab",
      status: "completed",
      createdAt: "February 1, 2025",
      completedAt: "February 28, 2025",
    },
    {
      id: "5",
      title: "Build a DApp prototype",
      description: "Create a working prototype of a decentralized application",
      staked: "0.45 ETH",
      deadline: "February 15, 2025",
      validator: "0x8912...45ab",
      status: "failed",
      createdAt: "January 15, 2025",
      completedAt: "February 15, 2025",
    },
    {
      id: "6",
      title: "Attend Web3 conference",
      description: "Participate in at least 5 workshops at the conference",
      staked: "0.25 ETH",
      deadline: "January 20, 2025",
      validator: "0x3421...87cd",
      status: "completed",
      createdAt: "December 20, 2024",
      completedAt: "January 19, 2025",
    },
    {
      id: "11",
      title: "Complete smart contract audit",
      description: "Perform a security audit on a smart contract",
      staked: "0.6 ETH",
      deadline: "March 10, 2025",
      validator: "0x3456...78kl",
      status: "completed",
      createdAt: "February 10, 2025",
      completedAt: "March 8, 2025",
    },
    {
      id: "12",
      title: "Implement wallet integration",
      description: "Integrate multiple wallet providers into a dApp",
      staked: "0.4 ETH",
      deadline: "April 5, 2025",
      validator: "0x9012...34mn",
      status: "failed",
      createdAt: "March 5, 2025",
      completedAt: "April 5, 2025",
    },
  ];

  // Filter commitments based on search query
  const filteredActiveCommitments = activeCommitments.filter(
    (commitment) =>
      commitment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      commitment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPastCommitments = pastCommitments.filter(
    (commitment) =>
      commitment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      commitment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort commitments based on selected sort option
  const sortCommitments = (commitments) => {
    switch (sortBy) {
      case "deadline":
        return [...commitments].sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
      case "amount":
        return [...commitments].sort(
          (a, b) => Number.parseFloat(a.staked) - Number.parseFloat(b.staked)
        );
      case "created":
        return [...commitments].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return commitments;
    }
  };

  const sortedActiveCommitments = sortCommitments(filteredActiveCommitments);
  const sortedPastCommitments = sortCommitments(filteredPastCommitments);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50">
      {/* Decorative elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="animate-pulse-slow absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute top-1/3 -left-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute bottom-1/4 right-1/4 h-60 w-60 rounded-full bg-primary/10 blur-3xl"></div>

        <div className="absolute top-1/4 left-1/2 h-40 w-40 -translate-x-1/2 border border-primary/20 opacity-20">
          <div className="absolute inset-0 animate-spin-slow border-t border-primary"></div>
        </div>

        <div className="absolute bottom-20 left-20 h-20 w-20 animate-float">
          <Hexagon className="h-full w-full text-primary/10" />
        </div>
        <div className="absolute top-40 right-20 h-16 w-16 animate-float-delay">
          <Hexagon className="h-full w-full text-primary/10" />
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to dashboard</span>
            </Button>
            <span className="inline-block font-bold">All Commitments</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          {/* Search and Filter */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search commitments..."
                className="w-full pl-8 border-primary/20 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-primary/20 focus:ring-primary">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">
                    Deadline (Closest first)
                  </SelectItem>
                  <SelectItem value="amount">Amount (Lowest first)</SelectItem>
                  <SelectItem value="created">
                    Created date (Oldest first)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-primary/10"
              >
                Active Commitments
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-primary/10"
              >
                Past Commitments
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary/10"
              >
                All Commitments
              </TabsTrigger>
            </TabsList>

            {/* Active Commitments Tab */}
            <TabsContent value="active" className="space-y-4">
              {sortedActiveCommitments.length > 0 ? (
                sortedActiveCommitments.map((commitment) => (
                  <Card
                    key={commitment.id}
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
                          Deadline: {commitment.deadline}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-2 h-4 w-4" />
                          Validator: {commitment.validator}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-primary/10 bg-muted/30">
                      <div className="flex w-full justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-muted-foreground hover:text-primary"
                        >
                          Report Completion
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-primary"
                        >
                          View Details <ChevronRight className="h-4 w-4" />
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
              {sortedPastCommitments.length > 0 ? (
                sortedPastCommitments.map((commitment) => (
                  <Card
                    key={commitment.id}
                    className="border border-primary/10 bg-background/50 backdrop-blur-sm overflow-hidden"
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 ${
                        commitment.status === "completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle>{commitment.title}</CardTitle>
                            {commitment.status === "completed" ? (
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
                          Deadline: {commitment.deadline}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-2 h-4 w-4" />
                          Validator: {commitment.validator}
                        </div>
                        {commitment.status === "failed" && (
                          <div className="flex items-center text-sm text-red-500">
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Donated to charity
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-primary/10 bg-muted/30">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto gap-1 text-primary"
                      >
                        View Details <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-primary" />
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
              {sortedActiveCommitments.length > 0 ||
              sortedPastCommitments.length > 0 ? (
                <>
                  {sortedActiveCommitments.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-medium mb-4">
                        Active Commitments
                      </h2>
                      <div className="space-y-4">
                        {sortedActiveCommitments.map((commitment) => (
                          <Card
                            key={commitment.id}
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
                                  Deadline: {commitment.deadline}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Users className="mr-2 h-4 w-4" />
                                  Validator: {commitment.validator}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="border-t border-primary/10 bg-muted/30">
                              <div className="flex w-full justify-between">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="gap-1 text-muted-foreground hover:text-primary"
                                >
                                  Report Completion
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="gap-1 text-primary"
                                >
                                  View Details{" "}
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {sortedPastCommitments.length > 0 && (
                    <div>
                      <h2 className="text-lg font-medium mb-4">
                        Past Commitments
                      </h2>
                      <div className="space-y-4">
                        {sortedPastCommitments.map((commitment) => (
                          <Card
                            key={commitment.id}
                            className="border border-primary/10 bg-background/50 backdrop-blur-sm overflow-hidden"
                          >
                            <div
                              className={`absolute top-0 left-0 right-0 h-1 ${
                                commitment.status === "completed"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            ></div>
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <CardTitle>{commitment.title}</CardTitle>
                                    {commitment.status === "completed" ? (
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
                                  Deadline: {commitment.deadline}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Users className="mr-2 h-4 w-4" />
                                  Validator: {commitment.validator}
                                </div>
                                {commitment.status === "failed" && (
                                  <div className="flex items-center text-sm text-red-500">
                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                    Donated to charity
                                  </div>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter className="border-t border-primary/10 bg-muted/30">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-auto gap-1 text-primary"
                              >
                                View Details{" "}
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No commitments found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any commitments matching your search.
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

      <footer className="w-full border-t border-primary/10 bg-background py-6 relative">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MetaWill. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
