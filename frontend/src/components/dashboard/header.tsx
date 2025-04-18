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
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/dashboard/all-commitments">
            <Calendar className="h-4 w-4" /> View All Commitments
          </Link>
        </Button>
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/dashboard/validation-requests">
            <CheckCircle className="h-4 w-4" /> View All Validation Requests
          </Link>
        </Button>
        <Button
          className="gap-2 bg-[#F6851B] hover:bg-[#F6851B]/90 text-white"
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
