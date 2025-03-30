"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpLeft,
  Calendar,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  ExternalLink,
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
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// Import dummy data (you'll need to create this)
import { activeCommitments, pastCommitments } from "@/dummies/allcommitments";

export default function CommitmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [commitment, setCommitment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [proofText, setProofText] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Fetch commitment data based on ID
    const foundCommitment = [...activeCommitments, ...pastCommitments].find(
      (c) => c.id === params.id
    );

    if (foundCommitment) {
      setCommitment(foundCommitment);

      // Calculate time left if it's an active commitment
      if (foundCommitment.status === "in-progress") {
        const deadline = new Date(foundCommitment.deadline);
        const now = new Date();
        const diffTime = deadline.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
          setTimeLeft(`${diffDays} days left`);
        } else {
          setTimeLeft("Deadline passed");
        }
      }
    }

    setLoading(false);
  }, [params.id]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Completed
          </Badge>
        );
      case "failed":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSubmitProof = () => {
    // In a real app, this would submit the proof to the blockchain
    alert(
      "Proof submitted! In a real app, this would be sent to the validator."
    );
    setConfirmationOpen(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading commitment details...</p>
      </div>
    );
  }

  if (!commitment) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 px-8 py-8">
          <div className="flex flex-col items-center justify-center h-full">
            <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Commitment Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The commitment you're looking for doesn't exist or has been
              removed.
            </p>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowUpLeft className="mr-2 h-4 w-4" />
                Return to Dashboard
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50">
      <Elements />
      <Navbar />

      <main className="flex-1 px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard/all-commitments">
                <ArrowUpLeft className="h-4 w-4" /> Back to All Commitments
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Commitment Details</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{commitment.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {commitment.description}
                  </CardDescription>
                </div>
                <div>{getStatusBadge(commitment.status)}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Staked Amount
                      </p>
                      <p className="font-medium">{commitment.staked}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="font-medium">{commitment.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Validator</p>
                      <p className="font-medium">{commitment.validator}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Created On
                      </p>
                      <p className="font-medium">{commitment.createdAt}</p>
                    </div>
                  </div>
                  {commitment.completedAt && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Completed On
                        </p>
                        <p className="font-medium">{commitment.completedAt}</p>
                      </div>
                    </div>
                  )}
                  {commitment.status === "in-progress" && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Time Remaining
                        </p>
                        <p className="font-medium">{timeLeft}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {commitment.status === "in-progress" && (
                <div className="mt-8">
                  <p className="text-sm text-muted-foreground mb-2">
                    Progress Timeline
                  </p>
                  <Progress value={60} className="h-2" />
                  <Separator className="my-4" />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      Created: {commitment.createdAt}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Deadline: {commitment.deadline}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              {commitment.status === "in-progress" ? (
                <>
                  <Button variant="outline" asChild>
                    <Link
                      href={`https://etherscan.io/address/${commitment.validator}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on Etherscan
                    </Link>
                  </Button>
                  <Dialog
                    open={confirmationOpen}
                    onOpenChange={setConfirmationOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-[#F6851B] hover:bg-[#F6851B]/90 text-white">
                        Mark as Completed
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit Completion Proof</DialogTitle>
                        <DialogDescription>
                          Provide evidence that you've completed your
                          commitment. Your validator will review this
                          information.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            Proof of Completion
                          </p>
                          <Textarea
                            placeholder="Describe how you fulfilled your commitment and provide any relevant links or evidence..."
                            value={proofText}
                            onChange={(e) => setProofText(e.target.value)}
                            className="min-h-[150px]"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setConfirmationOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-[#F6851B] hover:bg-[#F6851B]/90 text-white"
                          onClick={handleSubmitProof}
                          disabled={!proofText.trim()}
                        >
                          Submit for Validation
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : commitment.status === "completed" ? (
                <>
                  <Button variant="outline" asChild>
                    <Link
                      href={`https://etherscan.io/address/${commitment.validator}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on Etherscan
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Successfully Completed</span>
                  </div>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link
                      href={`https://etherscan.io/address/${commitment.validator}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on Etherscan
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    <span>Commitment Failed</span>
                  </div>
                </>
              )}
            </CardFooter>
          </Card>

          {commitment.status !== "in-progress" && (
            <Card>
              <CardHeader>
                <CardTitle>Validation Result</CardTitle>
                <CardDescription>Feedback from your validator</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert
                  variant={
                    commitment.status === "completed"
                      ? "default"
                      : "destructive"
                  }
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>
                    {commitment.status === "completed" ? "Success" : "Failed"}
                  </AlertTitle>
                  <AlertDescription>
                    {commitment.feedback ||
                      "No feedback provided by the validator."}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
