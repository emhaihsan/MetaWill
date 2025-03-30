import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MetaWill Whitepaper | Web3 Commitment Platform",
  description:
    "Explore the technical details of MetaWill - a decentralized platform for personal accountability with financial stakes built on blockchain technology.",
  keywords: [
    "MetaWill whitepaper",
    "web3 commitment",
    "blockchain accountability",
    "smart contracts",
    "ethereum staking",
    "decentralized promises",
  ],
  openGraph: {
    title: "MetaWill Whitepaper | Web3 Commitment Platform",
    description:
      "Explore the technical details of MetaWill - a decentralized platform for personal accountability with financial stakes built on blockchain technology.",
    url: "https://metawill.vercel.app/whitepaper",
    type: "article",
    images: [
      {
        url: "/whitepaper-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MetaWill Whitepaper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaWill Whitepaper | Web3 Commitment Platform",
    description:
      "Explore the technical details of MetaWill - a decentralized platform for personal accountability with financial stakes built on blockchain technology.",
    images: ["/whitepaper-twitter-image.jpg"],
  },
};

export default function WhitepaperPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="prose prose-orange mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">
            MetaWill: Web3 Commitment Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A decentralized platform for personal accountability with financial
            stakes
          </p>

          <div className="bg-muted/30 p-6 rounded-lg border border-primary/10 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Executive Summary</h2>
            <p>
              MetaWill is a decentralized platform built on blockchain
              technology that enables users to create and fulfill personal
              commitments with financial accountability. Users stake Ethereum as
              collateral for their promises, which is either returned upon
              successful completion or donated to charity if the commitment is
              not fulfilled. The platform leverages smart contracts to ensure
              transparency and trustless verification through a validator
              system.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <h3 className="text-xl font-medium mb-3">1.1 Problem Statement</h3>
          <p>
            People often struggle to follow through on personal commitments and
            goals. Traditional methods lack accountability mechanisms that are
            both effective and transparent. Current solutions either rely on
            trust-based systems or centralized authorities, which can be
            manipulated or compromised.
          </p>

          <h3 className="text-xl font-medium mb-3">1.2 Solution Overview</h3>
          <p>
            MetaWill provides a decentralized commitment platform where users
            can:
          </p>
          <ol className="list-decimal pl-6 mb-6">
            <li>Create public commitments with financial stakes</li>
            <li>Set their own deadlines</li>
            <li>Assign trusted validators</li>
            <li>Receive verification of completion</li>
            <li>
              Automatically handle the financial consequences of success or
              failure
            </li>
          </ol>
          <p>
            The platform uses blockchain technology to ensure transparency,
            immutability, and trustless execution of the commitment process.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            2. Platform Architecture
          </h2>

          <h3 className="text-xl font-medium mb-3">2.1 Technical Stack</h3>
          <p>
            MetaWill is built on the Ethereum blockchain, utilizing smart
            contracts written in Solidity. The frontend is developed using React
            with Web3 integration via RainbowKit for wallet connections. The
            platform employs a serverless architecture with blockchain as the
            primary data store.
          </p>

          <h3 className="text-xl font-medium mb-3">
            2.2 Smart Contract System
          </h3>
          <p>
            The core of MetaWill consists of several interconnected smart
            contracts:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>CommitmentFactory:</strong> Creates and manages individual
              commitment contracts
            </li>
            <li>
              <strong>Commitment:</strong> Holds staked funds and manages the
              validation process
            </li>
            <li>
              <strong>ValidationRegistry:</strong> Tracks validator reputation
              and history
            </li>
            <li>
              <strong>DonationRouter:</strong> Handles the routing of failed
              commitment stakes to charities
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">3. Core Features</h2>

          <h3 className="text-xl font-medium mb-3">
            3.1 Wallet-Based Authentication
          </h3>
          <p>
            Users connect their Ethereum wallet to access the platform. This
            provides a secure, passwordless authentication system where the
            wallet address serves as the user's unique identifier. MetaWill
            supports multiple wallet providers through RainbowKit integration.
          </p>

          <h3 className="text-xl font-medium mb-3">3.2 Commitment Creation</h3>
          <p>Users can create detailed commitments by specifying:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>A clear description of what they are committing to do</li>
            <li>The amount of ETH they wish to stake</li>
            <li>A deadline for completion</li>
            <li>The address of their chosen validator</li>
          </ul>
          <p>
            Upon confirmation, a smart contract is deployed to the Ethereum
            blockchain, and the staked funds are transferred to this contract.
          </p>

          <h3 className="text-xl font-medium mb-3">3.3 Validator Selection</h3>
          <p>
            Each commitment requires a validator—an external Ethereum address
            designated to verify the completion of the commitment. Validators
            are notified of their selection and are responsible for confirming
            or disputing the user's claim of completion.
          </p>

          <h3 className="text-xl font-medium mb-3">
            3.4 Financial Staking Mechanism
          </h3>
          <p>
            Users lock ETH as collateral for their commitment. This creates a
            financial incentive to follow through on their promises. The
            platform enforces minimum and maximum stake limits to ensure
            meaningful stakes while preventing excessive risk.
          </p>

          <h3 className="text-xl font-medium mb-3">
            3.5 Commitment Validation Process
          </h3>
          <p>The validation process involves two parties:</p>
          <ol className="list-decimal pl-6 mb-6">
            <li>
              The user self-reports whether they have completed their commitment
            </li>
            <li>The validator confirms or disputes the user's claim</li>
          </ol>
          <p>
            If both parties agree on success, the staked funds are returned to
            the user. If either party reports failure, the funds are sent to the
            designated charity.
          </p>

          <h3 className="text-xl font-medium mb-3">3.6 Outcome Processing</h3>
          <p>
            The smart contract automatically processes the outcome based on the
            consensus between the user and validator:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>Success:</strong> Staked ETH is returned to the user
            </li>
            <li>
              <strong>Failure:</strong> Staked ETH is transferred to the
              donation address
            </li>
          </ul>
          <p>
            All transactions are recorded on the blockchain, providing a
            transparent and immutable record of outcomes.
          </p>

          <h3 className="text-xl font-medium mb-3">3.7 Donation Mechanism</h3>
          <p>
            Failed commitments result in donations to predefined charity
            addresses. This creates a positive social impact even from
            unfulfilled promises. The platform provides transparent tracking of
            all donations and generates receipts for users.
          </p>

          <h2 className="text-2xl font-semibold mb-4">4. User Experience</h2>

          <h3 className="text-xl font-medium mb-3">4.1 User Dashboard</h3>
          <p>
            The dashboard provides users with a comprehensive overview of their
            commitments, including:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Active commitments with progress tracking</li>
            <li>Past commitment history and outcomes</li>
            <li>
              Validation requests for commitments where they are the validator
            </li>
            <li>Financial summary (total staked, returned, and donated)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">4.2 User Flows</h3>
          <p>The platform supports several key user flows:</p>
          <h4 className="text-lg font-medium mb-2">
            4.2.1 Creating a Commitment
          </h4>
          <ol className="list-decimal pl-6 mb-4">
            <li>User connects wallet</li>
            <li>Navigates to "New Commitment" section</li>
            <li>Enters commitment details and description</li>
            <li>Sets deadline date</li>
            <li>Specifies ETH amount to stake</li>
            <li>Enters validator's Ethereum address</li>
            <li>Reviews commitment details</li>
            <li>Confirms and signs transaction</li>
          </ol>

          <h4 className="text-lg font-medium mb-2">4.2.2 Validation Process</h4>
          <ol className="list-decimal pl-6 mb-4">
            <li>Validator receives notification of validation request</li>
            <li>Validator monitors user's progress</li>
            <li>
              When deadline approaches:
              <ul className="list-disc pl-6 my-2">
                <li>User reports completion status (success/failure)</li>
                <li>Validator confirms or disputes user's claim</li>
              </ul>
            </li>
            <li>System processes outcome based on consensus</li>
          </ol>

          <h4 className="text-lg font-medium mb-2">
            4.2.3 Commitment Resolution
          </h4>
          <ol className="list-decimal pl-6 mb-6">
            <li>
              If both user and validator confirm success:
              <ul className="list-disc pl-6 my-2">
                <li>Smart contract returns staked ETH to user</li>
                <li>Commitment marked as successfully completed</li>
              </ul>
            </li>
            <li>
              If either user or validator reports failure:
              <ul className="list-disc pl-6 my-2">
                <li>Smart contract transfers staked ETH to donation address</li>
                <li>Commitment marked as failed</li>
              </ul>
            </li>
            <li>User receives notification of outcome</li>
            <li>Transaction details recorded in history</li>
          </ol>

          <h2 className="text-2xl font-semibold mb-4">
            5. Technical Implementation
          </h2>

          <h3 className="text-xl font-medium mb-3">5.1 Smart Contracts</h3>
          <p>The platform's smart contracts handle:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Commitment creation and management</li>
            <li>Fund staking and escrow</li>
            <li>Validation logic</li>
            <li>Automated fund distribution</li>
          </ul>
          <p>
            All contracts are audited for security and optimized for gas
            efficiency.
          </p>

          <h3 className="text-xl font-medium mb-3">5.2 Frontend</h3>
          <p>The frontend is built with:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>React for the user interface</li>
            <li>RainbowKit for wallet connection</li>
            <li>Responsive design for mobile and desktop</li>
            <li>User-friendly interfaces for all core functions</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">
            5.3 Blockchain Integration
          </h3>
          <p>The platform integrates with the Ethereum blockchain through:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Web3 libraries for contract interaction</li>
            <li>IPFS for storing commitment details (if needed)</li>
            <li>Event listeners for smart contract events</li>
            <li>Gas optimization for cost-effective transactions</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">
            6. Security Considerations
          </h2>

          <p>MetaWill prioritizes security through:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Smart contract audits by third-party security firms</li>
            <li>Formal verification of critical contract logic</li>
            <li>Rate limiting to prevent spam attacks</li>
            <li>Secure wallet integration practices</li>
            <li>Transparent code and open-source development</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">7. Future Roadmap</h2>

          <p>Future enhancements planned for MetaWill include:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Multi-validator support for complex commitments</li>
            <li>Social features (commitment sharing, public profiles)</li>
            <li>Achievement badges and gamification elements</li>
            <li>Integration with additional blockchains</li>
            <li>Mobile application</li>
            <li>API for third-party integrations</li>
            <li>DAO governance for platform decisions</li>
            <li>Token-based incentives for validators</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">8. Conclusion</h2>

          <p>
            MetaWill represents a novel application of blockchain technology to
            solve the universal challenge of commitment fulfillment. By creating
            financial incentives and a transparent validation system, the
            platform encourages users to follow through on their promises while
            generating positive social impact through its donation mechanism.
          </p>
          <p>
            The combination of personal accountability, financial stakes, and
            charitable giving creates a powerful system that benefits users,
            validators, and society as a whole. As the platform evolves, it will
            continue to explore new ways to leverage blockchain technology for
            positive behavioral change.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
