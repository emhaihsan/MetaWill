"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Info,
  AlertCircle,
  CheckCircle,
  ArrowUpLeft,
} from "lucide-react";
import { format } from "date-fns";
import Elements from "@/components/elements";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useMetaWill } from "@/components/providers";
import { useDonationAddresses } from "@/hooks/useMetaWillContract";
import { parseUnits } from "viem";
import { toast } from "@/components/ui/toast";

export default function NewCommitmentPage() {
  const [date, setDate] = useState<Date>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    validator: "",
    donationIndex: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mengambil data MetaWill dari provider
  const { createNewCommitment, isCreatingCommitment, refreshUserCommitments } =
    useMetaWill();

  // Mengambil daftar donasi
  const {
    donationAddresses,
    donationNames,
    isLoading: isLoadingDonations,
  } = useDonationAddresses();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Konversi deadline ke timestamp (dalam detik)
      const deadline = date ? Math.floor(date.getTime() / 1000) : 0;

      // Konversi amount ke BigInt (dalam wei)
      const stakeAmount = parseUnits(formData.amount, 6);

      // Panggil fungsi createNewCommitment dari provider
      await createNewCommitment(
        formData.title,
        formData.description,
        deadline,
        formData.validator as `0x${string}`,
        Number(formData.donationIndex),
        stakeAmount
      );

      // Refresh daftar komitmen user
      await refreshUserCommitments();

      // Pindah ke step 3 (konfirmasi)
      setStep(3);

      toast.success("Your commitment has been successfully created!", {
        description: "You can view it in your dashboard",
      });
    } catch (error) {
      console.error("Error creating commitment:", error);
      toast.error("Failed to create commitment", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50">
      {/* Decorative elements */}
      <Elements />

      <Navbar />

      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Create New Commitment</h1>
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard">
                <ArrowUpLeft className="h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
          </div>

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
                  <Label htmlFor="amount">Stake Amount (USDC)</Label>
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
                      <span className="text-sm text-muted-foreground">
                        USDC
                      </span>
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
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
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

                <div className="space-y-2">
                  <Label htmlFor="donationIndex">Donation Recipient</Label>
                  <Select
                    value={formData.donationIndex}
                    onValueChange={(value) =>
                      handleSelectChange("donationIndex", value)
                    }
                  >
                    <SelectTrigger className="border-primary/20 focus-visible:ring-primary">
                      <SelectValue placeholder="Select a donation recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingDonations ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : (
                        donationNames.map((name, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    If you fail to complete your commitment, your stake will be
                    donated to this recipient
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
                    !formData.validator ||
                    !formData.donationIndex
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
                    <p className="text-base">{formData.amount} USDC</p>
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

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Donation Recipient
                    </h3>
                    <p className="text-base">
                      {formData.donationIndex !== "" && !isLoadingDonations
                        ? donationNames[parseInt(formData.donationIndex)]
                        : "Not selected"}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stake Amount:</span>
                    <span className="font-medium">{formData.amount} USDC</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="font-medium">{formData.amount} USDC</span>
                  </div>
                </div>

                <Alert className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>
                    By confirming, you agree to stake {formData.amount} USDC as
                    collateral for your commitment. This amount will be returned
                    to you upon successful completion, or donated to{" "}
                    {formData.donationIndex !== "" && !isLoadingDonations
                      ? donationNames[parseInt(formData.donationIndex)]
                      : "the selected charity"}{" "}
                    if you fail to complete it.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="border-t border-primary/10 bg-muted/30 flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || isCreatingCommitment}
                >
                  {isSubmitting || isCreatingCommitment
                    ? "Creating..."
                    : "Create Commitment"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <Card className="border border-primary/10 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Commitment Created!
                </CardTitle>
                <CardDescription>
                  Your commitment has been successfully created and is now
                  active
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Your commitment has been recorded on the blockchain. You can
                    now track your progress and report completion when ready.
                  </AlertDescription>
                </Alert>

                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-medium mb-2">Commitment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Title:</span>
                      <span className="font-medium">{formData.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-medium">
                        {date ? format(date, "PPP") : "No date selected"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stake:</span>
                      <span className="font-medium">
                        {formData.amount} USDC
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge
                        variant="outline"
                        className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                      >
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-primary/10 bg-muted/30 flex justify-center">
                <Button asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
