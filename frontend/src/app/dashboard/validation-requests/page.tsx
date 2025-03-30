"use client";

import { useState } from "react";
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
import {
  pendingRequests,
  completedRequests,
} from "@/dummies/validationrequest";

export default function ValidationRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [dialogAction, setDialogAction] = useState<"approve" | "reject" | null>(
    null
  );

  // Filter requests based on search query
  const filteredPendingRequests = pendingRequests.filter(
    (request) =>
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedRequests = completedRequests.filter(
    (request) =>
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort requests based on selected sort option
  const sortRequests = (requests) => {
    switch (sortBy) {
      case "deadline":
        return [...requests].sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
      case "amount":
        return [...requests].sort(
          (a, b) => Number.parseFloat(a.staked) - Number.parseFloat(b.staked)
        );
      case "created":
        return [...requests].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return requests;
    }
  };

  const sortedPendingRequests = sortRequests(filteredPendingRequests);
  const sortedCompletedRequests = sortRequests(filteredCompletedRequests);

  // Handle dialog open for approve/reject
  const openDialog = (request, action: "approve" | "reject") => {
    setSelectedRequest(request);
    setDialogAction(action);
    setFeedbackText("");
  };

  // Handle validation action
  const handleValidationAction = () => {
    // Here would be the logic to submit the validation to the blockchain
    // For now, we'll just close the dialog
    setSelectedRequest(null);
    setDialogAction(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50">
      {/* Decorative elements */}
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
                placeholder="Search requests..."
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
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-primary/10"
              >
                <Clock className="mr-2 h-4 w-4" /> Pending Requests
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-primary/10"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Completed Requests
              </TabsTrigger>
            </TabsList>

            {/* Pending Requests Tab */}
            <TabsContent value="pending" className="space-y-4">
              {sortedPendingRequests.length > 0 ? (
                sortedPendingRequests.map((request) => (
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 border-green-500/20 text-green-500 hover:bg-green-500/10"
                                onClick={() => openDialog(request, "approve")}
                              >
                                <CheckCircle className="h-4 w-4" /> Approve
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Approve Commitment</DialogTitle>
                                <DialogDescription>
                                  You are approving that this commitment has
                                  been successfully completed.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <h3 className="text-sm font-medium">
                                    Commitment Details
                                  </h3>
                                  <p className="text-sm">
                                    {selectedRequest?.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedRequest?.description}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <h3 className="text-sm font-medium">
                                    Feedback (Optional)
                                  </h3>
                                  <Textarea
                                    placeholder="Add any feedback or comments about this commitment..."
                                    value={feedbackText}
                                    onChange={(e) =>
                                      setFeedbackText(e.target.value)
                                    }
                                    className="min-h-[100px] border-primary/20 focus-visible:ring-primary"
                                  />
                                </div>
                                <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                                  <CheckCircle className="h-4 w-4" />
                                  <AlertTitle>Approval Confirmation</AlertTitle>
                                  <AlertDescription>
                                    By approving, the staked ETH will be
                                    returned to the user. This action cannot be
                                    undone.
                                  </AlertDescription>
                                </Alert>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setSelectedRequest(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="bg-green-500 hover:bg-green-600"
                                  onClick={handleValidationAction}
                                >
                                  Confirm Approval
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 border-red-500/20 text-red-500 hover:bg-red-500/10"
                                onClick={() => openDialog(request, "reject")}
                              >
                                <XCircle className="h-4 w-4" /> Reject
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Reject Commitment</DialogTitle>
                                <DialogDescription>
                                  You are rejecting this commitment as
                                  incomplete or unsuccessful.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <h3 className="text-sm font-medium">
                                    Commitment Details
                                  </h3>
                                  <p className="text-sm">
                                    {selectedRequest?.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedRequest?.description}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <h3 className="text-sm font-medium">
                                    Reason for Rejection (Required)
                                  </h3>
                                  <Textarea
                                    placeholder="Explain why this commitment was not successfully completed..."
                                    value={feedbackText}
                                    onChange={(e) =>
                                      setFeedbackText(e.target.value)
                                    }
                                    className="min-h-[100px] border-primary/20 focus-visible:ring-primary"
                                  />
                                </div>
                                <Alert className="bg-red-500/10 text-red-500 border-red-500/20">
                                  <AlertCircle className="h-4 w-4" />
                                  <AlertTitle>
                                    Rejection Confirmation
                                  </AlertTitle>
                                  <AlertDescription>
                                    By rejecting, the staked ETH will be donated
                                    to charity. This action cannot be undone.
                                  </AlertDescription>
                                </Alert>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setSelectedRequest(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={handleValidationAction}
                                  disabled={!feedbackText.trim()}
                                >
                                  Confirm Rejection
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No pending requests
                  </h3>
                  <p className="text-muted-foreground">
                    You don't have any pending validation requests.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Completed Requests Tab */}
            <TabsContent value="completed" className="space-y-4">
              {sortedCompletedRequests.length > 0 ? (
                sortedCompletedRequests.map((request) => (
                  <Card
                    key={request.id}
                    className="border border-primary/10 bg-background/50 backdrop-blur-sm overflow-hidden"
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 ${
                        request.status === "approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle>{request.title}</CardTitle>
                            {request.status === "approved" ? (
                              <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                Approved
                              </Badge>
                            ) : (
                              <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                                Rejected
                              </Badge>
                            )}
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
                          Completed: {request.completedAt}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Wallet className="mr-2 h-4 w-4" />
                          User: {request.user}
                        </div>
                        <div className="rounded-md bg-muted p-3">
                          <h4 className="text-sm font-medium mb-1">
                            Your Feedback:
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {request.feedback}
                          </p>
                        </div>
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
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No completed requests
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
    </div>
  );
}
