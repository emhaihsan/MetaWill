'use client';

import NavBar from '../../components/NavBar';
import Link from 'next/link';

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">iPROMISE Whitepaper</h1>
                <span className="text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 py-1 px-3 rounded-full">Version: 1.0.0 | March 2025</span>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Executive Summary</h2>
                <p className="mb-4">
                  iPROMISE is a Web3 commitment platform that transforms personal failures into positive social impact. 
                  Utilizing ETH staking, transparent smart contracts, and automatic donation mechanisms, iPROMISE drives 
                  accountability while supporting charitable organizations. The platform integrates blockchain technology, 
                  gamification, and token economics to create a mutually beneficial ecosystem for users, verifiers, and 
                  charitable causes.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">2. Introduction</h2>
                <p className="mb-4">
                  In the modern world, many individuals struggle to follow through on personal resolutions and commitments. 
                  Traditional accountability systems often lack incentives, while charity systems frequently suffer from 
                  transparency issues, eroding public trust. iPROMISE addresses these challenges by converting personal 
                  failures into socially constructive actions through blockchain technology.
                </p>
                <p className="mb-4">
                  By leveraging the immutability and transparency of blockchain, iPROMISE creates a trustless environment 
                  where users can make commitments with real financial stakes, verified by their trusted connections, with 
                  failed commitments automatically benefiting charitable causes.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">3. The Problem</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Lack of accountability leading to unmet personal and professional commitments</li>
                  <li>Personal failures resulting in negative psychological impacts and reduced self-efficacy</li>
                  <li>Opaque donation processes that limit trust in charity work</li>
                  <li>Absence of financial incentives to follow through on personal goals</li>
                  <li>Limited transparency in traditional commitment platforms</li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">4. The iPROMISE Solution</h2>
                <p className="mb-4">iPROMISE offers a comprehensive solution:</p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Commitment Creation & Staking</h3>
                <p className="mb-4">
                  Users set measurable resolutions with clear success criteria, stake ETH as a commitment, and select 
                  trusted verifiers from their network to ensure accountability. The staked amount is locked in a smart 
                  contract until the commitment is either verified as completed or marked as failed.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Smart Verification System</h3>
                <p className="mb-4">
                  A decentralized verification process ensures fairness and transparency. Verifiers are selected from the 
                  user's trusted connections, creating social accountability. The system includes rewards for active verifiers, 
                  incentivizing participation in the ecosystem.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Automated Charity Distribution</h3>
                <p className="mb-4">
                  Failed commitments trigger automatic ETH donations to pre-selected charitable organizations, ensuring that 
                  even when users don't meet their goals, their stake contributes to positive social impact. This creates a 
                  win-win scenario regardless of commitment outcome.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Analytics & Progress Tracking</h3>
                <p className="mb-4">
                  A comprehensive dashboard provides insights on success rates, commitment patterns, and donation transparency. 
                  Users can track their progress and impact over time, while charities benefit from transparent fund flows.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">5. Technical Architecture</h2>
                <p className="mb-4">
                  iPROMISE leverages robust Web3 technology to deliver its unique value proposition:
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Smart Contracts</h3>
                <p className="mb-4">
                  Built in Solidity and deployed on Ethereum, our smart contracts manage commitments, stakes, verifications, 
                  and donations. The contracts are audited for security and optimized for gas efficiency, ensuring a 
                  seamless user experience.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Frontend Application</h3>
                <p className="mb-4">
                  Developed with Next.js and TailwindCSS, the frontend offers a modern, responsive user interface with 
                  intuitive commitment creation workflows, dashboard analytics, and verification management. Wallet 
                  integration is handled via RainbowKit and Wagmi, providing a seamless connection experience.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Data Storage</h3>
                <p className="mb-4">
                  Commitment details and verification proofs are stored on IPFS, ensuring decentralized and permanent 
                  storage while maintaining cost efficiency. This approach balances on-chain security with practical 
                  data management.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">6. Platform Economics</h2>
                <p className="mb-4">
                  The platform will eventually introduce the iPROMISE token (IPT) to support its internal economy, 
                  facilitate governance, and provide incentives for users and verifiers.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Revenue Streams</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Platform fee: A nominal 0.5% fee on successful commitments</li>
                  <li>Premium features: Subscription-based access to advanced analytics and commitment tools</li>
                  <li>Strategic partnerships: Collaborations with charity organizations and corporate wellness programs</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Token Utility</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Governance: Token holders can vote on platform upgrades and charity selections</li>
                  <li>Staking: Alternative to ETH for commitment creation</li>
                  <li>Rewards: Earned by verifiers and successful commitment completers</li>
                  <li>Fee discounts: Reduced platform fees for token holders</li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">7. Development Phases</h2>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Phase 1 - MVP (Q2 2025)</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Launch commitment creation with ETH staking</li>
                  <li>Implement verification system with trusted connections</li>
                  <li>Establish automated donation mechanisms</li>
                  <li>Release basic dashboard for commitment tracking</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Phase 2 - Enhanced Features (Q3 2025)</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Expand charity options through partnerships</li>
                  <li>Introduce social features for commitment sharing</li>
                  <li>Implement advanced analytics for users and charities</li>
                  <li>Launch mobile application</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Phase 3 - Rewards System (Q4 2025)</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Implement NFT-based achievement system</li>
                  <li>Create commitment templates and challenges</li>
                  <li>Develop verifier reputation system</li>
                  <li>Introduce premium subscription features</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Phase 4 - Token Launch (Q1 2026)</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Introduce iPROMISE token (IPT)</li>
                  <li>Implement DAO governance structure</li>
                  <li>Launch staking and reward mechanisms</li>
                  <li>Establish token economics and distribution</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Phase 5 - Ecosystem Growth (Q2-Q4 2026)</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Expand to multiple blockchains</li>
                  <li>Integrate with other Web3 platforms and DeFi protocols</li>
                  <li>Launch international charity partnerships</li>
                  <li>Develop enterprise solutions for corporate wellness programs</li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">8. Conclusion</h2>
                <p className="mb-4">
                  iPROMISE is set to redefine personal accountability and charitable giving in the digital age. Through its 
                  blend of innovative blockchain technology and socially oriented design, the platform promises to transform 
                  every missed commitment into an opportunity for positive change.
                </p>
                <p className="mb-4">
                  By creating a system where all stakeholders benefit—users gain motivation, verifiers earn rewards, and 
                  charities receive donations—iPROMISE establishes a sustainable ecosystem that aligns personal growth with 
                  social impact.
                </p>
                <p className="mb-4">
                  Join us in building a future where personal commitments drive positive change, one promise at a time.
                </p>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  href="/"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                >
                  &larr; Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
