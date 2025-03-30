"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  Search,
  Filter,
  ChevronRight,
  ArrowUpLeft,
  ArrowUpRight,
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
import Elements from "@/components/elements";
import Navbar from "@/components/navbar";

import Footer from "@/components/footer";
import { activeCommitments, pastCommitments } from "@/dummies/allcommitments";

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
      <Elements />

      <Navbar />

      <main className="flex-1 px-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard">
                <ArrowUpLeft className="h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">All Commitments</h1>
          </div>
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
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          asChild
                        >
                          <Link href={`/dashboard/commitment/${commitment.id}`}>
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

      <Footer />
    </div>
  );
}
