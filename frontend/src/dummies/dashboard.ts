const stats = [
    {
      name: "Total Staked",
      value: "2.45 ETH",
      change: "+0.5 ETH",
      changeType: "positive",
    },
    {
      name: "Total Returned",
      value: "1.2 ETH",
      change: "+0.3 ETH",
      changeType: "positive",
    },
    {
      name: "Total Donated",
      value: "0.75 ETH",
      change: "+0.2 ETH",
      changeType: "neutral",
    },
    {
      name: "Success Rate",
      value: "75%",
      change: "+5%",
      changeType: "positive",
    },
  ];

  const activeCommitments = [
    {
      id: "1",
      title: "Complete 30 days of coding",
      description: "Code for at least 1 hour every day for 30 days",
      staked: "0.5 ETH",
      deadline: "May 15, 2025",
      validator: "0x8912...45ab",
      status: "in-progress",
    },
    {
      id: "2",
      title: "Finish blockchain certification",
      description: "Complete all modules and pass the final exam",
      staked: "0.75 ETH",
      deadline: "June 2, 2025",
      validator: "0x3421...87cd",
      status: "in-progress",
    },
    {
      id: "3",
      title: "Launch NFT collection",
      description: "Create and launch a collection of 10 NFTs",
      staked: "1.2 ETH",
      deadline: "July 10, 2025",
      validator: "0x6789...12ef",
      status: "in-progress",
    },
  ];

  const pastCommitments = [
    {
      id: "4",
      title: "Learn Solidity basics",
      description: "Complete the beginner Solidity course",
      staked: "0.3 ETH",
      deadline: "March 1, 2025",
      validator: "0x2345...67ab",
      status: "completed",
    },
    {
      id: "5",
      title: "Build a DApp prototype",
      description: "Create a working prototype of a decentralized application",
      staked: "0.45 ETH",
      deadline: "February 15, 2025",
      validator: "0x8912...45ab",
      status: "failed",
    },
    {
      id: "6",
      title: "Attend Web3 conference",
      description: "Participate in at least 5 workshops at the conference",
      staked: "0.25 ETH",
      deadline: "January 20, 2025",
      validator: "0x3421...87cd",
      status: "completed",
    },
  ];

  const validationRequests = [
    {
      id: "7",
      user: "0x9876...54fe",
      title: "Complete Ethereum whitepaper analysis",
      description: "Write a 10-page analysis of the Ethereum whitepaper",
      staked: "0.6 ETH",
      deadline: "May 20, 2025",
      status: "pending-validation",
    },
    {
      id: "8",
      user: "0x5432...21dc",
      title: "Run 100km in a month",
      description: "Track and complete 100km of running within 30 days",
      staked: "0.4 ETH",
      deadline: "May 5, 2025",
      status: "pending-validation",
    },
  ];

  export { stats, activeCommitments, pastCommitments, validationRequests };