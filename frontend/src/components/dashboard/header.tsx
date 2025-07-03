import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, CheckCircle, Plus } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your commitments and track your progress
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          variant="secondary"
          className="gap-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-semibold shadow-[0_0_12px_rgba(124,58,237,0.25)] hover:shadow-[0_0_20px_rgba(124,58,237,0.40)] transition-all duration-300 transform hover:scale-105"
          asChild
        >
          <Link href="/dashboard/all-commitments">
            <Calendar className="h-4 w-4" /> View All Commitments
          </Link>
        </Button>
        <Button
          variant="secondary"
          className="gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow-[0_0_12px_rgba(16,185,129,0.25)] hover:shadow-[0_0_20px_rgba(16,185,129,0.40)] transition-all duration-300 transform hover:scale-105"
          asChild
        >
          <Link href="/dashboard/validation-requests">
            <CheckCircle className="h-4 w-4" /> View All Validation Requests
          </Link>
        </Button>
        <Button
          className="group flex gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold shadow-[0_0_15px_rgba(246,133,27,0.3)] hover:shadow-[0_0_25px_rgba(246,133,27,0.5)] transition-all duration-300 transform hover:scale-105"
          asChild
        >
          <Link href="/dashboard/new-commitment">
            <Plus className="h-4 w-4" /> Create New Commitment
          </Link>
        </Button>
      </div>
    </div>
  );
}
