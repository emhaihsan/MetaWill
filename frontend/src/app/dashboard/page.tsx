"use client";

import Header from "@/components/dashboard/header";
import Navbar from "@/components/navbar";
import Elements from "@/components/elements";
import Footer from "@/components/footer";
import StatsCard from "@/components/dashboard/statscard";
import MainContent from "@/components/dashboard/maincontent";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50">
      {/* Decorative elements */}
      <Elements />
      <Navbar />

      <main className="flex-1 container py-8 px-8">
        <div className="flex flex-col gap-8">
          {/* Dashboard Header */}
          <Header />

          {/* Stats Cards */}
          <StatsCard />

          {/* Main Content Tabs */}
          <MainContent />
        </div>
      </main>

      <Footer />
    </div>
  );
}
