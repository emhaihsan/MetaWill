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

  const isNextStepDisabled =
    !formData.title ||
    !formData.amount ||
    !date ||
    !formData.validator ||
    !formData.donationIndex;

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
    <div className="flex min-h-screen flex-col bg-black bg-[radial-gradient(ellipse_at_top,rgba(246,133,27,0.15)_0%,transparent_60%)] text-gray-100">
      {/* Decorative elements */}
      <Elements />

      <Navbar />

      <main className="flex-1 container px-4 pb-8 pt-28">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Create New Commitment
            </h1>
          </div>

          {/* Step 1: Commitment Details */}
          {step === 1 && (
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Define Your Goal</CardTitle>
                <CardDescription className="text-gray-400">
                  Tell us what you want to achieve. Be specific!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-300">
                    Commitment Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder='e.g., "Run a 5k Marathon" or "Finish my project"'
                    value={formData.title}
                    onChange={handleInputChange}
                    className="bg-gray-900/50 border-white/20 focus:border-orange-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the details of your commitment..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-gray-900/50 border-white/20 focus:border-orange-500 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-gray-300">
                      Stake Amount (USDC)
                    </Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="bg-gray-900/50 border-white/20 focus:border-orange-500 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-gray-300">
                      Deadline
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal text-gray-400 hover:text-white bg-gray-900/50 border-white/20 hover:bg-gray-900/80`}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-900 border-white/20 text-white">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validator" className="text-gray-300">
                    Validator Address
                  </Label>
                  <Input
                    id="validator"
                    name="validator"
                    placeholder="Enter the wallet address of your validator (e.g., 0x...)"
                    value={formData.validator}
                    onChange={handleInputChange}
                    className="bg-gray-900/50 border-white/20 focus:border-orange-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donationIndex" className="text-gray-300">
                    Charity for Donation (if you fail)
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("donationIndex", value)
                    }
                    defaultValue={formData.donationIndex}
                  >
                    <SelectTrigger className="w-full bg-gray-900/50 border-white/20 focus:border-orange-500 text-white">
                      <SelectValue placeholder="Select a charity" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20 text-white">
                      {isLoadingDonations ? (
                        <SelectItem value="loading" disabled>
                          Loading charities...
                        </SelectItem>
                      ) : (
                        donationAddresses.map((address, index) => (
                          <SelectItem key={address} value={index.toString()}>
                            {donationNames[index]}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-6 flex justify-end">
                <Button
                  onClick={handleNextStep}
                  disabled={isNextStepDisabled}
                  className="group flex gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold shadow-[0_0_15px_rgba(246,133,27,0.3)] hover:shadow-[0_0_25px_rgba(246,133,27,0.5)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
                >
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Review Commitment */}
          {step === 2 && (
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">
                  Review Your Commitment
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Please double-check the details before creating it on the
                  blockchain.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 rounded-2xl bg-black/20 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Title:</span>
                    <span className="font-medium text-white text-right">
                      {formData.title}
                    </span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stake:</span>
                    <span className="font-mono font-bold text-lg text-orange-400">
                      {formData.amount} USDC
                    </span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">Deadline:</span>
                    <span className="font-medium text-white">
                      {date ? format(date, "PPP") : "N/A"}
                    </span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 mt-1">Validator:</span>
                    <span className="font-mono text-white text-right break-all">
                      {formData.validator}
                    </span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      Donation upon failure:
                    </span>
                    <span className="font-medium text-white">
                      {formData.donationIndex !== "" && !isLoadingDonations
                        ? donationNames[parseInt(formData.donationIndex)]
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <Alert className="bg-amber-500/10 border-amber-500/20 text-amber-400">
                  <Info className="h-4 w-4 !text-amber-400" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    The staked amount is the collateral for your commitment.
                    This amount will be returned to you upon successful
                    completion, or donated to{" "}
                    {formData.donationIndex !== "" && !isLoadingDonations
                      ? donationNames[parseInt(formData.donationIndex)]
                      : "the selected charity"}{" "}
                    if you fail to complete it.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  className="border-white/20 hover:bg-white/10 hover:text-white"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || isCreatingCommitment}
                  className="group flex gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold shadow-[0_0_15px_rgba(246,133,27,0.3)] hover:shadow-[0_0_25px_rgba(246,133,27,0.5)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
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
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
              <CardHeader className="text-center items-center">
                <CheckCircle className="h-12 w-12 text-green-400 mb-2" />
                <CardTitle className="text-2xl text-white">
                  Commitment Created!
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your commitment has been successfully created and is now
                  active.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-green-500/10 border-green-500/20 text-green-400">
                  <CheckCircle className="h-4 w-4 !text-green-400" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Your commitment has been recorded on the blockchain. You can
                    now track your progress and report completion when ready.
                  </AlertDescription>
                </Alert>

                <div className="p-4 rounded-lg bg-black/20">
                  <h3 className="font-medium mb-3 text-white">
                    Commitment Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Title:</span>
                      <span className="font-medium text-white">
                        {formData.title}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Deadline:</span>
                      <span className="font-medium text-white">
                        {date ? format(date, "PPP") : "No date selected"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Stake:</span>
                      <span className="font-medium text-white">
                        {formData.amount} USDC
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Status:</span>
                      <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-6 flex justify-center">
                <Button
                  asChild
                  className="group flex gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold shadow-[0_0_15px_rgba(246,133,27,0.3)] hover:shadow-[0_0_25px_rgba(246,133,27,0.5)] transition-all duration-300 transform hover:scale-105"
                >
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
