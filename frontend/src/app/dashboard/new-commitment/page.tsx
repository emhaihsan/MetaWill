"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  ArrowLeft,
  Calendar,
  Info,
  AlertCircle,
  Hexagon,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function NewCommitmentPage() {
  const [date, setDate] = useState<Date>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    validator: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to submit the commitment to the blockchain
    // For now, we'll just simulate a successful submission
    setStep(3);
  };

  // Calculate gas fee (this would be dynamic in a real app)
  const gasFee = "0.002 ETH";
  const totalCost = Number.parseFloat(formData.amount || "0") + 0.002;

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
            <span className="inline-block font-bold">
              Create New Commitment
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Step indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center ${
                  step >= 1 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step >= 1
                      ? "bg-primary text-primary-foreground"
                      : "border border-muted-foreground"
                  }`}
                >
                  1
                </div>
                <span className="ml-2 font-medium">Details</span>
              </div>
              <div
                className={`flex-1 h-px mx-4 ${
                  step >= 2 ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  step >= 2 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step >= 2
                      ? "bg-primary text-primary-foreground"
                      : "border border-muted-foreground"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 font-medium">Review</span>
              </div>
              <div
                className={`flex-1 h-px mx-4 ${
                  step >= 3 ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  step >= 3 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step >= 3
                      ? "bg-primary text-primary-foreground"
                      : "border border-muted-foreground"
                  }`}
                >
                  3
                </div>
                <span className="ml-2 font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Step 1: Commitment Details */}
          {step === 1 && (
            <Card className="border border-primary/10 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Commitment Details</CardTitle>
                <CardDescription>
                  Define your commitment and set the terms for accountability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Commitment Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="E.g., Complete 30 days of coding"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe what you're committing to do in detail"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="min-h-[100px] border-primary/20 focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Stake Amount (ETH)</Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.5"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="border-primary/20 focus-visible:ring-primary"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <span className="text-sm text-muted-foreground">ETH</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This amount will be staked as collateral for your commitment
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-primary/20 focus-visible:ring-primary"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>Select a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validator">Validator Address</Label>
                  <Input
                    id="validator"
                    name="validator"
                    placeholder="0x..."
                    value={formData.validator}
                    onChange={handleInputChange}
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the Ethereum address of the person who will verify
                    your commitment
                  </p>
                </div>

                <Alert className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Make sure your validator is someone you trust who can verify
                    your commitment completion. They will need to confirm your
                    success or failure.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="border-t border-primary/10 bg-muted/30 flex justify-end">
                <Button
                  onClick={handleNextStep}
                  disabled={
                    !formData.title ||
                    !formData.description ||
                    !formData.amount ||
                    !date ||
                    !formData.validator
                  }
                >
                  Continue to Review
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Review Commitment */}
          {step === 2 && (
            <Card className="border border-primary/10 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Review Your Commitment</CardTitle>
                <CardDescription>
                  Please review your commitment details before confirming
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Commitment Title
                    </h3>
                    <p className="text-base">{formData.title}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Description
                    </h3>
                    <p className="text-base">{formData.description}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Stake Amount
                    </h3>
                    <p className="text-base">{formData.amount} ETH</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Deadline
                    </h3>
                    <p className="text-base">
                      {date ? format(date, "PPP") : "No date selected"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Validator
                    </h3>
                    <p className="text-base">{formData.validator}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stake Amount:</span>
                    <span>{formData.amount} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Estimated Gas Fee:
                    </span>
                    <span>{gasFee}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{totalCost.toFixed(3)} ETH</span>
                  </div>
                </div>

                <Alert className="bg-primary/10 text-primary border-primary/20">
                  <Info className="h-4 w-4" />
                  <AlertTitle>How it works</AlertTitle>
                  <AlertDescription>
                    When you confirm, your stake will be locked in a smart
                    contract until your commitment is validated. If successful,
                    you'll receive your stake back. If not, it will be donated
                    to charity.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="border-t border-primary/10 bg-muted/30 flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button onClick={handleSubmit}>
                  Confirm & Sign Transaction
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <Card className="border border-primary/10 bg-background/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Commitment Created!</CardTitle>
                <CardDescription>
                  Your commitment has been successfully created and your stake
                  has been locked
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-4">
                  <h3 className="font-medium mb-2">{formData.title}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Stake Amount:
                    </span>
                    <Badge
                      variant="outline"
                      className="border-primary/20 text-primary"
                    >
                      {formData.amount} ETH
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Deadline:
                    </span>
                    <span className="text-sm">
                      {date ? format(date, "PPP") : "No date selected"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Transaction Details</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Transaction Hash:
                    </span>
                    <Link
                      href="#"
                      className="text-primary hover:underline truncate max-w-[200px]"
                    >
                      0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                    </Link>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Block Number:</span>
                    <span>12345678</span>
                  </div>
                </div>

                <Alert className="bg-primary/10 text-primary border-primary/20">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Next Steps</AlertTitle>
                  <AlertDescription>
                    Your validator has been notified about this commitment.
                    Focus on completing your commitment before the deadline!
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="border-t border-primary/10 bg-muted/30 flex justify-center">
                <Button asChild>
                  <Link href="/dashboard">Return to Dashboard</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
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
