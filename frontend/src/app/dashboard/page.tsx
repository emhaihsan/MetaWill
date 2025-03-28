"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Wallet,
  Bell,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  ChevronRight,
  Calendar,
  ArrowUpRight,
  Users,
  History,
  Hexagon,
  LogOut,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("active");

  // Mock data for the dashboard
  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
  const shortenedAddress = `${walletAddress.substring(
    0,
    6
  )}...${walletAddress.substring(walletAddress.length - 4)}`;

  const stats = [
    {
      name: "Total Staked",
      value: "2.45 ETH",
      change: "+0.5 ETH",
      changeType: "positive",
    },
    {
      name: "Total Returned",
      value: "1.2 ETH",
      change: "+0.3 ETH",
      changeType: "positive",
    },
    {
      name: "Total Donated",
      value: "0.75 ETH",
      change: "+0.2 ETH",
      changeType: "neutral",
    },
    {
      name: "Success Rate",
      value: "75%",
      change: "+5%",
      changeType: "positive",
    },
  ];

  const activeCommitments = [
    {
      id: "1",
      title: "Complete 30 days of coding",
      description: "Code for at least 1 hour every day for 30 days",
      staked: "0.5 ETH",
      deadline: "May 15, 2025",
      validator: "0x8912...45ab",
      status: "in-progress",
    },
    {
      id: "2",
      title: "Finish blockchain certification",
      description: "Complete all modules and pass the final exam",
      staked: "0.75 ETH",
      deadline: "June 2, 2025",
      validator: "0x3421...87cd",
      status: "in-progress",
    },
    {
      id: "3",
      title: "Launch NFT collection",
      description: "Create and launch a collection of 10 NFTs",
      staked: "1.2 ETH",
      deadline: "July 10, 2025",
      validator: "0x6789...12ef",
      status: "in-progress",
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
    },
    {
      id: "5",
      title: "Build a DApp prototype",
      description: "Create a working prototype of a decentralized application",
      staked: "0.45 ETH",
      deadline: "February 15, 2025",
      validator: "0x8912...45ab",
      status: "failed",
    },
    {
      id: "6",
      title: "Attend Web3 conference",
      description: "Participate in at least 5 workshops at the conference",
      staked: "0.25 ETH",
      deadline: "January 20, 2025",
      validator: "0x3421...87cd",
      status: "completed",
    },
  ];

  const validationRequests = [
    {
      id: "7",
      user: "0x9876...54fe",
      title: "Complete Ethereum whitepaper analysis",
      description: "Write a 10-page analysis of the Ethereum whitepaper",
      staked: "0.6 ETH",
      deadline: "May 20, 2025",
      status: "pending-validation",
    },
    {
      id: "8",
      user: "0x5432...21dc",
      title: "Run 100km in a month",
      description: "Track and complete 100km of running within 30 days",
      staked: "0.4 ETH",
      deadline: "May 5, 2025",
      status: "pending-validation",
    },
  ];

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
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold">MetaWill</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/dashboard"
                className="flex items-center text-sm font-medium text-primary border-b-2 border-primary"
              >
                Dashboard
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Wallet className="h-4 w-4" />
                  <span className="hidden sm:inline-block">
                    {shortenedAddress}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>{shortenedAddress}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>My Validators</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Disconnect</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          {/* Dashboard Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your commitments and track your progress
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/dashboard/all-commitments">
                  <Calendar className="h-4 w-4" /> View All Commitments
                </Link>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/dashboard/validation-requests">
                  <CheckCircle className="h-4 w-4" /> View All Validation
                  Requests
                </Link>
              </Button>
              <Button className="gap-2" asChild>
                <Link href="/dashboard/new-commitment">
                  <Plus className="h-4 w-4" /> Create New Commitment
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="border border-primary/10 bg-background/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div
                      className={`text-sm ${
                        stat.changeType === "positive"
                          ? "text-green-500"
                          : stat.changeType === "negative"
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs
            defaultValue="active"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-primary/10"
              >
                <Clock className="mr-2 h-4 w-4" /> Active Commitments
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-primary/10"
              >
                <History className="mr-2 h-4 w-4" /> Past Commitments
              </TabsTrigger>
              <TabsTrigger
                value="validation"
                className="data-[state=active]:bg-primary/10"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Validation Requests
              </TabsTrigger>
            </TabsList>

            {/* Active Commitments Tab */}
            <TabsContent value="active" className="space-y-4">
              {activeCommitments.slice(0, 5).map((commitment) => (
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
              ))}
              {activeCommitments.length > 5 && (
                <div className="flex justify-center pt-2">
                  <Button variant="outline" className="gap-2" asChild>
                    <Link href="/dashboard/all-commitments?tab=active">
                      View All Active Commitments{" "}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Past Commitments Tab */}
            <TabsContent value="past" className="space-y-4">
              {pastCommitments.slice(0, 5).map((commitment) => (
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
              ))}
              {pastCommitments.length > 5 && (
                <div className="flex justify-center pt-2">
                  <Button variant="outline" className="gap-2" asChild>
                    <Link href="/dashboard/all-commitments?tab=past">
                      View All Past Commitments{" "}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Validation Requests Tab */}
            <TabsContent value="validation" className="space-y-4">
              {validationRequests.slice(0, 5).map((request) => (
                <Card
                  key={request.id}
                  className="border border-primary/10 bg-background/50 backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{request.title}</CardTitle>
                          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                            Pending Validation
                          </Badge>
                        </div>
                        <CardDescription className="mt-1">
                          {request.description}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-primary/20 text-primary"
                      >
                        {request.staked}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        Deadline: {request.deadline}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Wallet className="mr-2 h-4 w-4" />
                        User: {request.user}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-primary/10 bg-muted/30">
                    <div className="flex w-full justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 border-green-500/20 text-green-500 hover:bg-green-500/10"
                        >
                          <CheckCircle className="h-4 w-4" /> Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 border-red-500/20 text-red-500 hover:bg-red-500/10"
                        >
                          <XCircle className="h-4 w-4" /> Reject
                        </Button>
                      </div>
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
              ))}
              {validationRequests.length > 5 && (
                <div className="flex justify-center pt-2">
                  <Button variant="outline" className="gap-2" asChild>
                    <Link href="/dashboard/validation-requests">
                      View All Validation Requests{" "}
                      <ChevronRight className="h-4 w-4" />
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
