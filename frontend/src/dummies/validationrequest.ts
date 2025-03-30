  // Mock data for validation requests
  const pendingRequests = [
    {
      id: "1",
      user: "0x9876...54fe",
      title: "Complete Ethereum whitepaper analysis",
      description: "Write a 10-page analysis of the Ethereum whitepaper",
      staked: "0.6 ETH",
      deadline: "May 20, 2025",
      status: "pending-validation",
      createdAt: "April 20, 2025",
    },
    {
      id: "2",
      user: "0x5432...21dc",
      title: "Run 100km in a month",
      description: "Track and complete 100km of running within 30 days",
      staked: "0.4 ETH",
      deadline: "May 5, 2025",
      status: "pending-validation",
      createdAt: "April 5, 2025",
    },
    {
      id: "3",
      user: "0x7890...12ij",
      title: "Learn React Native",
      description: "Complete a React Native course and build a mobile app",
      staked: "0.5 ETH",
      deadline: "June 15, 2025",
      status: "pending-validation",
      createdAt: "May 15, 2025",
    },
  ];

  const completedRequests = [
    {
      id: "4",
      user: "0x3456...78kl",
      title: "Build a portfolio website",
      description:
        "Create a personal portfolio website with at least 5 projects",
      staked: "0.3 ETH",
      deadline: "March 10, 2025",
      status: "approved",
      createdAt: "February 10, 2025",
      completedAt: "March 8, 2025",
      feedback:
        "Great work! The portfolio looks professional and showcases your skills well.",
    },
    {
      id: "5",
      user: "0x9012...34mn",
      title: "Complete 50 leetcode problems",
      description: "Solve at least 50 leetcode problems of varying difficulty",
      staked: "0.35 ETH",
      deadline: "April 1, 2025",
      status: "rejected",
      createdAt: "March 1, 2025",
      completedAt: "April 1, 2025",
      feedback:
        "Only 42 problems were completed by the deadline, which is less than the required 50.",
    },
    {
      id: "6",
      user: "0x5678...90op",
      title: "Write a technical blog post",
      description:
        "Write and publish a technical blog post about blockchain technology",
      staked: "0.25 ETH",
      deadline: "February 20, 2025",
      status: "approved",
      createdAt: "January 20, 2025",
      completedAt: "February 18, 2025",
      feedback: "Excellent article with clear explanations and good examples.",
    },
  ];

  export { pendingRequests, completedRequests };
