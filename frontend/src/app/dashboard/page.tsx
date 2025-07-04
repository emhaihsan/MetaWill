"use client";

import Header from "@/components/dashboard/header";
import Navbar from "@/components/navbar";
import Elements from "@/components/elements";
import Footer from "@/components/footer";
import StatsCard from "@/components/dashboard/statscard";
import MainContent from "@/components/dashboard/maincontent";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black bg-[radial-gradient(ellipse_at_top,rgba(246,133,27,0.15)_0%,transparent_60%)] text-gray-100">
      {/* Decorative elements */}
      <Elements />
      <Navbar />

      <main className="flex-1 px-8 pb-8 pt-28">
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
