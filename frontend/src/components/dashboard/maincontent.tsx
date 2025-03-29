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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { activeCommitments } from "@/dummies/dashboard";
import { pastCommitments } from "@/dummies/dashboard";
import { validationRequests } from "@/dummies/dashboard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MainContent() {
  const [activeTab, setActiveTab] = useState("active");
  return (
    <div>
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
                  View All Past Commitments <ChevronRight className="h-4 w-4" />
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
      </Tabs>{" "}
    </div>
  );
}
