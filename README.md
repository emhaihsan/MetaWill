# MetaWill

<img src="frontend/public/metawillicon.png" alt="MetaWill Logo" width="120"/>

MetaWill is a Web3 platform designed to help users fulfill their commitments by leveraging financial incentives and transparent blockchain-based validation mechanisms on the Linea network.

## Overview

MetaWill enables users to create blockchain-backed commitments, where they stake ETH as collateral to ensure they follow through on their promises. If commitments are fulfilled (validated by trusted validators), users receive their funds back. If not, the funds are donated to selected charitable causes.

## Key Features

- **Blockchain Commitments**: Create binding commitment contracts with specific goals and deadlines
- **Financial Incentives**: Deposit ETH as collateral to motivate commitment fulfillment
- **Transparent Validation**: Third-party validation through a decentralized system
- **Social Impact**: Unclaimed funds from unfulfilled commitments are donated to selected charities
- **Wallet Integration**: Seamless connection with MetaMask and support for Linea networks

## Technologies

### Frontend

- **Framework**: Next.js 15 with App Router
- **UI**: Tailwind CSS with shadcn/ui components
- **State Management**: React Hooks
- **Wallet Integration**: Wagmi, Viem
- **Blockchain Interaction**: Custom API endpoints for contract interaction

### Blockchain

- **Network**: Linea Sepolia Testnet
- **Smart Contracts**: Solidity with Foundry for development and testing
- **Contract Architecture**: Factory pattern with MetaWillFactory and MetaWillCommitment contracts

## Project Structure

```
metawill/
├── contract/            # Smart contract code (Solidity)
│   ├── src/             # Contract source files
│   ├── test/            # Contract test files
│   └── script/          # Deployment scripts
├── frontend/            # Next.js frontend application
│   ├── src/             # Source code
│   │   ├── app/         # Next.js app router pages
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions and configurations
│   │   └── abi/         # Contract ABIs
│   └── public/          # Static assets
└── README.md            # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask wallet extension
- Linea Sepolia testnet configured in MetaMask

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/metawill.git
cd metawill
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Smart Contract Development

1. Install Foundry:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. Build and test contracts:

```bash
cd contract
forge build
forge test
```

## Features

- **Dashboard**: View active commitments, past commitments, and validation requests
- **Create Commitment**: Create new commitments with title, description, deadline, stake amount, and validator
- **Validation**: Validate commitments as a third-party validator
- **Commitment Details**: View detailed information about each commitment
- **Reporting**: Report completion status for commitments

## Contract

https://sepolia.lineascan.build/

MetaWill Factory deployed at: 0x4A83D7f2E360F159925E9FD9feC9175dbDB2fcbD

Donation Option 1 deployed at: 0x3803d8099e9f78E05f0444e53f927083BE33375F

Donation Option 2 deployed at: 0xd427cc15dE0b1a1094cfC7FD88D5ED35e7e78555

Donation Option 3 deployed at: 0xD92f9783a08dd409cC7E93FA7fE7a4a0C821dD23
