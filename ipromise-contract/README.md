# iPROMISE Smart Contract (Hardhat Version)

This repository contains the Hardhat implementation of the iPROMISE smart contract, a Web3 commitment platform that allows users to create commitments, stake ETH, and have their commitments validated by assigned validators.

## Features

- Create commitments with ETH stakes
- Assign validators to verify commitment completion
- Validators can approve or reject commitment completion
- Failed commitments send stakes to charity
- Platform fee system for sustainability
- Charity approval system

## Project Structure

```
ipromise-contract/
├── contracts/            # Smart contract source code
│   └── IPROMISEContract.sol
├── scripts/              # Deployment scripts
│   └── deploy.ts
├── test/                 # Test files
│   └── IPROMISEContract.test.ts
├── .env-example          # Environment variables example
├── hardhat.config.ts     # Hardhat configuration
└── package.json          # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env-example` to `.env` and fill in your private key and RPC URL:
   ```bash
   cp .env-example .env
   ```

## Usage

### Compile Contracts

```bash
npm run compile
```

### Run Tests

```bash
npm run test
```

### Deploy to Sepolia Testnet

```bash
npm run deploy
```

### Verify Contract on Etherscan

After deployment, verify the contract on Etherscan:

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

## Contract Overview

### Main Functions

- `createCommitment`: Create a new commitment with ETH stake
- `assignValidator`: Assign a validator to a commitment
- `validateCommitment`: Validate a commitment as completed or failed
- `cancelCommitment`: Cancel a commitment (if no validator assigned)
- `forceCompleteExpiredCommitment`: Force complete expired commitments

### Admin Functions

- `approveCharity`: Approve a charity address
- `removeCharity`: Remove a charity address
- `updatePlatformFee`: Update the platform fee percentage
- `withdrawPlatformFees`: Withdraw accumulated platform fees

## License

MIT
