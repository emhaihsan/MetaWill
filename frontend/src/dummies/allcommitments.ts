const activeCommitments = [
    {
      id: "1",
      title: "Complete 30 days of coding",
      description: "Code for at least 1 hour every day for 30 days",
      staked: "0.5 ETH",
      deadline: "May 15, 2025",
      validator: "0x8912...45ab",
      status: "in-progress",
      createdAt: "April 15, 2025",
    },
    {
      id: "2",
      title: "Finish blockchain certification",
      description: "Complete all modules and pass the final exam",
      staked: "0.75 ETH",
      deadline: "June 2, 2025",
      validator: "0x3421...87cd",
      status: "in-progress",
      createdAt: "May 2, 2025",
    },
    {
      id: "3",
      title: "Launch NFT collection",
      description: "Create and launch a collection of 10 NFTs",
      staked: "1.2 ETH",
      deadline: "July 10, 2025",
      validator: "0x6789...12ef",
      status: "in-progress",
      createdAt: "June 10, 2025",
    },
    {
      id: "9",
      title: "Complete Web3 course",
      description: "Finish all modules of the advanced Web3 development course",
      staked: "0.8 ETH",
      deadline: "August 20, 2025",
      validator: "0x1234...56gh",
      status: "in-progress",
      createdAt: "July 20, 2025",
    },
    {
      id: "10",
      title: "Build a DAO prototype",
      description:
        "Create a working prototype of a decentralized autonomous organization",
      staked: "1.5 ETH",
      deadline: "September 15, 2025",
      validator: "0x7890...12ij",
      status: "in-progress",
      createdAt: "August 15, 2025",
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
      createdAt: "February 1, 2025",
      completedAt: "February 28, 2025",
    },
    {
      id: "5",
      title: "Build a DApp prototype",
      description: "Create a working prototype of a decentralized application",
      staked: "0.45 ETH",
      deadline: "February 15, 2025",
      validator: "0x8912...45ab",
      status: "failed",
      createdAt: "January 15, 2025",
      completedAt: "February 15, 2025",
    },
    {
      id: "6",
      title: "Attend Web3 conference",
      description: "Participate in at least 5 workshops at the conference",
      staked: "0.25 ETH",
      deadline: "January 20, 2025",
      validator: "0x3421...87cd",
      status: "completed",
      createdAt: "December 20, 2024",
      completedAt: "January 19, 2025",
    },
    {
      id: "11",
      title: "Complete smart contract audit",
      description: "Perform a security audit on a smart contract",
      staked: "0.6 ETH",
      deadline: "March 10, 2025",
      validator: "0x3456...78kl",
      status: "completed",
      createdAt: "February 10, 2025",
      completedAt: "March 8, 2025",
    },
    {
      id: "12",
      title: "Implement wallet integration",
      description: "Integrate multiple wallet providers into a dApp",
      staked: "0.4 ETH",
      deadline: "April 5, 2025",
      validator: "0x9012...34mn",
      status: "failed",
      createdAt: "March 5, 2025",
      completedAt: "April 5, 2025",
    },
  ];



  export { activeCommitments, pastCommitments};