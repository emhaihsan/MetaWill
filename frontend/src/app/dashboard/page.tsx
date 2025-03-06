"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NavBar from "../../components/NavBar";
import Link from "next/link";

// Mock data for demonstration
const activeCommitments = [
  {
    id: "1",
    title: "Complete Hackathon Project",
    description: "Finish the iPROMISE platform for the Electroneum Hackathon",
    deadline: "2025-03-20",
    amount: "0.5",
    validator: "0x1234...5678",
    status: "active",
  },
  {
    id: "2",
    title: "Learn Solidity",
    description: "Complete the Crypto Zombies tutorial series",
    deadline: "2025-04-15",
    amount: "0.2",
    validator: "0x8765...4321",
    status: "active",
  },
];

const pastCommitments = [
  {
    id: "3",
    title: "Daily Meditation",
    description: "Meditate for 10 minutes every day for a month",
    deadline: "2025-02-28",
    amount: "0.1",
    validator: "0x2468...1357",
    status: "completed",
  },
  {
    id: "4",
    title: "Run 5k",
    description: "Train and complete a 5k run",
    deadline: "2025-01-15",
    amount: "0.3",
    validator: "0x1357...2468",
    status: "failed",
  },
];

export default function Dashboard() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow p-6 md:p-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {/* Dashboard Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
              <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-3 mr-4">
                <span className="text-xl text-indigo-600 dark:text-indigo-400">
                  📊
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active Commitments
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {activeCommitments.length}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mr-4">
                <span className="text-xl text-green-600 dark:text-green-400">
                  ✅
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completed
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {
                    pastCommitments.filter((c) => c.status === "completed")
                      .length
                  }
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
              <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3 mr-4">
                <span className="text-xl text-red-600 dark:text-red-400">
                  ❌
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Failed
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {pastCommitments.filter((c) => c.status === "failed").length}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Commitments Section - Takes full width now that validation section is removed */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <span className="mr-2">📝</span>
                    Active Commitments
                  </h2>
                  <Link
                    href="/create"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                  >
                    <span className="mr-1">+</span> New Commitment
                  </Link>
                </div>

                {activeCommitments.length > 0 ? (
                  <div className="space-y-4">
                    {activeCommitments.map((commitment) => (
                      <div
                        key={commitment.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {commitment.title}
                          </h3>
                          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm line-clamp-2">
                          {commitment.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="flex items-center">
                            <span className="text-gray-500 dark:text-gray-400 mr-2">
                              🗓️
                            </span>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Deadline
                              </p>
                              <p className="font-medium text-sm">
                                {commitment.deadline}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 dark:text-gray-400 mr-2">
                              💰
                            </span>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Staked Amount
                              </p>
                              <p className="font-medium text-sm">
                                {commitment.amount} ETH
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mb-3">
                          <span className="text-gray-500 dark:text-gray-400 mr-2">
                            👤
                          </span>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Validator
                            </p>
                            <p className="font-medium text-sm">
                              {commitment.validator}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md flex-1 transition-colors text-sm">
                            <span className="mr-1">✓</span> Complete
                          </button>
                          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md flex-1 transition-colors text-sm">
                            <span className="mr-1">✗</span> Failed
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                    <div className="text-4xl mb-3">📝</div>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                      No Active Commitments
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                      You don't have any active commitments yet
                    </p>
                    <Link
                      href="/create"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md inline-block transition-colors text-sm"
                    >
                      Create Your First Commitment
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Past Commitments Section */}
          <div className="mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🕒</span>
                Past Commitments
              </h2>

              {pastCommitments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pastCommitments.map((commitment) => (
                    <div
                      key={commitment.id}
                      className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                        commitment.status === "completed"
                          ? "border-l-4 border-green-500"
                          : "border-l-4 border-red-500"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {commitment.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            commitment.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {commitment.status === "completed"
                            ? "Completed"
                            : "Failed"}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm line-clamp-2">
                        {commitment.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-gray-500 dark:text-gray-400 mr-2">
                            🗓️
                          </span>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Deadline
                            </p>
                            <p className="font-medium text-sm">
                              {commitment.deadline}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-500 dark:text-gray-400 mr-2">
                            💰
                          </span>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {commitment.status === "completed"
                                ? "Returned Amount"
                                : "Donated Amount"}
                            </p>
                            <p className="font-medium text-sm">
                              {commitment.amount} ETH
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-500 dark:text-gray-400 mr-2">
                            👤
                          </span>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Validator
                            </p>
                            <p className="font-medium text-sm">
                              {commitment.validator}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <div className="text-4xl mb-3">🕒</div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    No Past Commitments
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    You don't have any completed or failed commitments
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
